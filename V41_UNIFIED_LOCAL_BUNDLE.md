# V41 — Unified FOX STUDIO PRO Local Bundle

V41 consolidates the project into one source tree instead of treating each version as a separate feature package.

## Included source layers
- React/TypeScript DAW UI.
- Local Express supervisor.
- JUCE C++20 native audio engine.
- JSON-lines native protocol.
- Browser-safe localhost transport to the native process.
- Native plugin host and FOX first-party plugin catalog.
- Audio clips, warp, transients, beat grid, tempo detection and quantize.
- MIDI clips, piano-roll operations, CC automation and hardware MIDI.
- Vocal analysis, AutoTune state and pitch-correction DSP.
- Local audio intelligence, AI plans and MIDI/arrangement generation.
- Offline rendering, render queue worker, cancellation and diagnostics.
- Freeze, recovery snapshots, undo/redo and project validation.
- Build/doctor/validation scripts.

## Third-party extensions
FOX STUDIO supports VST3/AU/LV2/LADSPA through JUCE. Commercial or third-party binaries are intentionally not redistributed. The extension catalog records the host capability and bundled FOX-native processors.

## Local transport
Set `FOX_NATIVE_EXECUTABLE` to the compiled native executable and start the local server. The UI can then use `LocalNativeHttpBridge` to issue native commands through localhost. The audio engine itself does not open a public network port.
