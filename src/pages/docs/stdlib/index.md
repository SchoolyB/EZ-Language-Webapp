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
import @std
import @math

do main() {
    // your code here
}
```

### Step 2: Use with the Module Prefix

Once imported, use functions with the module name as a prefix:

```ez
math.sqrt(16.0)      // 4.0
std.println("Hi")    // prints "Hi"
```

The `math.` and `std.` prefixes tell EZ which module each function, variable, or type comes from. This prevents confusion when two modules have functions with the same name.

## Import Options

Import multiple modules on one line or separate lines:

```ez
import @std, @math, @arrays
```

```ez
import @std
import @math
import @arrays
```

For beginners, stick with the basic `import @std` + `std.println()` style. The prefix makes it clear where each function comes from.

<details>
<summary><strong>Click Here For Advanced Import Styles</strong></summary>

### Aliasing (Shorter Names)

Give a module a shorter name:

```ez
import s@strings
import m@math

do main() {
    s.upper("hello")    // instead of strings.upper()
    m.sqrt(16.0)        // instead of math.sqrt()
}
```

### Using (Drop the Prefix)

The `using` keyword brings a module's contents into scope, so you can call functions without the prefix:

```ez
import @std

do main() {
    using std
    println("No prefix needed!")
}
```

**Important:** `using` only applies to the scope where it's declared:

```ez
import @std

do main() {
    using std
    println("Works here!")    // No prefix needed
}

do helper() {
    std.println("Need prefix here")  // Different function, no 'using'
}
```

To use without prefix in multiple functions, add `using` to each one, or use the file-level approach below.

### Import & Use (File-Level Scope)

Combines import and using in one line, making the module available **everywhere** in the file:

```ez
import & use @std

do main() {
    println("No prefix!")
}

do helper() {
    println("Works here too!")  // No prefix needed anywhere
}
```

You can also combine with aliasing:

```ez
import & use S@std

do main() {
    S.println("Short prefix everywhere!")
}

do helper() {
    S.println("Same alias works here!")
}
```

### When to Use What

| Style | Syntax | Best For |
|-------|--------|----------|
| Basic | `import @std` | Most code — prefix makes origin clear |
| Alias | `import m@math` | Long module names you use frequently |
| Function-scoped using | `using std` inside function | One function that heavily uses a module |
| File-scoped | `import & use @std` | Small scripts, less typing |
| File-scoped + alias | `import & use S@std` | Short prefix everywhere |

</details>


## Available Modules

EZ includes sixteen built-in modules:

| Module | What it's for |
|--------|---------------|
| [@std](/language.ez/docs/stdlib/std) | Basic input/output — printing text, getting user input |
| [@math](/language.ez/docs/stdlib/math) | Math operations — square roots, powers, logarithms |
| [@random](/language.ez/docs/stdlib/random) | Random generation — numbers, choices, shuffling |
| [@arrays](/language.ez/docs/stdlib/arrays) | Working with lists — sorting, filtering, finding items |
| [@strings](/language.ez/docs/stdlib/strings) | Working with text — uppercase, splitting, trimming |
| [@maps](/language.ez/docs/stdlib/maps) | Key-value storage — like a dictionary or phonebook |
| [@time](/language.ez/docs/stdlib/time) | Dates and time — current time, formatting, delays |
| [@bytes](/language.ez/docs/stdlib/bytes) | Binary data — encoding, decoding, byte manipulation |
| [@io](/language.ez/docs/stdlib/io) | File system — reading, writing, paths, directories |
| [@os](/language.ez/docs/stdlib/os) | Operating system — environment, platform detection, commands |
| [@json](/language.ez/docs/stdlib/json) | JSON parsing — encoding, decoding, validation |
| [@binary](/language.ez/docs/stdlib/binary) | Binary encoding — numeric type serialization with endianness control |
| [@uuid](/language.ez/docs/stdlib/uuid) | UUID generation — create and validate unique identifiers |
| [@encoding](/language.ez/docs/stdlib/encoding) | Data encoding — Base64, hex, and URL encoding/decoding |
| [@crypto](/language.ez/docs/stdlib/crypto) | Cryptography — hashing (SHA-256, MD5) and secure random |
| [@db](/language.ez/docs/stdlib/db) | Database — simple key-value storage with .ezdb files |

## Quick Example

Here's a small program that uses three different modules:

```ez
import @std
import @math
import @strings

do main() {
    // @std for printing
    std.println("Welcome!")

    // @math for calculations
    temp radius float = 5.0
    temp area float = math.PI * math.pow(radius, 2.0)
    std.println("Circle area:", area)

    // @strings for text manipulation
    temp name string = "  alice  "
    temp clean string = strings.trim(name)
    temp upper string = strings.upper(clean)
    std.println("Hello,", upper)  // "ALICE"
}
```

## Tips for Beginners

**Start with @std** — You'll use `std.println()` in almost every program. It's how you see output from your code.

**You don't need to memorize everything** — Bookmark this page. When you need to do something with arrays, check the @arrays page. Need to format a date? Check @time. The docs are here for reference.

**Import only what you need** — If your program only prints text, you only need `import @std`. No need to import @math if you're not doing math.

## Next Steps

Pick a module and explore what it can do:

- [@std](/language.ez/docs/stdlib/std) — Start here, it's the most common
- [@math](/language.ez/docs/stdlib/math) — For calculations and logarithms
- [@random](/language.ez/docs/stdlib/random) — For random numbers and shuffling
- [@arrays](/language.ez/docs/stdlib/arrays) — For working with lists of things
- [@strings](/language.ez/docs/stdlib/strings) — For manipulating text
- [@maps](/language.ez/docs/stdlib/maps) — For key-value data
- [@time](/language.ez/docs/stdlib/time) — For dates, times, and delays
- [@bytes](/language.ez/docs/stdlib/bytes) — For binary data and encoding
- [@io](/language.ez/docs/stdlib/io) — For file and directory operations
- [@os](/language.ez/docs/stdlib/os) — For system info, environment, and commands
- [@json](/language.ez/docs/stdlib/json) — For JSON encoding, decoding, and validation
- [@binary](/language.ez/docs/stdlib/binary) — For binary encoding and decoding with endianness
- [@uuid](/language.ez/docs/stdlib/uuid) — For generating and validating UUIDs
- [@encoding](/language.ez/docs/stdlib/encoding) — For Base64, hex, and URL encoding
- [@crypto](/language.ez/docs/stdlib/crypto) — For cryptographic hashing and secure random
- [@db](/language.ez/docs/stdlib/db) — For simple key-value database storage
