---
layout: '../../../layouts/DocsLayout.astro'
title: '@bytes'
description: 'Binary data manipulation and encoding/decoding operations.'
---

# @bytes

The `@bytes` module provides functions for working with binary data, including
encoding/decoding (hex, base64), byte manipulation, and bitwise operations.

## Import

```ez
import @bytes
```

## Creation Functions

### `from_array()`
`(array: int[]) -> byte[]`

Creates a byte array from an array of integers (values must be 0-255).

```ez
temp data [byte] = bytes.from_array({72, 101, 108, 108, 111})
// Creates bytes for "Hello"
```

**Parameters:** `array` - An array of integers, each in the range 0-255.

**Returns:** A byte array.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7004](/language.ez/errors/E7004)

---

### `from_string()`
`(str: string) -> byte[]`

Converts a UTF-8 encoded string to a byte array.

```ez
temp data [byte] = bytes.from_string("Hello")
// data contains {72, 101, 108, 108, 111}
```

**Parameters:** `str` - The string to convert.

**Returns:** A byte array containing the UTF-8 bytes.

**Errors:** [E7001](/language.ez/errors/E7001), [E7003](/language.ez/errors/E7003)

---

### `from_hex()`
`(hexStr: string) -> (byte[], Error)`

Decodes a hexadecimal string into bytes.

```ez
temp data [byte], err Error = bytes.from_hex("48656c6c6f")
if err == nil {
    // data contains bytes for "Hello"
}
```

**Parameters:** `hexStr` - A string of hexadecimal characters (0-9, a-f, A-F).

**Returns:** Tuple of (byte array, error) - error is nil on success.

**Errors:** [E7001](/language.ez/errors/E7001), [E7003](/language.ez/errors/E7003), [E7014](/language.ez/errors/E7014)

---

### `from_base64()`
`(b64Str: string) -> (byte[], Error)`

Decodes a base64 encoded string into bytes.

```ez
temp data, err = bytes.from_base64("SGVsbG8=")
if err == nil {
    // data contains bytes for "Hello"
}
```

**Parameters:** `b64Str` - A valid base64 encoded string.

**Returns:** Tuple of (byte array, error) - error is nil on success.

**Errors:** [E7001](/language.ez/errors/E7001), [E7003](/language.ez/errors/E7003), [E7014](/language.ez/errors/E7014)

---

## Conversion Functions

### `to_string()`
`(data: byte[]) -> string`

Converts a byte array to a UTF-8 string.

```ez
temp str string = bytes.to_string(bytes.from_array({72, 101, 108, 108, 111}))
// str is "Hello"
```

**Parameters:** `data` - A byte array.

**Returns:** The UTF-8 decoded string.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `to_array()`
`(data: byte[]) -> int[]`

Converts a byte array to an array of integers.

```ez
temp nums [int] = bytes.to_array(bytes.from_string("Hi"))
// nums is [72, 105]
```

**Parameters:** `data` - A byte array.

**Returns:** An array of integers (0-255).

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `to_hex()`
`(data: byte[]) -> string`

Encodes bytes as a lowercase hexadecimal string.

```ez
temp hex string = bytes.to_hex(bytes.from_string("Hello"))
// hex is "48656c6c6f"
```

**Parameters:** `data` - A byte array.

**Returns:** Lowercase hex string.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `to_hex_upper()`
`(data: byte[]) -> string`

Encodes bytes as an uppercase hexadecimal string.

```ez
temp hex string = bytes.to_hex_upper(bytes.from_string("Hello"))
// hex is "48656C6C6F"
```

**Parameters:** `data` - A byte array.

**Returns:** Uppercase hex string.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `to_base64()`
`(data: byte[]) -> string`

Encodes bytes as a base64 string.

```ez
temp b64 string = bytes.to_base64(bytes.from_string("Hello"))
// b64 is "SGVsbG8="
```

**Parameters:** `data` - A byte array.

**Returns:** Base64 encoded string.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

## Operations

### `slice()`
`(data: byte[], start: int, end: int) -> byte[]`

Extracts a portion of bytes (end is exclusive, supports negative indices).

```ez
temp data [byte] = bytes.from_string("Hello World")
temp slice [byte] = bytes.slice(data, 0, 5)  // "Hello"
temp last [byte] = bytes.slice(data, -5, -1) // "Worl"
```

**Parameters:**
- `data` - A byte array
- `start` - Start index (negative counts from end)
- `end` - End index, exclusive (negative counts from end)

**Returns:** A new byte array containing the slice.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7004](/language.ez/errors/E7004)

---

### `concat()`
`(a: byte[], b: byte[]) -> byte[]`

Concatenates two byte arrays.

```ez
temp hello [byte] = bytes.from_string("Hello ")
temp world [byte] = bytes.from_string("World")
temp result [byte] = bytes.concat(hello, world)
```

**Parameters:**
- `a` - First byte array
- `b` - Second byte array

**Returns:** A new byte array containing both inputs.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `join()`
`(arrays: byte[][], separator: byte[]) -> byte[]`

Joins an array of byte arrays with a separator.

```ez
temp parts [[byte]] = {bytes.from_string("a"), bytes.from_string("b")}
temp sep [byte] = bytes.from_string(",")
temp result [byte] = bytes.join(parts, sep)  // "a,b"
```

**Parameters:**
- `arrays` - Array of byte arrays to join
- `separator` - Byte array to insert between elements

**Returns:** A single byte array with all elements joined.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `split()`
`(data: byte[], separator: byte[]) -> byte[][]`

Splits bytes by a separator.

```ez
temp data [byte] = bytes.from_string("a,b,c")
temp parts [[byte]] = bytes.split(data, bytes.from_string(","))
// parts has 3 elements: "a", "b", "c"
```

**Parameters:**
- `data` - Byte array to split
- `separator` - Byte pattern to split on

**Returns:** Array of byte arrays.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `contains()`
`(data: byte[], pattern: byte[]) -> bool`

Checks if bytes contain a pattern.

```ez
temp data [byte] = bytes.from_string("Hello World")
temp found bool = bytes.contains(data, bytes.from_string("World"))  // true
```

**Parameters:**
- `data` - Byte array to search in
- `pattern` - Pattern to search for

**Returns:** true if pattern is found, false otherwise.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `index()`
`(data: byte[], pattern: byte[]) -> int`

Finds the first index of a pattern, or -1 if not found.

```ez
temp data [byte] = bytes.from_string("Hello World")
temp idx int = bytes.index(data, bytes.from_string("o"))  // 4
```

**Parameters:**
- `data` - Byte array to search in
- `pattern` - Pattern to search for

**Returns:** Index of first occurrence, or -1.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `last_index()`
`(data: byte[], pattern: byte[]) -> int`

Finds the last index of a pattern, or -1 if not found.

```ez
temp data [byte] = bytes.from_string("Hello World")
temp idx int = bytes.last_index(data, bytes.from_string("o"))  // 7
```

**Parameters:**
- `data` - Byte array to search in
- `pattern` - Pattern to search for

**Returns:** Index of last occurrence, or -1.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `count()`
`(data: byte[], pattern: byte[]) -> int`

Counts non-overlapping occurrences of a pattern.

```ez
temp data [byte] = bytes.from_string("ababa")
temp n int = bytes.count(data, bytes.from_string("a"))  // 3
```

**Parameters:**
- `data` - Byte array to search in
- `pattern` - Pattern to count

**Returns:** Number of occurrences.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `compare()`
`(a: byte[], b: byte[]) -> int`

Lexicographically compares two byte sequences.

```ez
temp cmp int = bytes.compare(bytes.from_string("a"), bytes.from_string("b"))
// cmp is -1
```

**Parameters:**
- `a` - First byte array
- `b` - Second byte array

**Returns:** -1 if a < b, 0 if a == b, 1 if a > b.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `equals()`
`(a: byte[], b: byte[]) -> bool`

Checks if two byte sequences are equal.

```ez
temp eq bool = bytes.equals(bytes.from_string("hi"), bytes.from_string("hi"))
// eq is true
```

**Parameters:**
- `a` - First byte array
- `b` - Second byte array

**Returns:** true if equal, false otherwise.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

## Inspection Functions

### `is_empty()`
`(data: byte[]) -> bool`

Checks if bytes are empty (length 0).

```ez
temp empty bool = bytes.is_empty(bytes.from_string(""))  // true
```

**Parameters:** `data` - A byte array.

**Returns:** true if empty, false otherwise.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `starts_with()`
`(data: byte[], prefix: byte[]) -> bool`

Checks if bytes start with a prefix.

```ez
temp data [byte] = bytes.from_string("Hello World")
temp starts bool = bytes.starts_with(data, bytes.from_string("Hello"))  // true
```

**Parameters:**
- `data` - Byte array to check
- `prefix` - Prefix to look for

**Returns:** true if data starts with prefix.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `ends_with()`
`(data: byte[], suffix: byte[]) -> bool`

Checks if bytes end with a suffix.

```ez
temp data [byte] = bytes.from_string("Hello World")
temp ends bool = bytes.ends_with(data, bytes.from_string("World"))  // true
```

**Parameters:**
- `data` - Byte array to check
- `suffix` - Suffix to look for

**Returns:** true if data ends with suffix.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

## Manipulation Functions

### `reverse()`
`(data: byte[]) -> byte[]`

Returns a reversed copy of bytes.

```ez
temp rev [byte] = bytes.reverse(bytes.from_string("Hello"))
// bytes.to_string(rev) is "olleH"
```

**Parameters:** `data` - Byte array to reverse.

**Returns:** New byte array with elements in reverse order.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `repeat()`
`(data: byte[], count: int) -> byte[]`

Repeats bytes N times.

```ez
temp rep [byte] = bytes.repeat(bytes.from_string("ab"), 3)
// bytes.to_string(rep) is "ababab"
```

**Parameters:**
- `data` - Byte array to repeat
- `count` - Number of repetitions (must be >= 0)

**Returns:** New byte array with repeated content.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7004](/language.ez/errors/E7004), [E7011](/language.ez/errors/E7011)

---

### `replace()`
`(data: byte[], old: byte[], new: byte[]) -> byte[]`

Replaces all occurrences of old with new.

```ez
temp data [byte] = bytes.from_string("hello hello")
temp result [byte] = bytes.replace(data, bytes.from_string("hello"), bytes.from_string("hi"))
// "hi hi"
```

**Parameters:**
- `data` - Byte array to modify
- `old` - Pattern to replace
- `new` - Replacement pattern

**Returns:** New byte array with replacements.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `replace_n()`
`(data: byte[], old: byte[], new: byte[], n: int) -> byte[]`

Replaces first N occurrences of old with new.

```ez
temp data [byte] = bytes.from_string("a a a")
temp result [byte] = bytes.replace_n(data, bytes.from_string("a"), bytes.from_string("b"), 2)
// "b b a"
```

**Parameters:**
- `data` - Byte array to modify
- `old` - Pattern to replace
- `new` - Replacement pattern
- `n` - Maximum replacements (-1 for all)

**Returns:** New byte array with replacements.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7004](/language.ez/errors/E7004)

---

### `trim()`
`(data: byte[], cutset: byte[]) -> byte[]`

Removes leading and trailing bytes that appear in cutset.

```ez
temp data [byte] = bytes.from_string("  hello  ")
temp trimmed [byte] = bytes.trim(data, bytes.from_string(" "))
```

**Parameters:**
- `data` - Byte array to trim
- `cutset` - Bytes to remove

**Returns:** Trimmed byte array.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `trim_left()`
`(data: byte[], cutset: byte[]) -> byte[]`

Removes leading bytes that appear in cutset.

**Parameters:**
- `data` - Byte array to trim
- `cutset` - Bytes to remove from left

**Returns:** Trimmed byte array.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `trim_right()`
`(data: byte[], cutset: byte[]) -> byte[]`

Removes trailing bytes that appear in cutset.

**Parameters:**
- `data` - Byte array to trim
- `cutset` - Bytes to remove from right

**Returns:** Trimmed byte array.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `pad_left()`
`(data: byte[], length: int, padByte: int) -> byte[]`

Pads bytes on the left to reach specified length.

```ez
temp data [byte] = bytes.from_string("hi")
temp padded [byte] = bytes.pad_left(data, 5, 32)  // 32 is space
// "   hi"
```

**Parameters:**
- `data` - Byte array to pad
- `length` - Target length
- `padByte` - Byte value to use for padding (0-255)

**Returns:** Padded byte array (or original if already long enough).

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7004](/language.ez/errors/E7004)

---

### `pad_right()`
`(data: byte[], length: int, padByte: int) -> byte[]`

Pads bytes on the right to reach specified length.

```ez
temp data [byte] = bytes.from_string("hi")
temp padded [byte] = bytes.pad_right(data, 5, 32)
// "hi   "
```

**Parameters:**
- `data` - Byte array to pad
- `length` - Target length
- `padByte` - Byte value to use for padding (0-255)

**Returns:** Padded byte array (or original if already long enough).

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7004](/language.ez/errors/E7004)

---

## Bitwise Operations

### `and()`
`(a: byte[], b: byte[]) -> (byte[], Error)`

Bitwise AND of two byte sequences (must be same length).

```ez
temp a [byte] = bytes.from_array({0xFF, 0x0F})
temp b [byte] = bytes.from_array({0xF0, 0xFF})
temp result, err = bytes.and(a, b)
// result is [0xF0, 0x0F]
```

**Parameters:**
- `a` - First byte array
- `b` - Second byte array (same length as a)

**Returns:** Tuple of (result byte array, error) - error if lengths differ.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7010](/language.ez/errors/E7010)

---

### `or()`
`(a: byte[], b: byte[]) -> (byte[], Error)`

Bitwise OR of two byte sequences (must be same length).

```ez
temp a [byte] = bytes.from_array({0xF0, 0x0F})
temp b [byte] = bytes.from_array({0x0F, 0xF0})
temp result, err = bytes.or(a, b)
// result is [0xFF, 0xFF]
```

**Parameters:**
- `a` - First byte array
- `b` - Second byte array (same length as a)

**Returns:** Tuple of (result byte array, error) - error if lengths differ.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7010](/language.ez/errors/E7010)

---

### `xor()`
`(a: byte[], b: byte[]) -> (byte[], Error)`

Bitwise XOR of two byte sequences (must be same length).

```ez
temp a [byte] = bytes.from_array({0xFF, 0x00})
temp b [byte] = bytes.from_array({0xF0, 0xF0})
temp result, err = bytes.xor(a, b)
// result is [0x0F, 0xF0]
```

**Parameters:**
- `a` - First byte array
- `b` - Second byte array (same length as a)

**Returns:** Tuple of (result byte array, error) - error if lengths differ.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7010](/language.ez/errors/E7010)

---

### `not()`
`(data: byte[]) -> byte[]`

Bitwise NOT (complement) of each byte.

```ez
temp data [byte] = bytes.from_array({0xFF, 0x00})
temp result [byte] = bytes.not(data)
// result is [0x00, 0xFF]
```

**Parameters:** `data` - Byte array to complement.

**Returns:** New byte array with each byte inverted.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

## Utility Functions

### `fill()`
`(data: byte[], value: int) -> byte[]`

Returns a new byte array with all positions set to value.

```ez
temp data [byte] = bytes.from_string("Hello")
temp filled [byte] = bytes.fill(data, 0)
// All 5 bytes are now 0
```

**Parameters:**
- `data` - Byte array (used for length)
- `value` - Byte value to fill with (0-255)

**Returns:** New byte array filled with the value.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002), [E7004](/language.ez/errors/E7004)

---

### `copy()`
`(data: byte[]) -> byte[]`

Creates a copy of bytes.

```ez
temp original [byte] = bytes.from_string("Hello")
temp copy [byte] = bytes.copy(original)
```

**Parameters:** `data` - Byte array to copy.

**Returns:** A new byte array with the same contents.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

### `zero()`
`(data: byte[]) -> byte[]`

Returns a new byte array with all bytes set to zero.

```ez
temp sensitive [byte] = bytes.from_string("password")
temp cleared [byte] = bytes.zero(sensitive)
// Use for securely clearing sensitive data
```

**Parameters:** `data` - Byte array (used for length).

**Returns:** New byte array filled with zeros.

**Errors:** [E7001](/language.ez/errors/E7001), [E7002](/language.ez/errors/E7002)

---

## Example Program

```ez
import @std
import @bytes

do main() {
    // Create bytes from string
    temp data [byte] = bytes.from_string("Hello, World!")

    // Convert to hex
    temp hex string = bytes.to_hex(data)
    std.println("Hex:", hex)

    // Convert to base64
    temp b64 string = bytes.to_base64(data)
    std.println("Base64:", b64)

    // Slice and manipulate
    temp hello [byte] = bytes.slice(data, 0, 5)
    std.println("First 5 bytes:", bytes.to_string(hello))

    // Check contents
    if bytes.contains(data, bytes.from_string("World")) {
        std.println("Contains 'World'!")
    }
}
```
