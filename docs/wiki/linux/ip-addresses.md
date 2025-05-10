---
sidebar_position: 2
tags:
  - Linux
  - IP Addresses
---

# Finding Host IP Address

This is a quick guide to finding the ip address of your host.

1. Open a terminal
2. Run the following command:

```bash
ip a
```

This will output a list of all the network interfaces on your host, something like this:

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever
2: enp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether d4:5d:64:55:0a:6c brd ff:ff:ff:ff:ff:ff
    altname enxd45d64550a6c
--> inet 10.0.0.87/24 brd 10.0.0.255 scope global dynamic noprefixroute enp4s0
       valid_lft 47383sec preferred_lft 47383sec
    inet6 fe80::c22d:c57:5e7:165c/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

3. Look for the `inet` address of the interface that you are using. The interface name is usually starts with eth, enp or wlan, etc.

```
--> inet 10.0.0.87/24 brd 10.0.0.255 scope global dynamic noprefixroute enp4s0
```

In this case, the ip address of the host is `10.0.0.87`.
