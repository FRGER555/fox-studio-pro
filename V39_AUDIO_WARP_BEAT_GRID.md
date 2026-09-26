# FOX STUDIO PRO v39 — Audio Warp + Beat Grid

v39 adds a Native clip warp-marker mapping layer, transient/onset analysis and deterministic beat-grid generation.

## Native commands
- `audio_clip_transients`: energy-flux transient detection on an audio clip.
- `beat_grid`: generates sample-positioned beat/bar markers from BPM and offset.
- `set_audio_clip_warp`: sets piecewise-linear clip warp markers `{position,value}`.
- `audio_clip_warp`: reads clip warp markers.

Warp markers are applied in the Native clip renderer as a piecewise-linear source-position map before the existing resampling/pitch stage. This is a real time-warp mapping layer, but it is **not** a phase-vocoder/WSOLA implementation and should not be described as such.
