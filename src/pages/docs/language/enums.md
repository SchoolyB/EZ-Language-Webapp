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

Use `#strict` to ensure all enum cases are handled:

```ez
#strict
when status {
    is Status.PENDING { println("Waiting...") }
    is Status.ACTIVE { println("In progress...") }
    is Status.DONE { println("Completed!") }
}
// No default needed - typechecker ensures all cases are covered
```

### In Arrays

```ez
const Day enum {
    SUNDAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
}

mut workdays [int] = {
    Day.MONDAY,
    Day.TUESDAY,
    Day.WEDNESDAY,
    Day.THURSDAY,
    Day.FRIDAY
}

mut today = Day.WEDNESDAY
if today in workdays {
    println("It's a workday")
}
```

### In Function Parameters

```ez
const LogLevel enum {
    DEBUG
    INFO
    WARNING
    ERROR
}

do log(level int, message string) {
    when level {
        is LogLevel.ERROR { println("[ERROR]", message) }
        is LogLevel.WARNING { println("[WARN]", message) }
        is LogLevel.INFO { println("[INFO]", message) }
        default { println("[DEBUG]", message) }
    }
}

do main() {
    log(LogLevel.INFO, "Application started")
    log(LogLevel.ERROR, "Something went wrong")
}
```

## Converting Enums

Use `int()` to explicitly convert enum values:

```ez
const Priority enum {
    LOW
    MEDIUM
    HIGH
    CRITICAL
}

do main() {
    mut p = Priority.HIGH
    mut value = int(Priority.HIGH)

    println("Priority.HIGH =", value)  // 2

    // Use in arithmetic
    mut adjusted = int(Priority.MEDIUM) + 5
    println("Adjusted:", adjusted)  // 6
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

## Example Program

```ez
const TaskStatus enum {
    TODO = "todo"
    IN_PROGRESS = "in-progress"
    REVIEW = "review"
    DONE = "done"
}

const Priority enum {
    LOW
    MEDIUM
    HIGH
    URGENT
}

const Task struct {
    title string
    status string
    priority int
}

do priorityLabel(p int) -> string {
    when p {
        is Priority.URGENT { return "URGENT" }
        is Priority.HIGH { return "High" }
        is Priority.MEDIUM { return "Medium" }
        default { return "Low" }
    }
}

do main() {
    mut tasks [Task] = {
        Task{title: "Fix login bug", status: TaskStatus.IN_PROGRESS, priority: Priority.URGENT},
        Task{title: "Update docs", status: TaskStatus.TODO, priority: Priority.LOW},
        Task{title: "Add tests", status: TaskStatus.REVIEW, priority: Priority.HIGH}
    }

    println("Task Board:")
    println("===========")

    for_each task in tasks {
        mut label = priorityLabel(task.priority)
        println("[${task.status}] ${task.title} (${label})")
    }
}
```

## See Also
- [Control Flow](/EZ-Language-Webapp/docs/language/control-flow) — `when/is` pattern matching with enums
- [Attributes](/EZ-Language-Webapp/docs/language/attributes) — `#flags`, `#strict` attributes
- [Types](/EZ-Language-Webapp/docs/language/types) — all available types
- [Structs](/EZ-Language-Webapp/docs/language/structs) — another way to define custom types
