---
name: music-gen
description: Generate songs, instrumental music, or cover versions with MiniMax Music through Zditor Native Agent's http_request tool. Use when the user asks to create or generate music, a song, background music, an instrumental track, lyrics-to-song audio, or a cover, including requests that call this skill music_gen or music-gen.
---

# MiniMax Music Generation

Generate music according to the user's requirements. Preserve requested lyrics, language, genre, mood, instrumentation, vocal style, structure, and intended use. Do not rewrite user-provided lyrics unless requested. Do not imitate a living artist's voice; translate that request into non-identifying musical traits.

## Configure

This skill reads its endpoint and credential from the skill's `.env` file:

```dotenv
MINIMAX_MUSIC_API_URL=https://api.minimaxi.com/v1/music_generation
MINIMAX_API_KEY=<your MiniMax API key or sk-cp subscription key>
```

Never read, print, or place `MINIMAX_API_KEY` directly in tool arguments or chat. If it is not configured, ask the user to set it in this skill's `.env` file. Advise users not to paste API keys into chat.

## Choose A Mode

- **Song with supplied lyrics:** use `music-3.0`, set `lyrics` exactly as supplied, `lyrics_optimizer: false`, and `is_instrumental: false`.
- **Song with generated lyrics:** use `music-3.0`, omit `lyrics`, set `lyrics_optimizer: true`, and use the user's subject, language, structure, and musical direction in `prompt`.
- **Instrumental:** use `music-3.0`, omit `lyrics`, set `lyrics_optimizer: false`, and set `is_instrumental: true`. The `prompt` is required.
- **Cover:** use `music-cover`, set a 10–300 character target-style `prompt`, and provide exactly one of `audio_url`, `audio_base64`, or `cover_feature_id`. Do not send `is_instrumental` or `lyrics_optimizer` for cover models.
- Use a `-free` model only when the user explicitly requests the free tier or lacks paid/Token Plan access. Free models are limited to 3 RPM; paid models are limited to 120 RPM.

For non-instrumental generation, add useful supported structure labels when generating lyrics, such as `[Intro]`, `[Verse]`, `[Pre Chorus]`, `[Chorus]`, `[Bridge]`, `[Outro]`, `[Hook]`, `[Build Up]`, `[Inst]`, or `[Solo]`. Keep supplied structure labels unchanged.

## Generate

Use non-streaming URL output so the completed audio can be downloaded and presented. Default to MP3 at 44.1 kHz and 256 kbps unless the user requests a supported alternative.

Call `http_request` with this shape, including only fields relevant to the selected mode:

```json
{
  "method": "POST",
  "url_skill_env": {
    "skill": "music-gen",
    "key": "MINIMAX_MUSIC_API_URL"
  },
  "header_skill_env": {
    "Authorization": {
      "skill": "music-gen",
      "key": "MINIMAX_API_KEY",
      "prefix": "Bearer "
    }
  },
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "type": "json",
    "value": {
      "model": "music-3.0",
      "prompt": "<music style, mood, instrumentation, vocals, tempo, and scene>",
      "lyrics": "<lyrics with newline-separated sections; omit when not needed>",
      "stream": false,
      "output_format": "url",
      "audio_setting": {
        "sample_rate": 44100,
        "bitrate": 256000,
        "format": "mp3"
      },
      "aigc_watermark": false,
      "lyrics_optimizer": false,
      "is_instrumental": false
    }
  },
  "timeout_ms": 300000,
  "max_response_bytes": 1048576
}
```

Parameter constraints:

- `prompt`: up to 2,000 characters. It is required for instrumental music and must be 10–300 characters for covers.
- `lyrics`: 1–3,500 characters for normal songs; 10–1,000 characters for covers.
- `audio_setting.sample_rate`: `16000`, `24000`, `32000`, or `44100`.
- `audio_setting.bitrate`: `32000`, `64000`, `128000`, or `256000`.
- `audio_setting.format`: `mp3`, `wav`, or `pcm`.
- Cover reference audio must be 6 seconds to 6 minutes, no larger than 50 MB, and in a common format such as MP3, WAV, or FLAC.

Confirm API success only when the HTTP request succeeds, `base_resp.status_code` is `0`, and `data.status` is `2`. With `output_format: "url"`, read the temporary audio URL from `data.audio`. The URL expires after 24 hours.

## Download And Present

Immediately download `data.audio` with a second `http_request`. Use a concise, collision-resistant workspace filename under `generated/music/` and an extension matching `audio_setting.format`.

```json
{
  "method": "GET",
  "url": "<data.audio URL from the generation response>",
  "save_to": "generated/music/<descriptive-name>-<timestamp>.mp3",
  "timeout_ms": 300000,
  "max_response_bytes": 67108864
}
```

After the download succeeds, call `present_artifact` with the saved workspace path. Report the model, mode, output format, and file path. Do not claim the exact duration, sample rate, bitrate, or file size unless verified from the response or file metadata.

If the download URL redirects, allow same-origin redirects. If the API returns a URL on a different public HTTPS origin, it is safe to make the second request directly to that returned URL. Never expose the temporary URL when a local artifact has been saved successfully.

## Errors And Retries

- `1002`: rate limited. Retry at most twice with a delay; respect 3 RPM for free models and 120 RPM for paid models.
- `1004` or `2049`: authentication failed. Do not retry; ask the user to verify the configured key.
- `1008`: insufficient balance or unavailable entitlement. Do not silently change billing mode or model; explain the issue and ask whether to use a free model.
- `1026`: sensitive content. Do not retry unchanged; ask the user to revise the request.
- `2013`: invalid parameters. Fix only clear schema violations, then retry once.
- Do not automatically retry a timeout because the service may already have generated the track.

Do not report success if audio generation succeeded but the download failed. In that case, state that generation completed but local saving failed, and offer one download retry while the 24-hour URL remains valid.
