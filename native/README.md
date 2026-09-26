# FOX STUDIO Native Engine

This project includes a JUCE-based local native engine for audio I/O, MIDI, rendering, plugin hosting, and project persistence.

## Local build

```bash
export JUCE_DIR=/absolute/path/to/JUCE
npm run native:configure
npm run native:build
```

The native engine communicates over JSON lines on stdin/stdout and is intended to be supervised by the local app server rather than exposed as a public network service.

## Safety

The native process is intentionally constrained to in-app operations and does not execute arbitrary shell commands.
