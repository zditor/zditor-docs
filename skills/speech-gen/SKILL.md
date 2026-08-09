---
name: speech-gen
description: Generate spoken audio from text with MiniMax Speech through Zditor Native Agent's http_request tool. Use when the user asks for text-to-speech, voice synthesis, narration, a voice-over, spoken dialogue, an audiobook excerpt, or calls this skill speech_gen or speech-gen.
---

# MiniMax Speech Generation

Generate speech that preserves the user's text, language, pronunciation, pacing, emotion, voice preference, and intended use. Do not rewrite user-provided text unless requested. Do not imitate a living person's voice; translate that request into non-identifying vocal traits and use a suitable system voice. Use a custom or cloned `voice_id` only when the user supplies it and is authorized to use it.

## Configure

This skill reads its endpoint and credential from the skill's `.env` file:

```dotenv
MINIMAX_SPEECH_API_URL=https://api.minimaxi.com/v1/t2a_v2
MINIMAX_API_KEY=<your MiniMax API key>
```

The Beijing fallback endpoint is `https://api-bj.minimaxi.com/v1/t2a_v2`. Change `MINIMAX_SPEECH_API_URL` only when the user requests or needs that endpoint.

Never read, print, or place `MINIMAX_API_KEY` directly in tool arguments or chat. If it is not configured, ask the user to set it in this skill's `.env` file. Advise users not to paste API keys into chat.

## Prepare The Request

- Require non-empty `text` shorter than 10,000 characters and preserve it exactly unless the user asks for editing. Paragraph breaks may remain as newlines.
- Default to `speech-2.8-hd`. Use `speech-2.8-turbo` when the user prioritizes speed. Use an older supported model only when explicitly requested or required by a feature.
- Select a system `voice_id` that matches the requested language and vocal traits. If the user gives no preference, use `male-qn-qingse` for Chinese, `English_Graceful_Lady` for English, `Japanese_KindLady` for Japanese, or `Korean_CalmLady` for Korean. For other languages, select a compatible system voice from the official voice list.
- Default `speed`, `vol`, and `pitch` to `1`, `1`, and `0`. Preserve explicit user settings within their supported ranges.
- Let the model infer emotion unless the user specifies one. Supported values are `happy`, `sad`, `angry`, `fearful`, `disgusted`, `surprised`, `calm`, `fluent`, and `whisper`; `fluent` and `whisper` only work with `speech-2.6-hd` and `speech-2.6-turbo`, while `speech-2.8-*` does not support `whisper`.
- Set `language_boost` when the user specifies a language or dialect. Use `Chinese,Yue` for Cantonese; otherwise use the matching supported language value or `auto` when uncertain.
- Preserve supported pause markers such as `<#1.5#>`, inline pronunciation overrides, and expressive tags. Expressive tags such as `(laughs)` and `(sighs)` require `speech-2.8-hd` or `speech-2.8-turbo`.
- Include `pronunciation_dict`, `timbre_weights`, `voice_modify`, text normalization, or LaTeX reading only when requested. Do not send `voice_setting.voice_id` when using `timbre_weights`.

For texts longer than 3,000 characters, tell the user that MiniMax recommends streaming. This skill should still use non-streaming URL output for a downloadable artifact unless the user asks to split the text or use another workflow.

## Generate

Use non-streaming URL output so the completed audio can be downloaded and presented. Default to mono MP3 at 32 kHz and 128 kbps unless the user requests a supported alternative.

Call `http_request` with this shape, omitting optional fields that are not needed:

```json
{
  "method": "POST",
  "url_skill_env": {
    "skill": "speech-gen",
    "key": "MINIMAX_SPEECH_API_URL"
  },
  "header_skill_env": {
    "Authorization": {
      "skill": "speech-gen",
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
      "model": "speech-2.8-hd",
      "text": "<text to synthesize exactly as supplied>",
      "stream": false,
      "voice_setting": {
        "voice_id": "male-qn-qingse",
        "speed": 1,
        "vol": 1,
        "pitch": 0
      },
      "audio_setting": {
        "sample_rate": 32000,
        "bitrate": 128000,
        "format": "mp3",
        "channel": 1
      },
      "language_boost": "auto",
      "subtitle_enable": false,
      "output_format": "url",
      "aigc_watermark": false
    }
  },
  "timeout_ms": 300000,
  "max_response_bytes": 1048576
}
```

Parameter constraints:

- `model`: `speech-2.8-hd`, `speech-2.8-turbo`, `speech-2.6-hd`, `speech-2.6-turbo`, `speech-02-hd`, `speech-02-turbo`, `speech-01-hd`, or `speech-01-turbo`.
- `text`: fewer than 10,000 characters.
- `voice_setting.speed`: `0.5`–`2`; `vol`: greater than `0` and at most `10`; `pitch`: `-12`–`12`.
- `audio_setting.sample_rate`: `8000`, `16000`, `22050`, `24000`, `32000`, or `44100`.
- `audio_setting.bitrate`: `32000`, `64000`, `128000`, or `256000`; it applies only to MP3.
- `audio_setting.format`: `mp3`, `pcm`, `flac`, `wav`, `pcmu_raw`, `pcmu_wav`, or `opus`.
- `audio_setting.channel`: `1` or `2`.
- `voice_modify.pitch`, `intensity`, and `timbre`: `-100`–`100`. `sound_effects` may be `spacious_echo`, `auditorium_echo`, `lofi_telephone`, or `robotic`.
- `pronunciation_dict.tone`: each item uses `original/replacement`, where the replacement may contain text, parenthesized numbered pinyin, IPA, or Japanese kana.
- `timbre_weights`: at most four entries, each with a `voice_id` and integer `weight` from `1` to `100`.

Confirm API success only when the HTTP request succeeds, `base_resp.status_code` is `0`, `data` is not null, and `data.status` is `2`. With `output_format: "url"`, `data.audio` is a temporary audio URL that expires after 24 hours.

## Download And Present

Immediately download `data.audio` with a second `http_request`. Use a concise, collision-resistant workspace filename under `generated/speech/` and an extension matching `audio_setting.format`.

```json
{
  "method": "GET",
  "url": "<data.audio URL from the generation response>",
  "save_to": "generated/speech/<descriptive-name>-<timestamp>.mp3",
  "timeout_ms": 300000,
  "max_response_bytes": 67108864
}
```

After the download succeeds, call `present_artifact` with the saved workspace path. Report the model, voice ID or voice mix, output format, and file path. You may report duration, sample rate, bitrate, file size, channel count, and usage only when they are present in `extra_info` or verified from the saved file.

If the user requests subtitles, set `subtitle_enable: true` and choose `subtitle_type` as `sentence` or `word`. When `data.subtitle_file` is returned, download it under `generated/speech/` with a matching base filename and `.json` extension, then present both artifacts. `word_streaming` is only valid for streaming requests.

If the audio URL redirects, allow same-origin redirects. If the API returns a URL on another public HTTPS origin, make the second request directly to that URL. Never expose temporary download URLs after saving the artifacts locally.

## Errors And Retries

- `1000`, `1024`, or `1033`: transient server error. Retry once after a short delay.
- `1001`: timeout. Do not automatically retry because synthesis may have completed; explain the uncertainty and ask before retrying.
- `1002`: rate limited. Retry at most twice with a delay.
- `1004` or `2049`: authentication failed. Do not retry; ask the user to verify the configured API key.
- `1008`: insufficient balance. Do not retry; ask the user to check the account balance.
- `1026` or `1027`: sensitive input or output. Do not retry unchanged; ask the user to revise the text or voice request.
- `1039`: TPM limit. Reduce or split the text, or wait before retrying.
- `1042`: invisible or invalid characters exceed 10%. Ask the user to clean the text before retrying.
- `2013`: invalid parameters. Fix only clear schema violations, then retry once.
- `20132`: invalid voice ID. Ask the user to choose another authorized system, designed, or cloned voice.
- `2042`: no access to the voice ID. Do not substitute another voice silently; ask the user to choose an accessible voice.
- `2056`: Token Plan resource limit. Do not retry immediately; explain that the user must wait for resources to reset.

Do not report success if synthesis completed but the audio download failed. State that synthesis completed but local saving failed, and offer one download retry while the 24-hour URL remains valid.
