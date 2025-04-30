---
sidebar_position: 2
---

import CronMaker from '@site/src/components/cron-maker';

# Cronjob Examples & Builder

This guide provides examples on how to use cronjob to automate tasks. _This was tested on Ubuntu 24.04._

<CronMaker />

## Get Started

- Begin by opening a terminal and running the following command:

```bash
crontab -e
```

If it's the first time you're using cronjob, you will be asked to select an editor. You can choose `nano` or `vim`. If you're not familiar with either, choose `nano` as the guide is based on this and it's the easiest. This command will open the crontab file in the nano text editor.

- Next, you need to define the cronjob. Add the following lines to the file:

```bash
* * * * * <command>
```

- Finally, you can save the file by pressing `Ctrl + X` and then `Y`.

## Syntax

```bash
* <- minute (0-59)
  * <- hour (0-23)
    * <- day of month (1-31)
      * <- month (1-12)
        * <- day of week (0-6) (Sunday=0)
          <command> <- the command to execute
```

## Examples

### Run a command every minute

```bash
* * * * * <command>
```

### Run a command every 5 minutes

```bash
*/5 * * * * <command>
```

### Run a command every hour

```bash
0 * * * * <command>
```

### Run a command every day at midnight

```bash
0 0 * * * <command>
```