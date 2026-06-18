---
layout: '../../../layouts/DocsLayout.astro'
title: 'Built-in Functions'
description: 'Functions built into EZ that are always available without imports.'
---

# Built-in Functions

These functions are built into the language and always available — no imports needed.

## Output Functions

### println()

`(values ...type) -> void`

Prints one or more values to stdout, followed by a newline.

```ez
println("Hello, World!")
println("The answer is:", 42)
println("x =", x, "y =", y)
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

### print()

`(values ...type) -> void`

Prints one or more values to stdout without a trailing newline.

```ez
print("Enter your name: ")
mut name = input()
println("Hello, " + name)
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

### eprintln()

`(values ...type) -> void`

Prints one or more values to stderr, followed by a newline.

```ez
eprintln("Error:", "something failed")
eprintln("Warning: invalid input")
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

### eprint()

`(values ...type) -> void`

Prints one or more values to stderr without a trailing newline.

```ez
eprint("Error: ")
eprintln("connection failed")
```

**Parameters:** Any number of values of any type.

**Returns:** Nothing.

## Program Control

### exit()

`(int) -> void`

Exits the program with the specified status code.

```ez
// Exit with success
exit(0)

// Exit with failure
exit(1)

// Exit with custom code
exit(42)
```

**Parameters:** An integer status code (0 for success, non-zero for failure).

**Returns:** Does not return (terminates the program).

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
mut x = 5
assert(x > 0, "x must be positive")  // Passes

mut y = -1
assert(y > 0, "y must be positive")  // Fails: [ASSERT] y must be positive
```

**Parameters:**
- `condition`: A boolean expression to check
- `message`: A string message to display if the assertion fails

**Returns:** Nothing if the condition is true; terminates the program if false.

| Error Code | Condition |
|------------|-----------|
| E5022 | Assertion failed |

## Input Functions

### input()

`() -> string`

Reads a line of text from stdin.

```ez
print("Enter your name: ")
mut name = input()
println("Hello, " + name)
```

## Utility Functions

### len()

`(value) -> int`

Returns the length of a string, array, or map.

```ez
mut name = "Hello"
println(len(name))  // 5

mut nums [int] = {1, 2, 3}
println(len(nums))  // 3

mut ages map[string:int] = {"Alice": 30, "Bob": 25}
println(len(ages))  // 2
```

### range()

Generates a sequence of numbers for `for` loops. Requires at least 2 arguments.

```ez
// range(start, end) - end is exclusive
for i in range(0, 5) {
    println(i)  // 0, 1, 2, 3, 4
}

// range(start, end, step)
for i in range(0, 10, 2) {
    println(i)  // 0, 2, 4, 6, 8
}
```

### type_of()

`(value) -> string`

Returns the type of a value as a string.

```ez
mut x = 42
println(type_of(x))  // "int"

mut arr [string] = {"a", "b"}
println(type_of(arr))  // "array"
```

### size_of()

`(Type) -> int`

Returns the size of a type in bytes.

```ez
println(size_of(int))     // 8
println(size_of(bool))    // 1
println(size_of(float))   // 8
```

### addr()

`(variable) -> ^T`

Returns a pointer to a variable's memory address.

```ez
mut x = 42
mut ptr = addr(x)
println(ptr)  // memory address
```

### copy()

`(value) -> value`

Creates a deep copy of a value. Since EZ uses copy-by-default semantics, this function is primarily useful when you want to be explicit about copying.

```ez
const Person struct {
    name string
    age int
}

mut a = Person{name: "Alice", age: 30}
mut b = copy(a)  // Explicit copy (same as just `mut b = a`)
b.age = 31
// a.age is still 30 - b is an independent copy
```

**Note:** With copy-by-default behavior, `mut b = a` already creates an independent copy. Use `copy()` when you want to be explicit about your intent, or use `ref()` when you need shared data.

**Deep copy behavior:**
- Primitives return themselves
- Nested structs are recursively copied
- Arrays are copied with all elements
- Maps are copied with all key-value pairs

### ref()

`(value) -> reference`

Creates a reference to a value, enabling shared data between variables. The mutability of the reference depends on the variable declaration.

```ez
const Person struct {
    name string
    age int
}

mut a = Person{name: "Alice", age: 30}

// mut ref is mutable - can modify through the reference
mut b = ref(a)
b.age = 31
// a.age is now 31 - both variables share the same data

// const ref is read-only - can read but not modify
const c = ref(a)
mut val = c.age    // OK - can read
// c.age = 32      // ERROR - cannot modify through const ref
```

**Works with all types:**

```ez
// Reference to an array
mut original [int] = {1, 2, 3}
mut shared = ref(original)
shared[0] = 100
// original[0] is now 100

// Reference to a primitive
mut count = 0
mut counter = ref(count)
counter++
// count is now 1
```

**Note:** Without `ref()`, assignments create independent copies by default.

### new()

`(StructType) -> ^Type`

Allocates a new instance of a struct with all fields set to their zero values. Returns a pointer to the struct.

```ez
const Person struct {
    name string
    age int
    active bool
}

mut p = new(Person)
// p is ^Person (pointer to Person)
// p^.name = ""
// p^.age = 0
// p^.active = false
```

**Zero values by type:**
- `string` → `""`
- `int`, `uint`, `float` → `0`
- `bool` → `false`
- `char` → `'\0'`
- Arrays → empty array
- Maps → empty map

### c_string()

`(ptr ^u8) -> string`

Converts a C `char*` return value to an EZ string. Used with C interop.

```ez
import c"stdlib.h"

do main() {
    mut home = c_string(c.getenv("HOME"))
    println(home)
}
```

## Sleep Functions

### sleep_s()

`(int) -> void`

Pauses execution for the specified number of seconds.

```ez
println("Starting...")
sleep_s(2)
println("Done!")  // Printed 2 seconds later
```

**Parameters:** Number of seconds to sleep (must be non-negative).

### sleep_ms()

`(int) -> void`

Pauses execution for the specified number of milliseconds.

```ez
sleep_ms(500)  // Sleep for half a second
```

**Parameters:** Number of milliseconds to sleep (must be non-negative).

### sleep_ns()

`(int) -> void`

Pauses execution for the specified number of nanoseconds.

```ez
sleep_ns(1000000)  // Sleep for 1 millisecond
```

**Parameters:** Number of nanoseconds to sleep (must be non-negative).

## Type Conversion Functions

Convert values between types. These are essential for working with user input, formatting output, and data transformations.

### cast()

`(value, type) -> value`

Converts a value to the specified type. Unlike other conversion functions, `cast()` accepts any valid EZ type as its second argument, including sized integers and array types.

```ez
// Single value conversion
mut x = cast(42, u8)        // int -> u8
mut y = cast(3.14, int)     // float -> int
mut z = cast(65, char)      // int -> char

// Array element-wise conversion
mut bytes [byte] = {65, 66, 67}
mut u8_arr = cast(bytes, [u8])  // [byte] -> [u8]

mut nums [int] = {1, 2, 3}
mut strs = cast(nums, [string])  // ["1", "2", "3"]
```

**Parameters:**
- `value` — The value or array to convert
- `type` — Target type (e.g., `u8`, `int`, `string`, `[u8]`)

**Returns:** The converted value in the target type.

| Target Type | Accepted Source Types |
|-------------|----------------------|
| `int` | int, float, string, char, byte |
| `float` | float, int, string, byte, char |
| `string` | all types (uses string representation) |
| `char` | char, int, float, byte, string (len=1) |
| `byte` | byte, int, float, char, string |
| `i8/i16/i32/i64/i128/i256` | int, float, string, byte, char |
| `u8/u16/u32/u64/u128/u256` | int, float, string, byte, char |
| `f32/f64` | float, int, string, byte, char |
| `bool` | bool, int (0=false, else=true), string ("true"/"false") |

**Error handling:** Invalid conversions produce errors with details:

```ez
mut result = cast([-1, 2, 3], [u8])
// Error: "cast failed at index 0: value -1 out of u8 range (0 to 255)"
```

**Note:** `cast()` is technically a language keyword because the type argument is validated at check-time (before execution). See also: [cast in Keywords](/EZ-Language-Webapp/docs/language/keywords#cast).

### int()

`(value) -> int`

Converts a value to an integer.

```ez
mut s = "42"
mut n = int(s)  // 42

mut f = 3.9
mut i = int(f)  // 3 (truncates)
```

### float()

`(value) -> float`

Converts a value to a float.

```ez
mut n = 42
mut f = float(n)  // 42.0

mut s = "3.14"
mut pi = float(s)  // 3.14
```

### string()

`(value) -> string`

Converts a value to a string.

```ez
mut n = 42
mut s = string(n)  // "42"

mut b = true
mut bs = string(b)  // "true"
```

### char()

`(int) -> char`

Converts an integer (ASCII/Unicode value) to a character.

```ez
mut x = 65
mut c = char(x)  // 'A'

mut newline = char(10)  // newline character
```

### byte()

`(int) -> byte`

Converts an integer to a byte (constrained to 0-255).

```ez
mut n = 65
mut b = byte(n)  // 65

mut max = byte(255)  // 255
mut wrapped = byte(256)  // Error: value out of range
```

**Behavior:**
- Values 0-255 convert directly
- Values outside 0-255 range produce an error
- Useful when working with the `@bytes` module

### to_char()

`(s string, index int) -> int`

Returns the Unicode codepoint at character position `index` (not byte position). Panics if index is out of bounds.

```ez
mut s = "日本語"
mut cp = to_char(s, 0)   // 26085 (codepoint for '日')
mut cp2 = to_char(s, 1)  // 26412 (codepoint for '本')
```

---

### char_count()

`(s string) -> int`

Returns the number of Unicode characters (codepoints) in a string. Unlike `len()`, which returns byte count, `char_count()` counts decoded UTF-8 characters.

```ez
mut s = "日本語"
println(len(s))         // 9 (byte length)
println(char_count(s))  // 3 (character count)

mut ascii = "hello"
println(len(ascii))        // 5
println(char_count(ascii)) // 5 (same for ASCII)
```

---

### Wide Integer Conversions

These functions construct wide integer types. They accept int, float, string, byte, or char values.

#### i128()

`(value) -> i128`

Converts to a signed 128-bit integer.

```ez
mut val = i128(1000000000000)
println(type_of(val))  // "i128"
```

#### i256()

`(value) -> i256`

Converts to a signed 256-bit integer.

```ez
mut val = i256(1000000000000)
```

#### u128()

`(value) -> u128`

Converts to an unsigned 128-bit integer.

```ez
mut val = u128(1000000000000)
```

#### u256()

`(value) -> u256`

Converts to an unsigned 256-bit integer.

```ez
mut val = u256(1000000000000)
```

> **Note:** For other sized types (`i8`, `u8`, `i16`, `u16`, `i32`, `u32`, `i64`, `u64`, `f32`, `f64`), use `cast()`:
> ```ez
> mut small = cast(42, u8)
> mut precise = cast(3.14, f32)
> ```

## Error Handling

### Error Type

The `Error` type represents an error value that can be returned from functions.

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | The error message |
| `code` | string | Error code (empty for user errors, E-codes for stdlib errors) |

**Checking for errors:**

```ez
mut err = validate("")
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
    mut err = validate("")
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
    mut result, err = divide(10, 0)
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

## Compile-time Functions

### embed()

`(path string) -> string`

Reads a file from disk at **compile time** and bakes its entire contents into the binary as a string literal. The resulting value is available as a `string` at runtime with no file I/O overhead.

```ez
// Embed a file at file scope
const LICENSE string = embed("../../LICENSE")
const DEFAULT_CONFIG string = embed("config/defaults.json")

do main() {
    // Also valid inside a function
    const shader string = embed("shaders/vertex.glsl")
    println(LICENSE)
}
```

**Parameters:** `path` - A string literal path to the file. Variables and expressions are rejected.

**Returns:** The file contents as a `string`.

**Rules:**
- The path is resolved relative to the directory of the source file containing the `embed()` call
- Absolute paths are also accepted
- The argument must be a **string literal** — variables and expressions are not allowed
- If the file does not exist or cannot be read at compile time, it is a compile-time error
- Valid at file scope (as a `const` initializer) or inside a function body

---

## Quick Reference

### Functions

| Function | Description | Example |
|----------|-------------|---------|
| `println(values...)` | Print with newline | `println("Hello", 42)` |
| `print(values...)` | Print without newline | `print("Name: ")` |
| `eprintln(values...)` | Print to stderr with newline | `eprintln("Error:", msg)` |
| `eprint(values...)` | Print to stderr without newline | `eprint("Error: ")` |
| `exit(code)` | Exit program with status code | `exit(0)` |
| `panic(msg)` | Terminate with panic message | `panic("error")` |
| `assert(cond, msg)` | Assert condition is true | `assert(x > 0, "must be positive")` |
| `input()` | Read line from stdin | `mut name = input()` |
| `len(x)` | Length of string, array, or map | `len("hello")` → `5` |
| `range(start, end)` | Number sequence for loops | `range(0, 5)` → `0,1,2,3,4` |
| `range(start, end, step)` | Number sequence with step | `range(0, 10, 2)` → `0,2,4,6,8` |
| `type_of(x)` | Type name as string | `type_of(42)` → `"int"` |
| `size_of(Type)` | Size of type in bytes | `size_of(int)` → `8` |
| `addr(x)` | Pointer to variable | `addr(myVar)` → `^T` |
| `copy(x)` | Explicit deep copy of a value | `copy(myStruct)` → independent copy |
| `ref(x)` | Create reference for shared data | `ref(myStruct)` → shared reference |
| `new(Type)` | Allocate zero-initialized struct | `new(Person)` → `^Person` |
| `c_string(ptr)` | Convert C char* to string | `c_string(c.getenv("HOME"))` |
| `sleep_s(n)` | Sleep for n seconds | `sleep_s(2)` |
| `sleep_ms(n)` | Sleep for n milliseconds | `sleep_ms(500)` |
| `sleep_ns(n)` | Sleep for n nanoseconds | `sleep_ns(1000000)` |
| `cast(x, type)` | Convert to any type | `cast(42, u8)` → `42` as u8 |
| `int(x)` | Convert to integer | `int("42")` → `42` |
| `float(x)` | Convert to float | `float(42)` → `42.0` |
| `string(x)` | Convert to string | `string(42)` → `"42"` |
| `char(x)` | Convert int to character | `char(65)` → `'A'` |
| `byte(x)` | Convert int to byte (0-255) | `byte(65)` → `65` |
| `i128(x)` | Convert to signed 128-bit int | `i128(val)` → value as i128 |
| `i256(x)` | Convert to signed 256-bit int | `i256(val)` → value as i256 |
| `u128(x)` | Convert to unsigned 128-bit int | `u128(val)` → value as u128 |
| `u256(x)` | Convert to unsigned 256-bit int | `u256(val)` → value as u256 |
| `embed(path)` | Compile-time file embedding | `embed("data.json")` → file contents as string |
| `error(msg)` | Create user-defined error | `error("invalid input")` → `Error` |
