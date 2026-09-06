#!/bin/sh
set -eu
set -f

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

usage() {
  cat <<'EOF'
Usage: ./scripts/install-skills.sh --target <codex|zditor> [options]

Install skills from this repository for a supported agent runtime.

Options:
  --target <name>      Required. codex or zditor
  --dest <dir>        Override the destination skills directory
  --skill <name>      Install one skill; may be repeated
  --dry-run           Print planned changes without copying files
  --list              List skills and compatible targets
  -h, --help          Show this help message

Default destinations:
  codex   $CODEX_HOME/skills, or ~/.codex/skills
  zditor  $ZDITOR_SKILLS_DIR, or the platform's Zditor App data directory
EOF
}

list_skills() {
  cat <<'EOF'
SKILL           TARGETS
zditor-syntax   codex,zditor
import-excel    codex,zditor
img-gen         zditor
music-gen       zditor
speech-gen      zditor
video-gen       zditor
EOF
}

TARGET=""
DEST=""
SELECTED_SKILLS=""
DRY_RUN=0

while [ "$#" -gt 0 ]; do
  case "$1" in
    --target)
      shift
      if [ "$#" -eq 0 ]; then
        echo "Missing value for --target" >&2
        exit 1
      fi
      TARGET=$1
      ;;
    --dest)
      shift
      if [ "$#" -eq 0 ]; then
        echo "Missing value for --dest" >&2
        exit 1
      fi
      DEST=$1
      ;;
    --skill)
      shift
      if [ "$#" -eq 0 ]; then
        echo "Missing value for --skill" >&2
        exit 1
      fi
      SELECTED_SKILLS="$SELECTED_SKILLS $1"
      ;;
    --dry-run)
      DRY_RUN=1
      ;;
    --list)
      list_skills
      exit 0
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
  shift
done

case "$TARGET" in
  codex)
    DEFAULT_SKILLS="zditor-syntax import-excel"
    if [ -z "$DEST" ]; then
      if [ -n "${CODEX_HOME:-}" ]; then
        DEST="$CODEX_HOME/skills"
      else
        DEST="$HOME/.codex/skills"
      fi
    fi
    ;;
  zditor)
    DEFAULT_SKILLS="zditor-syntax import-excel img-gen music-gen speech-gen video-gen"
    if [ -z "$DEST" ]; then
      if [ -n "${ZDITOR_SKILLS_DIR:-}" ]; then
        DEST=$ZDITOR_SKILLS_DIR
      else
        case "$(uname -s 2>/dev/null || true)" in
          Darwin)
            DEST="$HOME/Library/Application Support/com.zditor.ai/skills"
            ;;
          Linux)
            DEST="${XDG_DATA_HOME:-$HOME/.local/share}/com.zditor.ai/skills"
            ;;
          MINGW*|MSYS*|CYGWIN*)
            if [ -z "${APPDATA:-}" ]; then
              echo "Cannot locate the Windows App Data directory. Use --dest <dir>." >&2
              exit 1
            fi
            DEST="$APPDATA/com.zditor.ai/skills"
            ;;
          *)
            echo "Cannot detect the Zditor App skills directory. Use --dest <dir>." >&2
            exit 1
            ;;
        esac
      fi
    fi
    ;;
  "")
    echo "Missing required --target <codex|zditor>." >&2
    usage >&2
    exit 1
    ;;
  *)
    echo "Unsupported target: $TARGET" >&2
    exit 1
    ;;
esac

if [ -n "$SELECTED_SKILLS" ]; then
  SKILLS=$SELECTED_SKILLS
else
  SKILLS=$DEFAULT_SKILLS
fi

is_compatible() {
  skill=$1
  case "$TARGET:$skill" in
    codex:zditor-syntax|codex:import-excel|zditor:zditor-syntax|zditor:import-excel|zditor:img-gen|zditor:music-gen|zditor:speech-gen|zditor:video-gen)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

VALIDATED_SKILLS=""
for name in $SKILLS; do
  src="$REPO_ROOT/skills/$name"
  dst="$DEST/$name"

  case " $VALIDATED_SKILLS " in
    *" $name "*)
      echo "Skill selected more than once: $name" >&2
      exit 1
      ;;
  esac
  VALIDATED_SKILLS="$VALIDATED_SKILLS $name"

  if [ ! -f "$src/SKILL.md" ]; then
    echo "Unknown or invalid skill: $name" >&2
    exit 1
  fi

  if ! is_compatible "$name"; then
    echo "Skill '$name' is not compatible with target '$TARGET'." >&2
    exit 1
  fi

  if [ -f "$src/.env" ]; then
    echo "Refusing to copy $name because its source directory contains .env." >&2
    echo "Keep credentials out of the repository and install from .env.example instead." >&2
    exit 1
  fi

  if [ -e "$dst" ] && [ ! -d "$dst" ]; then
    echo "Cannot install $name because the destination exists and is not a directory: $dst" >&2
    exit 1
  fi
done

if [ "$DRY_RUN" -eq 0 ]; then
  mkdir -p "$DEST"
fi

for name in $SKILLS; do
  src="$REPO_ROOT/skills/$name"
  dst="$DEST/$name"
  if [ -d "$dst" ]; then
    echo "Kept existing $name -> $dst"
  elif [ "$DRY_RUN" -eq 1 ]; then
    echo "Would install $name -> $dst"
  else
    cp -R "$src" "$dst"
    echo "Installed $name -> $dst"
    if [ -f "$dst/.env.example" ]; then
      echo "Setup template: $dst/.env.example (no credential was copied)."
    fi
  fi
done

if [ "$DRY_RUN" -eq 1 ]; then
  echo "Dry run complete."
elif [ "$TARGET" = "codex" ]; then
  echo "Reload Codex to discover the installed skills."
else
  echo "Restart or reload Zditor App to discover the installed skills."
  echo "For skills that need credentials, copy .env.example to .env and fill it locally."
fi
