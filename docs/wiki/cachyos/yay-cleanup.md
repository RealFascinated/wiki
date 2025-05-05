---
sidebar_position: 1
tags:
  - Linux
  - CachyOS
---

# Yay Cleanup Guide

[Yay (Yet Another Yogurt)](https://github.com/Jguer/yay) is an AUR helper that allows you to install and manage packages from the Arch User Repository (AUR). This guide will show you how to clean up your yay cache and maintain your system efficiently.

## Clean Package Cache

To clean up unused packages in the yay cache directory:

```bash
yay -Scc
```

This command:
- `-S`: Synchronize packages
- `cc`: Clean the package cache

## Additional Cleanup Options

### Remove Unused Dependencies

To remove unused dependencies:

```bash
yay -Yc
```

### Remove Build Files

To remove build files from the AUR packages:

```bash
yay -Sc
```

## Best Practices

1. Regularly clean your package cache to free up disk space
2. Keep track of your installed AUR packages
3. Remove unused dependencies to maintain a clean system
4. If you encounter any issues, check the [CachyOS forums](https://forum.cachyos.org/) for solutions

```bash
yay -Scc
```

