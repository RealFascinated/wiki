---
sidebar_position: 1
tags:
  - Systemd
  - Ubuntu
  - Linux
---

# How to create a Systemd service on Ubuntu 24.04

This guide provides step-by-step instructions for creating a Systemd service on Ubuntu, specifically tested on version 24.04.

## Prerequisites

- A system running Ubuntu 24.04
- A user account with sudo privileges
- An internet connection

## Get Started

- Begin by creating a new file for your service unit. Open a terminal and run the following command:

```bash
sudo nano /etc/systemd/system/my-service.service
```

This command will open a new file in the nano text editor. You can replace `my-service` with the name of your service.

- Next, you need to define the service unit. Add the following lines to the file:

```bash
[Unit]
Description=<name>

[Service]
ExecStart=<command>
WorkingDirectory=<directory>
Restart=always
User=root (use a non root user for better security)

[Install]
WantedBy=multi-user.target
```

- Now we can enable the service to run on startup. Run the following command in the terminal:

```bash
sudo systemctl enable my-service
```

- Finally, you can start the service by running the following command:

```bash
sudo systemctl start my-service
```

- You can check the status of the service by running the following command:

```bash
sudo systemctl status my-service
```

## Finished

You have successfully created a Systemd service on Ubuntu 22.04. You can now manage the service using the `systemctl` command.

## Logs

You can get logs from the service by running the following command:

```bash
sudo journalctl -u my-service
```
