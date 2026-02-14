---
layout: '../../../layouts/DocsLayout.astro'
title: 'Maps'
description: 'Key-value pair collections in EZ.'
---

# Maps

Maps are unordered collections of key-value pairs. They use the `map[key_type:value_type]` syntax.

## Declaring Maps

Use `map[key_type:value_type]` to declare a map with explicit types:

```ez
temp ages map[string:int] = {
    "Alice": 30,
    "Bob": 25,
    "Charlie": 35
}

temp scores map[string:float] = {
    "math": 95.5,
    "science": 88.0,
    "history": 92.3
}
```

## Empty Maps

Use `{:}` to create an empty map:

```ez
temp m map[string:int] = {:}
temp lookup map[int:string] = {:}
```

The `{:}` syntax is necessary because `{}` alone is ambiguous — it could be an empty array or an empty map. The colon `:` signals that it's a map, just like `{"key": value}` uses `:` for key-value pairs.

## Accessing Values

Use `map[key]` to access a value:

```ez
temp ages map[string:int] = {"Alice": 30, "Bob": 25}
temp key string = "Alice"

std.println(ages[key])  // 30
```

> **Note:** Accessing a key that does not exist produces a runtime error. Use `in` to check for key existence first.

## Modifying Values

Assign to an existing key to update its value (only for `temp` maps):

```ez
temp ages map[string:int] = {"Alice": 30, "Bob": 25}
temp key string = "Alice"

ages[key] = 31
std.println(ages[key])  // 31
```

## Adding Entries

Assign to a new key to add an entry:

```ez
temp ages map[string:int] = {"Alice": 30, "Bob": 25}
temp key string = "Diana"

ages[key] = 28
std.println(ages)  // {"Alice": 30, "Bob": 25, "Diana": 28}
```

## Map Length

Use `len()` to get the number of key-value pairs:

```ez
temp ages map[string:int] = {"Alice": 30, "Bob": 25}
temp empty map[string:int] = {:}

std.println(len(ages))   // 2
std.println(len(empty))  // 0
```

## Different Key Types

Map keys can be any hashable type: `int`, `uint`, `float`, `string`, `bool`, `char`, or `byte`.

```ez
// String keys
temp ages map[string:int] = {"Alice": 30, "Bob": 25}

// Integer keys
temp lookup map[int:string] = {
    1: "one",
    2: "two",
    3: "three"
}
std.println(lookup[2])  // "two"

// Mixed type examples
temp settings map[string:float] = {"volume": 0.75, "brightness": 1.0}
```

## Iterating

Use `maps.keys()` to get an array of keys, then iterate with `for_each`:

```ez
import @maps

temp ages map[string:int] = {
    "Alice": 30,
    "Bob": 25,
    "Charlie": 35
}

temp keys [string] = maps.keys(ages)
for_each key in keys {
    std.println("${key} is ${ages[key]} years old")
}
```

## Membership

Use `in` and `not_in` to check if a key exists in a map:

```ez
temp ages map[string:int] = {"Alice": 30, "Bob": 25}

if "Alice" in ages {
    std.println("Alice found!")
}

if "Charlie" not_in ages {
    std.println("Charlie not found")
}
```

Works with any map key type:

```ez
temp codes map[int:string] = {200: "OK", 404: "Not Found"}

if 200 in codes {
    std.println("Status exists")
}
```

## Maps as Function Parameters

Maps can be passed to functions like any other type:

```ez
do printAges(ages map[string:int]) {
    temp keys [string] = maps.keys(ages)
    for_each key in keys {
        std.println("${key}: ${ages[key]}")
    }
}

do main() {
    temp ages map[string:int] = {"Alice": 30, "Bob": 25}
    printAges(ages)
}
```

### Mutable Parameters

Use `&` to allow a function to modify the map:

```ez
do addEntry(&m map[string:int], key string, value int) {
    m[key] = value
}

do main() {
    temp ages map[string:int] = {"Alice": 30}
    temp key string = "Bob"
    addEntry(ages, key, 25)
    std.println(ages)  // {"Alice": 30, "Bob": 25}
}
```

> **Note:** Only `temp` variables can be passed to mutable (`&`) parameters. Passing a `const` variable to a `&` parameter will produce an error.

## Const vs Temp Maps

`temp` maps can be modified; `const` maps cannot:

```ez
// Mutable - entries can be changed and added
temp ages map[string:int] = {"Alice": 30}
temp key string = "Bob"
ages[key] = 25  // OK

// Immutable - entries cannot be changed
const DEFAULTS map[string:int] = {"timeout": 30, "retries": 3}
// DEFAULTS["timeout"] = 60  // Error! Cannot modify const
```

## Example Program

```ez
import @std, @maps

using std

do main() {
    println("=== Maps in EZ ===")

    // Declaring maps
    temp ages map[string:int] = {
        "Alice": 30,
        "Bob": 25,
        "Charlie": 35
    }

    temp scores map[string:float] = {
        "math": 95.5,
        "science": 88.0,
        "history": 92.3
    }

    println("ages: ${ages}")
    println("scores: ${scores}")

    // Empty maps
    temp empty_map map[string:int] = {:}
    println("Empty map length: ${len(empty_map)}")
    temp key string = "first"
    empty_map[key] = 100
    println("After adding entry: ${empty_map}")

    // Accessing values
    temp alice_key string = "Alice"
    println("Alice's age: ${ages[alice_key]}")

    // Modifying values
    ages[alice_key] = 31
    println("After birthday: Alice is ${ages[alice_key]}")

    // Adding new entries
    temp diana_key string = "Diana"
    ages[diana_key] = 28
    println("Added Diana: ${ages}")

    // Map length
    println("Number of people: ${len(ages)}")

    // Iterating over maps using keys
    println("All ages:")
    temp keys [string] = maps.keys(ages)
    for_each k in keys {
        println("  ${k} is ${ages[k]} years old")
    }

    // Integer keys
    temp lookup map[int:string] = {
        1: "one",
        2: "two",
        3: "three"
    }
    println("lookup[2] = ${lookup[2]}")
}
```

## See Also
- [Types](/EZ-Language-Webapp/docs/language/types) — primitive and composite types
- [@maps](/EZ-Language-Webapp/docs/stdlib/maps) — map manipulation functions (keys, values, etc.)
- [Variables](/EZ-Language-Webapp/docs/language/variables) — `temp` vs `const` and the `{:}` empty map syntax
- [Control Flow](/EZ-Language-Webapp/docs/language/control-flow) — `for_each` loops and `in`/`not_in` operators
