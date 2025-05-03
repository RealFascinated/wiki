---
sidebar_position: 1
tags:
  - Ubuntu
  - Linux
---

# How to install Glances on Ubuntu / Docker

## Install Glances on Ubuntu

### Prerequisites

- Ubuntu 24.04
- Python 3.10+ (Installation instructions [here](/wiki/ubuntu/install-python3))
- (Optional) Docker (Installation instructions [here](/wiki/docker/docker-installation-ubuntu-24.04))

### Install Glances

```bash
sudo apt install glances
```

## Glances on Docker

### Run in foreground

```bash
docker run -p 61208-61209:61208-61209 -e GLANCES_OPT="-w" -v /var/run/docker.sock:/var/run/docker.sock:ro nicolargo/glances:latest
```

### Run in background

```bash
docker run --restart="always" -d -p 61208-61209:61208-61209 -e GLANCES_OPT="-w" -v /var/run/docker.sock:/var/run/docker.sock:ro nicolargo/glances:latest
```

## Access Glances

```bash
http://<your-server-ip>:61208
```

## CLI Usage

### Open Glances

```bash
glances
```

### Open Glances (Faster refresh rate)

```bash
glances -t 0.5
```
