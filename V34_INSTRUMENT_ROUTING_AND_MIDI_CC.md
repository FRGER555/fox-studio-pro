# FOX STUDIO PRO v34 — Instrument Routing + MIDI CC Editor Core

v34 adds native instrument-plugin routing to the existing per-track insert chain and completes MIDI CC event parsing/editing for MIDI clips.

## Native changes
- MIDI is explicitly routed from each track processor into track insert plugins that accept MIDI.
- Audio routing is bus-aware and supports plugins with no audio input (instrument/synth generators).
- Existing audio FX continue through the same insert chain.
- MIDI clip parsing now preserves `isCC`, `controller`, and `ccValue` fields.
- `edit_midi_cc` edits a CC event with controller/value/channel validation.
- `midi_cc_automation` returns sample-positioned CC points for an editor.
- Project undo is used for CC edits.

## JSON commands
- `edit_midi_cc`
- `midi_cc_automation`

This is native source implementation. A compiled production executable still requires a JUCE checkout and a C++ toolchain.
