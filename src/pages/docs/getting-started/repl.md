---
layout: '../../../layouts/DocsLayout.astro'
title: 'Using the REPL'
description: 'Interactive programming with the EZ REPL.'
---

# Using the REPL

The REPL (Read-Eval-Print Loop) lets you run EZ code interactively, line by line. It's perfect for experimenting, testing ideas, and learning the language.

## Starting the REPL

Launch the REPL from your terminal:

```bash
ez repl
```

You'll see the EZ prompt:

```
EZ v0.1.0 REPL
Type 'help' for commands, 'exit' to quit.

ez>
```

## Basic Usage

Type expressions and see results immediately:

```
ez> 2 + 2
4

ez> "Hello" + ", World!"
Hello, World!

ez> 10 * 5
50
```

## Declaring Variables

Use `temp` for variables:

```
ez> temp x int = 10
ez> temp y int = 20
ez> x + y
30

ez> temp name string = "EZ"
ez> "Hello, ${name}!"
Hello, EZ!
```

## Working with Types

All standard types work in the REPL:

```
ez> temp pi float = 3.14159
ez> pi * 2.0
6.28318

ez> temp active bool = true
ez> !active
false

ez> temp numbers [int] = {1, 2, 3, 4, 5}
ez> len(numbers)
5
```

## Defining Functions

Define and call functions:

```
ez> do double(x int) -> int { return x * 2 }
ez> double(21)
42

ez> do greet(name string) { std.println("Hello, ${name}!") }
ez> greet("World")
Hello, World!
```

## Multi-line Input

For longer code, use `{` to start multi-line mode:

```
ez> do factorial(n int) -> int {
...     if n <= 1 {
...         return 1
...     }
...     return n * factorial(n - 1)
... }
ez> factorial(5)
120
```

The REPL automatically detects incomplete statements and waits for more input.

## Using Modules

Import standard library modules:

```
ez> import @math
ez> math.sqrt(16.0)
4.0

ez> math.PI
3.14159265358979

ez> import @strings
ez> strings.upper("hello")
HELLO
```

## REPL Commands

Special commands (not EZ code):

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `clear` | Clear the screen |
| `reset` | Reset the REPL state (clears all variables) |
| `history` | Show command history |
| `exit` or `quit` | Exit the REPL |

## Viewing Variables

See all defined variables:

```
ez> temp x int = 10
ez> temp name string = "test"
ez> :vars
x: int = 10
name: string = "test"
```

## Quick Experiments

The REPL is great for quick experiments:

```
ez> // Test array operations
ez> import @arrays
ez> temp nums [int] = {5, 2, 8, 1, 9}
ez> arrays.sum(nums)
25
ez> arrays.max(nums)
9
ez> arrays.min(nums)
1

ez> // Test string operations
ez> import @strings
ez> temp s string = "  hello world  "
ez> strings.trim(s)
hello world
ez> strings.split("a,b,c", ",")
[a, b, c]
```

## Testing Code Snippets

Before putting code in a file, test it in the REPL:

```
ez> // Test a calculation
ez> temp price float = 19.99
ez> temp quantity int = 3
ez> temp tax float = 0.08
ez> temp subtotal float = price * float(quantity)
ez> temp total float = subtotal * (1.0 + tax)
ez> total
64.7676

ez> // Looks right! Now put it in a file.
```

## Debugging Values

Use the REPL to understand how operations work:

```
ez> 17 / 5
3

ez> 17 % 5
2

ez> 17.0 / 5.0
3.4

ez> int(17.0 / 5.0)
3
```

## Tips

- **Use tab completion** — Press Tab to auto-complete variable and function names
- **Use arrow keys** — Up/Down arrows navigate command history
- **Start fresh** — Use `reset` when you want a clean slate
- **Test before committing** — Try complex expressions in the REPL first

## Next Steps

- [Variables](/docs/language/variables) — Learn about `temp` and `const`
- [Functions](/docs/language/functions) — Create reusable code
- [Types](/docs/language/types) — Understand the type system
