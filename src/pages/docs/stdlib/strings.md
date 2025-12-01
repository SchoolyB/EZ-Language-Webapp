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

### upper

Converts a string to uppercase.

```ez
strings.upper("hello")  // "HELLO"
strings.upper("Hello World")  // "HELLO WORLD"
```

**Parameters:** `str` - The string.

**Returns:** `string` - Uppercase version.

### lower

Converts a string to lowercase.

```ez
strings.lower("HELLO")  // "hello"
strings.lower("Hello World")  // "hello world"
```

**Parameters:** `str` - The string.

**Returns:** `string` - Lowercase version.

### capitalize

Capitalizes the first character of a string.

```ez
strings.capitalize("hello")  // "Hello"
strings.capitalize("hello world")  // "Hello world"
```

**Parameters:** `str` - The string.

**Returns:** `string` - Capitalized string.

### title

Capitalizes the first character of each word.

```ez
strings.title("hello world")  // "Hello World"
strings.title("the quick brown fox")  // "The Quick Brown Fox"
```

**Parameters:** `str` - The string.

**Returns:** `string` - Title-cased string.

## Searching

### contains

Checks if a string contains a substring.

```ez
strings.contains("hello world", "world")  // true
strings.contains("hello world", "foo")    // false
```

**Parameters:** `str`, `substr`.

**Returns:** `bool` - true if found.

**Errors:** [E10005](/errors/E10005) if arguments are not strings.

### starts_with

Checks if a string starts with a prefix.

```ez
strings.starts_with("hello world", "hello")  // true
strings.starts_with("hello world", "world")  // false
```

**Parameters:** `str`, `prefix`.

**Returns:** `bool` - true if starts with prefix.

**Errors:** [E10006](/errors/E10006) if arguments are not strings.

### ends_with

Checks if a string ends with a suffix.

```ez
strings.ends_with("hello world", "world")  // true
strings.ends_with("hello world", "hello")  // false
```

**Parameters:** `str`, `suffix`.

**Returns:** `bool` - true if ends with suffix.

**Errors:** [E10007](/errors/E10007) if arguments are not strings.

### index

Returns the index of the first occurrence of a substring, or -1 if not found.

```ez
strings.index("hello world", "world")  // 6
strings.index("hello world", "foo")    // -1
```

**Parameters:** `str`, `substr`.

**Returns:** `int` - Index or -1.

**Errors:** [E10004](/errors/E10004) if arguments are not strings.

## Trimming

### trim

Removes whitespace from both ends of a string.

```ez
strings.trim("  hello  ")  // "hello"
strings.trim("\n\thello\n")  // "hello"
```

**Parameters:** `str` - The string.

**Returns:** `string` - Trimmed string.

### trim_left / trim_right

Removes whitespace from the left or right side only.

```ez
strings.trim_left("  hello  ")   // "hello  "
strings.trim_right("  hello  ")  // "  hello"
```

**Parameters:** `str` - The string.

**Returns:** `string` - Trimmed string.

## Splitting and Joining

### split

Splits a string into an array of substrings.

```ez
temp parts [string] = strings.split("a,b,c", ",")
std.println(parts)  // {"a", "b", "c"}

temp words [string] = strings.split("hello world", " ")
std.println(words)  // {"hello", "world"}
```

**Parameters:** `str`, `separator`.

**Returns:** `[string]` - Array of substrings.

**Errors:** [E10001](/errors/E10001) if arguments are not strings.

### join

Joins an array of strings with a separator.

```ez
temp parts [string] = {"a", "b", "c"}
std.println(strings.join(parts, "-"))  // "a-b-c"
std.println(strings.join(parts, ""))   // "abc"
```

**Parameters:** `arr`, `separator`.

**Returns:** `string` - Joined string.

**Errors:** [E10002](/errors/E10002) if the first argument is not an array.

## Replacing

### replace

Replaces all occurrences of a substring with another string.

```ez
strings.replace("hello world", "world", "EZ")  // "hello EZ"
strings.replace("aaa", "a", "b")  // "bbb"
```

**Parameters:** `str`, `old`, `new`.

**Returns:** `string` - Modified string.

**Errors:** [E10003](/errors/E10003) if arguments are not strings.

### replace_first

Replaces only the first occurrence of a substring.

```ez
strings.replace_first("aaa", "a", "b")  // "baa"
```

**Parameters:** `str`, `old`, `new`.

**Returns:** `string` - Modified string.

## Substrings

### substring

Returns a portion of a string from start index to end index.

```ez
strings.substring("hello world", 0, 5)   // "hello"
strings.substring("hello world", 6, 11)  // "world"
```

**Parameters:** `str`, `start`, `end`.

**Returns:** `string` - The substring.

### char_at

Returns the character at a specific index.

```ez
strings.char_at("hello", 0)  // "h"
strings.char_at("hello", 4)  // "o"
```

**Parameters:** `str`, `index`.

**Returns:** `string` - Single character.

## Padding

### pad_left / pad_right

Pads a string to a minimum length.

```ez
strings.pad_left("42", 5, "0")   // "00042"
strings.pad_right("hi", 5, ".")  // "hi..."
```

**Parameters:** `str`, `length`, `pad_char`.

**Returns:** `string` - Padded string.

### repeat

Repeats a string n times.

```ez
strings.repeat("ab", 3)  // "ababab"
strings.repeat("-", 10)  // "----------"
```

**Parameters:** `str`, `count`.

**Returns:** `string` - Repeated string.

## Conversion

### chars

Splits a string into an array of individual characters.

```ez
temp chars [string] = strings.chars("hello")
std.println(chars)  // {"h", "e", "l", "l", "o"}
```

**Parameters:** `str` - The string.

**Returns:** `[string]` - Array of characters.

### reverse

Reverses a string.

```ez
strings.reverse("hello")  // "olleh"
strings.reverse("12345")  // "54321"
```

**Parameters:** `str` - The string.

**Returns:** `string` - Reversed string.

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
