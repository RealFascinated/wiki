---
sidebar_position: 1
tags:
  - Cloudflare
  - SSL
  - Let's Encrypt
---

# Generate Let's Encrypt SSL Certificate Using Cloudflare DNS

This guide will walk you through the process of generating a Let's Encrypt SSL certificate using Cloudflare DNS validation. This method is particularly useful for servers that don't have direct HTTP access or when you want to automate certificate renewal. _This was tested on Ubuntu 24.04._

## Prerequisites

1. Ensure you have `curl` installed.
2. A domain name with Cloudflare DNS management
3. Cloudflare API credentials

## Installation Steps

### 1. Install acme.sh

First, download and install acme.sh with your email address:

```bash
curl https://get.acme.sh | sh -s email=your_cloudflare_email
```

### 2. Configure Let's Encrypt as Default CA

Set Let's Encrypt as your default certificate authority:

```bash
acme.sh --set-default-ca --server letsencrypt
```

### 3. Configure Cloudflare API Credentials

Set up your Cloudflare API credentials as environment variables:

```bash
export CF_Token="your_cloudflare_api_token"
export CF_Account_ID="your_cloudflare_account_id"
export CF_Zone_ID="your_cloudflare_zone_id"
```

### 4. Generate Certificate

Issue a new certificate for your domain:

```bash
acme.sh --issue --dns dns_cf -d example.com
```

Replace example.com with your actual domain name.

## Additional Notes

1. The certificate will be automatically renewed when it's close to expiration
2. Make sure to keep your Cloudflare API credentials secure
3. You can add multiple domains by adding additional -d parameters
