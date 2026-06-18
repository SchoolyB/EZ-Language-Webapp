---
layout: '../../../layouts/DocsLayout.astro'
title: 'Arrays'
description: 'Ordered collections of values in EZ.'
---

# Arrays

Arrays are ordered collections of elements of the same type. They use square brackets for the type and curly braces for values.

## Declaring Arrays

Use the `[type]` syntax to declare an array:

```ez
mut numbers [int] = {1, 2, 3, 4, 5}
mut names [string] = {"Alice", "Bob", "Charlie"}
mut flags [bool] = {true, false, true}
```

Arrays always require an explicit type annotation — type inference does not work with array literals:

```ez
mut numbers [int] = {1, 2, 3, 4, 5}
mut names [string] = {"Alice", "Bob", "Charlie"}

// mut nums = {1, 2, 3}  // Error: array needs a type annotation
```

## Empty Arrays

Use `{}` to create an empty array:

```ez
mut empty [int] = {}
mut noNames [string] = {}
```

## Accessing Elements

Arrays are zero-indexed. Use `arr[index]` to access elements:

```ez
mut numbers [int] = {1, 2, 3, 4, 5}

println(numbers[0])  // 1
println(numbers[2])  // 3
println(numbers[4])  // 5
```

> **Note:** Accessing an index outside the valid range produces a runtime error.

## Modifying Elements

Assign to an index to modify an element (only for `mut` arrays):

```ez
mut numbers [int] = {1, 2, 3}
numbers[0] = 100
println(numbers)  // {100, 2, 3}
```

## Array Length

Use `len()` to get the number of elements:

```ez
mut numbers [int] = {1, 2, 3, 4, 5}
mut names [string] = {"Alice", "Bob"}
mut empty [int] = {}

println(len(numbers))  // 5
println(len(names))    // 2
println(len(empty))    // 0
```

## Fixed-Size Arrays

Fixed-size arrays have a maximum length specified at declaration and must use `const`:

```ez
const DAYS [string, 7] = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}
const PRIMES [int, 5] = {2, 3, 5, 7, 11}
const MATRIX [int, 9] = {1, 2, 3, 4, 5, 6, 7, 8, 9}
```

You can provide **fewer** values than the declared size — a warning is issued but it's not an error:

```ez
const SLOTS [int, 5] = {0, 1, 2}  // OK - warning, but valid (3 of 5 slots used)
```

However, providing **more** values than the declared size is an error:

```ez
const SLOTS [int, 5] = {0, 1, 2, 3, 4, 5}  // Error! 6 values exceeds size of 5
```

> **Important:** Fixed-size arrays must be declared with `const` because their size is fixed at checktime.

## Multi-Dimensional Arrays

Use nested bracket syntax for multi-dimensional arrays:

```ez
// 2D array (matrix)
mut matrix [[int]] = {{1, 2}, {3, 4}, {5, 6}}

// 3D array
mut cube [[[int]]] = {{{1, 2}, {3, 4}}, {{5, 6}, {7, 8}}}

// Accessing elements
mut row [int] = matrix[0]       // {1, 2}
mut value int = matrix[1][1]    // 4
matrix[0][1] = 99               // modify element
```

### Jagged Arrays

Inner arrays can have different lengths:

```ez
mut jagged [[int]] = {{1, 2, 3}, {4, 5}, {6}}
// jagged[0] has 3 elements
// jagged[1] has 2 elements
// jagged[2] has 1 element
```

### Iterating Multi-Dimensional Arrays

```ez
mut matrix [[int]] = {{1, 2}, {3, 4}, {5, 6}}

// Iterate over rows
for_each row in matrix {
    println(row)
}

// Iterate over all elements
for_each row in matrix {
    for_each value in row {
        println(value)
    }
}
```

> **Note:** Fixed-size multi-dimensional arrays are not currently supported. Use `mut` for all multi-dimensional array declarations.

## Byte Arrays

Byte arrays are specialized arrays for binary data, buffers, or raw file contents:

```ez
// Dynamic byte array
mut buffer [byte] = {0, 128, 255}
mut empty [byte] = {}

// Fixed-size byte array (must use const)
const HEADER [byte, 4] = {137, 80, 78, 71}  // PNG magic bytes
```

> **Note:** Byte values can be written as decimal (0–255) or hexadecimal (0x00–0xFF). For most use cases, the dynamic `[byte]` type is recommended over fixed-size byte arrays.

## Iterating

### for_each

Iterate over every element:

```ez
mut names [string] = {"Alice", "Bob", "Charlie"}

for_each name in names {
    println(name)
}
```

### for_each with Index

Use a comma-separated pair to get the index (starting at 0):

```ez
mut fruits [string] = {"apple", "banana", "cherry"}

for_each i, fruit in fruits {
    println("${i}: ${fruit}")
}
// 0: apple
// 1: banana
// 2: cherry
```

### for with range()

Use `for` with `range()` and `len()` for index-based iteration:

```ez
mut numbers [int] = {10, 20, 30, 40, 50}

for i in range(0, len(numbers)) {
    println("numbers[${i}] = ${numbers[i]}")
}
```

## Membership

Use `in` and `not_in` (or `!in`) to check if a value exists in an array:

```ez
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
```

## Arrays as Function Parameters

Arrays can be passed to functions like any other type:

```ez
do printAll(items [string]) {
    for_each item in items {
        println("  - ${item}")
    }
}

do main() {
    mut names [string] = {"Alice", "Bob", "Charlie"}
    printAll(names)
}
```

### Mutable Parameters

By default, array parameters are read-only. Use `&` to allow modification:

```ez
do addDefaults(&items [int]) {
    items[0] = 0
}

do main() {
    mut numbers [int] = {1, 2, 3}
    addDefaults(numbers)
    println(numbers)  // {0, 2, 3}
}
```

> **Note:** Only `mut` variables can be passed to mutable (`&`) parameters. Passing a `const` variable to a `&` parameter will produce an error.

## Const vs Mut Arrays

`mut` arrays can be modified; `const` arrays cannot:

```ez
// Mutable - elements can be changed
mut numbers [int] = {1, 2, 3}
numbers[0] = 100  // OK

// Immutable - elements cannot be changed
const FIXED [int] = {1, 2, 3}
// FIXED[0] = 100  // Error! Cannot modify const
```

Fixed-size arrays always require `const`:

```ez
const DAYS [string, 7] = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}
```

## See Also
- [Types](/EZ-Language-Webapp/docs/language/types) — primitive and composite types
- [@arrays](/EZ-Language-Webapp/docs/stdlib/arrays) — array manipulation functions (append, remove, sort, etc.)
- [Functions](/EZ-Language-Webapp/docs/language/functions) — arrays as parameters and mutable `&` params
- [Control Flow](/EZ-Language-Webapp/docs/language/control-flow) — `for_each` and `for` loops for iteration
