---
layout: '../../../layouts/DocsLayout.astro'
title: 'Types'
description: 'The EZ type system.'
---

# Types

EZ is a statically-typed language with strong typing. Types are checked at compile time, and there is no implicit type coercion.

## Primitive Types

### int

Integer numbers (whole numbers):

```ez
temp age int = 25
temp count int = -100
temp zero int = 0
```

### float

Floating-point numbers (decimals):

```ez
temp pi float = 3.14159
temp temperature float = -40.5
temp percentage float = 0.85
```

### string

Text values:

```ez
temp name string = "Alice"
temp empty string = ""
temp sentence string = "Hello, World!"
```

### char

Single characters:

```ez
temp letter char = 'A'
temp digit char = '5'
temp newline char = '\n'
```

### bool

Boolean values:

```ez
temp isActive bool = true
temp hasError bool = false
```

## Sized Integers

EZ provides explicitly sized integers for when you need precise control:

### Signed Integers

Can hold positive and negative values:

| Type | Size | Range |
|------|------|-------|
| `i8` | 8 bits | -128 to 127 |
| `i16` | 16 bits | -32,768 to 32,767 |
| `i32` | 32 bits | -2.1 billion to 2.1 billion |
| `i64` | 64 bits | -9.2 quintillion to 9.2 quintillion |
| `i128` | 128 bits | Very large range |
| `i256` | 256 bits | Extremely large range |

```ez
temp small i8 = -128
temp medium i32 = -100000
temp large i64 = -9223372036854775808
```

### Unsigned Integers

Only positive values (and zero):

| Type | Size | Range |
|------|------|-------|
| `u8` | 8 bits | 0 to 255 |
| `u16` | 16 bits | 0 to 65,535 |
| `u32` | 32 bits | 0 to 4.2 billion |
| `u64` | 64 bits | 0 to 18.4 quintillion |
| `u128` | 128 bits | Very large range |
| `u256` | 256 bits | Extremely large range |
| `uint` | Platform-dependent | 0 to platform max |

```ez
temp byte u8 = 255
temp word u32 = 4294967295
temp big u64 = 18446744073709551615
```

## Arrays

Ordered collections of values of the same type:

### Dynamic Arrays

```ez
temp numbers [int] = {1, 2, 3, 4, 5}
temp names [string] = {"Alice", "Bob"}
temp empty [float] = {}
```

### Fixed-Size Arrays

Must be declared with `const`:

```ez
const DAYS [string, 7] = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}
const MATRIX [int, 9] = {1, 2, 3, 4, 5, 6, 7, 8, 9}
```

## Maps

Key-value pairs:

```ez
temp ages map = {
    {"Alice", 25},
    {"Bob", 30}
}

// With explicit types
temp scores map[string:int] = {"math": 95, "english": 88}
```

## Structs

User-defined composite types:

```ez
const Person struct {
    name string
    age int
}

temp p Person = Person{name: "Alice", age: 30}
```

See [Structs](/docs/language/structs) for more details.

## Enums

Named constants:

```ez
const Status enum {
    PENDING
    ACTIVE
    DONE
}

temp s int = Status.ACTIVE
```

See [Enums](/docs/language/enums) for more details.

## Type Checking

EZ enforces types at compile time:

```ez
temp x int = 10
// x = "hello"  // Error! Cannot assign string to int

temp name string = "Alice"
// temp age int = name  // Error! Type mismatch
```

## Type Conversion

Explicit conversion between compatible types:

### int()

```ez
temp s string = "42"
temp n int = int(s)  // 42

temp f float = 3.14
temp i int = int(f)  // 3 (truncates)
```

### float()

```ez
temp s string = "3.14"
temp f float = float(s)  // 3.14

temp i int = 42
temp f2 float = float(i)  // 42.0
```

### string()

```ez
temp n int = 42
temp s string = string(n)  // "42"

temp f float = 3.14
temp s2 string = string(f)  // "3.14"

temp b bool = true
temp s3 string = string(b)  // "true"
```

## typeof()

Get the type of a value at runtime:

```ez
temp x int = 42
std.println(typeof(x))  // "int"

temp arr [string] = {"a", "b"}
std.println(typeof(arr))  // "array"

temp m map = {{"key", "value"}}
std.println(typeof(m))  // "map"
```

## Default Values

Uninitialized `temp` variables get default values:

| Type | Default |
|------|---------|
| `int` | `0` |
| `float` | `0.0` |
| `string` | `""` |
| `char` | `'\0'` |
| `bool` | `false` |
| `[T]` | `{}` |

```ez
temp count int      // 0
temp price float    // 0.0
temp name string    // ""
temp flag bool      // false
temp items [int]    // {}
```

## Numeric Separators

Use underscores for readability:

```ez
temp million int = 1_000_000
temp binary int = 0b1010_1010
temp hex int = 0xFF_FF
temp pi float = 3.141_592_653
```

## Type Inference

EZ does **not** support type inference. Types must always be declared:

```ez
// This is required:
temp x int = 10

// This won't work:
// temp x = 10  // Error! Missing type
```

## Example Program

```ez
import @std

do main() {
    // Primitives
    temp count int = 0
    temp price float = 19.99
    temp name string = "Product"
    temp inStock bool = true

    // Sized integers
    temp smallNum i8 = 127
    temp largeNum u64 = 1_000_000_000_000

    // Arrays
    temp scores [int] = {85, 92, 78, 95}
    const GRADES [string, 5] = {"A", "B", "C", "D", "F"}

    // Type checking
    std.println("count type:", typeof(count))   // int
    std.println("price type:", typeof(price))   // float
    std.println("scores type:", typeof(scores)) // array

    // Type conversion
    temp priceStr string = string(price)
    temp scoreSum int = 0
    for_each s in scores {
        scoreSum += s
    }
    temp average float = float(scoreSum) / float(len(scores))

    std.println("Average score:", average)
}
```
