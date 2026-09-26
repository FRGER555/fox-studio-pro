# FOX STUDIO Desktop / Native Build

This release separates the React UI from the native audio engine. The native executable is intentionally local and uses stdin/stdout JSON-lines, so no audio data or plugin control requires a cloud service.

## 1. Install prerequisites
- Node.js 20+
- CMake 3.22+
- A C++20 compiler
- JUCE 8.x checkout
- Platform audio development prerequisites

## 2. Web UI
```bash
npm install
npm run build
```

## 3. Native engine
Set `JUCE_DIR` to the JUCE checkout, then:
```bash
npm run native:configure
npm run native:build
```

## 4. Desktop shell contract
The shell should spawn `FoxStudioNative`, keep stdin/stdout pipes open, read one JSON object per line, and correlate responses with commands. Do not use a TCP/HTTP port for the native audio path.

Recommended shell responsibilities:
- spawn/restart the engine
- show a native crash/restart banner
- expose file/folder dialogs
- route MIDI device permission/selection
- forward plugin paths chosen by the user
- persist engine state with the `.foxstudio` project
