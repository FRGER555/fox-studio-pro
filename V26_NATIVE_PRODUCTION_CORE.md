# FOX STUDIO PRO v26 — Native Production Core

This release hardens the native workflow rather than claiming untested features.

## Added
- Reversible track freeze/unfreeze state.
- Per-track and project loudness diagnostics with explicit approximate-meter labeling.
- Project validation command.
- Correct sample-positioned MIDI track routing.
- AutoTune state persistence in project JSON.
- Native command protocol updates.

## Validation
The package can be statically checked without JUCE. A full native build requires JUCE and a C++ toolchain on the target machine.
