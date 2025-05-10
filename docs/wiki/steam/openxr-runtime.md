---
sidebar_position: 1
tags:
  - Steam
  - OpenXR
  - Runtime
---

# SteamVR OpenXR Runtime

Sometimes clicking the "Select OpenXR Runtime" button in SteamVR does not work, and just prompts you to select an application (in KDE Plasma, this is the "Select Application" dialog).

## The Fix

If this happens, you can manually select the OpenXR runtime by running the following command:

```bash
$HOME/.local/share/Steam/steamapps/common/SteamVR/bin/linux64/../vrmonitor.sh vrmonitor://openxr/makedefault
```

This will make the OpenXR runtime the default runtime for SteamVR.
