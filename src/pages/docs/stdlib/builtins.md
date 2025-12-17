---
layout: '../../../layouts/DocsLayout.astro'
title: 'Built-in Functions'
description: 'Functions built into EZ that are always available without imports.'
---

# Built-in Functions

These functions are built into the language and always available — no imports needed.

## Program Control

### exit()

`(int) -> void`

Exits the program with the specified status code.

```ez
// Exit with success
exit(EXIT_SUCCESS)

// Exit with failure
exit(EXIT_FAILURE)

// Exit with custom code
exit(42)
```

**Parameters:** An integer status code (0 for success, non-zero for failure).

**Returns:** Does not return (terminates the program).

### EXIT_SUCCESS

`int` constant with value `0`

Represents a successful program exit.

```ez
exit(EXIT_SUCCESS)  // Exit with code 0
```

### EXIT_FAILURE

`int` constant with value `1`

Represents a failed program exit.

```ez
exit(EXIT_FAILURE)  // Exit with code 1
```

### panic()

`(string) -> void`

Terminates the program immediately with a panic message. The message is prefixed with `[PANIC]`.

```ez
panic("something went wrong")
// Output: [PANIC] something went wrong
```

**Parameters:** A string message describing why the program is panicking.

**Returns:** Does not return (terminates the program).

| Error Code | Condition |
|------------|-----------|
| E5021 | Panic called |

### assert()

`(bool, string) -> void`

Checks that a condition is true. If the condition is false, terminates the program with an assertion failure message prefixed with `[ASSERT]`.

```ez
temp x int = 5
assert(x > 0, "x must be positive")  // Passes

temp y int = -1
assert(y > 0, "y must be positive")  // Fails: [ASSERT] y must be positive
```

**Parameters:**
- `condition`: A boolean expression to check
- `message`: A string message to display if the assertion fails

**Returns:** Nothing if the condition is true; terminates the program if false.

| Error Code | Condition |
|------------|-----------|
| E5022 | Assertion failed |

## Utility Functions

### input()

`() -> string`

Reads a line of text from stdin.

```ez
import @std

std.printf("Enter your name: ")
temp name string = input()
std.println("Hello, " + name)
```

### read_int()

`() -> (int, Error)`

Reads an integer from stdin. Returns a tuple of the parsed integer and an error (if the input cannot be parsed).

```ez
import @std

std.printf("Enter a number: ")
temp num, err = read_int()

if err != nil {
    std.println("Invalid input: " + err.message)
} otherwise {
    std.println("You entered: " + string(num))
}
```

### len()

`(value) -> int`

Returns the length of a string, array, or map.

```ez
import @std

temp name string = "Hello"
std.println(len(name))  // 5

temp nums [int] = {1, 2, 3}
std.println(len(nums))  // 3

temp ages map[string:int] = {"Alice": 30, "Bob": 25}
std.println(len(ages))  // 2
```

### range()

Generates a sequence of numbers for `for` loops.

```ez
import @std

// range(start, end) - end is exclusive
for i in range(0, 5) {
    std.println(i)  // 0, 1, 2, 3, 4
}

// range(start, end, step)
for i in range(0, 10, 2) {
    std.println(i)  // 0, 2, 4, 6, 8
}
```

### typeof()

`(value) -> string`

Returns the type of a value as a string.

```ez
import @std

temp x int = 42
std.println(typeof(x))  // "int"

temp arr [string] = {"a", "b"}
std.println(typeof(arr))  // "array"
```

### copy()

`(value) -> value`

Creates a deep copy of a value. Since EZ uses copy-by-default semantics, this function is primarily useful when you want to be explicit about copying.

```ez
const Person struct {
    name string
    age int
}

temp a Person = Person{name: "Alice", age: 30}
temp b Person = copy(a)  // Explicit copy (same as just `temp b = a`)
b.age = 31
// a.age is still 30 - b is an independent copy
```

**Note:** With copy-by-default behavior, `temp b = a` already creates an independent copy. Use `copy()` when you want to be explicit about your intent, or use `ref()` when you need shared data.

**Deep copy behavior:**
- Primitives return themselves
- Nested structs are recursively copied
- Arrays are copied with all elements
- Maps are copied with all key-value pairs

### ref()

`(value) -> reference`

Creates a reference to a value, enabling shared data between variables. Use this when multiple variables need to point to the same underlying data.

```ez
const Person struct {
    name string
    age int
}

temp a Person = Person{name: "Alice", age: 30}
temp b Person = ref(a)  // b references the same data as a
b.age = 31
// a.age is now 31 - both variables share the same data
```

**When to use `ref()`:**
- When multiple variables need to share and modify the same data
- When passing large data structures without copying overhead
- When you need changes in one place to be visible everywhere

**Works with all types:**
- Primitives (int, float, string, bool, char)
- Complex types (structs, arrays, maps)

```ez
// Reference to an array
temp original [int] = {1, 2, 3}
temp shared [int] = ref(original)
shared[0] = 100
// original[0] is now 100

// Reference to a primitive
temp count int = 0
temp counter int = ref(count)
counter++
// count is now 1
```

**Note:** Without `ref()`, assignments create independent copies by default.

### new()

`(StructType) -> StructType`

Creates a new instance of a struct with all fields set to their zero values.

```ez
const Person struct {
    name string
    age int
    active bool
}

temp p Person = new(Person)
// p.name = ""
// p.age = 0
// p.active = false
```

**Zero values by type:**
- `string` → `""`
- `int`, `float` → `0`
- `bool` → `false`
- `char` → `'\0'`
- Arrays → empty array
- Maps → empty map

## Type Conversion Functions

Convert values between types. These are essential for working with user input, formatting output, and data transformations.

### int()

`(value) -> int`

Converts a value to an integer.

```ez
temp s string = "42"
temp n int = int(s)  // 42

temp f float = 3.9
temp i int = int(f)  // 3 (truncates)
```

### float()

`(value) -> float`

Converts a value to a float.

```ez
temp n int = 42
temp f float = float(n)  // 42.0

temp s string = "3.14"
temp pi float = float(s)  // 3.14
```

### string()

`(value) -> string`

Converts a value to a string.

```ez
temp n int = 42
temp s string = string(n)  // "42"

temp b bool = true
temp bs string = string(b)  // "true"
```

### char()

`(int) -> char`

Converts an integer (ASCII/Unicode value) to a character.

```ez
temp x int = 65
temp c char = char(x)  // 'A'

temp newline char = char(10)  // newline character
```

### byte()

`(int) -> byte`

Converts an integer to a byte (constrained to 0-255).

```ez
temp n int = 65
temp b byte = byte(n)  // 65

temp max byte = byte(255)  // 255
temp wrapped byte = byte(256)  // Error: value out of range
```

**Behavior:**
- Values 0-255 convert directly
- Values outside 0-255 range produce an error
- Useful when working with the `@bytes` module

## Error Handling

### Error Type

The `Error` type represents an error value that can be returned from functions.

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | The error message |
| `code` | string | Error code (empty for user errors, E-codes for stdlib errors) |

**Checking for errors:**

```ez
temp err = validate("")
if err != nil {
    println("Error: ${err.message}")
}
```

### error()

`(string) -> Error`

Creates a user-defined error. Returns an `Error` with `.message` set to the argument and `.code` set to empty string.

**Single error return:**

```ez
do validate(name string) -> Error {
    if len(name) == 0 {
        return error("name cannot be empty")
    }
    return nil
}

do main() {
    temp err = validate("")
    if err != nil {
        println(err.message)  // "name cannot be empty"
    }
}
```

**Tuple return (value + error):**

```ez
do divide(a int, b int) -> (int, Error) {
    if b == 0 {
        return 0, error("division by zero")
    }
    return a / b, nil
}

do main() {
    temp result, err = divide(10, 0)
    if err != nil {
        println("Failed: ${err.message}")
    } otherwise {
        println("Result: ${result}")
    }
}
```

| Error Code | Condition |
|------------|-----------|
| E7001 | Wrong number of arguments |
| E7003 | Argument is not a string |

## Quick Reference

| Function | Description | Example |
|----------|-------------|---------|
| `exit(code)` | Exit program with status code | `exit(EXIT_SUCCESS)` |
| `EXIT_SUCCESS` | Constant `0` | `exit(EXIT_SUCCESS)` |
| `EXIT_FAILURE` | Constant `1` | `exit(EXIT_FAILURE)` |
| `panic(msg)` | Terminate with panic message | `panic("error")` |
| `assert(cond, msg)` | Assert condition is true | `assert(x > 0, "must be positive")` |
| `input()` | Read line from stdin | `temp name = input()` |
| `read_int()` | Read integer from stdin | `temp num, err = read_int()` |
| `len(x)` | Length of string, array, or map | `len("hello")` → `5` |
| `range(start, end)` | Number sequence for loops | `range(0, 5)` → `0,1,2,3,4` |
| `range(start, end, step)` | Number sequence with step | `range(0, 10, 2)` → `0,2,4,6,8` |
| `typeof(x)` | Type name as string | `typeof(42)` → `"int"` |
| `copy(x)` | Explicit deep copy of a value | `copy(myStruct)` → independent copy |
| `ref(x)` | Create reference for shared data | `ref(myStruct)` → shared reference |
| `new(Type)` | Create zero-initialized struct | `new(Person)` → struct with zero values |
| `int(x)` | Convert to integer | `int("42")` → `42` |
| `float(x)` | Convert to float | `float(42)` → `42.0` |
| `string(x)` | Convert to string | `string(42)` → `"42"` |
| `char(x)` | Convert int to character | `char(65)` → `'A'` |
| `byte(x)` | Convert int to byte (0-255) | `byte(65)` → `65` |
| `error(msg)` | Create user-defined error | `error("invalid input")` → `Error` |
