---
sidebar_position: 2
tags:
  - Linux
  - CachyOS
  - Gaming
  - Drivers
  - NVIDIA
  - AMD
  - Intel
  - Vulkan
  - Performance
---

import NavBanner from '@site/src/components/NavBanner';

# Installing Drivers

<NavBanner href="/wiki/cachyos/gaming/about" text="Return to Gaming Guide" />

Insalling additional drivers will ensure that you have the best performance and compatibility with your games. See [here](https://github.com/lutris/docs/blob/master/InstallingDrivers.md) for more information.

### Nvidia

```bash
yay -S nvidia-dkms nvidia-utils lib32-nvidia-utils nvidia-settings vulkan-icd-loader lib32-vulkan-icd-loader
```

### AMD

```bash
yay -S lib32-mesa vulkan-radeon lib32-vulkan-radeon vulkan-icd-loader lib32-vulkan-icd-loader
```

### Intel

```bash
yay -S lib32-mesa vulkan-intel lib32-vulkan-intel vulkan-icd-loader lib32-vulkan-icd-loader
```

*Note: for Intel integrated graphics users: Only Skylake and newer Intel CPUs (processors) offer full Vulkan support. Broadwell, Haswell and Ivy Bridge only offer partial support, which will very likely not work with a lot of games properly. Sandy Bridge and older lack any Vulkan support whatsoever.*