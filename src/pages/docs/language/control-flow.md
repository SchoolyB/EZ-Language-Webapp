---
layout: '../../../layouts/DocsLayout.astro'
title: 'Control Flow'
description: 'Conditionals, loops, and flow control in EZ.'
---

# Control Flow

EZ provides clear, readable control flow constructs for conditionals and loops.
The keywords are designed to be intuitive: `if`/`or`/`otherwise` for branching,
`for`/`for_each` for iteration, and `as_long_as`/`loop` for conditional and infinite loops.

> **Note:** Parentheses around conditions are optional in EZ.
> `if x > 5 {}` and `if (x > 5) {}` are both valid. The same applies to `for` and `as_long_as`.

## Conditionals

### if / or / otherwise

EZ uses `if`, `or` (instead of else if), and `otherwise` (instead of else) for conditional branching.

```ez
import @std

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
import @std

temp age int = 21

if age >= 18 {
    std.println("You are an adult")
}
```

### Logical Operators in Conditions

Combine conditions with `&&` (and), `||` (or), and `!` (not):

```ez
import @std

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
import @std

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

### Ignoring the Loop Variable

Use `_` (blank identifier) when you don't need the loop variable:

```ez
import @std

// Execute something 5 times without using the index
for _ in range(5) {
    std.println("Hello!")
}

// Useful when you only care about the count, not the value
temp count int = 0
for _ in range(0, 100) {
    count += do_something()
}
```

## For-Each Loops

### for_each

Use `for_each` to iterate over arrays and strings directly.

```ez
import @std

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

### Ignoring Values in for_each

Use `_` when you only need to iterate but don't use the values:

```ez
import @std

temp items [int] = {1, 2, 3, 4, 5}

// Count items without using the values
temp count int = 0
for_each _ in items {
    count++
}
std.println("Count:", count)  // 5
```

## While Loops

### as_long_as

EZ uses `as_long_as` instead of `while` for condition-based loops.
The loop continues as long as the condition is true.

```ez
import @std

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
import @std

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
import @std

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
import @std

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
import @std

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

## Pattern Matching

### when / is

The `when/is` statement provides pattern matching, similar to switch/case in other languages. It's cleaner than long `if/or/otherwise` chains when matching against specific values.

```ez
import @std

temp x int = 2

when x {
    is 1 { std.println("one") }
    is 2 { std.println("two") }
    is 3 { std.println("three") }
    default { std.println("other") }
}
// Output: two
```

### Multiple Values Per Case

Match against several values in a single case:

```ez
import @std

temp day int = 6

when day {
    is 1, 2, 3, 4, 5 { std.println("weekday") }
    is 6, 7 { std.println("weekend") }
    default { std.println("invalid") }
}
// Output: weekend
```

### Range Matching

Use `range()` to match value ranges:

```ez
import @std

temp score int = 85

when score {
    is range(0, 60) { std.println("F") }
    is range(60, 70) { std.println("D") }
    is range(70, 80) { std.println("C") }
    is range(80, 90) { std.println("B") }
    is range(90, 101) { std.println("A") }
    default { std.println("Invalid") }
}
// Output: B
```

### String Matching

```ez
import @std

temp color string = "green"

when color {
    is "red" { std.println("stop") }
    is "yellow" { std.println("caution") }
    is "green" { std.println("go") }
    default { std.println("unknown") }
}
// Output: go
```

### Enum Matching

```ez
import @std

const Status enum {
    PENDING,
    ACTIVE,
    DONE
}

temp status = Status.ACTIVE

when status {
    is Status.PENDING { std.println("waiting") }
    is Status.ACTIVE { std.println("working") }
    is Status.DONE { std.println("finished") }
    default { std.println("unknown") }
}
// Output: working
```

### Strict Enum Matching

The `#strict` attribute enforces exhaustive case coverage for enums — all enum values must be handled, and no `default` case is allowed:

```ez
import @std

const Status enum {
    PENDING,
    ACTIVE,
    DONE
}

temp s = Status.DONE

#strict
when s {
    is Status.PENDING { std.println("pending") }
    is Status.ACTIVE { std.println("active") }
    is Status.DONE { std.println("done") }
}
// All enum values must be covered - no default allowed
```

### Nested When Statements

```ez
import @std

temp category int = 1
temp subcategory int = 2

when category {
    is 1 {
        when subcategory {
            is 1 { std.println("1-1") }
            is 2 { std.println("1-2") }
            default { std.println("1-other") }
        }
    }
    is 2 {
        std.println("category-2")
    }
    default {
        std.println("other-category")
    }
}
// Output: 1-2
```

### Valid When Conditions

`when` works with:

- Integer types: `int`, `i8`, `i16`, `i32`, `i64`, `i128`
- Unsigned integers: `uint`, `u8`, `u16`, `u32`, `u64`, `u128`
- Characters: `char`
- Strings: `string`
- Enum values
- Function calls returning allowed types

### Invalid When Conditions

These will cause compile errors:

- **Type names** — use a variable instead
- **Boolean values or expressions** — use `if/otherwise`
- **`nil` values** — use `if/otherwise` to check for nil
- **Arrays or maps** — not supported as when conditions

**Related Errors:**
- [E2041](/language.ez/errors/E2041): when statement requires a default case
- [E2042](/language.ez/errors/E2042): strict when statement cannot have a default case
- [E2043](/language.ez/errors/E2043): duplicate case value in when statement
- [E2048](/language.ez/errors/E2048): when condition cannot be a boolean

---

## Membership Operators

### in / !in

Check if a value exists in an array:

```ez
import @std

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

### Range Checks with in

You can also use `range()` with `in` to check if a value falls within a numeric range:

```ez
import @std

temp age int = 25

// Check if value is in range (end is exclusive)
if age in range(18, 65) {
    std.println("Working age")
}

// Equivalent to: if age >= 18 && age < 65

temp score int = 85

if score in range(90, 101) {
    std.println("A grade")
} or score in range(80, 90) {
    std.println("B grade")
} or score in range(70, 80) {
    std.println("C grade")
} otherwise {
    std.println("Below C")
}
// Output: B grade
```

> **Note:** The range end is exclusive, just like in `for` loops. `range(0, 10)` includes 0-9.

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
