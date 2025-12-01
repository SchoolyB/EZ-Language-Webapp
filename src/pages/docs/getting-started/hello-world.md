---
layout: '../../../layouts/DocsLayout.astro'
title: 'Hello World'
description: 'Your first EZ program and variations.'
---

# Hello World

The classic first program, with several variations to explore EZ's features.

## Basic Hello World

The simplest EZ program:

```ez
import @std

do main() {
    std.println("Hello, World!")
}
```

Run it:

```bash
ez run hello.ez
```

Output:

```
Hello, World!
```

## Using Variables

Store the message in a variable:

```ez
import @std

do main() {
    temp message string = "Hello, World!"
    std.println(message)
}
```

## String Interpolation

EZ supports string interpolation with `${}`:

```ez
import @std

do main() {
    temp name string = "World"
    std.println("Hello, ${name}!")
}
```

## Personalized Greeting

A more interactive version:

```ez
import @std

do greet(name string) {
    std.println("Hello, ${name}!")
}

do main() {
    greet("Alice")
    greet("Bob")
    greet("World")
}
```

Output:

```
Hello, Alice!
Hello, Bob!
Hello, World!
```

## Multiple Greetings

Using arrays to greet multiple people:

```ez
import @std

do main() {
    temp names [string] = {"Alice", "Bob", "Charlie", "World"}

    for_each name in names {
        std.println("Hello, ${name}!")
    }
}
```

Output:

```
Hello, Alice!
Hello, Bob!
Hello, Charlie!
Hello, World!
```

## Greeting with Count

Track how many greetings we've made:

```ez
import @std

do main() {
    temp names [string] = {"Alice", "Bob", "Charlie"}
    temp count int = 0

    for_each name in names {
        count++
        std.println("${count}. Hello, ${name}!")
    }

    std.println("Greeted ${count} people!")
}
```

Output:

```
1. Hello, Alice!
2. Hello, Bob!
3. Hello, Charlie!
Greeted 3 people!
```

## Conditional Greeting

Different greetings based on conditions:

```ez
import @std

do greet(name string, isFormal bool) {
    if isFormal {
        std.println("Good day, ${name}.")
    } otherwise {
        std.println("Hey ${name}!")
    }
}

do main() {
    greet("Dr. Smith", true)
    greet("Bob", false)
}
```

Output:

```
Good day, Dr. Smith.
Hey Bob!
```

## Time-Based Greeting

Using the time module for context-aware greetings:

```ez
import @std
import @time

do getGreeting(hour int) -> string {
    if hour < 12 {
        return "Good morning"
    } or hour < 17 {
        return "Good afternoon"
    } otherwise {
        return "Good evening"
    }
}

do main() {
    temp hour int = time.hour(time.now())
    temp greeting string = getGreeting(hour)
    std.println("${greeting}, World!")
}
```

## Struct-Based Greeting

Using a struct for more complex greetings:

```ez
import @std

const Person struct {
    name string
    title string
}

do greet(p Person) {
    if p.title != "" {
        std.println("Hello, ${p.title} ${p.name}!")
    } otherwise {
        std.println("Hello, ${p.name}!")
    }
}

do main() {
    temp alice Person = Person{name: "Alice", title: "Dr."}
    temp bob Person = Person{name: "Bob", title: ""}

    greet(alice)  // Hello, Dr. Alice!
    greet(bob)    // Hello, Bob!
}
```

## Next Steps

Now that you've seen the basics, explore more:

- [Using the REPL](/docs/getting-started/repl) — Try EZ interactively
- [Variables](/docs/language/variables) — Learn about `temp` and `const`
- [Functions](/docs/language/functions) — Create your own functions
- [Control Flow](/docs/language/control-flow) — Conditionals and loops
