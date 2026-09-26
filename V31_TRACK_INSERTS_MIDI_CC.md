# FOX STUDIO PRO v31 — Track Inserts + MIDI CC

## Native implementation
- Four native/third-party plugin insert positions per track.
- Track insert chain is placed after AutoTune and track delay, before the assigned bus.
- Insert load/unload, parameter control, bypass, info and state inspection are exposed through JSON-lines native commands.
- Track insert state is persisted in project state when the plugin file is available.
- MIDI clips now support controller (CC) events alongside Note On/Off events.
- CC events are sample-positioned and emitted into the native graph during realtime and arrangement render.

## Commands
- `load_track_plugin`
- `unload_track_plugin`
- `track_plugin_info`
- `track_plugin_state`
- `set_track_plugin_parameter`
- `set_track_plugin_bypass`

This release is source-validated; full native compilation still requires a JUCE checkout and C++ toolchain.
