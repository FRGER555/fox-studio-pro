# FOX STUDIO PRO v17 — Native MIDI, Synth & Bounce

## Implemented
- Native MIDI input device discovery and callback capture.
- MIDI target track selection (32 tracks).
- Sample-positioned MIDI note queue with hardware input timestamps.
- Built-in per-track polyphonic oscillator instrument for immediate MIDI playback without a third-party plugin.
- Native MIDI routing through the AudioProcessorGraph.
- Audio clip playback and built-in synth can coexist on a track.
- Track bounce to 24-bit WAV.
- Bus bounce to 24-bit WAV.
- MIDI target track and plugin/audio state included in project state.

## New JSON commands
`midi_devices`, `enable_midi`, `set_midi_target`, `midi_target`, `queue_midi_note` (optional `track`), `bounce_track`, `bounce_bus`.

## Validation
Source-level structural checks were performed. A full JUCE native compilation was not run in this environment because a JUCE checkout and native dependency tree are not installed here.
