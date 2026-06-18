---
layout: '../../../layouts/DocsLayout.astro'
title: '@strconv'
description: 'String-to-type and type-to-string conversions with error handling.'
---

# @strconv

The `@strconv` module provides string-to-type and type-to-string conversion functions with proper error handling.

## Import

```ez
import @strconv
```

## Fallible Conversions (string to type)

These functions parse strings into typed values. They support two usage patterns:

- **Single variable assignment** — panics on invalid input
- **Destructured assignment** — returns an `Error` instead of panicking

### `to_int()`
`(s string, base int = 10) -> (int, Error)`

Parses a string as a signed integer in the given base.

```ez
import @strconv

do main() {
    // Destructured — safe, returns error
    mut n, err = strconv.to_int("42")
    if err != nil {
        println("Parse error: ${err.message}")
        return
    }
    println(n)  // 42

    // With base
    mut hex, _ = strconv.to_int("FF", 16)
    println(hex)  // 255

    mut bin, _ = strconv.to_int("1010", 2)
    println(bin)  // 10

    // Using constants
    mut oct, _ = strconv.to_int("777", strconv.BASE_8)
    println(oct)  // 511
}
```

**Parameters:**
- `s` - The string to parse
- `base` - Number base, 2-36 (default: 10)

**Returns:** `(int, Error)` when destructured.

**Rules:**
- The `base` parameter must be between 2 and 36 (inclusive)
- Leading/trailing whitespace is not tolerated
- For bases > 10, letters A-Z (case-insensitive) represent digits 10-35

---

### `to_uint()`
`(s string, base int = 10) -> (uint, Error)`

Parses a string as an unsigned integer in the given base.

```ez
import @strconv

do main() {
    mut n, err = strconv.to_uint("100")
    println(n)  // 100

    mut hex, _ = strconv.to_uint("DEADBEEF", strconv.BASE_16)
    println(hex)
}
```

**Parameters:**
- `s` - The string to parse
- `base` - Number base, 2-36 (default: 10)

**Returns:** `(uint, Error)` when destructured.

**Rules:**
- Same base rules as `to_int()`
- Rejects strings containing a `-` sign

---

### `to_float()`
`(s string) -> (float, Error)`

Parses a string as a floating-point number.

```ez
import @strconv

do main() {
    mut f, err = strconv.to_float("3.14")
    println(f)  // 3.14

    mut neg, _ = strconv.to_float("-0.5")
    println(neg)  // -0.5
}
```

**Parameters:** `s` - The string to parse.

**Returns:** `(float, Error)` when destructured.

**Rules:**
- Accepts standard decimal notation (e.g. `"3.14"`, `"-0.5"`, `"100"`)
- Accepts `"inf"`, `"infinity"`, and `"nan"` (case-insensitive)
- Does **not** accept hex floats

---

### `to_bool()`
`(s string) -> (bool, Error)`

Parses a string as a boolean.

```ez
import @strconv

do main() {
    mut b, err = strconv.to_bool("true")
    println(b)  // true

    mut b2, _ = strconv.to_bool("FALSE")
    println(b2)  // false
}
```

**Parameters:** `s` - The string to parse.

**Returns:** `(bool, Error)` when destructured.

**Rules:**
- Only accepts `"true"` and `"false"` (case-insensitive: `"TRUE"`, `"True"`, etc.)
- `"1"`, `"0"`, `"yes"`, `"no"` are **not** valid — all other strings produce an error

---

## Type-to-String Conversions (type to string)

These functions convert typed values to strings. They never fail.

### `from_int()`
`(n int) -> string`

Converts an integer to its decimal string representation.

```ez
mut s = strconv.from_int(42)
println(s)  // "42"
```

---

### `from_uint()`
`(n uint) -> string`

Converts an unsigned integer to its decimal string representation.

```ez
mut s = strconv.from_uint(100)
println(s)  // "100"
```

---

### `from_float()`
`(f float) -> string`

Converts a float to its string representation (shortest representation).

```ez
mut s = strconv.from_float(3.14)
println(s)  // "3.14"
```

---

### `from_bool()`
`(b bool) -> string`

Converts a boolean to `"true"` or `"false"`.

```ez
mut s = strconv.from_bool(true)
println(s)  // "true"
```

---

## Query Functions

### `is_numeric()`
`(s string) -> bool`

Returns true if the string is a valid numeric representation (integer or decimal).

```ez
import @strconv

do main() {
    println(strconv.is_numeric("42"))      // true
    println(strconv.is_numeric("3.14"))    // true
    println(strconv.is_numeric("-5"))      // true
    println(strconv.is_numeric("abc"))     // false
    println(strconv.is_numeric(""))        // false
}
```

**Rules:**
- Accepts optional leading `+` or `-`, followed by digits with at most one `.` decimal point
- Empty strings return `false`
- Does not accept scientific notation, hex prefixes, or whitespace

---

### `is_integer()`
`(s string) -> bool`

Returns true if the string is a valid integer (digits only, optional leading sign).

```ez
import @strconv

do main() {
    println(strconv.is_integer("42"))    // true
    println(strconv.is_integer("-5"))    // true
    println(strconv.is_integer("3.14")) // false
    println(strconv.is_integer(""))     // false
}
```

**Rules:**
- Accepts optional leading `+` or `-`, followed by one or more digits
- Empty strings return `false`
- Does not validate whether the value fits in an `int` or `uint`

---

## Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `BASE_2` | `2` | Binary |
| `BASE_8` | `8` | Octal |
| `BASE_10` | `10` | Decimal (default) |
| `BASE_16` | `16` | Hexadecimal |
| `BASE_36` | `36` | Base-36 (digits + full alphabet) |

Constants can be used qualified (`strconv.BASE_16`) or bare after `import and use @strconv`. Any integer value between 2 and 36 is also accepted directly as the base argument.

---
