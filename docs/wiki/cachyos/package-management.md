---
sidebar_position: 3
tags:
  - Linux
  - CachyOS
---

# Package Management Guide

This guide covers how to manage packages in CachyOS using both `pacman` (for official repositories) and `yay` (for AUR packages).

## Installing Packages

### From Official Repositories

To install a package from the official repositories:

```bash
sudo pacman -S package_name
```

For example, to install Firefox:
```bash
sudo pacman -S firefox
```

### From AUR

To install a package from the Arch User Repository (AUR):

```bash
yay -S package_name
```

For example, to install Visual Studio Code:
```bash
yay -S visual-studio-code-bin
```

### Install Multiple Packages

You can install multiple packages at once:

```bash
sudo pacman -S package1 package2 package3
```

## Searching for Packages

### Search Official Repositories

To search for packages in the official repositories:

```bash
pacman -Ss search_term
```

For example, to search for text editors:
```bash
pacman -Ss text editor
```

### Search AUR

To search for packages in the AUR:

```bash
yay -Ss search_term
```

### Search Installed Packages

To search among your installed packages:

```bash
pacman -Qs search_term
```

## Removing Packages

### Remove a Package

To remove a package while keeping its dependencies:

```bash
sudo pacman -R package_name
```

### Remove a Package and Its Dependencies

To remove a package and all its dependencies that are not required by other packages:

```bash
sudo pacman -Rs package_name
```

### Remove a Package and All Its Dependencies

To remove a package, its dependencies, and all packages that depend on it:

```bash
sudo pacman -Rsc package_name
```

### Remove AUR Packages

To remove an AUR package:

```bash
yay -R package_name
```

## Additional Package Management Commands

### List Installed Packages

To list all installed packages:

```bash
pacman -Q
```

### Check Package Information

To view detailed information about a package:

```bash
pacman -Qi package_name
```

### Update Package Database

To update the package database:

```bash
sudo pacman -Sy
```

## Best Practices

1. Always read package descriptions before installation
2. Keep your system updated regularly
3. Remove unused packages to maintain a clean system
4. Use `-Rs` or `-Rsc` carefully as they can remove important dependencies
5. Check the [CachyOS forums](https://forum.cachyos.org/) if you encounter any issues 