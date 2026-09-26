# FOX STUDIO v13 Native Graph

## Processing order
Project Track ID -> Native Track Node -> PDC Delay -> Native Bus -> Sends/Returns -> Sidechain -> Master -> Output.

The native graph now owns track gain/mute/solo and track-to-bus routing. Plugin latency is measured from the loaded native plugin chain and used as a graph compensation target for parallel track paths.

## Native control protocol
- `set_track_bus`, `track_bus_map`
- `set_track_gain`, `set_track_mute`, `set_track_solo`
- `set_track_automation`, `add_automation_point`, `track_automation`
- `set_pdc`, `pdc`
- `midi_clock`

Automation points use absolute sample positions. The engine exposes processed sample position for deterministic desktop transport synchronization.
