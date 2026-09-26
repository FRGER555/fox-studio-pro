# FOX STUDIO PRO v28 — Multi-Clip Timeline & Native Clip DSP

v28 extends the native production core with a real native clip collection per track while keeping the v27 single-clip API backward compatible.

## Implemented
- Multiple audio clips per track in the native engine.
- Non-destructive clip start/source-offset/length editing.
- Per-clip gain.
- Per-clip pan.
- Per-clip fade-in/fade-out envelopes in seconds.
- Per-clip playback-rate/time-stretch style resampling (0.25x–4x).
- Per-clip pitch shift in semitones (-24..+24) using native resampling.
- Clip looping and mute state.
- Add/edit/remove/query clip commands over the JSON-lines native protocol.
- Project serialization for the full native clip list.
- Arrangement rendering sees all loaded clips.
- Existing v27 clip, freeze, undo/redo, automation and render APIs remain available.

## Important DSP note
The v28 clip pitch/time transform is a deterministic native resampling engine. It is not a phase-vocoder or elastique-class time/pitch algorithm; it preserves the local/offline architecture and gives a real working baseline that can later be replaced by a higher quality phase-vocoder/WSOLA implementation without changing the project protocol.

## Native commands
- `add_audio_clip`
- `edit_audio_clip_advanced`
- `remove_audio_clip`
- `audio_clips`

The older `load_audio_clip` and `edit_audio_clip` commands remain supported.
