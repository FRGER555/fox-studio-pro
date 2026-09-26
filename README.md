# FOX STUDIO PRO v42

Local-first DAW core with native plugin browser snapshots, per-track plugin parameter discovery, and a deterministic offline render queue.

## Local Desktop Architecture

`React UI -> localhost server.ts -> JUCE Native Engine -> audio device / plugins / render files`

This project is intentionally structured as a local desktop-first product:

- Browser UI remains lightweight and local-first
- Native engine handles audio I/O, plugins, MIDI, rendering
- Server process supervises the native executable without exposing a public network port
- Cloud AI remains optional and never required for core audio workflows

## Run locally

```bash
npm install
npm run dev
```

For native desktop build:

```bash
export JUCE_DIR=/absolute/path/to/JUCE
npm run native:configure
npm run native:build
```

## Build notes

- The browser build can run without JUCE.
- Full native compilation needs a local JUCE checkout and a C++ toolchain.
- Third-party plugin binaries are not bundled with this repository.

## Included docs

- `DESKTOP_BUILD.md`
- `LOCAL_ENGINE_ROADMAP.md`
- `V11_NATIVE_AUDIO.md`
- `V12_NATIVE_MIXER.md`
- `V13_NATIVE_GRAPH.md`
- `V15_NATIVE_ENGINE.md`
- `V16_NATIVE_ENGINE.md`
- `V17_NATIVE_ENGINE.md`
- `V18_NATIVE_AI_AUTOTUNE.md`
- `V19_LOCAL_AI_STUDIO.md`
- `V20_LOCAL_AI_ENGINE.md`
- `V21_AI_PRODUCTION_ENGINE.md`
- `V22_LOCAL_AUDIO_INTELLIGENCE.md`
- `V23_LOCAL_MODEL_RUNTIME.md`
- `V24_NEURAL_PITCH_MAQAM.md`
- `V25_VOCAL_EDITOR.md`
- `V26_NATIVE_PRODUCTION_CORE.md`
- `V27_PRODUCTION_DAW_CORE.md`
- `V28_MULTI_CLIP_TIMELINE.md`
- `V29_MIDI_CLIPS_AND_ROUTING.md`
- `V30_MIDI_PIANO_ROLL_AND_GROOVE.md`
- `V31_TRACK_INSERTS_MIDI_CC.md`
- `V32_AUDIO_CROSSFADE_WARP_AND_MIDI_CC.md`
- `V33_CLIP_ENVELOPES.md`
- `V34_INSTRUMENT_ROUTING_AND_MIDI_CC.md`
- `V35_PLUGIN_BROWSER_PRESETS_AND_CC_EDITOR.md`
- `V36_PLUGIN_BROWSER_RENDER_QUEUE.md`
- `V37_NATIVE_RENDER_WORKER.md`
- `V38_RENDER_DIAGNOSTICS_AND_NATIVE_PROTOCOL.md`
- `V39_AUDIO_WARP_BEAT_GRID.md`
- `V40_AUTO_TEMPO_BEAT_QUANTIZE.md`
- `V41_UNIFIED_LOCAL_BUNDLE.md`
- `V42_LOCAL_BUILD_REAL_RUNTIME.md`

