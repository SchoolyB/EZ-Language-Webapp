---
layout: '../../../layouts/DocsLayout.astro'
title: 'Standard Library'
description: 'Built-in modules that come with EZ.'
---

# Standard Library

When you install EZ, it comes with a set of ready-to-use tools called the **standard library** (or "stdlib" for short). These are modules that handle common tasks so you don't have to write everything from scratch.

Think of it like a toolbox that comes with your house — you didn't have to buy the hammer and screwdriver separately, they're just there when you need them.

## What's a Module?

A module is a collection of related functions grouped together. For example, all the math-related functions live in the `@math` module, and all the text-related functions live in the `@strings` module.

The `@` symbol tells EZ "this is a built-in module" (as opposed to a file you created yourself).

## How to Use a Module

### Step 1: Import at the Top

Imports must go at the top of your file, before any other code:

```ez
import @math

do main() {
    // your code here
}
```

> **Note:** Common functions like `println`, `print`, `input`, `len`, `type_of`, and others are [builtins](/EZ-Language-Webapp/docs/stdlib/builtins) — always available without any import.

### Step 2: Use with the Module Prefix

Once imported, use functions with the module name as a prefix:

```ez
math.sqrt(16.0)      // 4.0
println("Hi")        // prints "Hi" — builtin, no import needed
```

The `math.` prefix tells EZ which module the function comes from. This prevents confusion when two modules have functions with the same name.

## Import Options

Import multiple modules on one line or separate lines:

```ez
import @math, @arrays
```

```ez
import @math
import @arrays
```

For beginners, use the prefix style — it makes it clear where each function comes from.

<details>
<summary><strong>Click Here For Advanced Import Styles</strong></summary>

### Aliasing (Shorter Names)

Give a module a shorter name:

```ez
import s @strings
import m @math

do main() {
    s.to_upper("hello")    // instead of strings.to_upper()
    m.sqrt(16.0)           // instead of math.sqrt()
}
```

### Using (Drop the Prefix)

The `using` keyword brings a module's contents into scope, so you can call functions without the prefix:

```ez
import @math
using math

do main() {
    mut result = sqrt(pow(3.0, 2.0) + pow(4.0, 2.0))
    println(result)  // 5.0
}
```

### Import and Use (Combined)

Combines import and using in one statement, making the module available without a prefix:

```ez
import and use @arrays

do main() {
    mut nums [int] = {1, 2, 3}
    append(nums, 4)  // No arrays. prefix needed
}
```

### When to Use What

| Style | Syntax | Best For |
|-------|--------|----------|
| Basic | `import @math` | Most code — prefix makes origin clear |
| Alias | `import m @math` | Long module names you use frequently |
| Using | `using math` | When you heavily use one module |
| Combined | `import and use @arrays` | Less typing, small scripts |

</details>


## Available Modules

EZ includes twenty-six built-in modules:

| Module | What it's for |
|--------|---------------|
| [@math](/EZ-Language-Webapp/docs/stdlib/math) | Math operations — square roots, powers, logarithms |
| [@random](/EZ-Language-Webapp/docs/stdlib/random) | Random generation — numbers, choices, shuffling |
| [@arrays](/EZ-Language-Webapp/docs/stdlib/arrays) | Working with lists — sorting, filtering, finding items |
| [@strings](/EZ-Language-Webapp/docs/stdlib/strings) | Working with text — uppercase, splitting, trimming |
| [@maps](/EZ-Language-Webapp/docs/stdlib/maps) | Key-value storage — like a dictionary or phonebook |
| [@time](/EZ-Language-Webapp/docs/stdlib/time) | Dates and time — current time, formatting, timing |
| [@bytes](/EZ-Language-Webapp/docs/stdlib/bytes) | Binary data — encoding, decoding, byte manipulation |
| [@io](/EZ-Language-Webapp/docs/stdlib/io) | File system — reading, writing, paths, directories |
| [@os](/EZ-Language-Webapp/docs/stdlib/os) | Operating system — environment, platform detection, commands |
| [@json](/EZ-Language-Webapp/docs/stdlib/json) | JSON parsing — encoding, decoding, validation |
| [@http](/EZ-Language-Webapp/docs/stdlib/http) | HTTP client — web requests, URL encoding, status codes |
| [@binary](/EZ-Language-Webapp/docs/stdlib/binary) | Binary encoding — numeric type serialization with endianness control |
| [@uuid](/EZ-Language-Webapp/docs/stdlib/uuid) | UUID generation — create and validate unique identifiers |
| [@encoding](/EZ-Language-Webapp/docs/stdlib/encoding) | Data encoding — Base64, hex, and URL encoding/decoding |
| [@crypto](/EZ-Language-Webapp/docs/stdlib/crypto) | Cryptography — hashing (SHA-256, MD5) and secure random |
| [@regex](/EZ-Language-Webapp/docs/stdlib/regex) | Regular expressions — matching, finding, replacing patterns |
| [@csv](/EZ-Language-Webapp/docs/stdlib/csv) | CSV — parsing, generating, reading, and writing CSV data |
| [@sqlite](/EZ-Language-Webapp/docs/stdlib/sqlite) | Database — SQLite database access for persistent storage |
| [@server](/EZ-Language-Webapp/docs/stdlib/server) | HTTP server — routing, response helpers, and serving |
| [@fmt](/EZ-Language-Webapp/docs/stdlib/fmt) | Formatting — printf-style formatting, padding, number display |
| [@net](/EZ-Language-Webapp/docs/stdlib/net) | Networking — TCP sockets and DNS resolution |
| [@threads](/EZ-Language-Webapp/docs/stdlib/threads) | Threading — spawn and join threads |
| [@sync](/EZ-Language-Webapp/docs/stdlib/sync) | Synchronization — mutexes for thread-safe access |
| [@channels](/EZ-Language-Webapp/docs/stdlib/channels) | Channels — message passing between threads |
| [@mem](/EZ-Language-Webapp/docs/stdlib/mem) | Memory — arena-based memory allocation |
| [@atomic](/EZ-Language-Webapp/docs/stdlib/atomic) | Atomics — lock-free atomic operations and spinlocks |

## Quick Example

Here's a small program that uses two different modules:

```ez
import @math
import @strings

do main() {
    // Builtins — no import needed
    println("Welcome!")

    // @math for calculations
    mut radius = 5.0
    mut area = math.PI * math.pow(radius, 2.0)
    println("Circle area:", area)

    // @strings for text manipulation
    mut name = strings.trim("  alice  ")
    mut upper = strings.to_upper(name)
    println("Hello,", upper)  // "ALICE"
}
```

## Tips for Beginners

**You don't need to memorize everything** — Bookmark this page. When you need to do something with arrays, check the @arrays page. Need to format a date? Check @time. The docs are here for reference.

**Import only what you need** — If your program only prints text, you don't need any imports at all (`println` is a builtin). Only import modules when you need their specific functions.

## Next Steps

Pick a module and explore what it can do:

- [Builtins](/EZ-Language-Webapp/docs/stdlib/builtins) — Always available, no import needed
- [@math](/EZ-Language-Webapp/docs/stdlib/math) — For calculations and logarithms
- [@random](/EZ-Language-Webapp/docs/stdlib/random) — For random numbers and shuffling
- [@arrays](/EZ-Language-Webapp/docs/stdlib/arrays) — For working with lists of things
- [@strings](/EZ-Language-Webapp/docs/stdlib/strings) — For manipulating text
- [@maps](/EZ-Language-Webapp/docs/stdlib/maps) — For key-value data
- [@time](/EZ-Language-Webapp/docs/stdlib/time) — For dates, times, and timing
- [@bytes](/EZ-Language-Webapp/docs/stdlib/bytes) — For binary data and encoding
- [@io](/EZ-Language-Webapp/docs/stdlib/io) — For file and directory operations
- [@os](/EZ-Language-Webapp/docs/stdlib/os) — For system info, environment, and commands
- [@json](/EZ-Language-Webapp/docs/stdlib/json) — For JSON encoding, decoding, and validation
- [@http](/EZ-Language-Webapp/docs/stdlib/http) — For making web requests and working with URLs
- [@binary](/EZ-Language-Webapp/docs/stdlib/binary) — For binary encoding and decoding with endianness
- [@uuid](/EZ-Language-Webapp/docs/stdlib/uuid) — For generating and validating UUIDs
- [@encoding](/EZ-Language-Webapp/docs/stdlib/encoding) — For Base64, hex, and URL encoding
- [@crypto](/EZ-Language-Webapp/docs/stdlib/crypto) — For cryptographic hashing and secure random
- [@regex](/EZ-Language-Webapp/docs/stdlib/regex) — For regular expression operations
- [@csv](/EZ-Language-Webapp/docs/stdlib/csv) — For CSV parsing and file operations
- [@sqlite](/EZ-Language-Webapp/docs/stdlib/sqlite) — For SQLite database operations
- [@server](/EZ-Language-Webapp/docs/stdlib/server) — For building HTTP servers with routing
- [@fmt](/EZ-Language-Webapp/docs/stdlib/fmt) — For formatted output and string formatting
- [@net](/EZ-Language-Webapp/docs/stdlib/net) — For TCP sockets and DNS
- [@threads](/EZ-Language-Webapp/docs/stdlib/threads) — For thread lifecycle management
- [@sync](/EZ-Language-Webapp/docs/stdlib/sync) — For mutexes and synchronization
- [@channels](/EZ-Language-Webapp/docs/stdlib/channels) — For message passing between threads
- [@mem](/EZ-Language-Webapp/docs/stdlib/mem) — For arena-based memory management
- [@atomic](/EZ-Language-Webapp/docs/stdlib/atomic) — For lock-free atomic operations
