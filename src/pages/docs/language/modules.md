---
layout: '../../../layouts/DocsLayout.astro'
title: 'Modules'
description: 'Imports and the module system in EZ.'
---

# Modules

A module is a file or collection of code that you can import into your program. Modules help organize code into reusable pieces — instead of writing everything from scratch, you can import existing functionality.

EZ's standard library modules are prefixed with `@` (like `@std`, `@math`, `@arrays`).

## Importing Modules

Use `import` to bring in a module:

```ez
import @std
import @math
import @arrays
```

## Multiple Imports

Import multiple modules on a single line:

```ez
import @std, @arrays, @math
```

Or on separate lines:

```ez
import @std
import @arrays
import @math
```

## Using Modules

By default, you access module functions with the module name as a prefix:

```ez
import @std
import @math

do main() {
    std.println("Hello!")
    temp result float = math.sqrt(16.0)
    std.println(result)  // 4.0
}
```

## The using Keyword

Use `using` to access module functions without a prefix:

```ez
import @std

do main() {
    using std

    println("No prefix needed!")
    printf("This works too")
}
```

You can use `using` inside any scope:

```ez
import @std
import @math

do calculate() {
    using math
    // sqrt, pow, etc. available without prefix
    temp result float = sqrt(pow(3.0, 2.0) + pow(4.0, 2.0))
    std.println(result)  // 5.0
}

do main() {
    using std
    println("In main")
    calculate()
}
```

## Import and Use Combined

Combine import and using in one statement:

```ez
import & use @std

do main() {
    println("Direct access!")  // No std. prefix needed
}
```

## Module Aliasing

Give a module a different name:

```ez
import arr@arrays
import m@math

do main() {
    temp numbers [int] = {1, 2, 3}
    arr.append(numbers, 4)

    temp result float = m.sqrt(16.0)
}
```

## Mixed Imports

Combine regular imports and aliases:

```ez
import @std, arr@arrays, m@math

do main() {
    using std

    temp nums [int] = {1, 2, 3}
    arr.append(nums, 4)

    println("Sum:", arr.sum(nums))
    println("Sqrt of 16:", m.sqrt(16.0))
}
```

## Standard Library Modules

EZ includes these built-in modules:

### @std

Core I/O and utilities:

```ez
import @std

std.println("Hello")      // Print with newline
std.printf("No newline")  // Print without newline
std.typeof(value)         // Get type as string
```

### @math

Mathematical functions:

```ez
import @math

math.PI                   // 3.14159...
math.sqrt(16.0)           // 4.0
math.pow(2.0, 8.0)        // 256.0
math.random(1, 100)       // Random int 1-99
```

### @arrays

Array operations:

```ez
import @arrays

arrays.append(arr, value)
arrays.pop(arr)
arrays.sum(arr)
arrays.reverse(arr)
```

### @strings

String manipulation:

```ez
import @strings

strings.upper("hello")    // "HELLO"
strings.split("a,b,c", ",")
strings.contains(str, substr)
```

### @maps

Map operations:

```ez
import @maps

maps.get(m, key)
maps.set(m, key, value)
maps.has(m, key)
maps.keys(m)
```

### @time

Time and date functions:

```ez
import @time

time.now()                // Current timestamp
time.sleep(2)             // Sleep 2 seconds
time.format(ts, "YYYY-MM-DD")
```

## Project Structure

### Single File

For scripts and simple programs, one file is all you need:

```ez
import @std

do main() {
    std.println("Hello!")
}
```

Run with `ez myfile.ez`.

### Multiple Files

Split larger projects into files. Files you want to import need a `module` declaration:

```
my-project/
├── main.ez
└── utils.ez
```

**utils.ez**
```ez
module utils

do greet(name string) {
    std.println("Hello, ${name}!")
}
```

**main.ez**
```ez
import @std
import "./utils"

do main() {
    utils.greet("World")
}
```

Key points:
- Add `module <name>` at the top of files you want to import
- Import with `"./<filename>"` (no `.ez` extension)
- Access with the module prefix: `utils.greet()`

### Nested Directories

For larger projects, a directory can act as a single module when all files inside share the same `module` declaration. Import the directory path and all its files are available through one namespace.

## Module Declaration

The `module` keyword declares that a file belongs to a module:

```ez
module mymodule

// Everything in this file is part of 'mymodule'
```

Rules:
- Must be the first statement (after comments)
- Only needed for files you want to import
- Your main entry file (with `do main()`) typically doesn't need one

## Importing User Modules

Import local files and directories with relative paths:

```ez
// Same directory
import "./utils"

// Parent directory
import "../shared/helpers"

// Subdirectory
import "./lib/database"
```

The path is relative to the current file. Don't include the `.ez` extension.

## Module Scope

Each module has its own namespace. Items must be accessed through the module name:

```ez
import "./models"

do main() {
    // Use the module prefix
    temp task models.Task = models.create_task(1, "Test")
    temp name string = models.get_name(task)
}
```

Or use `using` to drop the prefix:

```ez
import "./models"

do main() {
    using models

    // No prefix needed
    temp task Task = create_task(1, "Test")
}
```
