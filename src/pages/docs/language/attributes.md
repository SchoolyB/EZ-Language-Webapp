---
layout: '../../../layouts/DocsLayout.astro'
title: 'Attributes'
description: 'Attributes that modify declarations and behavior in EZ.'
---

# Attributes

Attributes are prefixed with `#` and modify the behavior of declarations. They provide checktime directives that affect how code is interpreted or checked.

## #enum

Specifies the underlying type for an enum. By default, enums use `int` with auto-incrementing values starting at 0.

```ez
#enum(int)    // Integer enum (default)
#enum(float)  // Float enum (requires explicit values)
#enum(string) // String enum (requires explicit values)
```

### Integer Enums

```ez
// Explicit integer type (same as default)
#enum(int)
const Priority enum {
    LOW       // 0
    MEDIUM    // 1
    HIGH      // 2
}
```

### Float Enums

Float enums require explicit values for all members:

```ez
#enum(float)
const Grade enum {
    A = 4.0
    B = 3.0
    C = 2.0
    D = 1.0
    F = 0.0
}
```

### String Enums

String enums require explicit values for all members:

```ez
#enum(string)
const Color enum {
    RED = "red"
    GREEN = "green"
    BLUE = "blue"
}
```

See [Enums](/EZ-Language-Webapp/docs/language/enums) for complete documentation.

---

## #flags

Creates a bitwise flag enum with automatic power-of-2 values. Use this when enum values need to be combined with bitwise operations.

```ez
#flags
const Permissions enum {
    READ      // 1
    WRITE     // 2
    EXECUTE   // 4
    DELETE    // 8
}

do main() {
    // Combine flags with bitwise OR
    temp userPerms int = Permissions.READ || Permissions.WRITE

    // Check individual flags with bitwise AND
    if (userPerms && Permissions.READ) != 0 {
        std.println("User can read")
    }
}
```

### Automatic Value Assignment

`#flags` automatically assigns power-of-2 values:

```ez
#flags
const FileMode enum {
    NONE       // 0 (special case: first flag is 0)
    READ       // 1
    WRITE      // 2
    APPEND     // 4
    CREATE     // 8
    TRUNCATE   // 16
}
```

See [Enums - Flag Enums](/EZ-Language-Webapp/docs/language/enums#flag-enums) for complete documentation.

---

## #strict

Enforces exhaustive case coverage in `when` statements for enums. When applied, all enum values must be handled explicitly and no `default` case is allowed.

```ez
const Status enum {
    PENDING
    ACTIVE
    DONE
}

temp status = Status.ACTIVE

#strict
when status {
    is Status.PENDING { std.println("waiting") }
    is Status.ACTIVE { std.println("working") }
    is Status.DONE { std.println("finished") }
}
// No default needed - typechecker ensures all cases are covered
```

### Why Use #strict?

- **Checktime safety** — The typechecker will error if you forget to handle an enum value
- **Future-proofing** — If new enum values are added, the typechecker will flag all `#strict` when statements that need updating
- **Self-documenting** — Makes it clear that all cases are intentionally handled

### Rules

- Can only be used with `when` statements that match on enum values
- All enum values must have a corresponding `is` case
- No `default` case is allowed (defeats the purpose of exhaustive matching)

See [Control Flow - Strict Enum Matching](/EZ-Language-Webapp/docs/language/control-flow#strict-enum-matching) for complete documentation.

---

## #doc

Marks a function, struct, or enum for documentation generation. Used by the [`ez doc`](/EZ-Language-Webapp/docs/cli) command to generate markdown documentation.

```ez
#doc("Returns a greeting message for the given name.")
do greet(name string) -> string {
    return "Hello, " + name + "!"
}

#doc("Application configuration settings.")
const Config struct {
    name string
    version string
    debug bool
}

#doc("Available log levels.")
const LogLevel enum {
    DEBUG
    INFO
    WARN
    ERROR
}
```

The description string is optional — `#doc` without arguments still marks the item for inclusion in generated docs.

Run `ez doc ./...` to generate a `DOCS.md` file from all `#doc`-annotated items. See [CLI Commands](/EZ-Language-Webapp/docs/cli) for details.

---

## #suppress

Suppresses specific warnings. Can be applied to individual functions or at file level.

### Function-Level Suppression

Apply `#suppress` directly before a function to suppress warnings from that function:

```ez
#suppress(W2001)
do myFunction() {
    // Code that would normally trigger W2001 (unreachable code)
    return 42
    temp x = 10  // Unreachable, but warning suppressed
}
```

### File-Level Suppression

Place `#suppress(ALL)` at the top of a file to suppress all warnings from code within that file:

```ez
#suppress(ALL)

// All warnings in this file are suppressed

do function1() {
    // ...
}

do function2() {
    // ...
}
```

This is useful when you have many functions that would otherwise need individual `#suppress` attributes.

### Valid Warning Codes

| Code | Description |
|------|-------------|
| `W1001` | Lexer warning |
| `W1004` | Lexer warning |
| `W2001` | Unreachable code |
| `W2002` | Parse warning |
| `W2003` | Missing return |
| `W2004` | Parse warning |
| `W2005` | Parse warning |
| `W2006` | Parse warning |
| `W3001` | Type warning |
| `W3002` | Type warning |
| `W3003` | Array size mismatch |
| `ALL` | Suppress all warnings (file-level only) |

### When to Use

- **Intentional patterns** — When you deliberately write code that triggers warnings
- **Generated code** — When working with code generators that produce valid but warning-triggering code
- **Migration** — Temporarily suppress warnings while refactoring

**Caution:** Don't use `#suppress` to hide legitimate issues. Warnings exist to help you write better code.

---

## Quick Reference

| Attribute | Target | Description |
|-----------|--------|-------------|
| `#doc(desc)` | Function, struct, enum | Mark for documentation generation |
| `#enum(type)` | Enum declaration | Specify underlying type (int, float, string) |
| `#flags` | Enum declaration | Create bitwise flag enum with power-of-2 values |
| `#strict` | When statement | Enforce exhaustive enum case coverage |
| `#suppress(code)` | Function | Suppress specific warning |
| `#suppress(ALL)` | File (top) | Suppress all warnings in file |
