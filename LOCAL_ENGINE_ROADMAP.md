# FOX STUDIO PRO 6 — Local Engine

This release moves the project toward a real desktop DAW while keeping the browser build useful.

## New local production features
- Master render with selectable 16/24-bit WAV, sample rate, and tail.
- Non-destructive per-track stem rendering.
- Batch stem export to a ZIP.
- MIDI quantize by beat grid and strength.
- Track duplication with deep-copy semantics for clips, notes and plugins.
- Existing autosave/recovery, MIDI access, DSP inserts, buses and offline rendering remain local.

## Native engine direction
The `native/` JUCE host remains the path for actual VST3/AU/LV2/LADSPA plugins and hardware audio I/O. The web renderer never claims to load binary native plugins itself.

## Validation
Run `npm install`, then `npm run lint` and `npm run build` on a machine with the project dependencies available. Native builds additionally require a local JUCE checkout and a C++ toolchain.

## Implemented in v8
- Non-destructive multi-take recording metadata.
- Active-take comping selection and deletion.
- Per-track input monitoring route.
- Take-aware clip muting and project serialization.

## Next native milestone
- Native JUCE input capture into WAV/FLAC buffers.
- Punch-in/out and loop recording at the native transport clock.
- Sample-accurate latency compensation and hardware monitoring modes.

### v9 completed
- [x] Punch-in / punch-out transport capture
- [x] Loop-recording take rotation
- [x] Non-destructive take selection/comping metadata
- [x] Native JUCE WAV recorder with background writer
- [x] Native recording JSON-lines protocol

### Next native milestones
- [ ] Sample-accurate punch boundaries in the native timeline
- [ ] Native transport clock shared with the UI
- [ ] Automatic input/output latency measurement and compensation
- [ ] Native MIDI input timestamping and event scheduling
- [ ] Crash-safe recording journal and recovery

### v40 completed
- transient-driven audio tempo estimation
- beat grid and tempo map generation
- sample-accurate beat snap
- adjustable audio clip quantization with project undo
