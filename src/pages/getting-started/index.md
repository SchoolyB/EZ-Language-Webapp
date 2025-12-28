---
layout: '../../layouts/GettingStartedLayout.astro'
title: 'Installation'
description: 'Install EZ on your system.'
---

# Installation

Get EZ installed on your system.

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

#### macOS / Linux

```bash
git clone https://github.com/SchoolyB/EZ.git
cd EZ
./install.sh
# Or: make install (requires make)
ez version
```

#### Windows (PowerShell)

```powershell
git clone https://github.com/SchoolyB/EZ.git
cd EZ
.\install.ps1
# Run as Administrator for system-wide installation
ez version
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

---

## Updating EZ

EZ includes a built-in update command to keep your installation current.

### Check for Updates

When you run any `ez` command, it will notify you if a new version is available:

```
Note: EZ v0.19.0 available (you have v0.18.0). Run `ez update` to upgrade.
```

### Update to Latest Version

```bash
# macOS / Linux (requires sudo for system-wide install)
sudo ez update

# Windows (run as Administrator)
ez update
```

This will:
1. Check for the latest version
2. Download the appropriate binary for your platform
3. Replace the current installation

---

<div class="mt-8 text-center">
  <p class="text-base opacity-50 mb-3">Next Step</p>
  <a href="/language.ez/docs" class="inline-flex items-center gap-3 text-2xl font-bold hover:opacity-70 transition-opacity">
    Write your first program
    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </a>
</div>

<small class="block text-center mt-8 opacity-50">Need to remove EZ? See the [uninstall guide](/language.ez/getting-started/uninstall).</small>
