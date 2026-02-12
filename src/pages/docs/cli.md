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
