---
layout: '../../../layouts/DocsLayout.astro'
title: '@maps'
description: 'Map (dictionary/hash) operations and utilities.'
---

# @maps

The `@maps` module provides functions for working with maps (also known as dictionaries or hash tables).
Maps store key-value pairs where keys must be hashable types (strings, numbers, booleans).

> **Note:** Maps must be declared with `mut` — they cannot be `const`.

## Import

```ez
import @maps
```

## Creating Maps

Maps are created using key-value syntax:

```ez
// Empty map
mut empty map[string:int] = {:}

// Map with initial values
mut ages map[string:int] = {
    "Alice": 25,
    "Bob": 30,
    "Charlie": 35
}
```

## Query Functions

### `is_empty()`
`(m map[K:V]) -> bool`

Checks if the map has no entries.

```ez
import @maps

do main() {
    mut empty map[string:int] = {:}
    mut filled map[string:int] = {"a": 1}
    println(maps.is_empty(empty))   // true
    println(maps.is_empty(filled))  // false
}
```

**Parameters:** `m` - The map.

**Returns:** `bool` - true if empty.

---

### `has_key()`
`(m map[K:V], key K) -> bool`

Checks if a key exists in the map.

```ez
import @maps

do main() {
    mut ages map[string:int] = {"Alice": 25, "Bob": 30}
    println(maps.has_key(ages, "Alice"))  // true
    println(maps.has_key(ages, "Eve"))    // false
}
```

**Parameters:** `m`, `key`.

**Returns:** `bool` - true if key exists.

---

### `contains_value()`
`(m map[K:V], value V) -> bool`

Checks if any entry has the given value.

```ez
import @maps

do main() {
    mut ages map[string:int] = {"Alice": 25, "Bob": 30}
    println(maps.contains_value(ages, 25))  // true
    println(maps.contains_value(ages, 99))  // false
}
```

**Parameters:** `m`, `value`.

**Returns:** `bool` - true if value exists.

---

### `get_keys()`
`(m map[K:V]) -> [K]`

Returns an array of all keys in the map.

```ez
import @maps

do main() {
    mut ages map[string:int] = {"Alice": 25, "Bob": 30}
    mut names = maps.get_keys(ages)
    println(names)  // {"Alice", "Bob"}
}
```

**Parameters:** `m` - The map.

**Returns:** Array of keys.

---

### `get_values()`
`(m map[K:V]) -> [V]`

Returns an array of all values in the map.

```ez
import @maps

do main() {
    mut ages map[string:int] = {"Alice": 25, "Bob": 30}
    mut all_ages = maps.get_values(ages)
    println(all_ages)  // {25, 30}
}
```

**Parameters:** `m` - The map.

**Returns:** Array of values.

---

## Safe Access

### `get_or_default()`
`(m map[K:V], key K, default V) -> V`

Gets a value by key, returning a default if the key doesn't exist.

```ez
import @maps

do main() {
    mut ages map[string:int] = {"Alice": 25}
    mut age1 = maps.get_or_default(ages, "Alice", 0)  // 25
    mut age2 = maps.get_or_default(ages, "Bob", 0)    // 0 (default)
}
```

**Parameters:** `m`, `key`, `default`.

**Returns:** The value or the default.

---

## Modification Functions

### `remove_key()`
`(&m map[K:V], key K) -> bool`

Removes a key-value pair from the map. Returns true if the key was found and removed.

```ez
import @maps

do main() {
    mut ages map[string:int] = {"Alice": 25, "Bob": 30}
    maps.remove_key(ages, "Alice")
    println(maps.has_key(ages, "Alice"))  // false
}
```

**Parameters:** `m`, `key`.

**Returns:** `bool` - true if key was removed.

---

### `clear()`
`(&m map[K:V]) -> void`

Removes all key-value pairs from a map.

```ez
import @maps

do main() {
    mut ages map[string:int] = {"Alice": 25, "Bob": 30}
    maps.clear(ages)
    println(len(ages))  // 0
}
```

**Parameters:** `m` - The map.

**Returns:** Nothing (mutates map in place).

---

## Transformation

### `merge()`
`(m1 map[K:V], m2 map[K:V]) -> map[K:V]`

Merges two maps. Values from the second map override the first on conflict.

```ez
import @maps

do main() {
    mut defaults map[string:string] = {"color": "blue", "size": "medium"}
    mut custom map[string:string] = {"color": "red"}
    mut result = maps.merge(defaults, custom)
    // result: {"color": "red", "size": "medium"}
}
```

**Parameters:** `m1`, `m2` - Two maps.

**Returns:** A new merged map.

---

## Iteration

Maps support built-in iteration with `for_each`:

```ez
do main() {
    mut ages map[string:int] = {"Alice": 25, "Bob": 30}

    for_each key, value in ages {
        println(key, "is", value)
    }
}
```

Use `len(m)` to get the number of entries (builtin, no import needed).

---

## Key Constraints

Map keys must be **hashable** types: strings, integers, floats, or booleans.
Arrays, maps, and structs cannot be used as keys.

```ez
// Valid keys
mut stringKey map[string:string] = {"name": "Alice"}
mut intKey map[int:string] = {42: "answer"}
mut boolKey map[bool:string] = {true: "yes"}

// Invalid - will raise E12001
// mut myMap map[[int]:string] = {}  // Error: array not hashable
```

---
