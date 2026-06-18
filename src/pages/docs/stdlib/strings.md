---
layout: '../../../layouts/DocsLayout.astro'
title: '@strings'
description: 'String manipulation and formatting functions.'
---

# @strings

The `@strings` module provides functions for manipulating and working with strings.

## Import

```ez
import @strings
```

## Case Conversion

### `to_upper()`
`(s string) -> string`

Converts a string to uppercase.

```ez
import @strings

do main() {
    println(strings.to_upper("hello"))        // "HELLO"
    println(strings.to_upper("Hello World"))  // "HELLO WORLD"
}
```

**Parameters:** `s` - The string.

**Returns:** `string` - Uppercase version.

---

### `to_lower()`
`(s string) -> string`

Converts a string to lowercase.

```ez
import @strings

do main() {
    println(strings.to_lower("HELLO"))        // "hello"
    println(strings.to_lower("Hello World"))  // "hello world"
}
```

**Parameters:** `s` - The string.

**Returns:** `string` - Lowercase version.

---

## Query Functions

### `is_empty()`
`(s string) -> bool`

Checks if a string is empty or contains only whitespace.

```ez
println(strings.is_empty(""))       // true
println(strings.is_empty("   "))    // true
println(strings.is_empty("hello"))  // false
```

**Parameters:** `s` - The string to check.

**Returns:** `bool` - `true` if empty or whitespace-only.

---

### `contains()`
`(s string, sub string) -> bool`

Checks if a string contains a substring.

```ez
import @strings

do main() {
    println(strings.contains("hello world", "world"))  // true
    println(strings.contains("hello world", "foo"))    // false
}
```

**Parameters:** `s`, `sub`.

**Returns:** `bool` - true if found.

---

### `starts_with()`
`(s string, prefix string) -> bool`

Checks if a string starts with a prefix.

```ez
import @strings

do main() {
    println(strings.starts_with("hello world", "hello"))  // true
    println(strings.starts_with("hello world", "world"))  // false
}
```

**Parameters:** `s`, `prefix`.

**Returns:** `bool` - true if starts with prefix.

---

### `ends_with()`
`(s string, suffix string) -> bool`

Checks if a string ends with a suffix.

```ez
import @strings

do main() {
    println(strings.ends_with("hello world", "world"))  // true
    println(strings.ends_with("hello world", "hello"))  // false
}
```

**Parameters:** `s`, `suffix`.

**Returns:** `bool` - true if ends with suffix.

---

### `index_of()`
`(s string, sub string) -> int`

Returns the index of the first occurrence of a substring, or -1 if not found.

```ez
import @strings

do main() {
    println(strings.index_of("hello world", "world"))  // 6
    println(strings.index_of("hello world", "foo"))    // -1
}
```

**Parameters:** `s`, `sub`.

**Returns:** `int` - Index or -1.

---

### `count()`
`(s string, sub string) -> int`

Counts non-overlapping occurrences of a substring.

```ez
println(strings.count("hello world", "o"))    // 2
println(strings.count("aaa", "aa"))            // 1
```

**Parameters:** `s`, `sub`.

**Returns:** `int` - Number of occurrences.

---

## Transformation Functions

### `trim()`
`(s string) -> string`

Removes whitespace from both ends of a string.

```ez
import @strings

do main() {
    println(strings.trim("  hello  "))    // "hello"
    println(strings.trim("\n\thello\n"))  // "hello"
}
```

**Parameters:** `s` - The string.

**Returns:** `string` - Trimmed string.

---

### `trim_left()` / `trim_right()`
`(s string) -> string`

Removes whitespace from the left or right side only.

```ez
import @strings

do main() {
    println(strings.trim_left("  hello  "))   // "hello  "
    println(strings.trim_right("  hello  "))  // "  hello"
}
```

**Parameters:** `s` - The string.

**Returns:** `string` - Trimmed string.

---

### `replace()`
`(s string, old string, new string) -> string`

Replaces all occurrences of a substring with another string.

```ez
import @strings

do main() {
    println(strings.replace("hello world", "world", "EZ"))  // "hello EZ"
    println(strings.replace("aaa", "a", "b"))  // "bbb"
}
```

**Parameters:** `s`, `old`, `new`.

**Returns:** `string` - Modified string.

---

### `repeat()`
`(s string, count int) -> string`

Repeats a string n times.

```ez
import @strings

do main() {
    println(strings.repeat("ab", 3))  // "ababab"
    println(strings.repeat("-", 10))  // "----------"
}
```

**Parameters:** `s`, `count`.

**Returns:** `string` - Repeated string.

---

### `reverse()`
`(s string) -> string`

Reverses a string.

```ez
import @strings

do main() {
    println(strings.reverse("hello"))  // "olleh"
    println(strings.reverse("12345"))  // "54321"
}
```

**Parameters:** `s` - The string.

**Returns:** `string` - Reversed string.

---

## Conversion Functions

### `split()`
`(s string, sep string) -> [string]`

Splits a string into an array of substrings.

```ez
import @strings

do main() {
    mut parts = strings.split("a,b,c", ",")
    println(parts)  // {"a", "b", "c"}

    mut words = strings.split("hello world", " ")
    println(words)  // {"hello", "world"}
}
```

**Parameters:** `s`, `sep`.

**Returns:** `[string]` - Array of substrings.

---

### `join()`
`(arr [string], sep string) -> string`

Joins an array of strings with a separator.

```ez
import @strings

do main() {
    mut parts [string] = {"a", "b", "c"}
    println(strings.join(parts, "-"))  // "a-b-c"
    println(strings.join(parts, ""))   // "abc"
}
```

**Parameters:** `arr`, `sep`.

**Returns:** `string` - Joined string.

---

### `slice()`
`(s string, start int, end int) -> string`

Extracts a portion of a string by index. Supports negative indices.

```ez
println(strings.slice("hello world", 0, 5))   // "hello"
println(strings.slice("hello world", 6))       // "world"
println(strings.slice("hello world", -5))      // "world"
```

**Parameters:** `s`, `start`, optional `end` (defaults to string length).

**Returns:** `string` - The extracted substring.

---
