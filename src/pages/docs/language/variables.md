---
layout: '../../../layouts/DocsLayout.astro'
title: 'Variables'
description: 'Variables and constants in EZ.'
---

# Variables

EZ uses two keywords for declaring variables: `mut` for mutable values and `const` for immutable values.

## Mutable Variables (mut)

Use `mut` to declare variables that can be reassigned:

```ez
mut x int = 10
mut name string = "Alice"
mut isActive bool = true

// Reassignment is allowed
x = 20
name = "Bob"
isActive = false
```

## Immutable Constants (const)

Use `const` to declare values that cannot change:

```ez
const PI float = 3.14159
const MAX_SIZE int = 100
const APP_NAME string = "MyApp"

// This would cause an error:
// PI = 3.14  // Error! Cannot reassign const
```

## Type Inference

EZ has full type inference. The type of every variable is known at compile time, but explicit type annotations are optional when the compiler can determine the type from the initializer.

```ez
// Inferred from literals
mut x = 42                    // Inferred: int
mut name = "Alice"            // Inferred: string
mut pi = 3.14                 // Inferred: float
mut flag = true               // Inferred: bool

// Explicit annotations are always accepted
mut y int = 42                // Explicit: int

// Inferred from function return type
do sum(a int, b int) -> int {
    return a + b
}
mut result = sum(1, 2)        // Inferred: int

// Inferred from struct literal
const p = Point{x: 1, y: 2}  // Inferred: Point

// Inferred from built-in constructors
mut val = new(Person)         // Inferred: ^Person (pointer)
mut dup = copy(val)           // Inferred: Person

// Inferred from array literal
mut arr = {1, 2, 3}           // Inferred: [int]

// Multiple return values
do divide(a, b int) -> (int, int) {
    return a / b, a % b
}
mut quotient, remainder = divide(10, 3)  // Both inferred: int
```

Explicit type annotations are never required but can be used for clarity or documentation.

## Type Annotations

EZ is statically typed — you can declare the type explicitly:

```ez
mut count int = 0
mut price float = 19.99
mut message string = "Hello"
mut letter char = 'A'
mut enabled bool = true
```

## Primitive Types

### Integers

```ez
mut age int = 25
mut negative int = -100
mut zero int = 0
```

### Sized Integers

EZ supports explicitly sized integers:

```ez
// Signed integers
mut small i8 = -128
mut medium i32 = -100000
mut large i64 = -9223372036854775808

// Unsigned integers (cannot be negative)
mut byte_val u8 = 255
mut word u32 = 4294967295
mut big u64 = 18446744073709551615
```

### Numeric Separators

Use underscores for readability in large numbers:

```ez
mut million int = 1_000_000
mut billion int = 7_800_000_000
mut hex int = 0xFF_FF
mut octal int = 0o777
mut binary int = 0b1111_0000
```

### Floats

```ez
mut pi float = 3.14159
mut temperature float = -40.5
mut percentage float = 0.85
```

### Strings

```ez
mut greeting string = "Hello, World!"
mut empty string = ""
mut multiword string = "This is a sentence."
```

### Characters

```ez
mut letter char = 'A'
mut digit char = '5'
mut symbol char = '@'
mut newline char = '\n'
```

### Booleans

```ez
mut isValid bool = true
mut hasError bool = false
```

## Arrays

```ez
// Dynamic arrays
mut numbers [int] = {1, 2, 3, 4, 5}
mut names [string] = {"Alice", "Bob", "Charlie"}
mut empty [int] = {}

// Fixed-size arrays (must use const because their size is fixed at checktime)
const DAYS [string, 7] = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}
const PRIMES [int, 5] = {2, 3, 5, 7, 11}
```

## Maps

```ez
mut scores map[string:int] = {"math": 95, "english": 88}

// Maps must be declared with mut
mut ages map[string:int] = {
    "Alice": 30,
    "Bob": 25
}
```

### Empty Collections

Use `{}` for empty arrays and `{:}` for empty maps:

```ez
// Empty array
mut numbers [int] = {}

// Empty map - use {:} to distinguish from empty array
mut scores map[string:int] = {:}
```

The `{:}` syntax is necessary because `{}` alone is ambiguous — it could be an empty array or an empty map. The colon `:` signals that it's a map (just like `{"key": value}` uses `:` for key-value pairs).

```ez
do main() {
    // Empty map, then add items
    mut users map[string:int] = {:}
    users["Alice"] = 25
    users["Bob"] = 30

    println("Users: ${users}")  // {"Alice": 25, "Bob": 30}
    println("Count: ${len(users)}")  // 2
}
```

## Blank Identifier

The underscore `_` serves as a blank identifier for discarding unwanted values in multi-value assignments.

### Basic Usage

```ez
// Discard the second return value
mut result, _ = divide_with_remainder(10, 3)
println(result)  // 3
```

### Multiple Discards

```ez
// Keep only the middle value
mut _, middle, _ = get_three_values()
```

### Common Use Case: Ignoring Errors

```ez
do read_file(path string) -> (string, Error) {
    // Returns (content, Error)
    return "file content", nil
}

do main() {
    // When you're confident there's no error:
    mut content, _ = read_file("config.ez")
    println(content)
}
```

### Rules

- `_` can appear multiple times in the same assignment
- Values assigned to `_` are evaluated but not stored
- `_` cannot be read from (it's write-only)

---

## Variable Scope

Variables are scoped to their containing block:

```ez
do main() {
    mut x int = 10

    if x > 5 {
        mut y int = 20  // y only exists in this block
        println(x + y)
    }

    // println(y)  // Error! y is not in scope
}
```

## Shadowing

Inner scopes can shadow outer variables:

```ez
do main() {
    mut x int = 10
    println(x)  // 10

    if true {
        mut x int = 20  // shadows outer x
        println(x)   // 20
    }

    println(x)  // 10 (original x)
}
```

## Mutability

The `const` keyword indicates complete immutability:

```ez
const arr [int, 3] = {1, 2, 3}
arr[0] = 10  // ERROR: Cannot modify const
arr = {4, 5, 6}  // ERROR: Cannot reassign const
```

The `mut` keyword allows modification and **ensures the value itself is mutable**:

```ez
mut arr [int] = {1, 2, 3}
arr[0] = 10  // OK
arr = {4, 5, 6}  // OK
```

When assigning from a function return or other source, `mut` automatically makes the value mutable:

```ez
do get_data() -> [int] {
    return {1, 2, 3}
}

mut arr = get_data()  // arr is mutable
arrays.append(arr, 4)  // OK - can modify directly

const fixed = get_data()  // fixed is immutable
arrays.append(fixed, 4)   // ERROR - cannot modify const
```

### Shared Data with ref()

When you need multiple variables to share the same data, use `ref()`:

```ez
do main() {
    mut arr [int] = {1, 2, 3}

    // mut ref is mutable - can modify through the reference
    mut r1 = ref(arr)
    arrays.append(r1, 4)  // OK - modifies arr

    // const ref is read-only - can read but not modify
    const r2 = ref(arr)
    mut val = r2[0]      // OK - can read
    arrays.append(r2, 5)  // ERROR - cannot modify through const ref

    // const ref sees changes made to the original
    arrays.append(arr, 6)
    println(r2[4])        // Prints 6 - r2 sees the change
}
```

### Explicit Copying with copy()

Use `copy()` to create a deep copy of any value:

```ez
mut a = Person{name: "Bob", age: 25}
mut b = copy(a)  // b is an independent deep copy
b.age = 26
println(a.age)  // 25 - unchanged
```

## Compound Assignment

```ez
mut count int = 10

count += 5   // count = 15
count -= 3   // count = 12
count *= 2   // count = 24
count /= 4   // count = 6
count %= 5   // count = 1
```

## Increment and Decrement

```ez
mut i int = 0

i++  // i = 1
i++  // i = 2
i--  // i = 1
```

## Type Conversion

Convert between types explicitly:

```ez
// String to number
mut str string = "42"
mut num int = int(str)
mut decimal float = float("3.14")

// Number to string
mut n int = 100
mut s string = string(n)

// Float to int (truncates)
mut pi float = 3.14159
mut whole int = int(pi)  // 3

// Int to float
mut x int = 42
mut y float = float(x)  // 42.0
```

## Example Program

```ez
do main() {
    // Constants
    const TAX_RATE float = 0.08
    const STORE_NAME string = "EZ Mart"

    // Variables
    mut subtotal float = 0.0
    mut itemCount int = 0

    // Add items
    mut prices [float] = {9.99, 24.99, 4.99, 14.99}

    for_each price in prices {
        subtotal += price
        itemCount++
    }

    mut tax float = subtotal * TAX_RATE
    mut total float = subtotal + tax

    println("=== ${STORE_NAME} ===")
    println("Items: ${itemCount}")
    println("Subtotal: $${subtotal}")
    println("Tax (${TAX_RATE * 100}%): $${tax}")
    println("Total: $${total}")
}
```

## See Also
- [Types](/EZ-Language-Webapp/docs/language/types) — all available types and type conversions
- [Arrays](/EZ-Language-Webapp/docs/language/arrays) — array declarations and `const` vs `mut` arrays
- [Maps](/EZ-Language-Webapp/docs/language/maps) — map declarations and the `{:}` empty map syntax
- [Functions](/EZ-Language-Webapp/docs/language/functions) — using variables as function parameters
- [Structs](/EZ-Language-Webapp/docs/language/structs) — struct variable declarations
- [Modules](/EZ-Language-Webapp/docs/language/modules) — importing and using modules
