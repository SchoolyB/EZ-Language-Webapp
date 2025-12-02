---
layout: '../../../layouts/DocsLayout.astro'
title: '@os'
description: 'Operating system interfaces, environment variables, and platform detection.'
---

# @os

The `@os` module provides operating system interfaces including environment
variables, process control, system information, and platform detection.

## Import

```ez
import @os
```

## Environment Variables

### `get_env()`
`(name: string) -> string?`

Gets an environment variable by name.

```ez
temp home string = os.get_env("HOME")
if home != nil {
    println("Home is: ", home)
}
```

**Parameters:** `name` - Name of the environment variable.

**Returns:** The value as a string, or nil if not set.

---

### `set_env()`
`(name: string, value: string) -> (bool, Error)`

Sets an environment variable (process-scoped only).

```ez
temp ok, err = os.set_env("MY_VAR", "my_value")
```

**Parameters:**
- `name` - Name of the environment variable
- `value` - Value to set

**Returns:** Tuple of (success, error).

**Errors:** [E7024](/language.ez/errors/E7024)

---

### `unset_env()`
`(name: string) -> (bool, Error)`

Unsets an environment variable.

```ez
temp ok, err = os.unset_env("MY_VAR")
```

**Parameters:** `name` - Name of the environment variable to unset.

**Returns:** Tuple of (success, error).

**Errors:** [E7024](/language.ez/errors/E7024)

---

### `env()`
`() -> map[string]string`

Returns all environment variables as an immutable map.

```ez
temp env map[string:string] = os.env()
for key, value in env {
    println(key, "=", value)
}
```

**Returns:** Map of environment variable names to values.

---

### `args()`
`() -> string[]`

Returns command-line arguments as an immutable array.

```ez
temp args [string] = os.args()
if len(args) > 1 {
    println("First argument: ", args[1])
}
```

**Returns:** Array of strings (first element is program name/path).

---

## Process / System

### `exit()`
`([code: int]) -> void`

Exits the program with the given status code.

```ez
if errorOccurred {
    os.exit(1)
}
os.exit()  // Exit with code 0
```

**Parameters:** `code` - Exit code (default: 0).

**Returns:** Does not return.

---

### `cwd()`
`() -> (string, Error)`

Returns the current working directory.

```ez
temp dir, err = os.cwd()
println("Current directory: ", dir)
```

**Returns:** Tuple of (current directory path, error).

**Errors:** [E7025](/language.ez/errors/E7025)

---

### `chdir()`
`(path: string) -> (bool, Error)`

Changes the current working directory.

```ez
temp ok, err = os.chdir("/home/user")
```

**Parameters:** `path` - Path to change to.

**Returns:** Tuple of (success, error).

**Errors:** [E7026](/language.ez/errors/E7026)

---

### `hostname()`
`() -> (string, Error)`

Returns the hostname of the machine.

```ez
temp name, err = os.hostname()
println("Running on: ", name)
```

**Returns:** Tuple of (hostname, error).

**Errors:** [E7027](/language.ez/errors/E7027)

---

### `username()`
`() -> (string, Error)`

Returns the current user's username.

```ez
temp user, err = os.username()
println("Logged in as: ", user)
```

**Returns:** Tuple of (username, error).

**Errors:** [E7028](/language.ez/errors/E7028)

---

### `home_dir()`
`() -> (string, Error)`

Returns the current user's home directory.

```ez
temp home, err = os.home_dir()
```

**Returns:** Tuple of (home directory path, error).

**Errors:** [E7029](/language.ez/errors/E7029)

---

### `temp_dir()`
`() -> string`

Returns the system's temporary directory.

```ez
temp tmp string = os.temp_dir()
// "/tmp" on Unix, or temp folder on Windows
```

**Returns:** Path to temp directory.

---

### `pid()`
`() -> int`

Returns the process ID of the current process.

```ez
temp pid int = os.pid()
println("Process ID: ", pid)
```

**Returns:** Process ID as an integer.

---

### `ppid()`
`() -> int`

Returns the parent process ID.

```ez
temp ppid int = os.ppid()
```

**Returns:** Parent process ID as an integer.

---

## Platform Detection

### `platform()`
`() -> string`

Returns the operating system name as a string.

```ez
temp platform string = os.platform()
if platform == "darwin" {
    println("Running on macOS")
}
```

**Returns:** OS name ("darwin", "linux", "windows", "freebsd", etc.).

---

### `arch()`
`() -> string`

Returns the CPU architecture.

```ez
temp arch string = os.arch()
println("Architecture: ", arch)
```

**Returns:** Architecture ("amd64", "arm64", "386", "arm", etc.).

---

### `is_windows()`
`() -> bool`

Returns true if running on Windows.

```ez
if os.is_windows() {
    println("Windows detected")
}
```

**Returns:** true on Windows, false otherwise.

---

### `is_linux()`
`() -> bool`

Returns true if running on Linux.

```ez
if os.is_linux() {
    println("Linux detected")
}
```

**Returns:** true on Linux, false otherwise.

---

### `is_macos()`
`() -> bool`

Returns true if running on macOS.

```ez
if os.is_macos() {
    println("macOS detected")
}
```

**Returns:** true on macOS, false otherwise.

---

### `num_cpu()`
`() -> int`

Returns the number of CPUs available.

```ez
temp cpus int = os.num_cpu()
println("Available CPUs: ", cpus)
```

**Returns:** Number of CPUs.

---

## Platform Constants

### `MAC_OS`
`int`

Constant representing macOS (value: 0).

```ez
if os.CURRENT_OS == os.MAC_OS {
    std.println("Running on macOS")
}
```

---

### `LINUX`
`int`

Constant representing Linux (value: 1).

```ez
if os.CURRENT_OS == os.LINUX {
    std.println("Running on Linux")
}
```

---

### `WINDOWS`
`int`

Constant representing Windows (value: 2).

```ez
if os.CURRENT_OS == os.WINDOWS {
    std.println("Running on Windows")
}
```

---

### `CURRENT_OS`
`int`

Returns the constant matching the current operating system.

```ez
if os.CURRENT_OS == os.MAC_OS {
    std.println("Running on macOS")
} or os.CURRENT_OS == os.LINUX {
    std.println("Running on Linux")
} or os.CURRENT_OS == os.WINDOWS {
    std.println("Running on Windows")
}
```

---

## Platform Utilities

### `line_separator()`
`() -> string`

Returns the line separator for the current platform.

```ez
temp nl string = os.line_separator()
temp content string = "line1" + nl + "line2"
```

**Returns:** "\\r\\n" on Windows, "\\n" on Unix-like systems.

---

### `dev_null()`
`() -> string`

Returns the null device path for the current platform.

```ez
temp nullPath string = os.dev_null()
```

**Returns:** "NUL" on Windows, "/dev/null" on Unix-like systems.

---

## Example Program

```ez
import @std
import @os

do main() {
    // System info
    std.println("Platform:", os.platform())
    std.println("Architecture:", os.arch())
    std.println("CPUs:", os.num_cpu())

    // User info
    temp user, _ = os.username()
    temp home, _ = os.home_dir()
    std.println("User:", user)
    std.println("Home:", home)

    // Current directory
    temp cwd, _ = os.cwd()
    std.println("Working directory:", cwd)

    // Environment
    temp path string = os.get_env("PATH")
    if path != nil {
        std.println("PATH is set")
    }

    // Command-line arguments
    temp args [string] = os.args()
    std.println("Program:", args[0])
    if len(args) > 1 {
        std.println("Arguments:", len(args) - 1)
    }

    // Platform-specific behavior
    if os.is_macos() {
        std.println("Running on macOS")
    } or os.is_linux() {
        std.println("Running on Linux")
    } or os.is_windows() {
        std.println("Running on Windows")
    }
}
```
