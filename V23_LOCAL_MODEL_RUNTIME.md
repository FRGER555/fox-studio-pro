# FOX STUDIO PRO v23 — Local Model Runtime

v23 introduces a real, transparent local model runtime contract inside the Native Engine.

## Bundled model

`models/fox_local_audio_model.json` describes the feature contract and output heads. The native runtime computes features from loaded audio and performs deterministic local inference without network access.

The bundled model is intentionally not marketed as a neural model. A validated external model can be selected with `FOX_AI_MODEL` without changing the JSON-lines command protocol.

## Commands

- `ai_model_status`
- `ai_model_infer`
- `ai_generate_midi`

## MIDI generation

`ai_generate_midi` creates sample-positioned chord MIDI for a selected track using a deterministic progression. It is an execution primitive for the future arrangement model, not a claim of automatic full-song composition.

## Safety

AI execution remains constrained to explicit in-app Native actions. No arbitrary shell commands are generated or executed by the model layer.
