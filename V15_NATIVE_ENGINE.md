# FOX STUDIO PRO LOCAL v15 — Native Engine

## Implemented

- Native audio callback now owns the graph processing path for the Desktop engine. Physical input is copied into the native graph, the graph is processed, and the processed buffer is copied to the physical outputs.
- Sample-positioned MIDI event queue with note-on/note-off events. Events are inserted into the native `juce::MidiBuffer` at sample-accurate block offsets.
- Native transport sample counter and MIDI processing diagnostics.
- Project-state serialization for track routing, gain/mute/solo, automation points, bus state, sends/sidechain metadata, and plugin state blobs.
- Project-state restore for the routing/mixer/automation layer.
- Offline WAV rendering through the same native graph, using block processing and the configured plugin/bus/master chain.
- New JSON-lines commands: `queue_midi_note`, `clear_midi`, `midi_queue`, `save_project_state`, `load_project_state`, `render_wav`.

## Desktop behavior

The browser build remains sandboxed. These native capabilities are intended for the Desktop shell and require JUCE plus a C++ toolchain.

## Validation

The archive and source contracts can be checked without JUCE. A full native compile still requires a local JUCE checkout and platform audio toolchain.
