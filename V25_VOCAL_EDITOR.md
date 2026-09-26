# FOX STUDIO PRO v25 — Vocal Editor

## Native analysis
- Frame-level F0 / MIDI note / cents deviation / confidence.
- Voiced ratio and breath-like frame ratio.
- Vibrato cents RMS estimate.
- Scale-aware target note mapping across the 1008-entry catalog.

## Native correction
`apply_pitch_correction` renders a same-length corrected clip with overlap-add pitch shifting. `preserveFormant=true` enables a spectral-envelope matching pass after pitch correction. This is an engineering approximation, not a claim of transparent studio-grade formant preservation for every voice.

## Commands
- `vocal_editor_analysis`
- `apply_pitch_correction`
- `pitch_contour`
- `maqam_catalog`

## Desktop requirement
The Native C++ engine requires JUCE and a C++ toolchain. Browser mode exposes the typed bridge contract but cannot access local audio devices or files directly.
