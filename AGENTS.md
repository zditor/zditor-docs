# Repository Instructions

## Skill installation

When a user gives this repository URL and asks to install its skills:

1. Clone the repository into a temporary or user-approved directory.
2. Read `skills/manifest.json` to determine which skills support the current agent runtime.
3. Run `scripts/install-skills.sh` with the matching `--target` value. Do not manually copy an incompatible skill.
4. Use `--dry-run` first when the destination is unclear or already contains skills.
5. Leave existing skill directories unchanged so local configuration and `.env` files are preserved.
6. Report the installed and already-present skill names plus the destination. Tell the user when the host agent must be restarted or reloaded.

For Codex:

```sh
./scripts/install-skills.sh --target codex
```

For Zditor Native Agent, install into the Zditor App's global skills directory:

```sh
./scripts/install-skills.sh --target zditor
```

The installer detects the platform-specific Zditor App data directory. On macOS it is `~/Library/Application Support/com.zditor.ai/skills`. Use `ZDITOR_SKILLS_DIR` or `--dest` only when the app uses a non-default location.

`img-gen`, `music-gen`, `speech-gen`, and `video-gen` support Zditor Native Agent only because they require Zditor's `http_request` and artifact tools. After installation, create `.env` from `.env.example` only when the user wants to configure that skill. Ask the user to fill credentials locally; never read, copy, or print a real key.

## Skill maintenance

- Keep every installable skill in `skills/<skill-name>/SKILL.md`.
- Keep `skills/manifest.json`, the installer compatibility lists, and localized README skill lists synchronized.
- Validate every changed skill with the skill validator before reporting completion.
- Do not commit `.env` files or credentials.
