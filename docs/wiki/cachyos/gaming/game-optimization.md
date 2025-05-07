---
sidebar_position: 6
tags:
  - Linux
  - CachyOS
  - Gaming
  - Steam
  - Proton
  - Optimization
  - Performance
  - GameMode
---

import NavBanner from '@site/src/components/NavBanner';

# Game Optimization

<NavBanner href="/wiki/cachyos/gaming/about" text="Return to Gaming Guide" />

This section will cover some common game optimization tips and tricks. Not all of these will be applicable to all games, but they are a good starting point.

## CachyOS game-performance (Recommended)

CachyOS provides a wrapper script [game-performance](https://github.com/CachyOS/CachyOS-Settings/blob/master/usr/bin/game-performance) which uses `power-profiles-daemon` to temporarily switch the current power profile to `performance`. The performance profile increases the system power levels and changes the CPU governor to `performance`.

When this script is used to run a game, the system will be set to use the `performance` profile as long as the game is running. The previously used power profile will be restored once the game is closed.

To use it, start the game with the following command:
```
game-performance %command%
```

Unsure how to do this? Check out the [Configuring Steam](/wiki/cachyos/gaming/configuring-steam#launch-options) page for more information.

## GameMode

GameMode is a daemon/lib combo for Linux that allows games to request a set of optimizations be temporarily applied to the host OS.

Note: You should only use this if `ananicy-cpp` service is disabled, see [here](/wiki/cachyos/gaming/ananicy-cpp) to disable it.

1. Install GameMode:
```bash
yay -S gamemode lib32-gamemode
```

1. Launch games with GameMode:
```
gamemoderun %command%
```

## Laptop Optimizations

If you laptop has an integrated GPU and a dedicated GPU, and it is using the integrated GPU, you can use the following command to force the game to use the dedicated GPU:

```
DRI_PRIME=1 %command%
```
