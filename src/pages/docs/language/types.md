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

#### Regular Strings

Regular strings use double quotes and support escape sequences and string interpolation:

```ez
temp greeting string = "Hello\nWorld"     // Contains newline
temp path string = "C:\\Users\\Alice"     // Escaped backslashes
temp message string = "Hello, ${name}!"   // String interpolation
```

**Escape Sequences:**

| Sequence | Meaning |
|----------|---------|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double quote |
| `\r` | Carriage return |

#### Raw Strings

Raw strings use backticks and preserve content exactly as written:

```ez
temp json string = `{"name": "Alice", "age": 30}`
temp regex string = `\d+\.\d+`
temp path string = `C:\Users\Alice\Documents`
```

**Key differences from regular strings:**

| Feature | Regular String `"..."` | Raw String `` `...` `` |
|---------|------------------------|------------------------|
| Escape sequences | Processed (`\n` = newline) | Literal (`\n` = backslash-n) |
| String interpolation | Supported (`${var}`) | Not supported (literal text) |
| Newlines | Not allowed | Allowed (multiline) |
| Quotes inside | Must escape (`\"`) | No escaping needed |

**Multiline raw strings:**

```ez
temp poem string = `Roses are red,
Violets are blue,
EZ is great,
And so are you.`
```

**When to use raw strings:**

- JSON content (no need to escape quotes)
- File paths (especially on Windows)
- Regular expressions
- Multiline text blocks
- Any content with many special characters

```ez
// JSON is much cleaner with raw strings
temp config string = `{
    "server": "localhost",
    "port": 8080,
    "debug": true
}`

// Compare to regular strings (requires escaping)
temp config2 string = "{\"server\": \"localhost\", \"port\": 8080}"
```

### char

Single characters:

```ez
temp letter char = 'A'
temp digit char = '5'
temp newline char = '\n'
```

### bool

Boolean values (can only be true or false):

```ez
temp isActive bool = true
temp hasError bool = false
```

### byte

A single unsigned 8-bit value representing raw binary data (0-255):

```ez
temp myByte byte = 255
temp zeroByte byte = 0
temp asciiA byte = 65  // ASCII value for 'A'
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

See [@arrays](/language.ez/docs/stdlib/arrays) for array manipulation functions.

## Byte Arrays

Byte arrays are specialized arrays for binary data, buffers, or raw file contents.

### Dynamic Byte Arrays

```ez
temp buffer [byte] = {0, 128, 255}
temp empty [byte] = {}
temp fileData [byte] = io.read_bytes("image.png")
```

### Fixed-Size Byte Arrays

Fixed-size byte arrays must use `const`:

```ez
const HEADER [byte, 4] = {137, 80, 78, 71}  // PNG magic bytes
const SMALL_BUFFER [byte, 4] = {0, 0, 0, 0}  // 4 zero-initialized bytes
```

> **Note:** Byte values can be written as decimal (0-255) or hexadecimal (0x00-0xFF). Negative values are never valid for bytes.

> **Note:** Fixed-size byte arrays require careful memory management and bounds awareness. For most use cases, the dynamic `[byte]` type is recommended as it handles resizing automatically and reduces the risk of buffer-related errors.

| Type | Size | Range |
|------|------|-------|
| `byte` | 8 bits | 0-255 |
| `[byte]` | dynamic | N/A |

See [@bytes](/language.ez/docs/stdlib/bytes) for byte manipulation functions.

## Multi-dimensional Arrays

EZ supports multi-dimensional arrays (matrices) through nested array syntax.

> **Note:** Fixed-size multi-dimensional arrays are not currently supported. Use `temp` for all multi-dimensional array declarations.

### Syntax

```ez
[[type]]    // 2D array (matrix)
[[[type]]]  // 3D array
```

EZ supports any number of dimensions (tested up to 10D).

### Declaration

```ez
// 2D array (3x2 matrix)
temp matrix [[int]] = {{1, 2}, {3, 4}, {5, 6}}

// 2D string array
temp grid [[string]] = {{"a", "b", "c"}, {"d", "e", "f"}}

// 3D array
temp cube [[[int]]] = {{{1, 2}, {3, 4}}, {{5, 6}, {7, 8}}}

// Empty 2D array
temp empty [[int]] = {}
```

### Accessing Elements

```ez
temp matrix [[int]] = {{1, 2, 3}, {4, 5, 6}}

temp row [int] = matrix[0]       // {1, 2, 3}
temp value int = matrix[1][2]    // 6
matrix[0][1] = 99                // modify element
```

### Iteration

```ez
temp matrix [[int]] = {{1, 2}, {3, 4}, {5, 6}}

// Iterate over rows
for_each row in matrix {
    std.println(row)
}

// Iterate over all elements
for_each row in matrix {
    for_each value in row {
        std.println(value)
    }
}
```

### Jagged Arrays

Inner arrays can have different lengths:

```ez
temp jagged [[int]] = {{1, 2, 3}, {4, 5}, {6}}
// jagged[0] has 3 elements
// jagged[1] has 2 elements
// jagged[2] has 1 element
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

See [@maps](/language.ez/docs/stdlib/maps) for map manipulation functions.

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

### byte()

Explicit conversion to the byte type (unsigned 8-bit integer, range 0-255).

```ez
temp n int = 65
temp b byte = byte(n)  // 65

temp f float = 97.8
temp b2 byte = byte(f)  // 97 (truncates)

temp s string = "200"
temp b3 byte = byte(s)  // 200

temp c char = 'A'
temp b4 byte = byte(c)  // 65 (ASCII value)
```

### char()

Converts an integer (ASCII/Unicode code point) to a character.

```ez
temp x int = 65
temp y char = char(x)  // 'A' (ASCII value 65)
println(y)             // Output: A

temp emoji int = 128512
temp face char = char(emoji)  // Unicode smiley
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
| `byte` | `0` |
| `[T]` | `{}` |
| `[byte]` | `{}` |

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

**Why require explicit types?** It makes code clearer and easier to read. You always know exactly what type a variable is without having to guess or trace through the code.

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
