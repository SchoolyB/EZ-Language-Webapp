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

This prefix tells EZ which module the function comes from. It's called a **namespace** — it keeps things organized and prevents name collisions.

## Import Options

EZ gives you a few ways to import modules depending on your preference.

### Import Multiple Modules

Import several modules on one line:

```ez
import @std, @math, @arrays
```

Or on separate lines — both work the same:

```ez
import @std
import @math
import @arrays
```

### Give a Module a Shorter Name (Aliasing)

If you find `strings` too long to type, give it a nickname:

```ez
import s@strings
import m@math

do main() {
    s.upper("hello")    // instead of strings.upper()
    m.sqrt(16.0)        // instead of math.sqrt()
}
```

The format is `alias@module` — your chosen name, then `@`, then the module.

### Skip the Prefix with `using`

If you're using a module a lot, you can drop the prefix inside a block:

```ez
import @std
import @math

do main() {
    using std
    using math

    println("No prefix needed!")   // instead of std.println()
    temp x float = sqrt(16.0)      // instead of math.sqrt()
}
```

The `using` keyword makes all functions from that module available without a prefix — but only inside that block.

### Import and Use Together

Shorthand for importing and immediately using everywhere:

```ez
import & use @std

do main() {
    println("Direct access!")  // no std. prefix needed
}
```

## Which Style Should I Use?

For beginners, stick with the basic style:

```ez
import @std

do main() {
    std.println("Hello!")
}
```

The prefix makes it clear where each function comes from, which helps when learning. Once you're comfortable, experiment with `using` or aliases if you prefer shorter code.

See the [Modules](/docs/language/modules) page for more details on the module system.

## Available Modules

EZ includes six built-in modules:

| Module | What it's for |
|--------|---------------|
| [@std](/docs/stdlib/std) | Basic input/output — printing text, getting user input |
| [@math](/docs/stdlib/math) | Math operations — square roots, powers, random numbers |
| [@arrays](/docs/stdlib/arrays) | Working with lists — sorting, filtering, finding items |
| [@strings](/docs/stdlib/strings) | Working with text — uppercase, splitting, trimming |
| [@maps](/docs/stdlib/maps) | Key-value storage — like a dictionary or phonebook |
| [@time](/docs/stdlib/time) | Dates and time — current time, formatting, delays |

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

- [@std](/docs/stdlib/std) — Start here, it's the most common
- [@math](/docs/stdlib/math) — For calculations and random numbers
- [@arrays](/docs/stdlib/arrays) — For working with lists of things
- [@strings](/docs/stdlib/strings) — For manipulating text
- [@maps](/docs/stdlib/maps) — For key-value data
- [@time](/docs/stdlib/time) — For dates, times, and delays
