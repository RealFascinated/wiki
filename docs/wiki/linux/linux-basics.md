---
sidebar_position: 1
tags:
  - Linux
---

# Linux Basics

This guide provides a brief introduction to Linux, including basic commands and concepts.

## Navigating the filesystem

- Change a directory: `cd <directory>`
- List files in a directory: `ls`
- List files in a directory (including hidden files): `ls -a`
- Getting the current directory: `pwd`
- Going back a directory: `cd ..`

## Managing Files and Directories

- Create a new directory: `mkdir <directory>`
- Create a new file: `touch <file>`
- Copy a file: `cp <file> <new-file>`
- Remove a file: `rm <file>`
- Remove a directory: `rm -r <directory>`

## File Permissions

- Change file permissions: `chmod <permissions> <file>`
- Change file ownership: `chown <user> <file>`
- Change file ownership (recursively): `chown -R <user> <directory>`
- View file permissions: `ls -l <file>`

## Text Processing

There are alternatives to nano, but it is the easiest to use.

- Edit a file: `nano <file>`
- View a file: `cat <file>`
- View a file (with line numbers): `cat -n <file>`
- Get the beginning of a file: `head <file>`
- Get the end of a file: `tail <file>`

## File Compression and Archiving

- Create a tar archive: `tar -cvf <archive.tar> <file>`
- Extract a tar archive: `tar -xvf <archive.tar>`
- Create a zip archive: `zip <archive.zip> <file>`
- Extract a zip archive: `unzip <archive.zip>`

## Package Management (Ubuntu)

- Update package lists: `sudo apt update`
- Install a package: `sudo apt install <package>`
- Purge a package: `sudo apt purge <package>`
- Remove a package: `sudo apt remove <package>`
- Search for a package: `apt search <package>`
- Upgrade packages: `sudo apt upgrade`

## Networking

- Get all interface ips: `ip a`
- Ping a host: `ping <host>`
- Get the public IP: `curl ifconfig.me`
- Get the public IP (alternative): `curl ipinfo.io/ip`

## Firewall (UFW)

Make sure to allow SSH before enabling the firewall, otherwise you will be locked out of your server. `sudo ufw allow ssh`

- Enable the firewall: `sudo ufw enable`
- Disable the firewall: `sudo ufw disable`
- List all rules: `sudo ufw status`
- List all rules (showing numbers): `sudo ufw status numbered`
- Delete a rule: `sudo ufw delete <rule>`
- Allow a port: `sudo ufw allow <port>`
- Deny a port: `sudo ufw deny <port>`
- Allow a service: `sudo ufw allow <service>`
- Deny a service: `sudo ufw deny <service>`

## Service Management (Systemd)

- Start a service: `sudo systemctl start <service>`
- Stop a service: `sudo systemctl stop <service>`
- Check the status of a service: `sudo systemctl status <service>`
- Restart a service: `sudo systemctl restart <service>`
- Enable a service (start on boot): `sudo systemctl enable <service>`
- Disable a service (stop on boot): `sudo systemctl disable <service>`
- Reload a service: `sudo systemctl reload <service>`
