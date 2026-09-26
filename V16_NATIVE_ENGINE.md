# FOX STUDIO PRO v16 — Native Audio Clips + Recovery

## Implemented
- Native per-track WAV/AIFF/FLAC clip loading into memory for deterministic real-time playback.
- Sample-positioned clip start, source offset, length, loop and gain.
- Track clip playback is driven by the native transport sample position inside the audio callback.
- Tracks without a clip no longer duplicate the physical input 32 times; the legacy input/plugin path remains separate.
- Plugin slots now serialize PluginDescription metadata and restore plugin instances before applying saved state blobs.
- Project state now serializes track clip metadata and plugin descriptors.
- Atomic recovery snapshot write (`.tmp` then move) and explicit recovery/clean-shutdown commands.
- Native JSON-lines commands: `load_audio_clip`, `clear_audio_clip`, `audio_clip`, `write_recovery`, `recover`, `mark_clean`.

## Important limitation
The native clip loader intentionally preloads audio into RAM. This avoids disk I/O in the real-time callback, but very large sessions will require the next streaming-cache stage. Full native MIDI hardware input/instrument-track playback and per-track freeze/bounce remain subsequent stages.

## Build
Requires a local JUCE checkout and C++20 toolchain. The repository does not claim a native compile unless those dependencies are present.
