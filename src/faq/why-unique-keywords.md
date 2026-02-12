---
question: "Why does EZ use unique keywords?"
order: 3
---

EZ uses keywords like `do`, `temp`, `as_long_as`, and `or`/`otherwise` instead of the traditional `func`, `let`, `while`, and `else if`/`else`. This is intentional.

## The Short Answer

This is how code reads in plain English. When you read EZ code, it should sound like describing what the program does to another person.

## The Philosophy

When experienced programmers read code, their brain translates it into plain language anyway:

```
// What you see in most languages:
while (x < 10) { ... }

// What your brain thinks:
"As long as x is less than 10, do this..."
```

EZ just writes it the way your brain already reads it:

```ez
as_long_as x < 10 { ... }
```

If that's how we think about code, why not write it that way?

## The Unique Keywords

### `do` instead of `func` / `function` / `def`

```ez
do greet(name string) {
    println("Hello, " + name)
}
```

Read it out loud: "Do greet with name string..."

It's an action. A verb. You're telling the computer to *do* something.

### `temp` instead of `let` / `var`

```ez
temp count int = 0
```

Read it: "Temporary count, an integer, equals zero."

It's a temporary value — it can change. The name says what it is.

### `as_long_as` instead of `while`

```ez
as_long_as count < 10 {
    count += 1
}
```

Read it: "As long as count is less than 10, do this."

That's exactly what a while loop does. Now the code says it.

### `or` / `otherwise` instead of `else if` / `else`

```ez
if score >= 90 {
    println("A")
} or score >= 80 {
    println("B")
} or score >= 70 {
    println("C")
} otherwise {
    println("F")
}
```

Read it: "If score is at least 90, print A. Or if score is at least 80, print B. Or if score is at least 70, print C. Otherwise, print F."

That's plain English. No weird `else if` construction.

## The Balance

Not everything is different. Some keywords are the same as other languages because they're already clear:

| Keyword Type | Examples | Philosophy |
|--------------|----------|------------|
| **Unique to EZ** | `do`, `temp`, `as_long_as`, `or`, `otherwise` | Plain English readability |
| **Standard** | `if`, `for`, `break`, `continue`, `return`, `const`, `struct` | Transferable knowledge |

The unique keywords make EZ readable. The standard keywords make your knowledge portable. Beginners won't stay beginners forever — when they move to Go, Rust, or Python, they'll recognize the shared concepts.

---
