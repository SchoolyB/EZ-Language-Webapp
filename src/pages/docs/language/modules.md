---
layout: '../../../layouts/DocsLayout.astro'
title: 'Modules'
description: 'Imports and the module system in EZ.'
---

# Modules

EZ uses a simple module system for organizing code and importing functionality. Standard library modules are prefixed with `@`.

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
    print("This works too")
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
std.print("No newline")   // Print without newline
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

EZ is flexible about how you organize your code. You can use a single file for quick scripts, multiple files in a folder for medium projects, or a nested directory structure for larger applications.

### Single File (Standalone)

For quick scripts or simple programs, one file is all you need:

```
my-script.ez
```

```ez
import @std

do main() {
    std.println("Hello from a single file!")
}
```

Run it directly:

```bash
ez run my-script.ez
```

No extra setup required. This is perfect for learning, experimenting, or writing small utilities.

### Multiple Files (Same Directory)

When your code grows, split it into multiple files in the same folder:

```
my-project/
├── main.ez
├── models.ez
└── utils.ez
```

Each file that's meant to be imported needs a `module` declaration at the top:

**models.ez**
```ez
module models

const Task struct {
    id int
    title string
    done bool
}

do create_task(id int, title string) -> Task {
    return Task{id: id, title: title, done: false}
}
```

**utils.ez**
```ez
module utils

import @std

do print_header(text string) {
    std.println("=== ${text} ===")
}
```

**main.ez**
```ez
import @std
import "./models"
import "./utils"

do main() {
    utils.print_header("Task Manager")

    temp task models.Task = models.create_task(1, "Learn EZ")
    std.println("Created: ${task.title}")
}
```

Key points:
- Use `module <name>` at the top of files you want to import
- Import local files with `"./<filename>"` (no `.ez` extension)
- Access items with the module prefix: `models.Task`, `utils.print_header()`

### Nested Directories (Larger Projects)

For bigger projects, organize code into directories. A directory can act as a single module when all files inside share the same `module` declaration:

```
my-app/
├── main/
│   └── main.ez
└── src/
    └── server/
        ├── server.ez
        ├── types.ez
        └── routes.ez
```

All files in `server/` declare themselves as part of the same module:

**src/server/types.ez**
```ez
module server

const Request struct {
    method string
    path string
}

const Response struct {
    status int
    body string
}
```

**src/server/routes.ez**
```ez
module server

import @std

do handle_home(req Request) -> Response {
    std.println("Handling: ${req.method} ${req.path}")
    return Response{status: 200, body: "Welcome!"}
}
```

**src/server/server.ez**
```ez
module server

import @std

do start(port int) {
    std.println("Server running on port ${port}")
}

do process(method string, path string) -> Response {
    temp req Request = Request{method: method, path: path}
    return handle_home(req)
}
```

Notice that files in the same module can use each other's types and functions directly — no imports needed between them.

**main/main.ez**
```ez
import @std
import "../src/server"

do main() {
    server.start(8080)

    temp resp server.Response = server.process("GET", "/")
    std.println("Response: ${resp.body}")
}
```

Key points:
- Import a directory with `"../path/to/folder"`
- All files in the directory must have the same `module <name>` declaration
- Files in the same module share everything automatically
- From outside, access with the module prefix: `server.Response`, `server.start()`

## Choosing a Structure

| Project Size | Structure | When to Use |
|--------------|-----------|-------------|
| Small | Single file | Scripts, experiments, learning |
| Medium | Multiple files | Apps with a few hundred lines, clear separation of concerns |
| Large | Nested directories | Multi-component apps, team projects, reusable libraries |

Start simple. You can always reorganize later as your project grows.

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
