# FOX STUDIO PRO v36 — Plugin Browser + Render Queue

## Native additions
- Plugin browser catalog snapshot from the native AudioPluginFormatManager cache.
- Per-track plugin browser snapshot with instrument/MIDI capabilities and parameter metadata.
- Deterministic offline render queue with add/remove/clear/status/run-next/run-all commands.
- Render jobs use the existing Native arrangement renderer, so they include current clips, MIDI events, automation, buses and inserts.

## Protocol
- `plugin_browser_catalog`
- `track_plugin_browser`
- `render_queue_add`
- `render_queue_remove`
- `render_queue_clear`
- `render_queue`
- `render_queue_run`
- `render_queue_run_all`

The queue is intentionally deterministic and serial: only one native render job runs at a time. This avoids concurrent graph access while preserving a reusable queue for the desktop shell/UI.
