---
layout: '../../../layouts/DocsLayout.astro'
title: '@std'
description: 'Core standard utilities for EZ programs.'
---

# @std

The `@std` module provides the most essential functions for any EZ program,
including output to the console and basic type information.

## Import

```ez
import @std
```

## Functions

### `println()`
`(values ...type) -> void`

Prints one or more values to stdout, followed by a newline.

```ez
std.println("Hello, World!")
std.println("The answer is:", 42)
std.println("x =", x, "y =", y)
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

### `print()`
`(values ...type) -> void`

Prints one or more values to stdout without a trailing newline.

```ez
std.print("Enter your name: ")
temp name string = input()
std.println("Hello, " + name)
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

### `eprintln()`
`(values ...type) -> void`

Prints one or more values to stderr, followed by a newline.

```ez
std.eprintln("Error:", "something failed")
std.eprintln("Warning: invalid input")
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

### `eprint()`
`(values ...type) -> void`

Prints one or more values to stderr without a trailing newline.

```ez
std.eprint("Error: ")
std.eprintln("connection failed")
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

### `sleep_seconds()`
`(int) -> void`

Pauses execution for the specified number of seconds.

```ez
std.println("Starting...")
std.sleep_seconds(2)
std.println("Done!")  // Printed 2 seconds later
```

**Parameters:** Number of seconds to sleep (must be non-negative).

**Returns:** Nothing.

| Error Code | Condition |
|------------|-----------|
| E7032 | Duration is negative |

### `sleep_milliseconds()`
`(int) -> void`

Pauses execution for the specified number of milliseconds.

```ez
std.sleep_milliseconds(500)  // Sleep for half a second
```

**Parameters:** Number of milliseconds to sleep (must be non-negative).

**Returns:** Nothing.

| Error Code | Condition |
|------------|-----------|
| E7032 | Duration is negative |

### `sleep_nanoseconds()`
`(int) -> void`

Pauses execution for the specified number of nanoseconds.

```ez
std.sleep_nanoseconds(1000000)  // Sleep for 1 millisecond
```

**Parameters:** Number of nanoseconds to sleep (must be non-negative).

**Returns:** Nothing.

| Error Code | Condition |
|------------|-----------|
| E7032 | Duration is negative |

## Example Program

```ez
import @std

do main() {
    // Print with newline
    std.println("Welcome to EZ!")
    std.println("The answer is:", 42)

    // Print without newline
    std.print("Enter your name: ")
    temp name string = input()
    std.println("Hello, " + name + "!")

    // Print to stderr
    std.eprintln("Warning:", "this is a warning message")

    // Sleep functions
    std.println("Waiting 1 second...")
    std.sleep_seconds(1)
    std.println("Done!")
}
```
