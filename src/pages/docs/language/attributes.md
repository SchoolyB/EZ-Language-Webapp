---
layout: '../../../layouts/DocsLayout.astro'
title: 'Attributes'
description: 'Attributes that modify declarations and behavior in EZ.'
---

# Attributes

Attributes are prefixed with `#` and modify the behavior of declarations. They provide checktime directives that affect how code is compiled or checked.

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
    mut userPerms = Permissions.READ || Permissions.WRITE

    // Check individual flags with bitwise AND
    if (userPerms && Permissions.READ) != 0 {
        println("User can read")
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

mut status = Status.ACTIVE

#strict
when status {
    is Status.PENDING { println("waiting") }
    is Status.ACTIVE { println("working") }
    is Status.DONE { println("finished") }
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
    mut x = 10  // Unreachable, but warning suppressed
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

## #json

Marks a struct for JSON serialization and deserialization. It enables `json.parse()` to decode JSON strings into the struct type and `json.stringify()` to encode struct values as JSON.

```ez
import @json

#json
const User struct {
    name string
    age int
    active bool
}

do main() {
    mut u User = json.parse("{\"name\": \"Alice\", \"age\": 25, \"active\": true}")
    println(u.name)            // Alice
    println(json.stringify(u)) // {"name":"Alice","age":25,"active":true}
}
```

### Rules

- Can only be applied to struct declarations
- Field names in the JSON must match the struct field names exactly
- Without `#json`, the struct has no serialization machinery and `json.parse()` into it will fail

---

## Quick Reference

| Attribute | Target | Description |
|-----------|--------|-------------|
| `#doc(desc)` | Function, struct, enum | Mark for documentation generation |
| `#json` | Struct declaration | Enable JSON serialization/deserialization |
| `#flags` | Enum declaration | Create bitwise flag enum with power-of-2 values |
| `#strict` | When statement | Enforce exhaustive enum case coverage |
| `#suppress(code)` | Function | Suppress specific warning |
| `#suppress(ALL)` | File (top) | Suppress all warnings in file |

## See Also
- [Enums](/EZ-Language-Webapp/docs/language/enums) — `#flags` usage with enums
- [Control Flow](/EZ-Language-Webapp/docs/language/control-flow) — `#strict` with `when/is` matching
- [Functions](/EZ-Language-Webapp/docs/language/functions) — `#doc` for documenting functions
