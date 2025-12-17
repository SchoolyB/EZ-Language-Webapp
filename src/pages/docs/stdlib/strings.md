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

### `upper()`
`(str string) -> string`

Converts a string to uppercase.

```ez
import @std, @strings

do uppercase_demo() {
    std.println(strings.upper("hello"))  // "HELLO"
    std.println(strings.upper("Hello World"))  // "HELLO WORLD"
}
```

**Parameters:** `str` - The string.

**Returns:** `string` - Uppercase version.

### `lower()`
`(str string) -> string`

Converts a string to lowercase.

```ez
import @std, @strings

do lowercase_demo() {
    std.println(strings.lower("HELLO"))  // "hello"
    std.println(strings.lower("Hello World"))  // "hello world"
}
```

**Parameters:** `str` - The string.

**Returns:** `string` - Lowercase version.

### `capitalize()`
`(str string) -> string`

Capitalizes the first character of a string.

```ez
import @std, @strings

do capitalize_demo() {
    std.println(strings.capitalize("hello"))  // "Hello"
    std.println(strings.capitalize("hello world"))  // "Hello world"
}
```

**Parameters:** `str` - The string.

**Returns:** `string` - Capitalized string.

### `title()`
`(str string) -> string`

Capitalizes the first character of each word.

```ez
import @std, @strings

do title_case_demo() {
    std.println(strings.title("hello world"))  // "Hello World"
    std.println(strings.title("the quick brown fox"))  // "The Quick Brown Fox"
}
```

**Parameters:** `str` - The string.

**Returns:** `string` - Title-cased string.

## Searching

### `contains()`
`(str string, substr string) -> bool`

Checks if a string contains a substring.

```ez
import @std, @strings

do check_contains() {
    std.println(strings.contains("hello world", "world"))  // true
    std.println(strings.contains("hello world", "foo"))    // false
}
```

**Parameters:** `str`, `substr`.

**Returns:** `bool` - true if found.

**Errors:** [E7003](/language.ez/errors/E7003) if arguments are not strings.

### `starts_with()`
`(str string, prefix string) -> bool`

Checks if a string starts with a prefix.

```ez
import @std, @strings

do check_prefix() {
    std.println(strings.starts_with("hello world", "hello"))  // true
    std.println(strings.starts_with("hello world", "world"))  // false
}
```

**Parameters:** `str`, `prefix`.

**Returns:** `bool` - true if starts with prefix.

**Errors:** [E7003](/language.ez/errors/E7003) if arguments are not strings.

### `ends_with()`
`(str string, suffix string) -> bool`

Checks if a string ends with a suffix.

```ez
import @std, @strings

do check_suffix() {
    std.println(strings.ends_with("hello world", "world"))  // true
    std.println(strings.ends_with("hello world", "hello"))  // false
}
```

**Parameters:** `str`, `suffix`.

**Returns:** `bool` - true if ends with suffix.

**Errors:** [E7003](/language.ez/errors/E7003) if arguments are not strings.

### `index()`
`(str string, substr string) -> int`

Returns the index of the first occurrence of a substring, or -1 if not found.

```ez
import @std, @strings

do find_index() {
    std.println(strings.index("hello world", "world"))  // 6
    std.println(strings.index("hello world", "foo"))    // -1
}
```

**Parameters:** `str`, `substr`.

**Returns:** `int` - Index or -1.

**Errors:** [E7003](/language.ez/errors/E7003) if arguments are not strings.

## Trimming

### `trim()`
`(str string) -> string`

Removes whitespace from both ends of a string.

```ez
import @std, @strings

do trim_whitespace() {
    std.println(strings.trim("  hello  "))  // "hello"
    std.println(strings.trim("\n\thello\n"))  // "hello"
}
```

**Parameters:** `str` - The string.

**Returns:** `string` - Trimmed string.

### `trim_left()` / `trim_right()`
`(str string) -> string`

Removes whitespace from the left or right side only.

```ez
import @std, @strings

do trim_sides() {
    std.println(strings.trim_left("  hello  "))   // "hello  "
    std.println(strings.trim_right("  hello  "))  // "  hello"
}
```

**Parameters:** `str` - The string.

**Returns:** `string` - Trimmed string.

## Splitting and Joining

### `split()`
`(str string, separator string) -> [string]`

Splits a string into an array of substrings.

```ez
import @std, @strings

do split_string() {
    temp parts [string] = strings.split("a,b,c", ",")
    std.println(parts)  // {"a", "b", "c"}

    temp words [string] = strings.split("hello world", " ")
    std.println(words)  // {"hello", "world"}
}
```

**Parameters:** `str`, `separator`.

**Returns:** `[string]` - Array of substrings.

**Errors:** [E7003](/language.ez/errors/E7003) if arguments are not strings.

### `join()`
`(arr [string], separator string) -> string`

Joins an array of strings with a separator.

```ez
import @std, @strings

do join_strings() {
    temp parts [string] = {"a", "b", "c"}
    std.println(strings.join(parts, "-"))  // "a-b-c"
    std.println(strings.join(parts, ""))   // "abc"
}
```

**Parameters:** `arr`, `separator`.

**Returns:** `string` - Joined string.

**Errors:** [E7002](/language.ez/errors/E7002) if the first argument is not an array.

## Replacing

### `replace()`
`(str string, old string, new string) -> string`

Replaces all occurrences of a substring with another string.

```ez
import @std, @strings

do replace_all() {
    std.println(strings.replace("hello world", "world", "EZ"))  // "hello EZ"
    std.println(strings.replace("aaa", "a", "b"))  // "bbb"
}
```

**Parameters:** `str`, `old`, `new`.

**Returns:** `string` - Modified string.

**Errors:** [E7003](/language.ez/errors/E7003) if arguments are not strings.

### `replace_first()`
`(str string, old string, new string) -> string`

Replaces only the first occurrence of a substring.

```ez
import @std, @strings

do replace_once() {
    std.println(strings.replace_first("aaa", "a", "b"))  // "baa"
}
```

**Parameters:** `str`, `old`, `new`.

**Returns:** `string` - Modified string.

### `replace_n()`
`(str string, old string, new string, n int) -> string`

Replaces up to n occurrences of a substring. Use n=-1 to replace all.

```ez
import @std, @strings

do replace_limited() {
    std.println(strings.replace_n("aaa", "a", "b", 2))   // "bba"
    std.println(strings.replace_n("aaa", "a", "b", -1))  // "bbb" (all)
}
```

**Parameters:** `str`, `old`, `new`, `n` (number of replacements, -1 for all).

**Returns:** `string` - Modified string.

**Errors:** [E7003](/language.ez/errors/E7003) if string arguments are not strings, [E7004](/language.ez/errors/E7004) if n is not an integer.

---

## Validation

### `is_numeric()`
`(str string) -> bool`

Checks if a string contains only numeric digits (0-9).

```ez
import @std, @strings

do check_numeric() {
    std.println(strings.is_numeric("12345"))    // true
    std.println(strings.is_numeric("12a34"))    // false
    std.println(strings.is_numeric(""))         // false
}
```

**Parameters:** `str` - The string to check.

**Returns:** `bool` - true if string contains only digits, false otherwise.

**Errors:** [E7003](/language.ez/errors/E7003) if argument is not a string.

---

### `is_alpha()`
`(str string) -> bool`

Checks if a string contains only alphabetic characters (letters).

```ez
import @std, @strings

do check_alpha() {
    std.println(strings.is_alpha("Hello"))      // true
    std.println(strings.is_alpha("Hello123"))   // false
    std.println(strings.is_alpha(""))           // false
}
```

**Parameters:** `str` - The string to check.

**Returns:** `bool` - true if string contains only letters, false otherwise.

**Errors:** [E7003](/language.ez/errors/E7003) if argument is not a string.

---

## Truncation

### `truncate()`
`(str string, length int, suffix string) -> string`

Truncates a string to a maximum length, adding a suffix if truncated.

```ez
import @std, @strings

do truncate_demo() {
    std.println(strings.truncate("Hello World", 8, "..."))  // "Hello..."
    std.println(strings.truncate("Hi", 10, "..."))          // "Hi" (not truncated)
}
```

**Parameters:**
- `str` - The string to truncate
- `length` - Maximum total length (including suffix)
- `suffix` - String to append if truncated (e.g., "...")

**Returns:** `string` - Truncated string with suffix, or original if shorter than length.

**Errors:** [E7003](/language.ez/errors/E7003) if str or suffix are not strings, [E7004](/language.ez/errors/E7004) if length is not an integer, [E10001](/language.ez/errors/E10001) if length is negative.

---

## Comparison

### `compare()`
`(a string, b string) -> int`

Compares two strings lexicographically.

```ez
import @std, @strings

do compare_demo() {
    std.println(strings.compare("apple", "banana"))  // -1 (apple < banana)
    std.println(strings.compare("banana", "apple"))  // 1  (banana > apple)
    std.println(strings.compare("apple", "apple"))   // 0  (equal)
}
```

**Parameters:** `a`, `b` - Two strings to compare.

**Returns:** `int` - Returns -1 if a < b, 0 if a == b, 1 if a > b.

**Errors:** [E7003](/language.ez/errors/E7003) if arguments are not strings.

---

## Substrings

### `substring()`
`(str string, start int, end int) -> string`

Returns a portion of a string from start index to end index. The end index is exclusive (not included), just like `range()`.

```ez
import @std, @strings

do get_substring() {
    std.println(strings.substring("hello world", 0, 5))   // "hello" (chars 0-4)
    std.println(strings.substring("hello world", 6, 11))  // "world" (chars 6-10)
}
```

**Parameters:** `str`, `start`, `end` (end is exclusive).

**Returns:** `string` - The substring.

### `char_at()`
`(str string, index int) -> string`

Returns the character at a specific index.

```ez
import @std, @strings

do get_char() {
    std.println(strings.char_at("hello", 0))  // "h"
    std.println(strings.char_at("hello", 4))  // "o"
}
```

**Parameters:** `str`, `index`.

**Returns:** `string` - Single character.

## Padding

### `pad_left()` / `pad_right()`
`(str string, length int, pad_char string) -> string`

Pads a string to a minimum length.

```ez
import @std, @strings

do pad_strings() {
    std.println(strings.pad_left("42", 5, "0"))   // "00042"
    std.println(strings.pad_right("hi", 5, "."))  // "hi..."
}
```

**Parameters:** `str`, `length`, `pad_char`.

**Returns:** `string` - Padded string.

### `repeat()`
`(str string, count int) -> string`

Repeats a string n times.

```ez
import @std, @strings

do repeat_string() {
    std.println(strings.repeat("ab", 3))  // "ababab"
    std.println(strings.repeat("-", 10))  // "----------"
}
```

**Parameters:** `str`, `count`.

**Returns:** `string` - Repeated string.

## Conversion

### `chars()`
`(str string) -> [string]`

Splits a string into an array of individual characters.

```ez
import @std, @strings

do split_to_chars() {
    temp chars [string] = strings.chars("hello")
    std.println(chars)  // {"h", "e", "l", "l", "o"}
}
```

**Parameters:** `str` - The string.

**Returns:** `[string]` - Array of characters.

### `reverse()`
`(str string) -> string`

Reverses a string.

```ez
import @std, @strings

do reverse_string() {
    std.println(strings.reverse("hello"))  // "olleh"
    std.println(strings.reverse("12345"))  // "54321"
}
```

**Parameters:** `str` - The string.

**Returns:** `string` - Reversed string.

## Parsing

### `to_int()`
`(str string) -> (int, Error)`

Converts a string to an integer. Returns a tuple of the parsed value and an error (if conversion fails).

```ez
import @std, @strings

do convert_numbers() {
    temp num, err = strings.to_int("42")
    if err != nil {
        std.println("Conversion error: " + err.message)
    } otherwise {
        std.println(num)  // 42
    }

    // Negative numbers
    temp negative, _ = strings.to_int("-100")
    std.println(negative)  // -100

    // Invalid input
    temp _, err2 = strings.to_int("abc")
    if err2 != nil {
        std.println("Failed to convert 'abc'")
    }
}
```

**Parameters:** `str` - The string to convert.

**Returns:** `(int, Error)` - Tuple of converted integer and error (nil on success).

**Errors:** Returns an Error if the string cannot be converted to an integer.

---

### `to_float()`
`(str string) -> (float, Error)`

Converts a string to a float. Returns a tuple of the parsed value and an error (if conversion fails).

```ez
import @std, @strings

do convert_decimals() {
    temp pi, err = strings.to_float("3.14159")
    if err != nil {
        std.println("Conversion error: " + err.message)
    } otherwise {
        std.println(pi)  // 3.14159
    }

    // Integer strings work too
    temp whole, _ = strings.to_float("42")
    std.println(whole)  // 42.0

    // Scientific notation
    temp sci, _ = strings.to_float("1.5e10")
    std.println(sci)  // 15000000000.0

    // Invalid input
    temp _, err2 = strings.to_float("not a number")
    if err2 != nil {
        std.println("Failed to convert")
    }
}
```

**Parameters:** `str` - The string to convert.

**Returns:** `(float, Error)` - Tuple of converted float and error (nil on success).

**Errors:** Returns an Error if the string cannot be converted to a float.

---

### `to_bool()`
`(str string) -> (bool, Error)`

Converts a string to a boolean. Returns a tuple of the parsed value and an error (if conversion fails).

```ez
import @std, @strings

do convert_booleans() {
    temp val1, _ = strings.to_bool("true")
    std.println(val1)  // true

    temp val2, _ = strings.to_bool("false")
    std.println(val2)  // false

    // Case-insensitive
    temp val3, _ = strings.to_bool("TRUE")
    std.println(val3)  // true

    temp val4, _ = strings.to_bool("False")
    std.println(val4)  // false

    // Invalid input
    temp _, err = strings.to_bool("yes")
    if err != nil {
        std.println("'yes' is not a valid boolean")
    }
}
```

**Parameters:** `str` - The string to convert ("true" or "false", case-insensitive).

**Returns:** `(bool, Error)` - Tuple of converted boolean and error (nil on success).

**Errors:** Returns an Error if the string is not "true" or "false" (case-insensitive).

---

## Example Program

```ez
import @std
import @strings

do main() {
    temp input string = "  Hello, World!  "

    // Clean up input
    temp cleaned string = strings.trim(input)
    std.println("Cleaned:", cleaned)

    // Transform
    std.println("Upper:", strings.upper(cleaned))
    std.println("Lower:", strings.lower(cleaned))

    // Search
    if strings.contains(cleaned, "World") {
        std.println("Contains 'World'!")
    }

    // Split and rejoin
    temp words [string] = strings.split(cleaned, " ")
    std.println("Words:", words)

    temp kebab string = strings.join(words, "-")
    std.println("Kebab case:", strings.lower(kebab))

    // Build a slug
    temp title string = "My Blog Post Title"
    temp slug string = strings.lower(strings.replace(title, " ", "-"))
    std.println("Slug:", slug)  // "my-blog-post-title"
}
```
