# FOX STUDIO PRO v33 — Clip Envelopes / MIDI CC Automation Core

v33 adds persistent, sample-positioned per-clip Gain and Pan envelopes to the Native Engine. Envelopes are non-destructive, linearly interpolated, and evaluated per audio sample during realtime playback and arrangement rendering.

Native JSON-lines:
- `set_audio_clip_envelope` with `parameter=gain|pan` and a JSON array of `{position,value}` points.
- `audio_clip_envelope` reads the current envelope.

Gain envelope values are linear multipliers (0..1+); pan values are -1..+1. Existing track automation remains separate and is applied after clip processing.

The Native time-stretch path in v32 remains high-quality resampling metadata, not a phase-vocoder/WSOLA implementation; v33 does not falsely label it as such.
