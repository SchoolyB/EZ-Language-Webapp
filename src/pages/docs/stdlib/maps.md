---
layout: '../../../layouts/DocsLayout.astro'
title: '@maps'
description: 'Map (dictionary/hash) operations and utilities.'
---

# @maps

The `@maps` module provides functions for working with maps (also known as dictionaries or hash tables).
Maps store key-value pairs where keys must be hashable types (strings, numbers, booleans).

## Import

```ez
import @maps
```

## Creating Maps

Maps are created using array-of-pairs syntax:

```ez
// Empty map
temp empty map = {}

// Map with initial values
temp ages map = {
    {"Alice", 25},
    {"Bob", 30},
    {"Charlie", 35}
}
```

## Basic Operations

### `get()`
`(m map, key any) -> any`

Retrieves a value by key.

```ez
temp ages map = {{"Alice", 25}, {"Bob", 30}}
temp age int = maps.get(ages, "Alice")
std.println(age)  // 25
```

**Parameters:** `m` - The map, `key` - The key.

**Returns:** The value associated with the key.

**Errors:** [E12006](/language.ez/errors/E12006) if the key is not found.

### `set()`
`(m map, key any, value any) -> void`

Sets a value for a key (adds or updates).

```ez
temp ages map = {{"Alice", 25}}
maps.set(ages, "Bob", 30)
maps.set(ages, "Alice", 26)  // update existing
```

**Parameters:** `m`, `key`, `value`.

**Returns:** Nothing (mutates map in place).

**Errors:** [E12003](/language.ez/errors/E12003) if the map is immutable (const).

### `has()`
`(m map, key any) -> bool`

Checks if a key exists in the map.

```ez
temp ages map = {{"Alice", 25}, {"Bob", 30}}
std.println(maps.has(ages, "Alice"))  // true
std.println(maps.has(ages, "Eve"))    // false
```

**Parameters:** `m`, `key`.

**Returns:** `bool` - true if key exists.

### `delete()`
`(m map, key any) -> void`

Removes a key-value pair from the map.

```ez
temp ages map = {{"Alice", 25}, {"Bob", 30}}
maps.delete(ages, "Alice")
std.println(maps.has(ages, "Alice"))  // false
```

**Parameters:** `m`, `key`.

**Returns:** Nothing (mutates map in place).

## Inspection

### `keys()`
`(m map) -> [any]`

Returns an array of all keys in the map.

```ez
temp ages map = {{"Alice", 25}, {"Bob", 30}}
temp names [string] = maps.keys(ages)
std.println(names)  // {"Alice", "Bob"}
```

**Parameters:** `m` - The map.

**Returns:** `[any]` - Array of keys.

**Errors:** [E12001](/language.ez/errors/E12001) if the argument is not a map.

### `values()`
`(m map) -> [any]`

Returns an array of all values in the map.

```ez
temp ages map = {{"Alice", 25}, {"Bob", 30}}
temp all_ages [int] = maps.values(ages)
std.println(all_ages)  // {25, 30}
```

**Parameters:** `m` - The map.

**Returns:** `[any]` - Array of values.

### `size()`
`(m map) -> int`

Returns the number of key-value pairs in the map.

```ez
temp ages map = {{"Alice", 25}, {"Bob", 30}}
std.println(maps.size(ages))  // 2
```

**Parameters:** `m` - The map.

**Returns:** `int` - Number of entries.

### `is_empty()`
`(m map) -> bool`

Checks if the map has no entries.

```ez
temp empty map = {}
temp filled map = {{"a", 1}}
std.println(maps.is_empty(empty))   // true
std.println(maps.is_empty(filled))  // false
```

**Parameters:** `m` - The map.

**Returns:** `bool` - true if empty.

## Transformation

### `merge()`
`(m1 map, m2 map) -> map`

Merges two maps. Values from the second map override the first.

```ez
temp defaults map = {{"color", "blue"}, {"size", "medium"}}
temp custom map = {{"color", "red"}}
temp result map = maps.merge(defaults, custom)
// result: {{"color", "red"}, {"size", "medium"}}
```

**Parameters:** `m1`, `m2` - Two maps.

**Returns:** A new merged map.

### `clear()`
`(m map) -> void`

Removes all key-value pairs from a map.

```ez
temp ages map = {{"Alice", 25}, {"Bob", 30}}
maps.clear(ages)
std.println(maps.size(ages))  // 0
```

**Parameters:** `m` - The map.

**Returns:** Nothing (mutates map in place).

## Safe Access

### `get_or()`
`(m map, key any, default any) -> any`

Gets a value by key, returning a default if the key doesn't exist.

```ez
temp ages map = {{"Alice", 25}}
temp age1 int = maps.get_or(ages, "Alice", 0)  // 25
temp age2 int = maps.get_or(ages, "Bob", 0)    // 0 (default)
```

**Parameters:** `m`, `key`, `default`.

**Returns:** The value or the default.

### `try_get()`
`(m map, key any) -> (any, bool)`

Attempts to get a value, returning both the value and a success boolean.

```ez
temp ages map = {{"Alice", 25}}
temp value, ok = maps.try_get(ages, "Alice")
if ok {
    std.println("Found:", value)
}
```

**Parameters:** `m`, `key`.

**Returns:** `(value, bool)` - Value and success flag.

## Key Constraints

Map keys must be **hashable** types: strings, integers, floats, or booleans.
Arrays, maps, and structs cannot be used as keys.

```ez
// Valid keys
temp valid map = {
    {"name", "Alice"},     // string key
    {42, "answer"},        // int key
    {true, "yes"}          // bool key
}

// Invalid - will raise E12002
temp arr [int] = {1, 2, 3}
// maps.set(myMap, arr, "value")  // Error: array not hashable
```

**Error:** [E12002](/language.ez/errors/E12002) if you try to use a non-hashable key.

## Example Program

```ez
import @std
import @maps
import @strings

do main() {
    // Word frequency counter
    temp text string = "the quick brown fox jumps over the lazy dog"
    temp words [string] = strings.split(text, " ")

    temp frequency map = {}

    for word in words {
        if maps.has(frequency, word) {
            temp count int = maps.get(frequency, word)
            maps.set(frequency, word, count + 1)
        } otherwise {
            maps.set(frequency, word, 1)
        }
    }

    std.println("Word frequencies:")
    temp unique_words [string] = maps.keys(frequency)
    for word in unique_words {
        std.println(word + ":", maps.get(frequency, word))
    }

    // Configuration with defaults
    temp defaults map = {
        {"theme", "light"},
        {"language", "en"},
        {"timeout", 30}
    }

    temp user_config map = {
        {"theme", "dark"}
    }

    temp config map = maps.merge(defaults, user_config)
    std.println("Theme:", maps.get(config, "theme"))      // "dark"
    std.println("Language:", maps.get(config, "language")) // "en"
}
```
