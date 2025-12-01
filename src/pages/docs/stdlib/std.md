---
layout: '../../../layouts/DocsLayout.astro'
title: '@std'
description: 'Core standard utilities for EZ programs.'
---

# @std

The `@std` module provides the most essential functions for any EZ program,
including output to the console and basic type information.

## Import

```ez
import @std
```

## Functions

### println

Prints one or more values to stdout, followed by a newline.

```ez
std.println("Hello, World!")
std.println("The answer is:", 42)
std.println("x =", x, "y =", y)
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

### print

Prints one or more values to stdout without a trailing newline.

```ez
std.print("Enter your name: ")
temp name string = input()
std.println("Hello, " + name)
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

### typeof

Returns the type of a value as a string.

```ez
temp x int = 42
std.println(std.typeof(x))  // "int"

temp arr [int] = {1, 2, 3}
std.println(std.typeof(arr))  // "array"
```

**Parameters:** `value any` - The value to inspect.

**Returns:** `string` - The type name.

## Built-in Functions

These functions are available globally without importing any module.

### len

Returns the length of an array or string.

```ez
temp arr [int] = {1, 2, 3, 4, 5}
std.println(len(arr))  // 5

temp str string = "hello"
std.println(len(str))  // 5
```

**Parameters:** `value` - An array or string.

**Returns:** `int` - The number of elements or characters.

### string

Converts a value to its string representation.

```ez
temp num int = 42
temp str string = string(num)  // "42"

temp pi float = 3.14159
std.println(string(pi))  // "3.14159"
```

**Parameters:** `value` - Any value.

**Returns:** `string` - The string representation.

### int

Converts a value to an integer.

```ez
temp str string = "42"
temp num int = int(str)  // 42

temp pi float = 3.14159
temp rounded int = int(pi)  // 3
```

**Parameters:** `value` - A string, float, or int.

**Returns:** `int` - The integer value.

**Errors:** [E3005](/errors/E3005) if the string cannot be parsed as an integer.

### float

Converts a value to a floating-point number.

```ez
temp str string = "3.14"
temp num float = float(str)  // 3.14

temp whole int = 42
temp decimal float = float(whole)  // 42.0
```

**Parameters:** `value` - A string, int, or float.

**Returns:** `float` - The floating-point value.

**Errors:** [E3006](/errors/E3006) if the string cannot be parsed as a float.

## Example Program

```ez
import @std

do main() {
    // Basic output
    std.println("Welcome to EZ!")

    // Type inspection
    temp numbers [int] = {1, 2, 3, 4, 5}
    std.println("Type:", std.typeof(numbers))
    std.println("Length:", len(numbers))

    // Type conversion
    temp input string = "100"
    temp value int = int(input)
    std.println("Doubled:", value * 2)
}
```
