---
layout: '../../layouts/DocsLayout.astro'
title: 'CLI Commands'
description: 'EZ command-line interface reference.'
---

# CLI Commands

The `ez` command-line tool runs EZ programs and provides development utilities.

## Running Programs

```bash
ez file.ez          # Run a single file
ez ./src            # Run a directory (finds main() automatically)
```

Running `ez` with no arguments (or `ez help`) displays usage information and a list of all available commands.

### Global Flags

These flags work with `ez <file>` and are inherited by most subcommands:

| Flag | Short | Description |
|------|-------|-------------|
| `--quiet` | `-q` | Suppress warnings (`all` or comma-separated codes like `W1001,W1002`) |
| `--no-color` | | Disable colored output |

```bash
ez main.ez -q all           # Suppress all warnings
ez main.ez -q W1001,W1002   # Suppress specific warnings
ez main.ez --no-color       # No ANSI colors
```

---

## `ez build`

Compiles an EZ source file to a native distributable binary.

```bash
ez build main.ez              # Build (output name matches source)
ez build main.ez -o myapp     # Build with custom output name
ez build main.ez --emit-c     # Emit generated C source only
```

### Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--output` | `-o` | Output binary name |
| `--emit-c` | | Emit generated C source only (don't compile) |
| `--time` | | Show compilation timing |
| `--quiet` | `-q` | Suppress warnings (`all` or comma-separated codes) |
| `--no-color` | | Disable colored output |

---

## `ez check`

Type-checks a file or project without compiling or running it.

```bash
ez check main.ez     # Check a single file
ez check ./src       # Check a directory
```

Reports any lexer, parser, or typechecker errors without executing the program. Useful for catching issues before running.

### Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--quiet` | `-q` | Suppress warnings (`all` or comma-separated codes) |

---

## `ez fmt`

Formats `.ez` source files in place. Normalizes indentation, trailing whitespace, end-of-file newlines, and blank-line runs.

```bash
ez fmt .              # Format .ez files in current directory (no recursion)
ez fmt ./...          # Format recursively from current directory
ez fmt file.ez        # Format a single file
ez fmt a.ez b.ez      # Format multiple files
ez fmt --check ./...  # Check formatting without modifying (CI gate)
```

### Flags

| Flag | Description |
|------|-------------|
| `--check` | Exit non-zero if any file would change; don't modify files. Useful as a CI gate. |

---

## `ez watch`

Watches files for changes and automatically re-runs the program.

```bash
ez watch main.ez     # Watch a single file
ez watch ./src       # Watch a directory
```

**Single file mode** watches the file and all its imports (including transitive dependencies). When any watched file changes, the program re-runs automatically.

**Directory mode** watches all `.ez` files in the directory recursively. It finds the file containing `main()` and uses that as the entry point.

Each run prints a timestamp and a separator between executions:

```
[14:32:05] Running main.ez...
Hello, World!
────────────────────────────
[14:32:08] Running main.ez...
Hello, EZ!
────────────────────────────
```

Press `Ctrl+C` to stop watching.

### Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--quiet` | `-q` | Suppress warnings (`all` or comma-separated codes) |
| `--no-color` | | Disable colored output |

---

## `ez pz`

Scaffolds a new EZ project with a template.

```bash
ez pz                          # Interactive mode
ez pz myproject                # Create with basic template
ez pz myproject -t cli         # Create with cli template
ez pz myproject -t lib -c      # Create library with comments
ez pz myproject -t multi -f    # Multi-module project (force overwrite)
```

### Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--template` | `-t` | Template type (default: `basic`) |
| `--comments` | `-c` | Include helpful syntax comments in generated code |
| `--force` | `-f` | Overwrite existing directory |
| `--server-type` | `-s` | Server/client variant: `minimal` or `normal` (default) |

### Templates

**`basic`** — Single file hello world. Good for learning and small scripts.

```
myproject/
  main.ez
```

**`cli`** — CLI application with argument handling. Two files with command dispatch.

```
myproject/
  main.ez
  commands.ez
```

**`lib`** — Reusable library module with internal helpers.

```
myproject/
  myproject.ez
  internal/
    helpers.ez
```

**`multi`** — Multi-module project with separated concerns.

```
myproject/
  main.ez
  src/
    app.ez
    config.ez
  internal/
    utils.ez
```

**`server`** — HTTP server with routing. Use `-s minimal` for a single-file server or the default for a multi-file project with separate route definitions.

```
myproject/
  main.ez
  routes.ez
```

**`client`** — HTTP client application. Use `-s minimal` for a single-file client or the default for a multi-file project with a separate API module.

```
myproject/
  main.ez
  api.ez
```

---

## `ez doc`

Generates markdown documentation from `#doc` attributes in your source code.

```bash
ez doc .              # Current directory (non-recursive)
ez doc ./...          # Current directory (recursive)
ez doc ./src          # Specific directory
ez doc ./src/...      # Specific directory (recursive)
ez doc file.ez        # Single file
ez doc a.ez b.ez      # Multiple files
```

Scans `.ez` files for `#doc` attributes on functions, structs, and enums, then generates a `DOCS.md` file.

### Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--output` | `-o` | Path to write generated markdown (default: `DOCS.md`) |

### Adding Documentation

Use the `#doc` attribute above declarations:

```ez
#doc("greet returns a greeting message for the given name.")
do greet(name string) -> string {
    return "Hello, " + name + "!"
}

#doc("Config holds application settings.")
const Config struct {
    name string
    version string
    debug bool
}

#doc("LogLevel defines available log levels.")
const LogLevel enum {
    DEBUG
    INFO
    WARN
    ERROR
}
```

### Output

Running `ez doc ./...` on the above generates a `DOCS.md` with sections for Functions, Structs, and Enums, sorted alphabetically within each section.

---

## `ez man`

Shows documentation for a stdlib module, function, or struct type.

```bash
ez man                # Show help for the man command
ez man strings        # Info about the @strings module
ez man to_upper       # Info about a stdlib function
ez man HttpRequest    # Info about a stdlib struct type
```

---

## `ez report`

Prints system information useful for bug reports.

```bash
ez report
```

---

## `ez version`

Displays the current EZ version.

```bash
ez version
```

---

## `ez update`

Checks for updates and upgrades EZ to the latest version.

```bash
ez update              # Latest stable release
ez update --pre        # Latest pre-release (alpha/beta/rc)
ez update --confirm    # Skip confirmation prompt
```

Without flags, installs the latest stable release and prints a note if a newer pre-release is available.

### Flags

| Flag | Description |
|------|-------------|
| `--confirm` | Skip the confirmation prompt |
| `--pre` | Install the latest pre-release (alpha/beta/rc) instead of latest stable |

---

## `ez install`

Installs a specific EZ version by exact semver, replacing the current install. Downgrades and pre-release versions are supported.

```bash
ez install 2.5.0            # Install exact version
ez install 3.0.0-beta.2     # Install a pre-release
```
