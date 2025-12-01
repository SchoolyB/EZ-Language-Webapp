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

// Fixed-size arrays (must use const)
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
