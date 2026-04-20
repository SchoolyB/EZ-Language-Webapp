---
layout: '../../../layouts/DocsLayout.astro'
title: '@fmt'
description: 'Formatted output and string formatting functions.'
---

# @fmt

The `@fmt` module provides printf-style formatted output, string padding, and number formatting.

## Import

```ez
import @fmt
```

## Formatted Output

### `printf()`
`(format string, ...args T)`

Prints a formatted string to stdout.

```ez
import @fmt

do main() {
    fmt.printf("Hello, %s! You are %d years old.\n", "Alice", 30)
    fmt.printf("Pi is approximately %.4f\n", 3.14159)
}
```

---

### `sprintf()`
`(format string, ...args T) -> string`

Returns a formatted string (does not print).

```ez
import @fmt

do main() {
    mut msg = fmt.sprintf("Score: %d/%d", 85, 100)
    println(msg)  // "Score: 85/100"
}
```

---

### `format()`
`(format string, ...args T) -> string`

Alias for `sprintf()`. Returns a formatted string.

---

## Padding

### `pad_left()`
`(s string, width int, ch char) -> string`

Pads a string on the left to the given width with the specified character.

```ez
import @fmt

do main() {
    println(fmt.pad_left("42", 5, '0'))    // "00042"
    println(fmt.pad_left("hi", 10, ' '))   // "        hi"
}
```

---

### `pad_right()`
`(s string, width int, ch char) -> string`

Pads a string on the right to the given width with the specified character.

```ez
import @fmt

do main() {
    println(fmt.pad_right("Name", 10, '.'))  // "Name......"
}
```

---

### `center()`
`(s string, width int, ch char) -> string`

Centers a string within the given width, padding both sides with the specified character.

```ez
import @fmt

do main() {
    println(fmt.center("title", 20, '='))  // "=======title========"
}
```

---

## Number Formatting

### `int_to_hex()`
`(n int) -> string`

Formats an integer as lowercase hexadecimal (no `0x` prefix).

```ez
println(fmt.int_to_hex(255))   // "ff"
println(fmt.int_to_hex(4096))  // "1000"
```

---

### `int_to_binary()`
`(n int) -> string`

Formats an integer as binary.

```ez
println(fmt.int_to_binary(10))   // "1010"
println(fmt.int_to_binary(255))  // "11111111"
```

---

### `int_to_octal()`
`(n int) -> string`

Formats an integer as octal.

```ez
println(fmt.int_to_octal(8))    // "10"
println(fmt.int_to_octal(255))  // "377"
```

---

### `float_fixed()`
`(f float, decimals int) -> string`

Formats a float with a fixed number of decimal places.

```ez
println(fmt.float_fixed(3.14159, 2))  // "3.14"
println(fmt.float_fixed(1.0, 4))      // "1.0000"
```

---

### `float_sci()`
`(f float) -> string`

Formats a float in scientific notation.

```ez
println(fmt.float_sci(123456.789))  // "1.234568e+05"
println(fmt.float_sci(0.00042))     // "4.200000e-04"
```

---

## Notes

`printf`, `sprintf`, and `format` accept `string`, `int`, `float`, and `bool` arguments. Composite types (structs, arrays, maps) are not supported — use `println` for printing those.

## Example Program

```ez
import @fmt

do main() {
    // Table formatting
    println(fmt.pad_right("Name", 15, ' ') + fmt.pad_right("Score", 10, ' ') + "Grade")
    println(fmt.pad_right("----", 15, '-') + fmt.pad_right("-----", 10, '-') + "-----")

    mut name = "Alice"
    mut score = 95.5
    println(fmt.pad_right(name, 15, ' ') + fmt.pad_right(fmt.float_fixed(score, 1), 10, ' ') + "A")

    // Number display
    mut n = 42
    fmt.printf("Decimal: %d, Hex: %s, Binary: %s, Octal: %s\n",
        n, fmt.int_to_hex(n), fmt.int_to_binary(n), fmt.int_to_octal(n))
}
```
