# FOX STUDIO PRO v32 — Audio Crossfade / Clip DSP / MIDI CC Core

v32 extends the native clip engine from v31 with non-destructive overlap crossfades and safer MIDI CC routing.

## Native changes
- Audio clips expose `crossfadeIn` and `crossfadeOut` in seconds.
- Manual command: `set_audio_clip_crossfade`.
- When clips overlap on a track, the native clip synchronizer automatically derives a bounded crossfade (up to 250 ms) for the overlapping region.
- Crossfades are applied in the native sample renderer together with existing fade-in/fade-out, gain, pan, pitch shift and playback-rate processing.
- Crossfade state is persisted in project JSON and restored on load.
- MIDI CC events from a MIDI clip are routed to that clip's track MIDI channel, matching note routing.
- Existing MIDI CC events remain sample-accurate and participate in realtime/offline rendering.

## Important scope note
The existing clip playback-rate engine is a native resampling/time-scaling layer. v32 does not claim phase-vocoder-quality independent time stretching. A future dedicated phase-vocoder/WSOLA engine can replace the resampler without changing the project API.

## Validation
- Source-level structural validation performed.
- ZIP integrity validated.
- Full JUCE native compilation/realtime audio testing requires a local JUCE checkout and C++ toolchain.
