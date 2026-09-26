# FOX STUDIO PRO v24 — Neural-ready Pitch, Maqam & Arrangement Layer

## Implemented
- Sample-positioned vocal pitch contour analysis using normalized autocorrelation.
- Per-frame MIDI pitch, cents deviation, confidence and voiced ratio.
- Major/minor key candidates from pitch-class evidence.
- Local maqam-family candidate scoring.
- Explicit microtonal maqam catalog with cent targets for Rast, Bayati, Hijaz, Nahawand, Kurd, Saba, Ajam, Sikah, Huzam, Nikriz, Suznak and Hijazkar.
- New JSON-lines commands: `pitch_contour`, `maqam_catalog`, `ai_generate_arrangement`.
- AI arrangement generator creates sample-positioned harmony, bass and lead MIDI parts on separate target tracks.
- TypeScript Native Bridge exposes the new commands.

## Important technical boundary
The pitch/maqam analyzer is a deterministic DSP analyzer, not a claim of perfect transcription. Maqam identification can be ambiguous from a single vocal phrase, especially when ornamentation and microtonal inflections are sparse. The returned confidence/evidence is therefore exposed to the UI instead of silently forcing a musical decision.

The project already contains an optional ONNX Runtime CMake path. A real neural model can be supplied through `FOX_AI_MODEL`/the configured runtime, but no large proprietary neural checkpoint is fabricated or bundled as if it were trained.
