# FOX STUDIO PRO v11 — Native Audio Execution

This release extends the native JUCE engine with:

- Multi-track mono WAV recording from multiple physical input channels.
- Per-track input-channel mapping (`set_input_channel`).
- Native punch/loop transport state with validation (`set_punch_loop`).
- Existing single-file 24-bit WAV recording with selectable input start channel.
- Native latency reporting for plugin + device latency.
- JSON-lines commands for desktop shells; no network port is required.

## New commands

- `start_multitrack_recording` `{directory, channelCount}`
- `set_input_channel` `{track, inputChannel}`
- `input_channel_map`
- `set_punch_loop` `{punchIn,punchOut,loopStart,loopEnd,punchEnabled,loopEnabled}`
- `punch_loop`
- `start_recording` now accepts `inputStartChannel`.

The native engine writes each mapped input to an independent 24-bit WAV file.
The browser UI does not pretend to provide native hardware access; the commands are intended for the Desktop shell.
