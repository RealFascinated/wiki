---
sidebar_position: 3
tags:
  - Linux
  - CachyOS
  - Gaming
  - Steam
  - Proton
  - Configuration
  - Performance
---

# Configuring Steam

You will need to enable Steam Play to use Proton.

> [Go Home](/wiki/cachyos/gaming/about)

## Enabling Steam Play (Proton)

Steam Play is a feature that allows you to run Windows games on Linux using Proton.

To enable Steam Play inside of Steam, you will need to go to the "Steam" menu and select "Settings".

![Steam Settings](./img/steam-settings.png)

Then, you will need to go to the "Compatibility" tab and check "Enable Steam Play for all other titles".

![Steam Play](./img/steam-play.png)

## Launch Options

You can add launch options to Steam games to improve performance.

To do this, right-click the game in the Steam library and select "Properties".

![Steam Properties](./img/steam-game-properties.png)

Then, you will need to go to the "General" tab.

For example you can enable MangoHud by adding `mangohud %command%` to the launch options.

![Steam Launch Options](./img/steam-game-launch-args.png)
