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
mut ages map[string:int] = {
    "Alice": 30,
    "Bob": 25,
    "Charlie": 35
}

mut scores map[string:float] = {
    "math": 95.5,
    "science": 88.0,
    "history": 92.3
}
```

> **Note:** Maps must be declared with `mut`. Declaring a map with `const` is a compile-time error — if the keys are known at compile time, use a struct instead.

## Empty Maps

Use `{:}` to create an empty map:

```ez
mut m map[string:int] = {:}
mut lookup map[int:string] = {:}
```

The `{:}` syntax is necessary because `{}` alone is ambiguous — it could be an empty array or an empty map. The colon `:` signals that it's a map, just like `{"key": value}` uses `:` for key-value pairs.

## Accessing Values

Use `map[key]` to access a value:

```ez
mut ages map[string:int] = {"Alice": 30, "Bob": 25}

println(ages["Alice"])  // 30
```

> **Note:** Accessing a key that does not exist produces a runtime error. Use `in` to check for key existence first.

## Modifying Values

Assign to an existing key to update its value:

```ez
mut ages map[string:int] = {"Alice": 30, "Bob": 25}

ages["Alice"] = 31
println(ages["Alice"])  // 31
```

## Adding Entries

Assign to a new key to add an entry:

```ez
mut ages map[string:int] = {"Alice": 30, "Bob": 25}

ages["Diana"] = 28
println(ages)  // {"Alice": 30, "Bob": 25, "Diana": 28}
```

## Map Length

Use `len()` to get the number of key-value pairs:

```ez
mut ages map[string:int] = {"Alice": 30, "Bob": 25}
mut empty map[string:int] = {:}

println(len(ages))   // 2
println(len(empty))  // 0
```

## Different Key Types

Map keys can be any hashable type: `int`, `uint`, `float`, `string`, `bool`, `char`, or `byte`.

```ez
// String keys
mut ages map[string:int] = {"Alice": 30, "Bob": 25}

// Integer keys
mut lookup map[int:string] = {
    1: "one",
    2: "two",
    3: "three"
}
println(lookup[2])  // "two"

// Mixed type examples
mut settings map[string:float] = {"volume": 0.75, "brightness": 1.0}
```

## Iterating

### for_each with Key and Value

Use `for_each` with two variables to iterate over keys and values:

```ez
mut ages map[string:int] = {
    "Alice": 30,
    "Bob": 25,
    "Charlie": 35
}

for_each key, value in ages {
    println("${key} is ${value} years old")
}
```

### for_each Keys Only

With a single variable, `for_each` iterates over keys:

```ez
mut ages map[string:int] = {"Alice": 30, "Bob": 25}

for_each key in ages {
    println(key)
}
```

> **Note:** Map iteration order is undefined (maps are unordered).

## Membership

Use `in` and `not_in` (or `!in`) to check if a key exists in a map:

```ez
mut ages map[string:int] = {"Alice": 30, "Bob": 25}

if "Alice" in ages {
    println("Alice found!")
}

if "Charlie" not_in ages {
    println("Charlie not found")
}

// !in is shorthand for not_in
if "Charlie" !in ages {
    println("Charlie not found")
}
```

Works with any map key type:

```ez
mut codes map[int:string] = {200: "OK", 404: "Not Found"}

if 200 in codes {
    println("Status exists")
}
```

## Maps as Function Parameters

Maps can be passed to functions like any other type:

```ez
do printAges(ages map[string:int]) {
    for_each key, value in ages {
        println("${key}: ${value}")
    }
}

do main() {
    mut ages map[string:int] = {"Alice": 30, "Bob": 25}
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
    mut ages map[string:int] = {"Alice": 30}
    addEntry(ages, "Bob", 25)
    println(ages)  // {"Alice": 30, "Bob": 25}
}
```

> **Note:** Only `mut` variables can be passed to mutable (`&`) parameters. Passing a `const` variable to a `&` parameter will produce an error.

## See Also
- [Types](/EZ-Language-Webapp/docs/language/types) — primitive and composite types
- [@maps](/EZ-Language-Webapp/docs/stdlib/maps) — map manipulation functions (get_keys, get_values, etc.)
- [Variables](/EZ-Language-Webapp/docs/language/variables) — `mut` vs `const` and the `{:}` empty map syntax
- [Control Flow](/EZ-Language-Webapp/docs/language/control-flow) — `for_each` loops and `in`/`not_in` operators
