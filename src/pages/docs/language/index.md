---
layout: '../../../layouts/DocsLayout.astro'
title: 'Language Reference'
description: 'Learn the core concepts of the EZ programming language.'
---

# Language Reference

This section covers the core building blocks of EZ — everything you need to write programs from simple scripts to larger applications.

## What You'll Learn

EZ is designed to be straightforward. There are no hidden tricks or complex rules to memorize. What you see is what you get.

## Topics

| Topic | What it covers |
|-------|----------------|
| [Keywords](/EZ-Language-Webapp/docs/language/keywords) | Reserved words in EZ — `temp`, `const`, `do`, `if`, etc. |
| [Variables](/EZ-Language-Webapp/docs/language/variables) | Storing values with `temp` and `const` |
| [Functions](/EZ-Language-Webapp/docs/language/functions) | Creating reusable blocks of code with `do` |
| [Control Flow](/EZ-Language-Webapp/docs/language/control-flow) | Making decisions with `if`/`otherwise` and loops |
| [Types](/EZ-Language-Webapp/docs/language/types) | Data types — `int`, `float`, `string`, `bool`, arrays, maps |
| [Structs](/EZ-Language-Webapp/docs/language/structs) | Grouping related data together |
| [Enums](/EZ-Language-Webapp/docs/language/enums) | Defining a set of named values |
| [Modules](/EZ-Language-Webapp/docs/language/modules) | Organizing code into separate files |
| [Attributes](/EZ-Language-Webapp/docs/language/attributes) | Directives like `#doc`, `#enum`, `#flags`, `#strict`, `#suppress` |

## Where to Start

**New to programming?** Start with [Variables](/EZ-Language-Webapp/docs/language/variables), then [Functions](/EZ-Language-Webapp/docs/language/functions), then [Control Flow](/EZ-Language-Webapp/docs/language/control-flow). These three concepts are the foundation of almost every program.

**Coming from another language?** Skim through [Keywords](/EZ-Language-Webapp/docs/language/keywords) to see EZ's syntax, then jump to whatever topic you need.

## Quick Example

Here's a small program that shows several language features:

```ez
import @std

// A struct to hold data
const Person struct {
    name string
    age int
}

// A function that uses control flow
do greet(p Person) {
    if p.age < 18 {
        std.println("Hey ${p.name}!")
    } otherwise {
        std.println("Hello, ${p.name}.")
    }
}

do main() {
    // Variables
    temp people [Person] = {
        Person{name: "Alice", age: 25},
        Person{name: "Bob", age: 16}
    }

    // Loop through the array
    for_each person in people {
        greet(person)
    }
}
```

Output:

```
Hello, Alice.
Hey Bob!
```

## Next Steps

Pick a topic and dive in:

- [Keywords](/EZ-Language-Webapp/docs/language/keywords) — See all reserved words
- [Variables](/EZ-Language-Webapp/docs/language/variables) — Start here if you're new
- [Functions](/EZ-Language-Webapp/docs/language/functions) — Create reusable code
- [Control Flow](/EZ-Language-Webapp/docs/language/control-flow) — Conditionals and loops
- [Types](/EZ-Language-Webapp/docs/language/types) — All the data types
- [Structs](/EZ-Language-Webapp/docs/language/structs) — Custom data structures
- [Enums](/EZ-Language-Webapp/docs/language/enums) — Named value sets
- [Modules](/EZ-Language-Webapp/docs/language/modules) — Organize larger projects
- [Attributes](/EZ-Language-Webapp/docs/language/attributes) — Directives for enums, docs, and more
