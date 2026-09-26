# FOX STUDIO PRO v23

v23 adds a transparent local audio-model runtime, feature inference, and native MIDI generation on top of the v21 production engine.

# FOX STUDIO PRO v21 — AI Production Engine

## Implemented
- Local production planner for mix, mastering, vocal and arrangement workflows.
- Track/project diagnostics feed deterministic native actions.
- AI action history with 32-step undo/redo snapshots.
- JSON-lines commands: `ai_plan`, `apply_ai_production_plan`, `ai_undo`, `ai_redo`, `ai_undo_state`.
- Existing native AutoTune, clips, MIDI, plugins, PDC, bounce and recovery remain available.

## Safety
Natural-language requests are mapped to a bounded set of in-app audio actions. The engine does not execute arbitrary shell commands. An approved online provider can be used for higher-level planning when configured, while native DSP execution remains local.

## Important
This release adds a deterministic local planner and execution layer. A high-end generative audio model still requires an actual model binary, runtime, and validation on the target machine; no claim of universal zero-error behavior is made until native compilation and real-time tests are completed.
