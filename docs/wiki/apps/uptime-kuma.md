---
sidebar_position: 1
tags:
  - Docker
  - Uptime Kuma
---

# Uptime Kuma

<img src="/logos/uptime-kuma.png" alt="Uptime Kuma" width="150" />

Uptime Kuma is a simple uptime monitoring tool that allows you to monitor the uptime and status of your websites or docker containers. View their [GitHub](https://github.com/louislam/uptime-kuma) for more information.

Features: 
- Monitoring uptime for HTTP(s) / TCP / Ping / DNS Record.
- Alerting with Email, Slack, Discord, etc.
- Beautiful dashboard and reports.

## Installation

### Docker Run

```bash
docker run -d --restart=unless-stopped -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
```

### Docker Compose

1. Create a `docker-compose.yml` file

```bash
touch docker-compose.yml
```

2. Add the following content to the `docker-compose.yml` file

```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    container_name: uptime-kuma
    volumes:
      - /docker/uptimekuma:/app/data
    ports:
      - 3001:3001
```

3. Start the container

```bash
docker-compose up -d
```

## Access Uptime Kuma

```bash
http://<your-server-ip>:3001
```