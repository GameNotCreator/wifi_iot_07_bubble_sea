# Private configuration

Committed credentials were removed from the current source on 2026-10-28. The old values may remain in Git history or other copies; removing them from the latest files does not revoke them.

The Wi-Fi SSID, Wi-Fi password and ThingSpeak write key are intentionally empty in both `main.ts` and `main.blocks`. The firmware will not connect or publish until you provide your own values in a private local MakeCode project. Keep both views consistent and do not push the local values. Already flashed devices are unchanged.

Rotate the exposed network/service credentials as appropriate. A clean source file does not invalidate an already distributed firmware image.
