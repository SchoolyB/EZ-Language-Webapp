---
layout: '../../../layouts/DocsLayout.astro'
title: '@regex'
description: 'Regular expression pattern matching and text manipulation.'
---

# @regex

The `@regex` module provides functions for pattern matching, searching, and text manipulation using regular expressions.

## Import

```ez
import @regex
```

## Validation

### `is_valid()`
`(pattern string) -> bool`

Checks if a string is a valid regex pattern.

```ez
@regex

do main() {
    println(regex.is_valid("[a-z]+"))  // true
    println(regex.is_valid("["))       // false
}
```

**Parameters:** `pattern` - The regex pattern string.

**Returns:** `bool` - `true` if the pattern is valid.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string.

---

## Matching

### `match()`
`(pattern string, text string) -> (bool, Error)`

Checks if a pattern matches anywhere in the text.

```ez
@regex

do main() {
    mut found, err = regex.match("[0-9]+", "abc123def")
    if err != nil {
        println("Error:", err.message)
        return
    }
    println(found)  // true
}
```

**Parameters:**
- `pattern` - The regex pattern.
- `text` - The string to search.

**Returns:**
- `bool` - `true` if the pattern matches.
- `Error` - `nil` on success, or an Error if the pattern is invalid.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) for invalid argument types, [E15001](/EZ-Language-Webapp/errors/E15001) for invalid regex pattern.

---

## Finding

### `find()`
`(pattern string, text string) -> (string, Error)`

Returns the first match of the pattern in the text.

```ez
@regex

do main() {
    mut result, err = regex.find("[0-9]+", "abc123def456")
    if err == nil && result != nil {
        println(result)  // "123"
    }
}
```

**Parameters:**
- `pattern` - The regex pattern.
- `text` - The string to search.

**Returns:**
- `string` - The first match, or `nil` if no match.
- `Error` - `nil` on success, or an Error if the pattern is invalid.

---

### `find_all()`
`(pattern string, text string) -> ([string], Error)`

Returns all matches of the pattern in the text.

```ez
@regex

do main() {
    mut matches, err = regex.find_all("[0-9]+", "a1b22c333")
    if err == nil {
        println(matches)  // {"1", "22", "333"}
        println(len(matches))  // 3
    }
}
```

**Parameters:**
- `pattern` - The regex pattern.
- `text` - The string to search.

**Returns:**
- `[string]` - Array of all matches (empty array if none).
- `Error` - `nil` on success, or an Error if the pattern is invalid.

---

### `find_all_n()`
`(pattern string, text string, n int) -> ([string], Error)`

Returns the first `n` matches of the pattern in the text.

```ez
@regex

do main() {
    mut matches, err = regex.find_all_n("[0-9]+", "a1b2c3d4e5", 3)
    if err == nil {
        println(matches)  // {"1", "2", "3"}
    }
}
```

**Parameters:**
- `pattern` - The regex pattern.
- `text` - The string to search.
- `n` - Maximum number of matches to return.

**Returns:**
- `[string]` - Array of up to `n` matches.
- `Error` - `nil` on success, or an Error if the pattern is invalid.

---

## Replacing

### `replace()`
`(pattern string, text string, replacement string) -> (string, Error)`

Replaces the first match of the pattern with the replacement string.

```ez
@regex

do main() {
    mut result, err = regex.replace("[0-9]+", "abc123def456", "NUM")
    if err == nil {
        println(result)  // "abcNUMdef456"
    }
}
```

**Parameters:**
- `pattern` - The regex pattern.
- `text` - The string to search.
- `replacement` - The replacement string.

**Returns:**
- `string` - The text with the first match replaced.
- `Error` - `nil` on success, or an Error if the pattern is invalid.

---

### `replace_all()`
`(pattern string, text string, replacement string) -> (string, Error)`

Replaces all matches of the pattern with the replacement string.

```ez
@regex

do main() {
    mut result, err = regex.replace_all("[0-9]", "a1b2c3", "X")
    if err == nil {
        println(result)  // "aXbXcX"
    }
}
```

**Parameters:**
- `pattern` - The regex pattern.
- `text` - The string to search.
- `replacement` - The replacement string.

**Returns:**
- `string` - The text with all matches replaced.
- `Error` - `nil` on success, or an Error if the pattern is invalid.

---

## Splitting

### `split()`
`(pattern string, text string) -> ([string], Error)`

Splits the text by the pattern.

```ez
@regex

do main() {
    mut parts, err = regex.split("\\s+", "hello   world  foo")
    if err == nil {
        println(parts)  // {"hello", "world", "foo"}
    }
}
```

**Parameters:**
- `pattern` - The regex pattern to split on.
- `text` - The string to split.

**Returns:**
- `[string]` - Array of parts.
- `Error` - `nil` on success, or an Error if the pattern is invalid.

---

## Capture Groups

### `groups()`
`(pattern string, text string) -> ([string], Error)`

Returns the capture groups from the first match. The first element is the full match, followed by each capture group.

```ez
@regex

do main() {
    mut groups, err = regex.groups("([a-z]+)@([a-z]+)\\.([a-z]+)", "test@example.com")
    if err == nil {
        println(groups[0])  // "test@example.com" (full match)
        println(groups[1])  // "test"
        println(groups[2])  // "example"
        println(groups[3])  // "com"
    }
}
```

**Parameters:**
- `pattern` - The regex pattern with capture groups.
- `text` - The string to search.

**Returns:**
- `[string]` - Array where index 0 is the full match and subsequent indices are capture groups. Empty array if no match.
- `Error` - `nil` on success, or an Error if the pattern is invalid.

---

### `groups_all()`
`(pattern string, text string) -> ([[string]], Error)`

Returns the capture groups from all matches.

```ez
@regex

do main() {
    mut all, err = regex.groups_all("([0-9]+)-([0-9]+)", "1-2 and 3-4")
    if err == nil {
        println(len(all))  // 2
        // all[0] = {"1-2", "1", "2"}
        // all[1] = {"3-4", "3", "4"}
    }
}
```

**Parameters:**
- `pattern` - The regex pattern with capture groups.
- `text` - The string to search.

**Returns:**
- `[[string]]` - Array of arrays, each containing the full match and capture groups. Empty array if no matches.
- `Error` - `nil` on success, or an Error if the pattern is invalid.

---

## Error Handling

All functions except `is_valid()` return error tuples:

```ez
mut result, err = regex.find(pattern, text)
if err != nil {
    println("Error:", err.message)
    return
}
```

### Error Codes

| Code | Description |
|------|-------------|
| E7001 | Wrong number of arguments |
| E7003 | Invalid argument type (expected string) |
| E7004 | Invalid argument type (expected integer) |
| E15001 | Invalid regex pattern |

---
