---
layout: '../../../layouts/DocsLayout.astro'
title: 'Modules'
description: 'Imports and the module system in EZ.'
---

# Modules

A module is a file or collection of code that you can import into your program. Modules help organize code into reusable pieces — instead of writing everything from scratch, you can import existing functionality.

EZ's standard library modules are prefixed with `@` (like `@math`, `@arrays`). Module identity is determined by the filesystem — a file's module name is its filename (minus `.ez`), and a directory's module name is its directory name.

## Importing Modules

Use `import` to bring in a module:

```ez
import @math
import @arrays
```

## Multiple Imports

Import multiple modules on a single line:

```ez
import @arrays, @math, @strings
```

Or on separate lines:

```ez
import @arrays
import @math
import @strings
```

## Using Modules

By default, you access module functions with the module name as a prefix:

```ez
import @math

do main() {
    mut result = math.sqrt(16.0)
    println(result)  // 4.0
}
```

## The using Keyword

Use `using` to access module functions without a prefix. It can be placed at file scope or function scope:

### File Scope

All functions in the file can use unqualified access:

```ez
import @strings
using strings

do main() {
    println(to_upper("hello"))  // OK — strings is in file scope
}

do shout(s string) -> string {
    return to_upper(s)          // OK — same file scope
}
```

### Function Scope

Only that function can use unqualified access:

```ez
import @strings

do main() {
    using strings
    println(to_upper("hello"))  // OK — strings is in scope here
}

do shout(s string) -> string {
    return strings.to_upper(s)  // must qualify — using is not in scope here
}
```

Multiple modules can be listed:

```ez
using arrays, strings
```

## Import and Use Combined

Combine import and using in one statement with `import and use`:

```ez
import and use @arrays

do main() {
    mut nums [int] = {1, 2, 3}
    append(nums, 4)  // No arrays. prefix needed
}
```

Multiple modules:

```ez
import and use @arrays, @strings
```

## Module Aliasing

Give a module a different name using space-separated syntax:

```ez
import arr @arrays
import m @math

do main() {
    mut numbers [int] = {1, 2, 3}
    arr.append(numbers, 4)

    mut result = m.sqrt(16.0)
}
```

## Mixed Imports

Combine regular imports and aliases:

```ez
import @strings, arr @arrays, m @math

do main() {
    mut nums [int] = {1, 2, 3}
    arr.append(nums, 4)

    println("Sum:", arr.get_sum(nums))
    println("Sqrt of 16:", m.sqrt(16.0))
}
```

## Standard Library Modules

EZ includes built-in modules prefixed with `@` (like `@math`, `@arrays`). See the [Standard Library](/EZ-Language-Webapp/docs/stdlib) for a complete list of modules and their functions.

> **Note:** `println`, `print`, `eprintln`, `eprint`, `input`, `len`, `type_of`, `size_of`, and other [builtins](/EZ-Language-Webapp/docs/stdlib/builtins) are always available without any import.

## Project Structure

### Single File

For scripts and simple programs, one file is all you need:

```ez
do main() {
    println("Hello!")
}
```

Run with `ez myfile.ez`.

### Multiple Files

Split larger projects into files. Module identity comes from the filename:

```
my-project/
├── main.ez
└── utils.ez
```

**utils.ez**
```ez
do greet(name string) {
    println("Hello, ${name}!")
}
```

**main.ez**
```ez
import "./utils"

do main() {
    utils.greet("World")
}
```

Key points:
- Module name is derived from the filename (no `module` declaration needed)
- Import with `"./<filename>"` (no `.ez` extension)
- A `.ez` extension imports a single file; no extension imports a directory
- Access with the module prefix: `utils.greet()`

### Directory Modules

A directory can act as a single module. All top-level `.ez` files inside it are merged into one namespace:

```
my-project/
├── main.ez
└── models/
    ├── types.ez
    └── functions.ez
```

**main.ez**
```ez
import "./models"

do main() {
    // All functions and types from models/ are available
    mut task = models.create_task(1, "Test")
}
```

Import the directory path and all its `.ez` files are available through one namespace. Subdirectories are separate modules.

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

## Collision Detection

If two imports resolve to the same alias without explicit aliasing, it is an error. You must alias one to resolve the conflict:

```ez
// Error — both resolve to "utils"
import "./utils"
import "../shared/utils"

// Fix: alias one of them
import "./utils"
import shared_utils "../shared/utils"
```

Importing a file that is already included via a parent directory import is also an error (double-import prevention).

## Module Scope

Each module has its own namespace. Items must be accessed through the module name:

```ez
import "./models"

do main() {
    mut task = models.create_task(1, "Test")
    mut name = models.get_name(task)
}
```

Or use `using` to drop the prefix:

```ez
import "./models"
using models

do main() {
    mut task = create_task(1, "Test")
}
```

## C Interop

EZ can import C headers and call C functions directly using the `c` prefix:

```ez
import c"stdio.h"           // system header → #include <stdio.h>
import c"./mylib.h"         // local header  → #include "./mylib.h"
```

System headers (no `./` or `../` prefix) emit angle-bracket includes. Local headers emit quoted includes.

### Calling C Functions

All C functions are accessed via the `c.` prefix:

```ez
import c"stdio.h"

do main() {
    c.puts("hello from C")
    c.printf("value: %d\n", 42)
}
```

### Accessing C Constants and Macros

```ez
import c"stdio.h"

do main() {
    println(c.EOF)              // -1
    println(c.EXIT_SUCCESS)     // 0
}
```

### Type Mapping

| EZ type | C type | Notes |
|---|---|---|
| `int` | `int64_t` | Use `i32` for C `int` |
| `uint` | `uint64_t` | Use `u32` for C `unsigned int` |
| `i8`, `i16`, `i32`, `i64` | `int8_t` ... `int64_t` | Exact match |
| `u8`, `u16`, `u32`, `u64` | `uint8_t` ... `uint64_t` | Exact match |
| `float` | `double` | Use `f32` for C `float` |
| `bool` | `bool` | Exact match |
| `byte` | `uint8_t` | Exact match |
| `string` | `char*` | Auto-converted when passed to C |
| `^T` | `T*` | Direct pointer mapping |

EZ strings are automatically converted to `char*` when passed to C functions. To convert a C `char*` return value back to an EZ string, use the `c_string()` builtin:

```ez
import c"stdlib.h"

do main() {
    mut home string = c_string(c.getenv("HOME"))
    println(home)
}
```

### Restrictions

These EZ types cannot be passed to C functions:

- `i128`, `i256`, `u128`, `u256` — C has no 128/256-bit integer types
- Arrays and maps — EZ-specific types with no C equivalent
- EZ structs — pass individual fields instead

The module name `c` is reserved for C interop. Files named `c.ez` must use an explicit alias.

## See Also
- [Standard Library](/EZ-Language-Webapp/docs/stdlib/) — built-in modules reference
- [Keywords](/EZ-Language-Webapp/docs/language/keywords) — `import`, `using` keywords
- [Variables](/EZ-Language-Webapp/docs/language/variables) — variable scope and visibility
