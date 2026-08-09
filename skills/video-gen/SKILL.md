---
name: video-gen
description: Generate text-to-video clips with MiniMax Video through Zditor Native Agent's http_request tool. Use when the user asks to create or generate a video, animation, cinematic clip, text-to-video result, or calls this skill video_gen or video-gen.
---

# MiniMax Video Generation

Generate text-to-video clips according to the user's requirements. Preserve the requested subject, action, setting, visual style, mood, composition, camera movement, duration, resolution, and intended use. Do not add important characters, brands, text, or story events that the user did not request. Do not evade MiniMax safety checks or retry sensitive prompts unchanged.

## Configure

This skill reads three endpoints and one credential from the skill's `.env` file:

```dotenv
MINIMAX_VIDEO_CREATE_API_URL=https://api.minimaxi.com/v1/video_generation
MINIMAX_VIDEO_QUERY_API_URL=https://api.minimaxi.com/v1/query/video_generation
MINIMAX_VIDEO_FILE_API_URL=https://api.minimaxi.com/v1/files/retrieve
MINIMAX_API_KEY=<your MiniMax API key>
```

Never read, print, or place `MINIMAX_API_KEY` directly in tool arguments or chat. If it is not configured, ask the user to set it in this skill's `.env` file. Advise users not to paste API keys into chat.

## Prepare The Prompt

- Require a non-empty prompt no longer than 2,000 characters. If the user's request is brief, expand it only with compatible visual details that help generation: subject, action, environment, lighting, composition, motion, and camera behavior.
- Preserve an explicitly supplied final prompt exactly when the user asks for no changes. Set `prompt_optimizer: false` for precise prompts or carefully placed camera directives; otherwise default it to `true`.
- Default to `MiniMax-Hailuo-2.3`, 6 seconds, and `768P`.
- Use `MiniMax-Hailuo-02`, `T2V-01-Director`, or `T2V-01` only when the user explicitly requests it or when compatibility requires it.
- Use `fast_pretreatment: true` only when the user prioritizes lower prompt-optimization latency. It only affects `MiniMax-Hailuo-2.3` and `MiniMax-Hailuo-02`.
- Set `aigc_watermark` only according to the user's request; default to `false`.
- Include `callback_url` only when the user provides a public callback endpoint that can echo the validation `challenge` within three seconds. Otherwise use polling.

Supported camera directives for `MiniMax-Hailuo-2.3`, `MiniMax-Hailuo-02`, and `*-Director` models are `[左移]`, `[右移]`, `[左摇]`, `[右摇]`, `[推进]`, `[拉远]`, `[上升]`, `[下降]`, `[上摇]`, `[下摇]`, `[变焦推近]`, `[变焦拉远]`, `[晃动]`, `[跟随]`, and `[固定]`.

- Put simultaneous movements in one bracket, such as `[左摇,上升]`, with no more than three combined directives.
- Put sequential movements at the relevant points in the prompt, such as `角色走近窗边[跟随]，看向远方[拉远]`.
- Do not add camera directives when the user requests a static composition or provides an exact final prompt without them.

Model, duration, and resolution compatibility:

- `MiniMax-Hailuo-2.3` and `MiniMax-Hailuo-02`: 6 seconds at `768P` or `1080P`; 10 seconds at `768P` only.
- `T2V-01-Director` and `T2V-01`: 6 seconds at `720P` only.
- If a requested combination is unsupported, explain the nearest valid choices and ask the user rather than silently changing duration or resolution.

## Create The Task

Call `http_request` with the selected parameters and omit optional fields that are not needed:

```json
{
  "method": "POST",
  "url_skill_env": {
    "skill": "video-gen",
    "key": "MINIMAX_VIDEO_CREATE_API_URL"
  },
  "header_skill_env": {
    "Authorization": {
      "skill": "video-gen",
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
      "model": "MiniMax-Hailuo-2.3",
      "prompt": "<final video prompt>",
      "prompt_optimizer": true,
      "fast_pretreatment": false,
      "duration": 6,
      "resolution": "768P",
      "aigc_watermark": false
    }
  },
  "timeout_ms": 300000,
  "max_response_bytes": 1048576
}
```

Confirm task creation only when the HTTP request succeeds, `base_resp.status_code` is `0`, and `task_id` is non-empty. Keep the returned `task_id` for polling. Do not claim that the video itself has been generated at this stage.

Do not automatically retry a task-creation timeout because the service may already have accepted and billed the task. Explain the uncertainty and ask before creating another task.

## Poll The Task

Query the task after creation and continue until it reaches a terminal state. Wait about 10 seconds between non-terminal queries to avoid unnecessary traffic.

```json
{
  "method": "GET",
  "url_skill_env": {
    "skill": "video-gen",
    "key": "MINIMAX_VIDEO_QUERY_API_URL"
  },
  "header_skill_env": {
    "Authorization": {
      "skill": "video-gen",
      "key": "MINIMAX_API_KEY",
      "prefix": "Bearer "
    }
  },
  "query": {
    "task_id": "<task_id>"
  },
  "timeout_ms": 30000,
  "max_response_bytes": 1048576
}
```

Interpret the result only when the HTTP request succeeds and `base_resp.status_code` is `0`:

- `Preparing`, `Queueing`, or `Processing`: wait, then query again.
- `Success`: require a non-empty `file_id`, then retrieve the file metadata.
- `Fail`: stop polling and report the failure without claiming that a video was created.

If polling has not reached a terminal state after 30 minutes, stop active polling, report the `task_id` and latest status, and offer to resume querying. A query timeout may be retried once because it does not create another task.

## Retrieve And Download

After `Success`, retrieve the file metadata with the returned `file_id`:

```json
{
  "method": "GET",
  "url_skill_env": {
    "skill": "video-gen",
    "key": "MINIMAX_VIDEO_FILE_API_URL"
  },
  "header_skill_env": {
    "Authorization": {
      "skill": "video-gen",
      "key": "MINIMAX_API_KEY",
      "prefix": "Bearer "
    }
  },
  "query": {
    "file_id": "<file_id>"
  },
  "timeout_ms": 30000,
  "max_response_bytes": 1048576
}
```

Confirm retrieval only when the HTTP request succeeds, `base_resp.status_code` is `0`, and `file.download_url` is non-empty. The download URL expires after one hour.

Immediately download the video with a second `http_request`. Use a concise, collision-resistant MP4 filename under `generated/video/`.

```json
{
  "method": "GET",
  "url": "<file.download_url>",
  "save_to": "generated/video/<descriptive-name>-<timestamp>.mp4",
  "follow_redirects": true,
  "timeout_ms": 300000,
  "max_response_bytes": 67108864
}
```

If the download URL is on another public HTTPS origin, make the request directly to that URL. Never expose the temporary URL after saving the video locally.

After the download succeeds, call `present_artifact` with the saved workspace path. Report the model, duration setting, resolution setting, task ID, and file path. Report width, height, byte size, filename, or creation time only when returned by the query or file metadata. Do not claim the exact codec, frame rate, or file size unless verified.

Do not report success if generation succeeded but file retrieval or local download failed. State the completed stage, preserve the `task_id` and `file_id`, and offer one retry while the one-hour download URL remains valid.

## Errors And Retries

- `1000`, `1013`, `1024`, or `1033`: transient service error. Retry a query or retrieval once after a short delay. Do not automatically retry task creation after an ambiguous timeout.
- `1001`: timeout. Query and retrieval may be retried once; task creation must not be retried without user confirmation.
- `1002`: rate limited. Wait, then retry at most twice.
- `1004` or `2049`: authentication failed. Do not retry; ask the user to verify the configured API key.
- `1008`: insufficient balance. Do not retry or silently change the model; ask the user to check the account balance.
- `1026`: input content is sensitive. Do not retry unchanged; ask the user to revise the prompt.
- `1027`: generated output is sensitive. Do not retry unchanged; ask the user to revise the concept.
- `1039`: TPM limit. Shorten the prompt or wait before retrying.
- `2013`: invalid parameters. Fix only clear schema or model-duration-resolution violations, then retry once.
- `2056`: Token Plan resource limit. Do not retry immediately; explain that the user must wait for resources to reset.

Never report a task as successful based only on HTTP status `200`; always inspect `base_resp.status_code` and the task `status`.
