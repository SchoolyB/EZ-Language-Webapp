---
layout: '../../../layouts/DocsLayout.astro'
title: 'Control Flow'
description: 'Conditionals, loops, and flow control in EZ.'
---

# Control Flow

EZ provides clear, readable control flow constructs for conditionals and loops.
The keywords are designed to be intuitive: `if`/`or`/`otherwise` for branching,
`for`/`for_each` for iteration, and `as_long_as`/`loop` for conditional and infinite loops.

## Conditionals

### if / or / otherwise

EZ uses `if`, `or` (instead of else if), and `otherwise` (instead of else) for conditional branching.

```ez
temp x int = 15

if x > 20 {
    std.println("large")
} or x > 10 {
    std.println("medium")
} or x > 5 {
    std.println("small")
} otherwise {
    std.println("tiny")
}
```

### Simple if

A simple condition without alternatives:

```ez
temp age int = 21

if age >= 18 {
    std.println("You are an adult")
}
```

### Logical Operators in Conditions

Combine conditions with `&&` (and), `||` (or), and `!` (not):

```ez
temp a int = 10
temp b int = 20
temp isValid bool = true

// AND operator
if a < b && a > 0 {
    std.println("a is positive and less than b")
}

// OR operator
if a == 0 || b == 0 {
    std.println("at least one is zero")
}

// NOT operator
if !isValid {
    std.println("not valid")
}

// Complex conditions
if (a > 5 && b > 15) || isValid {
    std.println("condition met")
}
```

## For Loops

### range()

Use `for` with `range()` to iterate over a sequence of numbers.
The end value is **exclusive** (like Python and Go).

```ez
// Single argument: range(end) - iterates 0 to end-1
for i in range(5) {
    std.print("${i} ")  // 0 1 2 3 4
}

// Two arguments: range(start, end) - iterates start to end-1
for i in range(2, 7) {
    std.print("${i} ")  // 2 3 4 5 6
}

// Three arguments: range(start, end, step)
for i in range(0, 10, 2) {
    std.print("${i} ")  // 0 2 4 6 8
}

// Negative step for countdown
for i in range(10, 0, -2) {
    std.print("${i} ")  // 10 8 6 4 2
}
```

> **Note:** `range(0, 5)` iterates 5 times (0, 1, 2, 3, 4), not 6 times.
> This matches the behavior of most modern languages and makes array iteration natural:
> `for i in range(0, len(arr))`.

## For-Each Loops

### for_each

Use `for_each` to iterate over arrays and strings directly.

```ez
// Iterate over an array
temp numbers [int] = {1, 2, 3, 4, 5}
temp sum int = 0
for_each num in numbers {
    sum += num
}
std.println("Sum:", sum)  // 15

// Iterate over a string (character by character)
temp message string = "Hello"
for_each ch in message {
    std.println(ch)  // H, e, l, l, o
}

// Iterate over array of structs
temp people [Person] = {
    Person{name: "Alice", age: 30},
    Person{name: "Bob", age: 25}
}
for_each person in people {
    std.println(person.name)
}
```

> **Note:** Use `for_each` when iterating directly over collections.
> Use `for` with `range()` when you need the index.

## While Loops

### as_long_as

EZ uses `as_long_as` instead of `while` for condition-based loops.
The loop continues as long as the condition is true.

```ez
temp count int = 0
as_long_as count < 5 {
    std.println(count)
    count += 1
}
// Prints: 0, 1, 2, 3, 4

// Reading until a condition
temp total int = 0
as_long_as total < 100 {
    total += 10
}
std.println(total)  // 100
```

## Infinite Loops

### loop

Use `loop` for infinite loops. Always include a `break` condition to exit.

```ez
temp count int = 0
loop {
    count += 1
    std.println(count)

    if count == 5 {
        break
    }
}
// Prints: 1, 2, 3, 4, 5
```

## Break and Continue

### break

Exit a loop early:

```ez
// Find first even number
temp numbers [int] = {1, 3, 5, 4, 7, 9}
for_each num in numbers {
    if num % 2 == 0 {
        std.println("Found even:", num)  // Found even: 4
        break
    }
}

// Exit when condition met
for i in range(0, 100) {
    if i == 10 {
        break
    }
    std.println(i)  // 0 through 9
}
```

### continue

Skip to the next iteration:

```ez
// Sum only even numbers
temp sum int = 0
for i in range(0, 10) {
    if i % 2 != 0 {
        continue  // skip odd numbers
    }
    sum += i
}
std.println(sum)  // 20 (0+2+4+6+8)

// Skip specific values
temp names [string] = {"Alice", "Bob", "skip", "Charlie"}
for_each name in names {
    if name == "skip" {
        continue
    }
    std.println(name)  // Alice, Bob, Charlie
}
```

## Nested Loops

Loops can be nested for multi-dimensional iteration:

```ez
// Multiplication table
for i in range(1, 4) {
    for j in range(1, 4) {
        std.print("${i * j} ")
    }
    std.println("")
}
// Output:
// 1 2 3
// 2 4 6
// 3 6 9

// Break only exits the innermost loop
for i in range(0, 3) {
    for j in range(0, 5) {
        if j == 2 {
            break  // only breaks inner loop
        }
        std.print("${i},${j} ")
    }
    std.println("")
}
```

## Membership Operators

### in / !in

Check if a value exists in an array:

```ez
temp numbers [int] = {1, 2, 3, 4, 5}

if 3 in numbers {
    std.println("Found 3!")
}

if 10 !in numbers {
    std.println("10 is not in the array")
}

// Combined with other conditions
temp validCodes [int] = {100, 200, 300}
temp code int = 200

if code in validCodes && code != 100 {
    std.println("Valid non-100 code")
}
```

## Example Program

```ez
import @std
import @arrays

do main() {
    // FizzBuzz using control flow
    std.println("FizzBuzz 1-20:")

    for i in range(1, 21) {
        if i % 15 == 0 {
            std.println("FizzBuzz")
        } or i % 3 == 0 {
            std.println("Fizz")
        } or i % 5 == 0 {
            std.println("Buzz")
        } otherwise {
            std.println(i)
        }
    }

    // Find prime numbers
    std.println("\nPrime numbers 2-30:")
    for num in range(2, 31) {
        temp isPrime bool = true

        for divisor in range(2, num) {
            if num % divisor == 0 {
                isPrime = false
                break
            }
        }

        if isPrime {
            std.print("${num} ")
        }
    }
    std.println("")

    // Process array with early exit
    temp scores [int] = {85, 92, 78, 45, 88, 95}
    temp passing [int] = {}

    for_each score in scores {
        if score < 50 {
            std.println("Found failing score, stopping")
            break
        }
        arrays.append(passing, score)
    }

    std.println("Passing scores:", passing)
}
```
