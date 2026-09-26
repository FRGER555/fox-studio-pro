# FOX STUDIO PRO v27 — Production DAW Core

v27 moves the Native Engine further toward a real production workflow:

- Non-destructive audio clip region editing (start/source offset/length/loop/gain).
- Sample-accurate gain automation is applied inside the native track processor.
- Arrangement offline rendering can render the loaded native arrangement without requiring an input WAV.
- Project-level undo/redo snapshots (64 states) are separate from AI undo/redo.
- Track freeze now bounces the isolated track to a real 24-bit WAV and swaps the track clip to the rendered file while retaining the pre-freeze audio in memory for the current session.
- Freeze/unfreeze preserves the original clip region metadata during the current session.

Build note: a full JUCE/C++ build still requires a local JUCE checkout and compiler toolchain.
