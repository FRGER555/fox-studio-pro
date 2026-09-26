# FOX STUDIO PRO v38 — Render Diagnostics & Native Protocol Hardening

## Native render worker
- Render cancellation is checked at audio-block boundaries.
- Cancelled jobs delete their incomplete WAV output instead of reporting a completed file.
- Worker exposes both overall queue progress and current-job progress.
- Added `render_queue_diagnostics` for UI telemetry.

## Protocol
- Native JSON-lines command added for render diagnostics.
- Existing v37 commands remain backward compatible.

## Validation
This release is source-validated in the current environment. A full native build still requires JUCE and a C++ toolchain.
