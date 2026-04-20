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
import @os

do get_home_dir() {
    mut home string = os.get_env("HOME")
    if home != nil {
        println("Home is: ", home)
    }
}
```

**Parameters:** `name` - Name of the environment variable.

**Returns:** The value as a string, or nil if not set.

---

### `set_env()`
`(name: string, value: string) -> (bool, Error)`

Sets an environment variable (process-scoped only).

```ez
import @os

do set_env_var() {
    mut ok, err = os.set_env("MY_VAR", "my_value")
}
```

**Parameters:**
- `name` - Name of the environment variable
- `value` - Value to set

**Returns:** Tuple of (success, error).

**Errors:** [E7024](/EZ-Language-Webapp/errors/E7024)

---

### `unset_env()`
`(name: string) -> (bool, Error)`

Unsets an environment variable.

```ez
import @os

do unset_env_var() {
    mut ok, err = os.unset_env("MY_VAR")
}
```

**Parameters:** `name` - Name of the environment variable to unset.

**Returns:** Tuple of (success, error).

**Errors:** [E7024](/EZ-Language-Webapp/errors/E7024)

---

### `env()`
`() -> [string:string]`

Returns all environment variables as an immutable map.

```ez
import @os, @maps

do print_all_env() {
    mut env map[string:string] = os.env()
    mut env_keys [string] = maps.keys(env)
    for_each key in env_keys {
        println(key, "=", maps.get(env, key))
    }
}
```

**Returns:** Map of environment variable names to values.

---

### `args()`
`() -> [string]`

Returns command-line arguments as an immutable array.

```ez
import @os

do get_cli_args() {
    mut args [string] = os.args()
    if len(args) > 1 {
        println("First argument: ", args[1])
    }
}
```

**Returns:** Array of strings (first element is program name/path).

---

## Process / System

### `exit()`
`([code: int]) -> void`

Exits the program with the given status code.

```ez
import @os

do exit_on_error() {
    mut errorOccurred bool = true
    if errorOccurred {
        os.exit(1)
    }
    os.exit()  // Exit with code 0
}
```

**Parameters:** `code` - Exit code (default: 0).

**Returns:** Does not return.

---

### `cwd()`
`() -> (string, Error)`

Returns the current working directory.

```ez
import @os

do get_working_dir() {
    mut dir, err = os.cwd()
    println("Current directory: ", dir)
}
```

**Returns:** Tuple of (current directory path, error).

**Errors:** [E7025](/EZ-Language-Webapp/errors/E7025)

---

### `chdir()`
`(path: string) -> (bool, Error)`

Changes the current working directory.

```ez
import @os

do change_directory() {
    mut ok, err = os.chdir("/home/user")
}
```

**Parameters:** `path` - Path to change to.

**Returns:** Tuple of (success, error).

**Errors:** [E7026](/EZ-Language-Webapp/errors/E7026)

---

### `hostname()`
`() -> (string, Error)`

Returns the hostname of the machine.

```ez
import @os

do get_hostname() {
    mut name, err = os.hostname()
    println("Running on: ", name)
}
```

**Returns:** Tuple of (hostname, error).

**Errors:** [E7027](/EZ-Language-Webapp/errors/E7027)

---

### `username()`
`() -> (string, Error)`

Returns the current user's username.

```ez
import @os

do get_username() {
    mut user, err = os.username()
    println("Logged in as: ", user)
}
```

**Returns:** Tuple of (username, error).

**Errors:** [E7028](/EZ-Language-Webapp/errors/E7028)

---

### `home_dir()`
`() -> (string, Error)`

Returns the current user's home directory.

```ez
import @os

do get_user_home() {
    mut home, err = os.home_dir()
}
```

**Returns:** Tuple of (home directory path, error).

**Errors:** [E7029](/EZ-Language-Webapp/errors/E7029)

---

### `temp_dir()`
`() -> string`

Returns the system's temporary directory.

```ez
import @os

do get_temp_dir() {
    mut tmp string = os.temp_dir()
    // "/tmp" on Unix, or temp folder on Windows
}
```

**Returns:** Path to temp directory.

---

### `pid()`
`() -> int`

Returns the process ID of the current process.

```ez
import @os

do get_process_id() {
    mut pid int = os.pid()
    println("Process ID: ", pid)
}
```

**Returns:** Process ID as an integer.

---

### `ppid()`
`() -> int`

Returns the parent process ID.

```ez
import @os

do get_parent_pid() {
    mut ppid int = os.ppid()
}
```

**Returns:** Parent process ID as an integer.

---

## Command Execution

### `exec()`
`(command: string) -> (int, Error)`

Executes a shell command and returns the exit code.

```ez
import @os

do run_command() {
    // Run a command - returns exit code
    mut exitCode, err = os.exec("echo hello")
    if err != nil {
        println("Command failed to start:", err.message)
    } otherwise {
        println("Exit code:", exitCode)  // 0
    }

    // Commands with non-zero exit codes
    mut code, _ = os.exec("exit 42")
    println("Exit code:", code)  // 42
}
```

**Parameters:** `command` - The shell command to execute.

**Returns:** Tuple of (exit code as int, error). Error is only set if the command fails to start entirely (not for non-zero exit codes).

**Errors:** [E7030](/EZ-Language-Webapp/errors/E7030) if the command fails to execute.

**Note:** Uses `/bin/sh -c` on Unix and `cmd /c` on Windows.

---

### `exec_output()`
`(command: string) -> (string, Error)`

Executes a shell command and returns its output (stdout and stderr combined).

```ez
import @os

do capture_output() {
    // Capture command output
    mut output, err = os.exec_output("echo test_output")
    if err == nil {
        println("Output:", output)  // "test_output"
    }

    // Output is trimmed of trailing whitespace
    mut output2, _ = os.exec_output("printf 'hello\\n\\n'")
    println(output2)  // "hello" (trimmed)

    // Multi-line output is preserved
    mut lines, _ = os.exec_output("printf 'line1\\nline2'")
    println(lines)  // "line1\nline2"
}
```

**Parameters:** `command` - The shell command to execute.

**Returns:** Tuple of (output as string with trailing whitespace trimmed, error).

**Errors:** [E7030](/EZ-Language-Webapp/errors/E7030) if the command fails to start, [E7031](/EZ-Language-Webapp/errors/E7031) if the command returns a non-zero exit code (output is still returned).

**Note:** Uses `/bin/sh -c` on Unix and `cmd /c` on Windows.

---

## Platform Detection

### `platform()`
`() -> string`

Returns the operating system name as a string.

```ez
import @os

do check_platform() {
    mut platform string = os.platform()
    if platform == "darwin" {
        println("Running on macOS")
    }
}
```

**Returns:** OS name ("darwin", "linux", "windows", "freebsd", etc.).

---

### `arch()`
`() -> string`

Returns the CPU architecture.

```ez
import @os

do get_architecture() {
    mut arch string = os.arch()
    println("Architecture: ", arch)
}
```

**Returns:** Architecture ("amd64", "arm64", "386", "arm", etc.).

---

### `is_windows()`
`() -> bool`

Returns true if running on Windows.

```ez
import @os

do detect_windows() {
    if os.is_windows() {
        println("Windows detected")
    }
}
```

**Returns:** true on Windows, false otherwise.

---

### `is_linux()`
`() -> bool`

Returns true if running on Linux.

```ez
import @os

do detect_linux() {
    if os.is_linux() {
        println("Linux detected")
    }
}
```

**Returns:** true on Linux, false otherwise.

---

### `is_macos()`
`() -> bool`

Returns true if running on macOS.

```ez
import @os

do detect_macos() {
    if os.is_macos() {
        println("macOS detected")
    }
}
```

**Returns:** true on macOS, false otherwise.

---

### `num_cpu()`
`() -> int`

Returns the number of CPUs available.

```ez
import @os

do get_cpu_count() {
    mut cpus int = os.num_cpu()
    println("Available CPUs: ", cpus)
}
```

**Returns:** Number of CPUs.

---

## Platform Constants

### `MAC_OS`
`int`

Constant representing macOS (value: 0).

```ez
if os.CURRENT_OS == os.MAC_OS {
    println("Running on macOS")
}
```

---

### `LINUX`
`int`

Constant representing Linux (value: 1).

```ez
if os.CURRENT_OS == os.LINUX {
    println("Running on Linux")
}
```

---

### `WINDOWS`
`int`

Constant representing Windows (value: 2).

```ez
if os.CURRENT_OS == os.WINDOWS {
    println("Running on Windows")
}
```

---

### `CURRENT_OS`
`int`

Returns the constant matching the current operating system.

```ez
if os.CURRENT_OS == os.MAC_OS {
    println("Running on macOS")
} or os.CURRENT_OS == os.LINUX {
    println("Running on Linux")
} or os.CURRENT_OS == os.WINDOWS {
    println("Running on Windows")
}
```

---

## Platform Utilities

### `line_separator()`
`() -> string`

Returns the line separator for the current platform.

```ez
import @os

do get_line_separator() {
    mut nl string = os.line_separator()
    mut content string = "line1" + nl + "line2"
}
```

**Returns:** "\\r\\n" on Windows, "\\n" on Unix-like systems.

---

### `dev_null()`
`() -> string`

Returns the null device path for the current platform.

```ez
import @os

do get_null_device() {
    mut nullPath string = os.dev_null()
}
```

**Returns:** "NUL" on Windows, "/dev/null" on Unix-like systems.

---

## Example Program

```ez
import @os

do main() {
    // System info
    println("Platform:", os.platform())
    println("Architecture:", os.arch())
    println("CPUs:", os.num_cpu())

    // User info
    mut user, _ = os.username()
    mut home, _ = os.home_dir()
    println("User:", user)
    println("Home:", home)

    // Current directory
    mut cwd, _ = os.cwd()
    println("Working directory:", cwd)

    // Environment
    mut path string = os.get_env("PATH")
    if path != nil {
        println("PATH is set")
    }

    // Command-line arguments
    mut args [string] = os.args()
    println("Program:", args[0])
    if len(args) > 1 {
        println("Arguments:", len(args) - 1)
    }

    // Platform-specific behavior
    if os.is_macos() {
        println("Running on macOS")
    } or os.is_linux() {
        println("Running on Linux")
    } or os.is_windows() {
        println("Running on Windows")
    }
}
```
