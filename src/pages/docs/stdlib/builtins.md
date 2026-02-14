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

## Constants

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

## Utility Functions

### input()

`() -> string`

Reads a line of text from stdin.

```ez
import @std

std.print("Enter your name: ")
temp name string = input()
std.println("Hello, " + name)
```

### read_int()

`() -> (int, Error)`

Reads an integer from stdin. Returns a tuple of the parsed integer and an error (if the input cannot be parsed).

```ez
import @std

std.print("Enter a number: ")
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

### cast()

`(value, type) -> value`

Converts a value to the specified type. Unlike other conversion functions, `cast()` accepts any valid EZ type as its second argument, including sized integers and array types.

```ez
// Single value conversion
temp x = cast(42, u8)        // int -> u8
temp y = cast(3.14, int)     // float -> int
temp z = cast(65, char)      // int -> char

// Array element-wise conversion
temp bytes [byte] = {65, 66, 67}
temp u8_arr = cast(bytes, [u8])  // [byte] -> [u8]

temp nums [int] = {1, 2, 3}
temp strs = cast(nums, [string])  // ["1", "2", "3"]
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
temp result = cast([-1, 2, 3], [u8])
// Error: "cast failed at index 0: value -1 out of u8 range (0 to 255)"
```

**Note:** `cast()` is technically a language keyword because the type argument is validated at check-time (before execution). See also: [cast in Keywords](/EZ-Language-Webapp/docs/language/keywords#cast).

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

### Sized Integer Conversions

These functions convert values to explicitly sized integer types with range validation. They accept int, float, string, byte, or char values. Out-of-range values produce error E3022.

#### i8()

`(value) -> i8`

Converts to a signed 8-bit integer. Range: -128 to 127.

```ez
temp small i8 = i8(42)       // 42
temp neg i8 = i8(-100)       // -100
temp from_str i8 = i8("50")  // 50
// i8(200)  // Error E3022: value 200 out of i8 range (-128 to 127)
```

#### i16()

`(value) -> i16`

Converts to a signed 16-bit integer. Range: -32,768 to 32,767.

```ez
temp val i16 = i16(1000)      // 1000
temp neg i16 = i16(-30000)    // -30000
// i16(40000)  // Error E3022: out of i16 range
```

#### i32()

`(value) -> i32`

Converts to a signed 32-bit integer. Range: -2,147,483,648 to 2,147,483,647.

```ez
temp val i32 = i32(100000)    // 100000
temp neg i32 = i32(-100000)   // -100000
```

#### i64()

`(value) -> i64`

Converts to a signed 64-bit integer. Range: -9.2 quintillion to 9.2 quintillion.

```ez
temp val i64 = i64(1000000000)  // 1000000000
```

#### i128()

`(value) -> i128`

Converts to a signed 128-bit integer. Range: -2^127 to 2^127-1.

```ez
temp val i128 = i128(1000000000000)  // 1000000000000
```

#### i256()

`(value) -> i256`

Converts to a signed 256-bit integer. Range: -2^255 to 2^255-1.

```ez
temp val i256 = i256(1000000000000)  // 1000000000000
```

#### u8()

`(value) -> u8`

Converts to an unsigned 8-bit integer. Range: 0 to 255.

```ez
temp val u8 = u8(200)          // 200
temp from_char u8 = u8('A')   // 65
// u8(-1)   // Error E3022: value -1 out of u8 range (0 to 255)
// u8(256)  // Error E3022: value 256 out of u8 range (0 to 255)
```

#### u16()

`(value) -> u16`

Converts to an unsigned 16-bit integer. Range: 0 to 65,535.

```ez
temp val u16 = u16(50000)  // 50000
// u16(-1)  // Error E3022: out of u16 range
```

#### u32()

`(value) -> u32`

Converts to an unsigned 32-bit integer. Range: 0 to 4,294,967,295.

```ez
temp val u32 = u32(3000000000)  // 3000000000
```

#### u64()

`(value) -> u64`

Converts to an unsigned 64-bit integer. Range: 0 to 18,446,744,073,709,551,615.

```ez
temp val u64 = u64(10000000000)  // 10000000000
```

#### u128()

`(value) -> u128`

Converts to an unsigned 128-bit integer. Range: 0 to 2^128-1.

```ez
temp val u128 = u128(1000000000000)  // 1000000000000
```

#### u256()

`(value) -> u256`

Converts to an unsigned 256-bit integer. Range: 0 to 2^256-1.

```ez
temp val u256 = u256(1000000000000)  // 1000000000000
```

#### Accepted Source Types (all sized integers)

| Source Type | Example |
|-------------|---------|
| `int` | `i8(42)` |
| `float` | `u16(3.14)` → truncates to `3` |
| `string` | `i32("100")` |
| `byte` | `u8(byte(65))` |
| `char` | `i16('A')` → `65` |

### Sized Float Conversions

#### f32()

`(value) -> f32`

Converts to a 32-bit floating-point number. Truncates precision to float32 range.

```ez
temp val f32 = f32(3.14159265358979)  // 3.1415927 (reduced precision)
temp from_int f32 = f32(42)           // 42.0
temp from_str f32 = f32("2.5")       // 2.5
```

#### f64()

`(value) -> f64`

Converts to a 64-bit floating-point number. Full double-precision range.

```ez
temp val f64 = f64(3.14159265358979)  // 3.14159265358979 (full precision)
temp from_int f64 = f64(42)           // 42.0
temp from_str f64 = f64("2.5")       // 2.5
```

#### Accepted Source Types (f32/f64)

| Source Type | Example |
|-------------|---------|
| `float` | `f32(3.14)` |
| `int` | `f64(42)` |
| `string` | `f32("2.5")` |
| `byte` | `f64(byte(65))` |
| `char` | `f32('A')` → `65.0` |

## Error Handling

### Error Type

The `Error` type represents an error value that can be returned from functions.

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | The error message |
| `code` | string | Error code (empty for user errors, E-codes for stdlib errors) |

**Checking for errors:**

```ez
import @std
using std

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
import @std
using std

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
import @std
using std

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

### Functions

| Function | Description | Example |
|----------|-------------|---------|
| `exit(code)` | Exit program with status code | `exit(EXIT_SUCCESS)` |
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
| `cast(x, type)` | Convert to any type | `cast(42, u8)` → `42` as u8 |
| `int(x)` | Convert to integer | `int("42")` → `42` |
| `float(x)` | Convert to float | `float(42)` → `42.0` |
| `string(x)` | Convert to string | `string(42)` → `"42"` |
| `char(x)` | Convert int to character | `char(65)` → `'A'` |
| `byte(x)` | Convert int to byte (0-255) | `byte(65)` → `65` |
| `i8(x)` | Convert to signed 8-bit int | `i8(42)` → `42` as i8 |
| `i16(x)` | Convert to signed 16-bit int | `i16(1000)` → `1000` as i16 |
| `i32(x)` | Convert to signed 32-bit int | `i32(100000)` → `100000` as i32 |
| `i64(x)` | Convert to signed 64-bit int | `i64(val)` → value as i64 |
| `i128(x)` | Convert to signed 128-bit int | `i128(val)` → value as i128 |
| `i256(x)` | Convert to signed 256-bit int | `i256(val)` → value as i256 |
| `u8(x)` | Convert to unsigned 8-bit int | `u8(200)` → `200` as u8 |
| `u16(x)` | Convert to unsigned 16-bit int | `u16(50000)` → `50000` as u16 |
| `u32(x)` | Convert to unsigned 32-bit int | `u32(val)` → value as u32 |
| `u64(x)` | Convert to unsigned 64-bit int | `u64(val)` → value as u64 |
| `u128(x)` | Convert to unsigned 128-bit int | `u128(val)` → value as u128 |
| `u256(x)` | Convert to unsigned 256-bit int | `u256(val)` → value as u256 |
| `f32(x)` | Convert to 32-bit float | `f32(3.14)` → reduced precision |
| `f64(x)` | Convert to 64-bit float | `f64(42)` → `42.0` as f64 |
| `error(msg)` | Create user-defined error | `error("invalid input")` → `Error` |

### Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `EXIT_SUCCESS` | `0` | Successful program exit |
| `EXIT_FAILURE` | `1` | Failed program exit |
