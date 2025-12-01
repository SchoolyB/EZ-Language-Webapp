---
layout: '../../../layouts/DocsLayout.astro'
title: 'Installation'
description: 'Install EZ on your system.'
---

# Getting Started

Get EZ installed on your system.

## Installation

### 1. Binary Download (Recommended)

No dependencies required. [Download the latest release](https://github.com/SchoolyB/EZ/releases/latest) for your platform.

#### macOS

```bash
cd ~/Downloads
tar xzf ez-darwin-arm64.tar.gz   # or ez-darwin-amd64.tar.gz for Intel
sudo mv ez /usr/local/bin/
```

#### Linux

```bash
cd ~/Downloads
tar xzf ez-linux-amd64.tar.gz   # or ez-linux-arm64.tar.gz for ARM
sudo mv ez /usr/local/bin/
```

#### Windows (PowerShell)

```powershell
cd ~\Downloads
Expand-Archive ez-windows-amd64.zip -DestinationPath C:\ez
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\ez", "User")
# Restart terminal
```

### 2. Clone & Install ([Requires Go 1.23.1+](https://go.dev/dl/))

```bash
git clone https://github.com/SchoolyB/EZ.git
cd EZ
make install  # may require sudo permissions
```

### 3. Build from Source ([Requires Go 1.23.1+](https://go.dev/dl/))

```bash
git clone https://github.com/SchoolyB/EZ.git
cd EZ
make build
./ez version
```

### Verify Installation

Check that EZ is installed correctly:

```bash
ez version
```

### Uninstall

Need to remove EZ or start fresh? See the [uninstall guide](/docs/getting-started/uninstall).
