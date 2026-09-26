# FOX STUDIO PRO v37 — Native Render Worker

## Implemented
- Background render worker for the native render queue.
- Progress reporting from 0 to 1.
- Single-job or all-queued worker mode.
- Cancellation request and cancelled job status.
- Worker state exposed through JSON-lines commands.

## Native commands
- `render_queue_start`
- `render_queue_cancel`
- `render_queue_worker`

The worker is joined during engine shutdown so the process does not exit while a render thread is active. Full realtime safety still requires building and exercising the native engine with JUCE on the target machine.
