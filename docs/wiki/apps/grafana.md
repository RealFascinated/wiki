---
sidebar_position: 2
tags:
  - Docker
  - Monitoring
---

# Grafana

<img src="/logos/grafana.png" alt="Grafana" width="150" />

Grafana is an open-source analytics and monitoring solution. View their [GitHub](https://github.com/grafana/grafana) for more information.

Features:

- Beautiful dashboards and visualizations
- Support for multiple data sources
- Alerting and notifications
- User authentication and authorization

## Installation

1. Create a `docker-compose.yml` file

```bash
touch docker-compose.yml
```

2. Add the following content to the `docker-compose.yml` file

```yaml
services:
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - 3001:3000
    volumes:
      - grafana-data:/var/lib/grafana
    restart: unless-stopped

volumes:
  grafana-data:
```

3. Start the container

```bash
docker-compose up -d
```

## Configuration

Grafana can be configured using environment variables and configuration files. Here are some common configuration options:

- `GF_PATHS_CONFIG`: Path to the Grafana configuration file
- `GF_SECURITY_ADMIN_USER`: Admin username (default: "admin")
- `GF_SECURITY_ADMIN_PASSWORD`: Admin password (default: "admin")
- `GF_SERVER_HTTP_PORT`: HTTP port (default: 3000)
- `GF_INSTALL_PLUGINS`: Comma-separated list of plugins to install
- `GF_AUTH_ANONYMOUS_ENABLED`: Enable anonymous access (true/false)
- `GF_AUTH_ANONYMOUS_ORG_ROLE`: Role for anonymous users (Viewer/Editor/Admin)

You can find the full list of configuration options in the [Grafana Configuration Documentation](https://grafana.com/docs/grafana/latest/administration/configuration/).

## Access Grafana

Access your Grafana instance through your web browser:

```
http://<your-server-ip>:3001
```

Default login credentials:

- Username: admin
- Password: admin

Don't know the ip address of your host? Check out the [Finding Host IP Address](/wiki/linux/ip-addresses) guide.
