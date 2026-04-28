---
layout: '../../../layouts/DocsLayout.astro'
title: 'Control Flow'
description: 'Conditionals, loops, and flow control in EZ.'
---

# Control Flow

EZ provides clear, readable control flow constructs for conditionals and loops.
The keywords are designed to be intuitive: `if`/`or`/`otherwise` for branching,
`for`/`for_each` for iteration, and `as_long_as`/`while`/`loop` for conditional and infinite loops.

> **Note:** Parentheses around conditions are optional in EZ.
> `if x > 5 {}` and `if (x > 5) {}` are both valid. The same applies to `for` and `as_long_as`/`while`.

## Conditionals

### if / or / otherwise

EZ uses `if`, `or` (instead of else if), and `otherwise` (instead of else) for conditional branching.

```ez
mut x int = 15

if x > 20 {
    println("large")
} or x > 10 {
    println("medium")
} or x > 5 {
    println("small")
} otherwise {
    println("tiny")
}
```

### Simple if

A simple condition without alternatives:

```ez
mut age int = 21

if age >= 18 {
    println("You are an adult")
}
```

### Logical Operators in Conditions

Combine conditions with `&&` (and), `||` (or), and `!` (not):

```ez
mut a int = 10
mut b int = 20
mut isValid bool = true

// AND operator
if a < b && a > 0 {
    println("a is positive and less than b")
}

// OR operator
if a == 0 || b == 0 {
    println("at least one is zero")
}

// NOT operator
if !isValid {
    println("not valid")
}

// Complex conditions
if (a > 5 && b > 15) || isValid {
    println("condition met")
}
```

## For Loops

### range()

Use `for` with `range()` to iterate over a sequence of numbers.
The end value is **exclusive** (like Python and Go).

```ez
// Two arguments: range(start, end) - iterates start to end-1
for i in range(0, 5) {
    print("${i} ")  // 0 1 2 3 4
}

// Three arguments: range(start, end, step)
for i in range(0, 10, 2) {
    print("${i} ")  // 0 2 4 6 8
}

// Negative step for countdown
for i in range(10, 0, -2) {
    print("${i} ")  // 10 8 6 4 2
}
```

> **Note:** `range(0, 5)` iterates 5 times (0, 1, 2, 3, 4), not 6 times.
> This matches the behavior of most modern languages and makes array iteration natural:
> `for i in range(0, len(arr))`.

### Ignoring the Loop Variable

Use `_` (blank identifier) when you don't need the loop variable:

```ez
// Execute something 5 times without using the index
for _ in range(0, 5) {
    println("Hello!")
}
```

## For-Each Loops

### for_each

Use `for_each` to iterate over arrays, strings, and maps directly.

```ez
// Iterate over an array
mut numbers [int] = {1, 2, 3, 4, 5}
mut sum int = 0
for_each num in numbers {
    sum += num
}
println("Sum:", sum)  // 15

// Iterate over a string (character by character)
mut message string = "Hello"
for_each ch in message {
    println(ch)  // H, e, l, l, o
}

// Iterate over array of structs
mut people [Person] = {
    Person{name: "Alice", age: 30},
    Person{name: "Bob", age: 25}
}
for_each person in people {
    println(person.name)
}
```

> **Note:** Use `for_each` when iterating directly over collections.
> Use `for` with `range()` when you need a numeric loop counter.

### for_each with Index

Add an index variable by using a comma-separated pair. The index starts at 0:

```ez
do main() {
    mut fruits [string] = {"apple", "banana", "cherry"}
    for_each i, fruit in fruits {
        println("${i}: ${fruit}")
    }
    // Output:
    // 0: apple
    // 1: banana
    // 2: cherry
}
```

Works with strings too — the index is the character position:

```ez
do main() {
    for_each i, ch in "hello" {
        println("${i}: ${ch}")
    }
    // Output: 0: h, 1: e, 2: l, 3: l, 4: o
}
```

Use `_` in either position to discard:

```ez
// Index only, discard value
for_each i, _ in items {
    println("index: ${i}")
}

// Same as basic for_each (discard index)
for_each _, item in items {
    println(item)
}
```

### Map Iteration

`for_each` works directly with maps. With two variables, the first is the key and the second is the value:

```ez
mut ages map[string:int] = {"alice": 30, "bob": 25}
for_each k, v in ages {
    println("${k}: ${v}")
}

// Single variable iterates keys only
for_each key in ages {
    println(key)
}
```

Map iteration order is undefined (maps are unordered).

## While Loops

### as_long_as / while

EZ uses `as_long_as` for condition-based loops. `while` is an alias — both are valid.
The loop continues as long as the condition is true.

```ez
mut count int = 0
as_long_as count < 5 {
    println(count)
    count += 1
}
// Prints: 0, 1, 2, 3, 4

// Equivalent using while:
mut total int = 0
while total < 100 {
    total += 10
}
println(total)  // 100
```

## Infinite Loops

### loop

Use `loop` for infinite loops. Always include a `break` condition to exit.

```ez
mut count int = 0
loop {
    count += 1
    println(count)

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
mut numbers [int] = {1, 3, 5, 4, 7, 9}
for_each num in numbers {
    if num % 2 == 0 {
        println("Found even:", num)  // Found even: 4
        break
    }
}

// Exit when condition met
for i in range(0, 100) {
    if i == 10 {
        break
    }
    println(i)  // 0 through 9
}
```

### continue

Skip to the next iteration:

```ez
// Sum only even numbers
mut sum int = 0
for i in range(0, 10) {
    if i % 2 != 0 {
        continue  // skip odd numbers
    }
    sum += i
}
println(sum)  // 20 (0+2+4+6+8)

// Skip specific values
mut names [string] = {"Alice", "Bob", "skip", "Charlie"}
for_each name in names {
    if name == "skip" {
        continue
    }
    println(name)  // Alice, Bob, Charlie
}
```

## Nested Loops

Loops can be nested for multi-dimensional iteration:

```ez
// Multiplication table
for i in range(1, 4) {
    for j in range(1, 4) {
        print("${i * j} ")
    }
    println("")
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
        print("${i},${j} ")
    }
    println("")
}
```

## Pattern Matching

### when / is

The `when/is` statement provides pattern matching, similar to switch/case in other languages. It's cleaner than long `if/or/otherwise` chains when matching against specific values.

```ez
mut x int = 2

when x {
    is 1 { println("one") }
    is 2 { println("two") }
    is 3 { println("three") }
    default { println("other") }
}
// Output: two
```

### Multiple Values Per Case

Match against several values in a single case:

```ez
mut day int = 6

when day {
    is 1, 2, 3, 4, 5 { println("weekday") }
    is 6, 7 { println("weekend") }
    default { println("invalid") }
}
// Output: weekend
```

### Range Matching

Use `range()` to match value ranges:

```ez
mut score int = 85

when score {
    is range(0, 60) { println("F") }
    is range(60, 70) { println("D") }
    is range(70, 80) { println("C") }
    is range(80, 90) { println("B") }
    is range(90, 101) { println("A") }
    default { println("Invalid") }
}
// Output: B
```

### String Matching

```ez
mut color string = "green"

when color {
    is "red" { println("stop") }
    is "yellow" { println("caution") }
    is "green" { println("go") }
    default { println("unknown") }
}
// Output: go
```

### Enum Matching

```ez
const Status enum {
    PENDING
    ACTIVE
    DONE
}

mut status = Status.ACTIVE

when status {
    is Status.PENDING { println("waiting") }
    is Status.ACTIVE { println("working") }
    is Status.DONE { println("finished") }
    default { println("unknown") }
}
// Output: working
```

### Strict Enum Matching

The `#strict` attribute enforces exhaustive case coverage for enums — all enum values must be handled, and no `default` case is allowed:

```ez
const Status enum {
    PENDING
    ACTIVE
    DONE
}

mut s = Status.DONE

#strict
when s {
    is Status.PENDING { println("pending") }
    is Status.ACTIVE { println("active") }
    is Status.DONE { println("done") }
}
// All enum values must be covered - no default allowed
```

### Valid When Conditions

`when` works with:

- Integer types: `int`, `i8`, `i16`, `i32`, `i64`, `i128`
- Unsigned integers: `uint`, `u8`, `u16`, `u32`, `u64`, `u128`
- Characters: `char`
- Bytes: `byte`
- Strings: `string`
- Booleans: `bool`
- Floats: `float` (warning about imprecision)
- Enum values
- `nil`

### Invalid When Conditions

These will cause checktime errors:

- **Type names** — use a variable instead
- **Arrays or maps** — not supported as when conditions

---

## Membership Operators

### in / not_in / !in

Check if a value exists in an array, map, or range:

```ez
// Array membership
mut numbers [int] = {1, 2, 3, 4, 5}

if 3 in numbers {
    println("Found 3!")
}

if 10 not_in numbers {
    println("10 is not in the array")
}

// !in is shorthand for not_in
if 10 !in numbers {
    println("10 is not in the array")
}

// Map key membership
mut ages map[string:int] = {"Alice": 30, "Bob": 25}

if "Alice" in ages {
    println("Alice found!")
}

if "Charlie" not_in ages {
    println("Charlie not found")
}
```

### Range Checks with in

You can also use `range()` with `in` to check if a value falls within a numeric range:

```ez
mut age int = 25

// Check if value is in range (end is exclusive)
if age in range(18, 65) {
    println("Working age")
}

// Equivalent to: if age >= 18 && age < 65

mut score int = 85

if score in range(90, 101) {
    println("A grade")
} or score in range(80, 90) {
    println("B grade")
} or score in range(70, 80) {
    println("C grade")
} otherwise {
    println("Below C")
}
// Output: B grade
```

> **Note:** The range end is exclusive, just like in `for` loops. `range(0, 10)` includes 0-9.

## Example Program

```ez
import @arrays

do main() {
    // FizzBuzz using control flow
    println("FizzBuzz 1-20:")

    for i in range(1, 21) {
        if i % 15 == 0 {
            println("FizzBuzz")
        } or i % 3 == 0 {
            println("Fizz")
        } or i % 5 == 0 {
            println("Buzz")
        } otherwise {
            println(i)
        }
    }

    // Find prime numbers
    println("\nPrime numbers 2-30:")
    for num in range(2, 31) {
        mut isPrime = true

        for divisor in range(2, num) {
            if num % divisor == 0 {
                isPrime = false
                break
            }
        }

        if isPrime {
            print("${num} ")
        }
    }
    println("")

    // Process array with early exit
    mut scores [int] = {85, 92, 78, 45, 88, 95}
    mut passing [int] = {}

    for_each score in scores {
        if score < 50 {
            println("Found failing score, stopping")
            break
        }
        arrays.append(passing, score)
    }

    println("Passing scores:", passing)
}
```

## See Also
- [Arrays](/EZ-Language-Webapp/docs/language/arrays) — iterating arrays with `for_each` and `for`
- [Maps](/EZ-Language-Webapp/docs/language/maps) — iterating maps with `for_each`
- [Functions](/EZ-Language-Webapp/docs/language/functions) — function declarations and return values
- [Keywords](/EZ-Language-Webapp/docs/language/keywords) — full keyword reference including control flow keywords
- [Enums](/EZ-Language-Webapp/docs/language/enums) — enum types used with `when/is` and `#strict`
- [Attributes](/EZ-Language-Webapp/docs/language/attributes) — `#strict` attribute for exhaustive matching
