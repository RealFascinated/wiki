---
sidebar_position: 2
tags:
  - Linux
  - CachyOS
---

# System Update Guide

Keeping your CachyOS system up to date is important for security, stability, and new features. This guide will show you how to update your system using `pacman` and `yay`.

## Update System Packages

To update all system packages, including those from the official repositories:

```bash
sudo pacman -Syu
```

This command:
- `-S`: Synchronize packages
- `-y`: Refresh package database
- `-u`: Update all packages

## Update AUR Packages

To update packages from the Arch User Repository (AUR) using yay:

```bash
yay -Syu
```

## Update System and AUR Packages Together

To update both system packages and AUR packages in one command:

```bash
yay -Syu --aur
```

## Clean Package Cache

After updating, you might want to clean the package cache to free up disk space:

```bash
sudo pacman -Scc
```

## Best Practices

1. Always read the update messages before proceeding
2. Keep a backup of important data before major updates
3. Update regularly to maintain system security
4. If you encounter any issues, check the [CachyOS forums](https://forum.cachyos.org/) for solutions
