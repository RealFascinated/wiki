---
sidebar_position: 1
tags:
  - Docker
  - Minecraft
---

# Minecraft Server

<img src="/logos/minecraft.png" alt="Minecraft" width="150" />

Minecraft Server is a Docker image that provides an easy way to run a Minecraft server. View their [GitHub](https://github.com/itzg/docker-minecraft-server) for more information.

Features:

- Supports multiple Minecraft versions (Java Edition)
- Automatic server updates
- Easy configuration through environment variables

## Installation

1. Create a `docker-compose.yml` file

```bash
touch docker-compose.yml
```

2. Add the following content to the `docker-compose.yml` file

```yaml
services:
  minecraft:
    image: itzg/minecraft-server
    container_name: minecraft
    ports:
      - 25565:25565
    environment:
      - EULA=TRUE
      - TYPE=PAPER
      - MEMORY=2048m
      - USE_AIKAR_FLAGS=true
      - MOTD=Welcome to Minecraft Server!
      - VIEW_DISTANCE=10
      - MAX_PLAYERS=20
    volumes:
      - minecraft:/data
    restart: unless-stopped

volumes:
  minecraft:
```

3. Start the container

```bash
docker-compose up -d
```

## Configuration

The server can be configured using environment variables. Here are some common ones:

- `EULA`: Must be set to TRUE to accept the Minecraft EULA
- `TYPE`: Server type (VANILLA, FORGE, FABRIC, PAPER, etc.)
- `VERSION`: Minecraft version
- `MEMORY`: Memory allocation (default: "2048m")
- `USE_AIKAR_FLAGS`: Enable Aikar's optimized JVM flags (default: "true")
- `DIFFICULTY`: Game difficulty (peaceful, easy, normal, hard)
- `MODE`: Game mode (survival, creative, adventure, spectator)
- `MOTD`: Message of the day
- `PVP`: Enable/disable PvP (true/false)
- `VIEW_DISTANCE`: Server view distance (default: 10)
- `MAX_PLAYERS`: Maximum number of players allowed (default: 20)

You can find the full list of environment variables in the [Environment Variables Reference](https://docker-minecraft-server.readthedocs.io/en/latest/variables/).

## Access Minecraft Server

Connect to your Minecraft server using:

```
<your-server-ip>:25565
```

Don't know the ip address of your host? Check out the [Finding Host IP Address](/wiki/linux/ip-addresses) guide.
