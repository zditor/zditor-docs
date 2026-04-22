#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

usage() {
  cat <<'EOF'
Usage: ./scripts/install-codex-skills.sh [--dest <dir>]

Install this repository's Codex skills into:
- $CODEX_HOME/skills, if CODEX_HOME is set
- ~/.codex/skills, otherwise

Options:
  --dest <dir>  Install into a custom skills directory
  -h, --help    Show this help message
EOF
}

DEST=""

while [ "$#" -gt 0 ]; do
  case "$1" in
    --dest)
      shift
      if [ "$#" -eq 0 ]; then
        echo "Missing value for --dest" >&2
        exit 1
      fi
      DEST=$1
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

if [ -z "$DEST" ]; then
  if [ -n "${CODEX_HOME:-}" ]; then
    DEST="$CODEX_HOME/skills"
  else
    DEST="$HOME/.codex/skills"
  fi
fi

mkdir -p "$DEST"

install_skill() {
  name=$1
  src="$REPO_ROOT/skills/$name"
  dst="$DEST/$name"

  if [ ! -d "$src" ]; then
    echo "Missing skill directory: $src" >&2
    exit 1
  fi

  if [ -e "$dst" ]; then
    echo "Skill already exists: $dst" >&2
    echo "Remove the existing directory and rerun the installer." >&2
    exit 1
  fi

  cp -R "$src" "$dst"
  echo "Installed $name -> $dst"
}

install_skill zditor-syntax
install_skill import-excel

echo "Restart Codex to pick up the new skills."
