---
layout: '../../../layouts/DocsLayout.astro'
title: 'Enums'
description: 'Enumerated types in EZ.'
---

# Enums

Enums (enumerations) define a type with a fixed set of named values. EZ supports integer, float, and string enums.

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
    temp status int = Status.ACTIVE
    std.println(status)  // 1

    if status == Status.ACTIVE {
        std.println("Task is active")
    }
}
```

## Enum Type Attributes

Use `#enum(type)` to specify the enum's underlying type.

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

do main() {
    temp grade float = Grade.A
    std.println("GPA:", grade)  // 4.0
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
    YELLOW = "yellow"
}

#enum(string)
const Direction enum {
    NORTH = "N"
    SOUTH = "S"
    EAST = "E"
    WEST = "W"
}

do main() {
    temp color string = Color.RED
    std.println("Selected color:", color)  // "red"

    temp dir string = Direction.NORTH
    if dir == Direction.NORTH {
        std.println("Going north!")
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
    temp userPerms int = Permissions.READ || Permissions.WRITE
    std.println("User permissions:", userPerms)  // 3

    // Check individual flags with bitwise AND
    if (userPerms && Permissions.READ) != 0 {
        std.println("User can read")
    }

    if (userPerms && Permissions.DELETE) == 0 {
        std.println("User cannot delete")
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
    temp status int = HttpStatus.NOT_FOUND
    std.println("Status code:", status)  // 404
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

temp currentStatus int = Status.PENDING
currentStatus = Status.ACTIVE
```

### In Conditionals

```ez
temp status int = Status.ACTIVE

if status == Status.PENDING {
    std.println("Waiting...")
} or status == Status.ACTIVE {
    std.println("In progress...")
} or status == Status.DONE {
    std.println("Completed!")
}
```

### With when/is Statements

```ez
temp status int = Status.ACTIVE

when status {
    is Status.PENDING { std.println("Waiting...") }
    is Status.ACTIVE { std.println("In progress...") }
    is Status.DONE { std.println("Completed!") }
    default { std.println("Unknown status") }
}
```

Use `#strict` to ensure all enum cases are handled:

```ez
#strict
when status {
    is Status.PENDING { std.println("Waiting...") }
    is Status.ACTIVE { std.println("In progress...") }
    is Status.DONE { std.println("Completed!") }
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

temp workdays [int] = {
    Day.MONDAY,
    Day.TUESDAY,
    Day.WEDNESDAY,
    Day.THURSDAY,
    Day.FRIDAY
}

temp today int = Day.WEDNESDAY
if today in workdays {
    std.println("It's a workday")
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
        is LogLevel.ERROR { std.println("[ERROR]", message) }
        is LogLevel.WARNING { std.println("[WARN]", message) }
        is LogLevel.INFO { std.println("[INFO]", message) }
        default { std.println("[DEBUG]", message) }
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
    temp p int = Priority.HIGH
    temp value int = int(Priority.HIGH)

    std.println("Priority.HIGH =", value)  // 2

    // Use in arithmetic
    temp adjusted int = int(Priority.MEDIUM) + 5
    std.println("Adjusted:", adjusted)  // 6
}
```

## Valid Enum Types

Enum type attributes only accept primitive types:

- `int` (default)
- `float`
- `string`

Arrays, structs, and other complex types cannot be used as enum types.

## Attribute Summary

| Attribute | Description | Example |
|-----------|-------------|---------|
| (none) | Integer enum, values 0, 1, 2... | `const Status enum { ... }` |
| `#enum(int)` | Explicit integer enum | `#enum(int) const Status enum { ... }` |
| `#enum(float)` | Float enum (requires explicit values) | `#enum(float) const Grade enum { A = 4.0 ... }` |
| `#enum(string)` | String enum (requires explicit values) | `#enum(string) const Color enum { RED = "red" ... }` |
| `#flags` | Bitwise flags with power-of-2 values | `#flags const Perms enum { READ, WRITE ... }` |

## Example Program

```ez
import @std

#enum(string)
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
    temp tasks [Task] = {
        Task{title: "Fix login bug", status: TaskStatus.IN_PROGRESS, priority: Priority.URGENT},
        Task{title: "Update docs", status: TaskStatus.TODO, priority: Priority.LOW},
        Task{title: "Add tests", status: TaskStatus.REVIEW, priority: Priority.HIGH}
    }

    std.println("Task Board:")
    std.println("===========")

    for_each task in tasks {
        temp label string = priorityLabel(task.priority)
        std.println("[${task.status}] ${task.title} (${label})")
    }
}
```
