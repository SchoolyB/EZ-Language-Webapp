---
layout: '../../../layouts/DocsLayout.astro'
title: 'Variables'
description: 'Variables and constants in EZ.'
---

# Variables

EZ uses two keywords for declaring variables: `temp` for mutable values and `const` for immutable values.

## Mutable Variables (temp)

Use `temp` to declare variables that can be reassigned:

```ez
temp x int = 10
temp name string = "Alice"
temp isActive bool = true

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

### Type Inference for Constants

When assigning a function's return value to a `const`, you can omit the type annotation and let EZ infer it:

```ez
import @io

do main() {
    // Type is inferred from the function's return type
    const content = io.read_file("config.txt")
    const size = io.file_size("data.bin")

    // Explicit types still required for literal values
    const PI float = 3.14159
    const MAX_SIZE int = 100
}
```

**Note:** Type inference for `const` only works with function return values. Literal values (numbers, strings, etc.) still require explicit type annotations.

## Type Annotations

EZ is statically typed - you must declare the type:

```ez
temp count int = 0
temp price float = 19.99
temp message string = "Hello"
temp letter char = 'A'
temp enabled bool = true
```

## Default Values

Uninitialized `temp` variables get default values:

```ez
temp count int        // defaults to 0
temp price float      // defaults to 0.0
temp message string   // defaults to ""
temp letter char      // defaults to '\0'
temp flag bool        // defaults to false
```

## Primitive Types

### Integers

```ez
temp age int = 25
temp negative int = -100
temp zero int = 0
```

### Sized Integers

EZ supports explicitly sized integers:

```ez
// Signed integers
temp small i8 = -128
temp medium i32 = -100000
temp large i64 = -9223372036854775808
temp huge i128 = 1000000000000

// Unsigned integers (cannot be negative)
temp byte u8 = 255
temp word u32 = 4294967295
temp big u64 = 18446744073709551615
```

### Numeric Separators

Use underscores for readability in large numbers:

```ez
temp million int = 1_000_000
temp billion int = 7_800_000_000
temp pi float = 3.141_592_653
temp money float = 1_234.56
```

### Floats

```ez
temp pi float = 3.14159
temp temperature float = -40.5
temp percentage float = 0.85
```

### Strings

```ez
temp greeting string = "Hello, World!"
temp empty string = ""
temp multiword string = "This is a sentence."
```

### Characters

```ez
temp letter char = 'A'
temp digit char = '5'
temp symbol char = '@'
temp newline char = '\n'
```

### Booleans

```ez
temp isValid bool = true
temp hasError bool = false
```

## Arrays

```ez
// Dynamic arrays
temp numbers [int] = {1, 2, 3, 4, 5}
temp names [string] = {"Alice", "Bob", "Charlie"}
temp empty [int] = {}

// Fixed-size arrays (must use const because their size is fixed at compile time)
const DAYS [string, 7] = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}
const PRIMES [int, 5] = {2, 3, 5, 7, 11}
```

## Maps

```ez
temp ages map = {
    {"Alice", 25},
    {"Bob", 30}
}

temp scores map[string:int] = {"math": 95, "english": 88}
```

## Blank Identifier

The underscore `_` serves as a blank identifier for discarding unwanted values in multi-value assignments.

### Basic Usage

```ez
// Discard the second return value
temp result, _ = divide_with_remainder(10, 3)
std.println(result)  // 3
```

### Multiple Discards

```ez
// Keep only the middle value
temp _, middle, _ = get_three_values()
```

### Common Use Case: Ignoring Errors

```ez
do read_file(path string) -> string, string {
    // Returns (content, error)
    return "file content", ""
}

do main() {
    // When you're confident there's no error:
    temp content, _ = read_file("config.ez")
    std.println(content)
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
    temp x int = 10

    if x > 5 {
        temp y int = 20  // y only exists in this block
        std.println(x + y)
    }

    // std.println(y)  // Error! y is not in scope
}
```

## Shadowing

Inner scopes can shadow outer variables:

```ez
do main() {
    temp x int = 10
    std.println(x)  // 10

    if true {
        temp x int = 20  // shadows outer x
        std.println(x)   // 20
    }

    std.println(x)  // 10 (original x)
}
```

## Copy-by-Default Semantics

EZ uses **copy-by-default** for all assignments. When you assign a value to a new variable, you get an independent copy:

```ez
const Person struct {
    name string
    age int
}

do main() {
    temp p1 Person = Person{name: "Alice", age: 30}
    temp p2 Person = p1  // p2 is an independent copy

    p2.age = 31
    std.println(p1.age)  // 30 - unchanged
    std.println(p2.age)  // 31
}
```

This applies to all types including:
- Primitives (int, float, string, bool, char)
- Structs
- Arrays
- Maps

### Shared Data with ref()

When you need multiple variables to share the same data, use `ref()`:

```ez
do main() {
    temp p1 Person = Person{name: "Alice", age: 30}
    temp p2 Person = ref(p1)  // p2 references the same data

    p2.age = 31
    std.println(p1.age)  // 31 - both changed!
    std.println(p2.age)  // 31
}
```

Use `ref()` when:
- Multiple variables need to share and modify the same data
- You want changes in one place to be visible everywhere
- You want to avoid copying overhead for large data structures

```ez
// Arrays with ref()
temp original [int] = {1, 2, 3}
temp shared [int] = ref(original)
shared[0] = 100
std.println(original[0])  // 100 - both share the same array

// Without ref() - independent copy
temp copied [int] = original
copied[1] = 200
std.println(original[1])  // 2 - original unchanged
```

### Explicit Copying with copy()

While `copy()` is no longer required for independent copies (since that's the default), it remains available for explicit intent:

```ez
temp a Person = Person{name: "Bob", age: 25}
temp b Person = copy(a)  // Explicitly states "I want a copy"
// Same result as: temp b Person = a
```

## Compound Assignment

```ez
temp count int = 10

count += 5   // count = 15
count -= 3   // count = 12
count *= 2   // count = 24
count /= 4   // count = 6
count %= 4   // count = 2
```

## Increment and Decrement

```ez
temp i int = 0

i++  // i = 1
i++  // i = 2
i--  // i = 1
```

## Type Conversion

Convert between types explicitly:

```ez
// String to number
temp str string = "42"
temp num int = int(str)
temp decimal float = float("3.14")

// Number to string
temp n int = 100
temp s string = string(n)

// Float to int (truncates)
temp pi float = 3.14159
temp whole int = int(pi)  // 3

// Int to float
temp x int = 42
temp y float = float(x)  // 42.0
```

## Example Program

```ez
import @std

do main() {
    // Constants
    const TAX_RATE float = 0.08
    const STORE_NAME string = "EZ Mart"

    // Variables
    temp subtotal float = 0.0
    temp itemCount int = 0

    // Add items
    temp prices [float] = {9.99, 24.99, 4.99, 14.99}

    for_each price in prices {
        subtotal += price
        itemCount++
    }

    temp tax float = subtotal * TAX_RATE
    temp total float = subtotal + tax

    std.println("=== ${STORE_NAME} ===")
    std.println("Items: ${itemCount}")
    std.println("Subtotal: $${subtotal}")
    std.println("Tax (${TAX_RATE * 100}%): $${tax}")
    std.println("Total: $${total}")
}
```
