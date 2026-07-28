---
name: img-gen
description: Generate raster images with the OpenAI Image API through Zditor Native Agent's http_request tool. Use when the user asks to create or generate an image, illustration, diagram, cover, poster, concept art, or other visual asset, including requests that call this skill img_gen or img-gen.
---

# Image Generation

Generate images according to the user's requirements. Preserve the requested subject, style, text, language, aspect ratio, colors, and composition. Do not add an unrequested visual style or invent important content.

## Setup

Place this directory at `.zditor/skills/img-gen` inside the target workspace so Zditor Native Agent can discover it. Before first use, create `.env` beside `SKILL.md` from the included template:

```sh
cp .env.example .env
```

Open `.env` and set `API_KEY` to an OpenAI API key. Keep `IMAGE_API_URL` unchanged unless the official service endpoint changes. Never commit `.env` or paste the API key into chat.

## Generate

Call `http_request` once per image. Replace the prompt and change model options only when the user requests different values.

```json
{
  "method": "POST",
  "url_skill_env": {
    "skill": "img-gen",
    "key": "IMAGE_API_URL"
  },
  "header_skill_env": {
    "Authorization": {
      "skill": "img-gen",
      "key": "API_KEY",
      "prefix": "Bearer "
    }
  },
  "body": {
    "type": "json",
    "value": {
      "model": "gpt-image-2",
      "prompt": "<user requirements>",
      "n": 1,
      "size": "3840x2160",
      "quality": "high"
    }
  },
  "save_to_session": "auto",
  "base64_json_path": "/data/0/b64_json",
  "timeout_ms": 300000,
  "max_response_bytes": 67108864,
  "display_saved_image": true
}
```

Confirm success only when the tool returns `ok: true`. Inspect the displayed image for obvious failures, but do not claim its exact pixel dimensions were verified. For multiple images, repeat the request with `n: 1` so every result is saved and displayed separately.

The configured endpoint uses official OpenAI HTTPS. Never read, print, or place `API_KEY` directly in tool arguments or chat. If it is not configured, ask the user to complete the setup above.

## Store Images

- Keep images in the current session with `save_to_session: "auto"` by default. Zditor removes session images when the session is deleted.
- Use the returned `saved_to` value to identify the session image. Do not expose or hardcode its app-data absolute path.
- When an image must be referenced by a workspace document, call `materialize_session_image` with `saved_to` as `source` and the workspace-relative document path as `document_path`. Use its returned `documentReference` in the document.
- Use `save_to` only when the user explicitly requests an immediate workspace output path.
- Session images are limited to 20 MiB. If an image exceeds the limit, retry with a smaller size or lower quality.

Do not retry authentication or invalid-request errors. Retry `429` or `5xx` responses at most twice, and do not automatically retry a timeout because the server may already have generated the image.
