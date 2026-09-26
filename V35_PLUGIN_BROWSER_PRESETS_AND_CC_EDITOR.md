# FOX STUDIO PRO v35 — Plugin Browser, Presets, Instrument Routing & MIDI CC Editor

v35 extends the v34 native production core with reusable plugin management and MIDI automation tooling.

## Native additions
- Track insert parameter introspection: names, labels, normalized values, text values and automation capability.
- Instrument routing inspection for each track: MIDI/audio capabilities and insert chain order.
- FOX Studio plugin preset files (`.foxpreset`) containing plugin identity and serialized JUCE state.
- Save/load track insert presets without replacing the project file.
- MIDI CC editing and automation extraction are exposed as typed Native commands.
- MIDI CC transform supports scale, offset and optional smoothing over a selected controller lane.

## Safety / persistence
- Presets are ordinary local JSON documents written only to the requested path.
- Plugin state remains owned by the Native engine; the UI does not execute arbitrary code.
- Project Undo captures preset state application and MIDI CC transforms.

## Verification
- Source-level structural validation is performed in the build packaging step.
- Full Native compilation still requires a local JUCE checkout and C++ toolchain.
