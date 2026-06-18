---
layout: '../../../layouts/DocsLayout.astro'
title: 'Enums'
description: 'Enumerated types in EZ.'
---

# Enums

Enums (enumerations) define a type with a fixed set of named values. EZ supports integer and string enums.

## Basic Integer Enums

By default, enums are integers starting at 0:

```ez
const Status enum {
    PENDING    // 0
    ACTIVE     // 1
    INACTIVE   // 2
    COMPLETED  // 3
}

do main() {
    mut status = Status.ACTIVE
    println(status)  // 1

    if status == Status.ACTIVE {
        println("Task is active")
    }
}
```

> **Note:** Enum variants must be on separate lines. Inline declarations like `const Color enum { RED; GREEN; BLUE }` are not allowed.

## String Enums

String enums use explicit string values assigned directly to members:

```ez
const Color enum {
    RED = "red"
    GREEN = "green"
    BLUE = "blue"
    YELLOW = "yellow"
}

const Direction enum {
    NORTH = "N"
    SOUTH = "S"
    EAST = "E"
    WEST = "W"
}

do main() {
    mut color = Color.RED
    println("Selected color:", color)  // "red"

    mut dir = Direction.NORTH
    if dir == Direction.NORTH {
        println("Going north!")
    }
}
```

## Flag Enums

Use `#flags` for bitwise flag enums with power-of-2 values:

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
    println("User permissions:", userPerms)  // 3

    // Check individual flags with bitwise AND
    if (userPerms && Permissions.READ) != 0 {
        println("User can read")
    }

    if (userPerms && Permissions.DELETE) == 0 {
        println("User cannot delete")
    }
}
```

### Flag Enum Values

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

This is equivalent to manually assigning:

```ez
const FileMode enum {
    NONE = 0
    READ = 1
    WRITE = 2
    APPEND = 4
    CREATE = 8
    TRUNCATE = 16
}
```

## Manual Value Assignment

You can assign explicit values to any enum member:

```ez
const HttpStatus enum {
    OK = 200
    CREATED = 201
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    NOT_FOUND = 404
    SERVER_ERROR = 500
}

do main() {
    mut status = HttpStatus.NOT_FOUND
    println("Status code:", status)  // 404
}
```

For integer enums without explicit values, auto-increment continues from the last assigned value:

```ez
const ErrorCode enum {
    SUCCESS = 0
    WARNING = 100
    ERROR           // 101
    CRITICAL        // 102
}
```

## Implicit Enum Selector (`.VARIANT`)

When the expected enum type is known from context, you can use the shorthand `.VARIANT` instead of the full `EnumName.VARIANT`. The compiler resolves the enum type automatically.

```ez
const Direction enum {
    NORTH
    EAST
    SOUTH
    WEST
}

// Variable declaration with type annotation
mut dir Direction = .NORTH

// Assignment
dir = .SOUTH

// Function arguments
do move(d Direction) -> int { return 0 }
move(.EAST)

// When/is branches
when dir {
    is .NORTH { println("north") }
    is .SOUTH { println("south") }
    default { println("other") }
}

// Comparisons
if dir == .WEST { println("west") }

// Return statements
do get_dir() -> Direction { return .NORTH }

// Struct literal fields
const Config struct { dir Direction }
mut c = Config{ dir: .EAST }

// Array literals
mut dirs [Direction] = {.NORTH, .SOUTH}
```

The full `EnumName.VARIANT` form is always valid and is required when no type context is available.

---

## Tagged Enums (Variants with Data)

Enum variants can carry associated data (payloads), making the enum a tagged union. A variant's payload is declared with positional types in parentheses:

```ez
const Shape enum {
    Circle(float)
    Rect(float, float)
    Point
}
```

An enum becomes a tagged union if ANY variant has a payload. Variants without payloads (like `Point` above) are plain tag-only variants.

**Rules:**
- Payloads and explicit values (`= 5`) are mutually exclusive per variant
- String enums and `#flags` enums cannot have payloads

### Construction

Tagged enum values are constructed by calling the variant with arguments:

```ez
mut s Shape = Shape.Circle(3.14)
mut r Shape = Shape.Rect(10.0, 20.0)
mut p Shape = Shape.Point
```

The implicit selector syntax also works:

```ez
mut s Shape = .Circle(3.14)
```

### Destructuring with `when/is`

Use pattern destructuring in `when/is` to extract payload values:

```ez
when shape {
    is Circle(radius) {
        println("Circle with radius ${radius}")
    }
    is Rect(w, h) {
        println("Rectangle ${w} x ${h}")
    }
    is Point {
        println("Just a point")
    }
}
```

Implicit selector patterns also work:

```ez
when shape {
    is .Circle(r) { println("radius: ${r}") }
    is .Rect(w, h) { println("${w}x${h}") }
    is .Point { println("point") }
}
```

The number of bindings in a pattern must match the variant's payload count. `#strict` exhaustiveness checking works with tagged enums.

---

## Enum Value Restrictions

Enums are **not** integers. Even though integer enums are backed by numeric values, you cannot:
- Compare an enum variable with an integer (`dir == 0`)
- Assign an integer to an enum variable (`dir = 2`)
- Perform arithmetic on enum values

Enums can only be compared with values of the same enum type using `==` and `!=`.

---

## Using Enums

### In Variables

```ez
const Status enum {
    PENDING
    ACTIVE
    DONE
}

mut currentStatus = Status.PENDING
currentStatus = Status.ACTIVE

// Or with implicit selector
mut currentStatus Status = .PENDING
currentStatus = .ACTIVE
```

### In Conditionals

```ez
mut status = Status.ACTIVE

if status == Status.PENDING {
    println("Waiting...")
} or status == Status.ACTIVE {
    println("In progress...")
} or status == Status.DONE {
    println("Completed!")
}
```

### With when/is Statements

```ez
mut status = Status.ACTIVE

when status {
    is Status.PENDING { println("Waiting...") }
    is Status.ACTIVE { println("In progress...") }
    is Status.DONE { println("Completed!") }
    default { println("Unknown status") }
}
```

Use `#strict` to ensure all enum cases are handled. The compiler warns if a `when` on enum values has no `default` and no `#strict`:

```ez
#strict
when status {
    is Status.PENDING { println("Waiting...") }
    is Status.ACTIVE { println("In progress...") }
    is Status.DONE { println("Completed!") }
}
// No default needed - compiler ensures all cases are covered
```

### In Function Parameters

```ez
const LogLevel enum {
    DEBUG
    INFO
    WARNING
    ERROR
}

do log(level LogLevel, message string) {
    when level {
        is .ERROR { println("[ERROR]", message) }
        is .WARNING { println("[WARN]", message) }
        is .INFO { println("[INFO]", message) }
        default { println("[DEBUG]", message) }
    }
}

do main() {
    log(.INFO, "Application started")
    log(.ERROR, "Something went wrong")
}
```

## Valid Enum Types

Enums support two underlying types:

- **int** (default) — auto-incrementing from 0, or explicit integer values
- **string** — requires explicit string values for all members

Arrays, structs, and other complex types cannot be used as enum types.

## Attribute Summary

| Attribute | Description | Example |
|-----------|-------------|---------|
| (none) | Integer enum, values 0, 1, 2... | `const Status enum { ... }` |
| `#flags` | Bitwise flags with power-of-2 values | `#flags const Perms enum { READ ... }` |

## See Also
- [Control Flow](/EZ-Language-Webapp/docs/language/control-flow) — `when/is` pattern matching with enums
- [Attributes](/EZ-Language-Webapp/docs/language/attributes) — `#flags`, `#strict` attributes
- [Types](/EZ-Language-Webapp/docs/language/types) — all available types
- [Structs](/EZ-Language-Webapp/docs/language/structs) — another way to define custom types
