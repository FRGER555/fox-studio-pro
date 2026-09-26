# FOX STUDIO PRO v30

## Native MIDI editor core
- Sample-positioned MIDI clips remain the source of truth.
- `transform_midi_clip` adds native quantize strength, alternating-step swing, and velocity scaling/offset.
- Transformation is non-destructive at the project level because it is covered by the project Undo snapshot system.
- Events are re-sorted after transformation for deterministic playback/rendering.

## Scope
The existing Piano Roll UI can call this Native command through the typed bridge. The browser shell remains a UI/editor; the desktop native engine remains responsible for sample-accurate playback and offline rendering.

## MIDI transform parameters
- `gridSamples`: quantize grid in sample units.
- `amount`: 0 = keep original timing, 1 = full quantize.
- `swing`: -0.5..0.5, applied to alternating grid steps.
- `velocityScale`: 0..2.
- `velocityOffset`: -1..1.

The operation is executed by the native engine and participates in project Undo/Redo.
