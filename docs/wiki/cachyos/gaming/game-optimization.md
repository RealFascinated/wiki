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

# Game Optimization

This section will cover some common game optimization tips and tricks. Not all of these will be applicable to all games, but they are a good starting point.

> [Go Home](/wiki/cachyos-gaming/about)

## GameMode (Recommended)

GameMode is a daemon/lib combo for Linux that allows games to request a set of optimizations be temporarily applied to the host OS.

1. Install GameMode:
```bash
yay -S gamemode lib32-gamemode
```

2. Launch games with GameMode:
```
gamemoderun %command%
```


## Laptop Optimizations

If you laptop has an integrated GPU and a dedicated GPU, and it is using the integrated GPU, you can use the following command to force the game to use the dedicated GPU:

```
DRI_PRIME=1 %command%
```