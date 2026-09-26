# FOX STUDIO PRO v18 — Native Vocal Intelligence & AutoTune

## Implemented
- Native per-track FOX Neural AutoTune processor.
- Monophonic vocal F0 detection using normalized autocorrelation.
- Automatic pitch-class/key estimation from accumulated pitch evidence.
- Real-time spectral pitch correction with adjustable retune amount, speed, humanize and range.
- 1,008 generated root/scale combinations (12 roots × 84 scale families), including Western modes and named Eastern maqam families.
- Per-track enable/settings/status and catalog JSON commands.
- AutoTune state saved/restored with project state.
- Native processing is placed directly in Track → AutoTune → PDC → Bus graph.

## Important engineering note
The detector is deterministic DSP, not a cloud AI service. It works locally/offline and does not require an API key. Musical key/maqam recognition from a single monophonic vocal is inherently probabilistic; the engine exposes the detected pitch/key evidence rather than pretending it is infallible.

## Native commands
- `autotune_enable`
- `autotune_settings`
- `autotune_status`
- `autotune_catalog`
- `vocal_analyze`

JUCE's AudioDeviceManager provides the native audio callback and MIDI input facilities, while AudioProcessorGraph provides the processing graph used by FOX STUDIO PRO.
