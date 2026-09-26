# FOX STUDIO PRO LOCAL v12

## Mixer / Sends / Sidechain foundation

v12 adds two complementary layers:

1. **Browser audio graph:** real parallel aux sends/returns using Web Audio nodes. Track sends create a GainNode, feed an aux return, and the return is routed to the master input. Send level is converted from dB to linear gain and can be enabled/disabled.
2. **Native desktop contract:** 16 native bus states with gain, mute, solo, send matrix and sidechain-source state. The JSON-lines shell exposes `set_bus_gain`, `set_bus_mute`, `set_bus_solo`, `set_send`, `set_sidechain`, and `mixer_state`.

The native state is deliberately not described as audio-connected to arbitrary project tracks yet. The next desktop binding step must map project track IDs to native graph nodes before claiming sample-accurate bus routing.
