# FOX STUDIO PRO v19 — Local AI Studio

## Implemented
- Safe native AI command router (`ai_command`) for mix, mastering, AutoTune, plugins, save/recovery and status.
- Native plugin catalog with EQ, compressor, limiter, saturator, stereo field and vocal gate utility processors.
- AI status endpoint distinguishes local capability from online availability.
- Optional ONNX Runtime build switch (`FOX_ENABLE_ONNX`) so a real local model can be deployed without making ONNX a mandatory dependency. ONNX Runtime exposes C/C++ inference APIs and supports CPU/GPU execution providers.
- Existing FOX Neural AutoTune remains native/offline and supports the 1,008-scale catalog.

## Important architecture rule
The AI agent only executes whitelisted in-app operations. It never executes arbitrary shell commands from natural-language input. Internet-connected AI can be used as a planner through the app server, but returned actions must be validated before being applied.

## Optional local model
Set `FOX_AI_MODEL` to an approved ONNX model path and configure CMake with `-DFOX_ENABLE_ONNX=ON -DONNXRUNTIME_DIR=<path>`. The repository intentionally does not ship a model binary.

JUCE's AudioProcessorGraph is used as the native processing graph, and AudioDeviceManager handles audio/MIDI I/O.
