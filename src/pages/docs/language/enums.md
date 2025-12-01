---
layout: '../../../layouts/DocsLayout.astro'
title: 'Enums'
description: 'Enumerated types in EZ.'
---

# Enums

Enums (enumerations) define a type with a fixed set of named values. EZ supports integer, float, and string enums with optional auto-increment behavior.

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

Use `@()` attributes to control enum behavior:

### Integer Enums

```ez
// Explicit integer type (default behavior)
@(int)
const Priority enum {
    LOW       // 0
    MEDIUM    // 1
    HIGH      // 2
}
```

### Integer Enums with Skip

Use `skip` to increment by a value other than 1:

```ez
@(int, skip, 10)
const ErrorCode enum {
    SUCCESS    // 0
    WARNING    // 10
    ERROR      // 20
    CRITICAL   // 30
}

do main() {
    std.println(ErrorCode.SUCCESS)   // 0
    std.println(ErrorCode.WARNING)   // 10
    std.println(ErrorCode.ERROR)     // 20
    std.println(ErrorCode.CRITICAL)  // 30
}
```

### Manual Value Overrides

Override specific values while keeping auto-increment:

```ez
@(int, skip, 10)
const HttpStatus enum {
    OK = 200
    CREATED         // 210
    BAD_REQUEST = 400
    UNAUTHORIZED    // 410
    NOT_FOUND = 404
    SERVER_ERROR    // 414
}
```

## Float Enums

```ez
@(float)
const Grade enum {
    A = 4.0
    B = 3.0
    C = 2.0
    D = 1.0
    F = 0.0
}

@(float, skip, 0.5)
const Precision enum {
    LOW = 0.0
    MEDIUM     // 0.5
    HIGH       // 1.0
}

do main() {
    temp grade float = Grade.A
    std.println("GPA:", grade)  // 4.0
}
```

## String Enums

String enums require explicit values for all members:

```ez
@(string)
const Color enum {
    RED = "red"
    GREEN = "green"
    BLUE = "blue"
    YELLOW = "yellow"
}

@(string)
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
    if level == LogLevel.ERROR {
        std.println("[ERROR]", message)
    } or level == LogLevel.WARNING {
        std.println("[WARN]", message)
    } or level == LogLevel.INFO {
        std.println("[INFO]", message)
    } otherwise {
        std.println("[DEBUG]", message)
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
@(int, skip, 10)
const Priority enum {
    LOW
    MEDIUM
    HIGH
    CRITICAL
}

do main() {
    temp p int = Priority.HIGH
    temp value int = int(Priority.HIGH)

    std.println("Priority.HIGH =", value)  // 20

    // Use in arithmetic
    temp adjusted int = int(Priority.MEDIUM) + 5
    std.println("Adjusted:", adjusted)  // 15
}
```

## Valid Enum Types

Enum type attributes only accept primitive types:

- `int` (default)
- `float`
- `string`

Arrays, structs, and other complex types cannot be used as enum types.

## Example Program

```ez
import @std

@(string)
const TaskStatus enum {
    TODO = "todo"
    IN_PROGRESS = "in-progress"
    REVIEW = "review"
    DONE = "done"
}

@(int, skip, 1)
const Priority enum {
    LOW = 1
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
    if p == Priority.URGENT {
        return "URGENT"
    } or p == Priority.HIGH {
        return "High"
    } or p == Priority.MEDIUM {
        return "Medium"
    } otherwise {
        return "Low"
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
