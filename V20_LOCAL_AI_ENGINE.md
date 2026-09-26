# FOX STUDIO PRO v20 — Local AI Audio Engineer Foundation

v20 moves the local AI layer from a command router toward an analysis-driven audio-engine workflow.

## Native analysis
- Per-track audio diagnostics from loaded clips.
- Peak dB, RMS dB, crest factor and stereo correlation.
- Automatic diagnostics for clipping, very-low level and phase-risk material.
- Project-wide analysis report.
- Analysis-driven gain staging action exposed through `apply_ai_plan`.

## AI command flow
The native command interpreter now supports analysis requests and uses the analysis report during mix requests. It remains a safe in-app action layer: natural-language requests are translated to explicit DAW operations rather than arbitrary OS commands.

## Local-first / online extension
Core DSP and analysis remain offline. An approved online provider can be integrated at the application layer when network access is enabled; no network is required for audio playback, recording, MIDI, analysis, mixing or rendering.

## Commands
- `track_analysis`
- `project_analysis`
- `apply_ai_plan`
- `ai_status`
- `ai_command`

## Important engineering limitation
v20 does not claim that a generic AI model can guarantee perfect mixes or masters. Audio analysis is deterministic; model inference is only as reliable as the installed model and its validation set. The native engine keeps all destructive operations behind explicit in-app actions.
