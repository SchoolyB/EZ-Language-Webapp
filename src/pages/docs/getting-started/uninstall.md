---
layout: '../../../layouts/DocsLayout.astro'
title: 'Uninstall'
description: 'Remove EZ from your system.'
---

# Uninstall

If something went wrong during installation or you need to remove EZ from your system, follow the instructions for your platform.

## macOS / Linux

```bash
sudo rm /usr/local/bin/ez
```

## Windows (PowerShell)

```powershell
Remove-Item -Recurse C:\ez
# Remove from PATH via System Settings > Environment Variables
```

## Clone & Install Method

If you installed using `make install`:

```bash
cd EZ
make uninstall  # may require sudo permissions
```
