---
sidebar_position: 1
tags:
  - Docker
  - Ubuntu
---

# Docker installation on Ubuntu 24.04+

This guide provides step-by-step instructions for installing Docker Community Edition on Ubuntu. Docker is a powerful tool for containerization, allowing you to separate different services into individual containers and offering better resource efficiency compared to virtual machines.

## Prerequisites

- A system running Ubuntu 24.04
- A user account with sudo privileges
- An internet connection

## Get Started

- Begin by updating your apt repository to ensure you have the latest package information and dependencies. Open a terminal and run the following command:

```bash
sudo apt update
```

This command will refresh the package lists and update any outdated packages on your system.

- Next, you need to ensure that the curl utility is installed. If you already have curl installed, you can skip this step. Otherwise, execute the following command in the terminal to install it:

```bash
sudo apt install curl
```

This command will download and install curl from the Ubuntu repositories.

- Now, you can proceed with the installation of Docker. Docker provides a convenient installation script that you can run to automatically set up the necessary components. Execute the following command in the terminal:

```bash
curl -sSL https://get.docker.com/ | CHANNEL=stable bash
```

This command downloads the Docker installation script and pipes it to the bash shell, which executes the script. The CHANNEL=stable option ensures that the stable version of Docker is installed.

- Once the installation process is complete, you can verify that Docker is working correctly. Run the following command in the terminal:

```bash
sudo docker --version
```

This command displays the version of Docker installed on your system. You should see an output similar to the following:

```bash
➜  ~ sudo docker --version
Docker version 23.0.6, build ef23cbc
```

Or simply run

```bash
sudo apt update && sudo apt upgrade -y && apt install curl && curl -sSL https://get.docker.com/ | CHANNEL=stable bash
```

## Finished

Congratulations! You have now installed Docker Community Edition on your Ubuntu machine. Docker is ready to be used, allowing you to leverage the power of containerization for your projects and applications.