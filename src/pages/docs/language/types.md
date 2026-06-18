---
layout: '../../../layouts/DocsLayout.astro'
title: 'Types'
description: 'The EZ type system.'
---

# Types

EZ is a statically-typed language with full type inference. Types are checked at checktime (before execution), and there is no implicit type coercion.

## Primitive Types

### int

64-bit signed integer (`int64_t` in C). Arithmetic operations use checked arithmetic — overflow or underflow produces a runtime panic rather than silent wrapping.

```ez
mut age = 25
mut count = -100
mut zero = 0
mut large = 9223372036854775807  // Max 64-bit signed value
```

### uint

64-bit unsigned integer (`uint64_t` in C). Like `int`, arithmetic is overflow-checked with a runtime panic on overflow.

```ez
mut count uint = 100
mut big uint = 18446744073709551615  // Max 64-bit unsigned value
```

Assigning a negative value to a `uint` produces a check-time error.

### float

Floating-point numbers (64-bit IEEE 754 double-precision):

```ez
mut pi = 3.14159
mut temperature = -40.5
mut percentage = 0.85
```

**Implicit int-to-float promotion:** Integer values are automatically promoted to `float` when the target type is `float`, `f32`, or `f64`. This applies to variable declarations, assignments, function arguments, map literal values, and return statements:

```ez
mut x float = 5       // 5.0 — no cast needed
mut y f64 = 1          // 1.0
x = 42                 // 42.0
```

### string

Text values (UTF-8 encoded):

```ez
mut name = "Alice"
mut empty = ""
mut sentence = "Hello, World!"
```

#### Regular Strings

Regular strings use double quotes and support escape sequences and string interpolation:

```ez
mut greeting = "Hello\nWorld"          // Contains newline
mut path = "C:\\Users\\Alice"          // Escaped backslashes
mut message = "Hello, ${name}!"        // String interpolation
```

**Escape Sequences:**

| Sequence | Meaning |
|----------|---------|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double quote |
| `\r` | Carriage return |
| `\xNN` | Hex byte value (e.g., `\x41` = "A", `\x0a` = newline) |

#### Raw Strings

Raw strings use backticks and preserve content exactly as written:

```ez
mut json_str = `{"name": "Alice", "age": 30}`
mut regex_pat = `\d+\.\d+`
mut win_path = `C:\Users\Alice\Documents`
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
mut poem = `Roses are red,
Violets are blue,
EZ is great,
And so are you.`
```

### char

Single characters:

```ez
mut letter = 'A'
mut digit = '5'
mut newline = '\n'
```

### bool

Boolean values (can only be true or false):

```ez
mut isActive = true
mut hasError = false
```

### byte

A single unsigned 8-bit value representing raw binary data (0-255):

```ez
mut myByte byte = 0xFF  // 255
mut zeroByte byte = 0
mut asciiA byte = 65     // ASCII value for 'A'
```

### nil

The `nil` type has a single value, also written `nil`. It represents the absence of a value and is used primarily in error handling:

```ez
mut value, err = parse("test")
if err != nil {
    println("Error:", err)
}
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
mut small i8 = -128
mut medium i32 = -100000
mut large i64 = -9223372036854775808
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

```ez
mut byte_val u8 = 255
mut word u32 = 4294967295
mut big u64 = 18446744073709551615
```

### Wide Integers (i128, u128, i256, u256)

Wide integers are backed by struct-based arithmetic (no compiler extensions required). Values are constructed using the type name as a function:

```ez
mut a = i128(42)
mut b = i128(100)
mut c = a + b          // i128 addition
println(c)             // prints "142"
println(type_of(c))    // "i128"
println(size_of(i128)) // 16

mut x = int(c)         // cast back to int
mut s = string(c)      // convert to string
```

### Sized Floats

| Type | Size | Description |
|------|------|-------------|
| `f32` | 32 bits | Single-precision float |
| `f64` | 64 bits | Double-precision float (same as `float`) |

## Pointer Type (^T)

The pointer type `^Type` represents a memory address pointing to a value of `Type`.

| Syntax | Meaning |
|--------|---------|
| `^int` | Pointer to an `int` |
| `^MyStruct` | Pointer to a `MyStruct` |
| `addr(x)` | Get the address of `x` |
| `p^` | Dereference pointer `p` |

```ez
mut x int = 42
mut p ^int = addr(x)
println(p^)  // 42
p^ = 100
println(x)   // 100
```

Dereferencing a `nil` pointer causes a runtime panic.

### Pointer Auto-Dereference

The dot operator (`.`) automatically dereferences pointers to structs. If `p` is a `^MyStruct`, writing `p.field` is equivalent to `p^.field`. This auto-dereference applies to field access and struct function calls but does **not** apply in other contexts (e.g., `println(p)` prints the address, `return p` returns the pointer).

```ez
mut p = new(Point)
p.x = 10    // same as p^.x = 10
p.y = 20
println(p.x)  // 10
```

### Recursive Structs

A struct may reference itself through a **pointer field**. Value-type self-reference is rejected at compile time:

```ez
const Node struct {
    val  int
    next ^Node   // OK: pointer field
}

// Value-type self-reference is an error:
const Bad struct {
    val  int
    next Bad     // error: struct 'Bad' cannot contain itself by value
}
```

Dot notation automatically dereferences pointer fields:

```ez
mut a = new(Node)
mut b = new(Node)
a.val  = 1
b.val  = 2
a.next = b

println(a.next.val)   // 2, implicit dereference
```

Mutual recursion (two structs referencing each other) is not supported.

## Arrays

Ordered collections of values of the same type:

### Dynamic Arrays

```ez
mut numbers [int] = {1, 2, 3, 4, 5}
mut names [string] = {"Alice", "Bob"}
mut empty [float] = {}
```

### Fixed-Size Arrays

Must be declared with `const`:

```ez
const DAYS [string, 7] = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}
const MATRIX [int, 9] = {1, 2, 3, 4, 5, 6, 7, 8, 9}
```

See [@arrays](/EZ-Language-Webapp/docs/stdlib/arrays) for array manipulation functions.

## Byte Arrays

Byte arrays are specialized arrays for binary data, buffers, or raw file contents.

### Dynamic Byte Arrays

```ez
mut buffer [byte] = {0, 128, 255}
mut empty [byte] = {}
```

### Fixed-Size Byte Arrays

Fixed-size byte arrays must use `const`:

```ez
const HEADER [byte, 4] = {137, 80, 78, 71}  // PNG magic bytes
```

| Type | Size | Range |
|------|------|-------|
| `byte` | 8 bits | 0-255 |
| `[byte]` | dynamic | N/A |

See [@bytes](/EZ-Language-Webapp/docs/stdlib/bytes) for byte manipulation functions.

## Multi-dimensional Arrays

EZ supports multi-dimensional arrays through nested array syntax.

```ez
[[type]]    // 2D array (matrix)
[[[type]]]  // 3D array
```

```ez
// 2D array (3x2 matrix)
mut matrix [[int]] = {{1, 2}, {3, 4}, {5, 6}}

// 3D array
mut cube [[[int]]] = {{{1, 2}, {3, 4}}, {{5, 6}, {7, 8}}}
```

> **Note:** Fixed-size multi-dimensional arrays are not currently supported. Use `mut` for all multi-dimensional array declarations.

## Maps

Key-value pairs:

```ez
mut scores map[string:int] = {"math": 95, "english": 88}
mut empty map[string:int] = {:}
```

Maps must be declared with `mut`. See [@maps](/EZ-Language-Webapp/docs/stdlib/maps) for map manipulation functions.

## Structs

User-defined composite types:

```ez
const Person struct {
    name string
    age int
}

mut p = Person{name: "Alice", age: 30}
```

See [Structs](/EZ-Language-Webapp/docs/language/structs) for more details.

## Enums

Named constants:

```ez
const Status enum {
    PENDING
    ACTIVE
    DONE
}

mut s = Status.ACTIVE
```

See [Enums](/EZ-Language-Webapp/docs/language/enums) for more details.

## Type Checking

EZ enforces types at checktime:

```ez
mut x int = 10
// x = "hello"  // Error! Cannot assign string to int

mut name = "Alice"
// mut age int = name  // Error! Type mismatch
```

## Type Conversion

Explicit conversion between compatible types:

### int()

```ez
mut s = "42"
mut n = int(s)  // 42

mut f = 3.14
mut i = int(f)  // 3 (truncates)
```

### float()

```ez
mut s = "3.14"
mut f = float(s)  // 3.14

mut i = 42
mut f2 = float(i)  // 42.0
```

### string()

```ez
mut n = 42
mut s = string(n)  // "42"

mut f = 3.14
mut s2 = string(f)  // "3.14"

mut b = true
mut s3 = string(b)  // "true"
```

### byte()

Explicit conversion to the byte type (unsigned 8-bit integer, range 0-255).

```ez
mut n = 65
mut b = byte(n)  // 65

mut c = 'A'
mut b2 = byte(c)  // 65 (ASCII value)
```

### char()

Converts an integer (ASCII/Unicode code point) to a character.

```ez
mut x = 65
mut y = char(x)  // 'A' (ASCII value 65)
println(y)        // Output: A
```

### cast

The `cast` keyword provides explicit type conversion for values and arrays:

```ez
mut small = cast(42, u8)
mut truncated = cast(3.7, int)     // 3
mut text = cast(123, string)       // "123"

// Array conversions
mut ints [int] = {1, 2, 3}
mut bytes [u8] = cast(ints, [u8])
```

## type_of()

Get the type of a value at runtime:

```ez
mut x = 42
println(type_of(x))  // "int"

mut arr [string] = {"a", "b"}
println(type_of(arr))  // "[string]"
```

## size_of()

Get the size of a type in bytes:

```ez
println(size_of(int))    // 8
println(size_of(i128))   // 16
println(size_of(u256))   // 32
```

## Type Inference

EZ has **full type inference**. The type of every variable is known at compile time, but explicit annotations are optional:

```ez
// Inferred from literals
mut x = 42                    // int
mut name = "Alice"            // string
mut pi = 3.14                 // float
mut flag = true               // bool

// Inferred from function returns
mut result = sum(1, 2)        // int (from function signature)

// Inferred from struct literals
const p = Point{x: 1, y: 2}  // Point

// Inferred from constructors
mut val = new(Person)         // ^Person (pointer)

// Explicit annotations always accepted
mut y int = 42
```

> **Note:** Type inference does **not** work with array or map literals. You must always provide an explicit type annotation:
> ```ez
> mut arr [int] = {1, 2, 3}              // required
> mut m map[string:int] = {"a": 1}       // required
> // mut arr = {1, 2, 3}                 // Error!
> ```

## Default Zero Values

When structs are created with `new()` or `Point{}`, fields get zero values:

| Type | Default |
|------|---------|
| `int` | `0` |
| `uint` | `0` |
| `float` | `0.0` |
| `string` | `""` |
| `char` | `'\0'` |
| `bool` | `false` |
| `byte` | `0` |

## Numeric Separators

Use underscores for readability:

```ez
mut million = 1_000_000
mut hex = 0xFF_FF
mut octal = 0o777
mut binary = 0b1111_0000
mut pi = 3.141_592_653
```

## See Also
- [Variables](/EZ-Language-Webapp/docs/language/variables) — declaring variables with types
- [Arrays](/EZ-Language-Webapp/docs/language/arrays) — array declarations, iteration, and fixed-size arrays
- [Maps](/EZ-Language-Webapp/docs/language/maps) — map declarations, key types, and iteration
- [Functions](/EZ-Language-Webapp/docs/language/functions) — typed parameters and return values
- [Structs](/EZ-Language-Webapp/docs/language/structs) — custom composite types
- [Enums](/EZ-Language-Webapp/docs/language/enums) — enumeration types
