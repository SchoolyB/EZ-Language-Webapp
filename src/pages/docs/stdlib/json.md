---
layout: '../../../layouts/DocsLayout.astro'
title: '@json'
description: 'JSON encoding and decoding functions.'
---

# @json

The `@json` module provides functions for encoding EZ values to JSON and decoding JSON strings into EZ values.

## Import

```ez
import @json
```

## Encoding

### `encode()`
`(value type) -> (string, Error)`

Serializes an EZ value to a JSON string.

```ez
import @json

do encode_demo() {
    mut data map[string:string] = {
        "name": "Alice",
        "role": "admin"
    }

    mut json_str string, err Error = json.encode(data)
    if err != nil {
        println("Error:", err.message)
        return
    }

    println(json_str)  // {"name":"Alice","role":"admin"}
}
```

**Parameters:** `value` - An EZ value (string, int, float, bool, nil, array, map, struct).

**Returns:** A tuple of `(string, Error)` - The JSON string and nil on success, or nil and an error on failure.

**Supported Types:**
- Primitives: `int`, `float`, `string`, `bool`, `char`, `byte`, `nil`
- Collections: `array`, `map` (with string keys), `struct`
- Large integers (beyond int64) are encoded as strings to preserve precision

**Errors:**
- [E7001](/EZ-Language-Webapp/errors/E7001) if wrong number of arguments
- [E13002](/EZ-Language-Webapp/errors/E13002) if value cannot be encoded (functions, error objects)

---

### `pretty()`
`(value type, indent string) -> (string, Error)`

Serializes an EZ value to a formatted JSON string with custom indentation.

```ez
import @json

const User struct {
    name string
    email string
    roles [string]
}

do pretty_demo() {
    mut user User = User{
        name: "Alice",
        email: "alice@example.com",
        roles: {"admin", "user"}
    }

    mut pretty_json string, err Error = json.pretty(user, "    ")
    if err != nil {
        println("Error:", err.message)
        return
    }

    println(pretty_json)
    // {
    //     "email": "alice@example.com",
    //     "name": "Alice",
    //     "roles": [
    //         "admin",
    //         "user"
    //     ]
    // }
}
```

**Parameters:**
- `value` - An EZ value to serialize
- `indent` - The string to use for indentation (e.g., `"    "` for 4 spaces, `"\t"` for tabs)

**Returns:** A tuple of `(string, Error)` - The formatted JSON string and nil on success, or nil and an error on failure.

**Errors:**
- [E7001](/EZ-Language-Webapp/errors/E7001) if wrong number of arguments
- [E13002](/EZ-Language-Webapp/errors/E13002) if value cannot be encoded

---

## Decoding

### `decode()` (Dynamic)
`(text string) -> (type, Error)`

Parses a JSON string into dynamic EZ types.

```ez
import @json

do decode_demo() {
    mut json_str string = `{"name": "Alice", "age": 30, "active": true}`

    mut data, err Error = json.decode(json_str)
    if err != nil {
        println("Error:", err.message)
        return
    }

    println(data)  // {active: true, age: 30, name: Alice}
}
```

**Parameters:** `text` - A valid JSON string.

**Returns:** A tuple of `(value, Error)` - The parsed value and nil on success, or nil and an Error on failure.

**Type Mapping:**
| JSON Type | EZ Type |
|-----------|---------|
| object | `map` |
| array | `array` |
| number (integer) | `int` |
| number (decimal) | `float` |
| string | `string` |
| boolean | `bool` |
| null | `nil` |

**Errors:**
- [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string
- [E13001](/EZ-Language-Webapp/errors/E13001) if JSON syntax is invalid

---

### `decode()` (Typed)
`(text string, Type) -> (Type, Error)`

Parses a JSON string into a typed struct instance.

```ez
import @json

const User struct {
    name string
    email string
    age int
}

do decode_typed_demo() {
    mut json_str string = `{"name": "Alice", "email": "alice@example.com", "age": 30}`

    mut user User, err Error = json.decode(json_str, User)
    if err != nil {
        println("Error:", err.message)
        return
    }

    println("Name:", user.name)   // Name: Alice
    println("Email:", user.email) // Email: alice@example.com
    println("Age:", user.age)     // Age: 30
}
```

**Parameters:**
- `text` - A valid JSON string
- `Type` - The struct type to decode into

**Returns:** A tuple of `(Type, Error)` - The typed struct and nil on success, or nil and an error on failure.

**Type Conversion:**
- JSON floats convert to ints (truncated)
- JSON strings can parse as ints
- JSON numbers convert to strings
- JSON booleans convert to strings ("true"/"false")
- Missing fields get zero values for their types

**Errors:**
- [E7003](/EZ-Language-Webapp/errors/E7003) if arguments are invalid
- [E13002](/EZ-Language-Webapp/errors/E13002) if target type is not a struct

---

## Validation

### `is_valid()`
`(text string) -> bool`

Checks if a string is valid JSON. This is a pure function that returns a boolean directly (not an error tuple).

```ez
import @json

do validate_demo() {
    println(json.is_valid(`{"name": "Alice"}`))  // true
    println(json.is_valid(`{invalid json}`))     // false
    println(json.is_valid(`null`))               // true
    println(json.is_valid(`"hello"`))            // true
}
```

**Parameters:** `text` - The string to validate.

**Returns:** `bool` - true if valid JSON, false otherwise.

**Errors:**
- [E7001](/EZ-Language-Webapp/errors/E7001) if wrong number of arguments
- [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string

---

## Error Handling

All `@json` functions (except `is_valid()`) return error tuples following EZ's standard error handling pattern:

```ez
mut result Type, err Error = json.function(args)
if err != nil {
    // Handle error
    println("Error code:", err.code)
    println("Error message:", err.message)
    return
}
// Use result
```

### Error Codes

| Code | Description |
|------|-------------|
| E7001 | Wrong number of arguments |
| E7003 | Invalid argument type (expected string) |
| E13001 | Invalid JSON syntax |
| E13002 | Encoding/decoding failure |

---

## Example Program

```ez
import @json
import @io

const Person struct {
    name string
    email string
    role string
}

do main() {
    // Read JSON from file (using raw string for inline JSON)
    mut content string = `{
        "name": "Alice Smith",
        "email": "alice@example.com",
        "role": "admin"
    }`

    // Validate first
    if !json.is_valid(content) {
        println("Invalid JSON!")
        return
    }

    // Decode into typed struct
    mut person Person, decode_err Error = json.decode(content, Person)
    if decode_err != nil {
        println("Decode error:", decode_err.message)
        return
    }

    println("Welcome,", person.name)
    println("Email:", person.email)
    println("Role:", person.role)

    // Modify and re-encode
    mut updated Person = Person{
        name: person.name,
        email: "newemail@example.com",
        role: person.role
    }

    mut json_out string, encode_err Error = json.pretty(updated, "  ")
    if encode_err != nil {
        println("Encode error:", encode_err.message)
        return
    }

    println("\nUpdated JSON:")
    println(json_out)
}
```

## Tips

**Use raw strings for inline JSON** - Raw strings (backticks) are ideal for JSON because you don't need to escape quotes:

```ez
// With raw string (clean)
mut data string = `{"name": "Alice", "age": 30}`

// Without raw string (requires escaping)
mut data string = "{\"name\": \"Alice\", \"age\": 30}"
```

**Validate before decoding** - Use `json.is_valid()` to check JSON before attempting to decode, especially when dealing with user input or external data.

**Use typed decoding for known structures** - When you know the shape of your JSON data, use typed decoding with structs for type safety and easier field access.
