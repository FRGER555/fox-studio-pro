# FOX STUDIO PRO v22 — Local Audio Intelligence

## Implemented
- Advanced vocal analysis: RMS, peak, crest factor, zero-crossing estimate, spectral centroid, 8-band energy profile.
- Project intelligence report across loaded clips.
- AI execution-plan API for vocal, mix, master, and arrangement workflows.
- Native master-chain execution: FOX Pro EQ -> FOX Pro Compressor -> FOX Analog Saturator -> FOX True Peak Limiter.
- AI undo snapshot retained before execution.
- New JSON-lines commands: `vocal_analyze_advanced`, `ai_full_analysis`, `ai_execution_plan`.

## Model honesty
The default v22 intelligence path is deterministic local feature analysis and rules. It is not described as neural inference unless `FOX_AI_MODEL` is configured. A future ONNX model can consume the exported feature contract without changing the audio graph contract.

## Native safety
AI requests are translated into a finite set of native-safe actions. The engine does not execute arbitrary shell commands from prompts.
