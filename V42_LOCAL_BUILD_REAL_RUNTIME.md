# FOX STUDIO PRO v42 — Local Build / Real Runtime

v42 consolidates the local runtime path without removing the existing audio, MIDI, plugin, vocal, AI, warp, beat, render, recovery and project systems.

## Real local path

`React UI -> localhost server.ts -> JUCE Native Engine -> audio device / plugins / render files`

The browser bridge is now backed by `LocalNativeRuntime` and the app attempts to start the native engine when the splash screen completes. If the native executable is not present, the app reports the native runtime as unavailable instead of fabricating native responses; WebAudio remains available as a fallback.

## Build requirements

The source package intentionally does not redistribute third-party commercial plugin binaries or duplicate external SDK repositories. A JUCE checkout and Node dependencies must be installed on the target machine. This is a build prerequisite, not a cloud runtime dependency.

## Demo content

The bundled demo generator is preserved, but production startup no longer injects demo audio automatically. Set `localStorage.foxstudio_demo_mode = '1'` to opt into the demo project.

## Cloud AI

Cloud AI remains optional. Core local audio and native DSP do not depend on a Gemini API key. `GEMINI_API_KEY` is only needed for optional cloud-assisted endpoints.
