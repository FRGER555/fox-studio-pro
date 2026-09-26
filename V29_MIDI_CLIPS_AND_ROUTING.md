# FOX STUDIO PRO v29 — MIDI Clips & Track Routing

Implemented native MIDI clip storage/playback with sample-positioned events, looping, project persistence, undo snapshots, and track routing. MIDI events are routed to the target native track through the MIDI channel namespace reserved by track index.

New commands: `add_midi_clip`, `edit_midi_clip`, `remove_midi_clip`, `midi_clips`.

This release extends v28 Multi-Clip Timeline. Native compilation still requires a JUCE checkout and platform toolchain.
