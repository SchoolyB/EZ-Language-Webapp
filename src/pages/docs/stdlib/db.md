---
layout: '../../../layouts/DocsLayout.astro'
title: '@db'
description: 'Simple key-value database storage using .ezdb files.'
---

# @db

The `@db` module provides a simple key-value database for persistent storage. Data is stored in `.ezdb` files as JSON.

## Import

```ez
import @db
```

## Database Management

### `open()`
`(path string) -> (database, error)`

Opens a database file. Creates a new file if it doesn't exist.

```ez
import @std, @db

do main() {
    temp mydb database, err error = db.open("data.ezdb")
    if err != nil {
        std.println("Error:", err.message)
        return
    }

    // Use the database...

    db.close(mydb)
}
```

**Parameters:** `path` - Path to a `.ezdb` file.

**Returns:**
- `database` - The database object.
- `error` - `nil` on success, or an Error struct.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if path is not a string, [E17001](/language.ez/errors/E17001) for invalid path or non-.ezdb file, [E17002](/language.ez/errors/E17002) if path is a directory, [E17004](/language.ez/errors/E17004) if file is corrupted.

---

### `close()`
`(db database) -> error`

Closes the database and saves all changes to disk.

```ez
import @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    // ... use database ...
    db.close(mydb)
}
```

**Parameters:** `db` - The database to close.

**Returns:** `nil` on success, or an Error struct.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E17003](/language.ez/errors/E17003) if save fails, [E17005](/language.ez/errors/E17005) if database is already closed.

---

### `save()`
`(db database) -> error`

Manually saves the database to disk without closing it.

```ez
import @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    db.set(mydb, "key", "value")
    db.save(mydb)  // Save now, keep using
    // ... more operations ...
    db.close(mydb)
}
```

**Parameters:** `db` - The database to save.

**Returns:** `nil` on success, or an Error struct.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E17003](/language.ez/errors/E17003) if save fails, [E17005](/language.ez/errors/E17005) if database is closed.

---

### `exists()`
`(path string) -> bool`

Checks if a database file exists at the given path.

```ez
import @std, @db

do main() {
    if db.exists("data.ezdb") {
        std.println("Database exists")
    } otherwise {
        std.println("No database found")
    }
}
```

**Parameters:** `path` - Path to check (must end in `.ezdb`).

**Returns:** `bool` - `true` if file exists, `false` otherwise.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if path is not a string, [E17001](/language.ez/errors/E17001) if path doesn't end in `.ezdb`.

---

## Data Operations

### `set()`
`(db database, key string, value string) -> nil`

Sets a key-value pair in the database.

```ez
import @db

do main() {
    temp mydb database, _ error = db.open("users.ezdb")
    db.set(mydb, "user:1", "Alice")
    db.set(mydb, "user:2", "Bob")
    db.close(mydb)
}
```

**Parameters:**
- `db` - The database.
- `key` - The key (string).
- `value` - The value (string).

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count or types, [E17005](/language.ez/errors/E17005) if database is closed.

---

### `get()`
`(db database, key string) -> (string, bool)`

Gets a value by key.

```ez
import @std, @db

do main() {
    temp mydb database, _ error = db.open("users.ezdb")
    temp value string, found bool = db.get(mydb, "user:1")
    if found {
        std.println("Found:", value)
    } otherwise {
        std.println("Key not found")
    }
    db.close(mydb)
}
```

**Parameters:**
- `db` - The database.
- `key` - The key to look up.

**Returns:**
- `string` - The value (empty string if not found).
- `bool` - `true` if key exists, `false` otherwise.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count or types, [E17005](/language.ez/errors/E17005) if database is closed.

---

### `delete()`
`(db database, key string) -> bool`

Deletes a key-value pair.

```ez
import @std, @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    temp deleted bool = db.delete(mydb, "old_key")
    std.println("Deleted:", deleted)
    db.close(mydb)
}
```

**Parameters:**
- `db` - The database.
- `key` - The key to delete.

**Returns:** `bool` - `true` if key was deleted, `false` if it didn't exist.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count or types, [E17005](/language.ez/errors/E17005) if database is closed.

---

### `has()`
`(db database, key string) -> bool`

Checks if a key exists.

```ez
import @std, @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    if db.has(mydb, "config") {
        std.println("Config exists")
    }
    db.close(mydb)
}
```

**Parameters:**
- `db` - The database.
- `key` - The key to check.

**Returns:** `bool` - `true` if key exists.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count or types, [E17005](/language.ez/errors/E17005) if database is closed.

---

### `keys()`
`(db database) -> [string]`

Gets all keys in the database.

```ez
import @std, @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    temp all_keys [string] = db.keys(mydb)
    std.println("Keys:", all_keys)
    db.close(mydb)
}
```

**Parameters:** `db` - The database.

**Returns:** `[string]` - Array of all keys.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E17005](/language.ez/errors/E17005) if database is closed.

---

### `prefix()`
`(db database, prefix string) -> [string]`

Gets all keys that start with a given prefix.

```ez
import @std, @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    db.set(mydb, "user:1", "Alice")
    db.set(mydb, "user:2", "Bob")
    db.set(mydb, "config:theme", "dark")

    temp user_keys [string] = db.prefix(mydb, "user:")
    std.println("User keys:", user_keys)  // {"user:1", "user:2"}
    db.close(mydb)
}
```

**Parameters:**
- `db` - The database.
- `prefix` - The prefix to match.

**Returns:** `[string]` - Array of matching keys.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if prefix is not a string, [E17005](/language.ez/errors/E17005) if database is closed.

---

### `count()`
`(db database) -> int`

Returns the number of key-value pairs.

```ez
import @std, @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    std.println("Entries:", db.count(mydb))
    db.close(mydb)
}
```

**Parameters:** `db` - The database.

**Returns:** `int` - Number of entries.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E17005](/language.ez/errors/E17005) if database is closed.

---

### `clear()`
`(db database) -> nil`

Removes all key-value pairs from the database.

```ez
import @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    db.clear(mydb)
    db.close(mydb)
}
```

**Parameters:** `db` - The database.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E17005](/language.ez/errors/E17005) if database is closed.

---

### `update_key_name()`
`(db database, old_key string, new_key string) -> bool`

Renames a key while preserving its value.

```ez
import @std, @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    db.set(mydb, "old_name", "value")
    temp renamed bool = db.update_key_name(mydb, "old_name", "new_name")
    std.println("Renamed:", renamed)
    db.close(mydb)
}
```

**Parameters:**
- `db` - The database.
- `old_key` - The current key name.
- `new_key` - The new key name.

**Returns:** `bool` - `true` if renamed, `false` if old key didn't exist.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count or types, [E17005](/language.ez/errors/E17005) if database is closed.

---

## Sorting

### `sort()`
`(db database, order int) -> nil`

Sorts the database entries by the specified order. Use the sort constants below.

```ez
import @std, @db

do main() {
    temp mydb database, _ error = db.open("data.ezdb")
    db.set(mydb, "banana", "yellow")
    db.set(mydb, "apple", "red")
    db.set(mydb, "cherry", "red")

    db.sort(mydb, db.ALPHA())  // Sort keys A-Z
    std.println("Keys:", db.keys(mydb))  // {"apple", "banana", "cherry"}
    db.close(mydb)
}
```

**Parameters:**
- `db` - The database.
- `order` - A sort order constant.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) for invalid order, [E17005](/language.ez/errors/E17005) if database is closed.

---

## Sort Constants

| Constant | Description |
|----------|-------------|
| `db.ALPHA()` | Keys alphabetically A-Z |
| `db.ALPHA_DESC()` | Keys alphabetically Z-A |
| `db.VALUE_ALPHA()` | Values alphabetically A-Z |
| `db.VALUE_ALPHA_DESC()` | Values alphabetically Z-A |
| `db.KEY_LEN()` | Shortest keys first |
| `db.KEY_LEN_DESC()` | Longest keys first |
| `db.VALUE_LEN()` | Shortest values first |
| `db.VALUE_LEN_DESC()` | Longest values first |
| `db.NUMERIC()` | Keys numerically ascending |
| `db.NUMERIC_DESC()` | Keys numerically descending |

---

## Example Program

```ez
import @std
import @db

do main() {
    std.println("=== Database Demo ===")

    // Open or create database
    temp mydb database, err error = db.open("demo.ezdb")
    if err != nil {
        std.println("Error:", err.message)
        return
    }

    // Add some data
    db.set(mydb, "user:alice", "Alice Smith")
    db.set(mydb, "user:bob", "Bob Jones")
    db.set(mydb, "config:theme", "dark")

    // Query data
    std.println("\n-- Query --")
    temp name string, found bool = db.get(mydb, "user:alice")
    if found {
        std.println("Found:", name)
    }

    // List all user keys
    std.println("\n-- Users --")
    temp users [string] = db.prefix(mydb, "user:")
    std.println("User keys:", users)

    // Count and sort
    std.println("\n-- Stats --")
    std.println("Total entries:", db.count(mydb))

    db.sort(mydb, db.ALPHA())
    std.println("Sorted keys:", db.keys(mydb))

    // Save and close
    db.close(mydb)
    std.println("\nDatabase saved and closed.")
}
```

## Notes

- Database files must use the `.ezdb` extension.
- All keys and values are strings.
- Data is automatically saved when calling `close()`.
- Use `save()` for manual checkpoints without closing.
- Keys are sorted alphabetically when the database is opened.
