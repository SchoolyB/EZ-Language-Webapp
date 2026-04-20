---
layout: '../../../layouts/DocsLayout.astro'
title: '@sqlite'
description: 'SQLite database access for persistent storage.'
---

# @sqlite

The `@sqlite` module provides SQLite database access for persistent storage.

## Import

```ez
import @sqlite
```

## Functions

### `open()`
`(path string) -> Database`

Opens or creates a SQLite database at the given path.

```ez
import @sqlite

do main() {
    mut db = sqlite.open("app.db")
    ensure sqlite.close(db)

    // Use the database...
}
```

**Parameters:** `path` - Path to the database file. Created if it doesn't exist.

**Returns:** `Database` - A database handle.

---

### `close()`
`(db Database)`

Closes a database connection.

```ez
sqlite.close(db)
```

---

### `exec()`
`(db Database, sql string, ...params string)`

Executes a SQL statement with optional parameters. Use `?` placeholders for parameterized queries to prevent SQL injection.

```ez
import @sqlite

do main() {
    mut db = sqlite.open("app.db")
    ensure sqlite.close(db)

    // Create table
    sqlite.exec(db, "CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER)")

    // Insert with parameters (prevents SQL injection)
    sqlite.exec(db, "INSERT INTO users VALUES (?, ?)", "Alice", "30")
    sqlite.exec(db, "INSERT INTO users VALUES (?, ?)", "Bob", "25")
}
```

**Parameters:**
- `db` - Database handle
- `sql` - SQL statement
- `...params` - Optional parameters for `?` placeholders

---

### `query()`
`(db Database, sql string, ...params string) -> [map[string:string]]`

Executes a parameterized SQL query and returns results as an array of row maps.

```ez
import @sqlite

do main() {
    mut db = sqlite.open("app.db")
    ensure sqlite.close(db)

    // Query all users
    mut rows = sqlite.query(db, "SELECT * FROM users")
    for_each row in rows {
        println("${row["name"]} is ${row["age"]} years old")
    }

    // Query with parameters
    mut adults = sqlite.query(db, "SELECT * FROM users WHERE age > ?", "18")
    println("Adults:", len(adults))
}
```

**Parameters:**
- `db` - Database handle
- `sql` - SQL query
- `...params` - Optional parameters for `?` placeholders

**Returns:** `[map[string:string]]` - Array of row maps where keys are column names.

---

## Example Program

```ez
import @sqlite

do main() {
    mut db = sqlite.open("tasks.db")
    ensure sqlite.close(db)

    // Create table
    sqlite.exec(db, "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, done INTEGER)")

    // Insert tasks
    sqlite.exec(db, "INSERT INTO tasks (title, done) VALUES (?, ?)", "Write docs", "0")
    sqlite.exec(db, "INSERT INTO tasks (title, done) VALUES (?, ?)", "Fix bugs", "1")
    sqlite.exec(db, "INSERT INTO tasks (title, done) VALUES (?, ?)", "Add tests", "0")

    // Query incomplete tasks
    mut pending = sqlite.query(db, "SELECT * FROM tasks WHERE done = ?", "0")
    println("Pending tasks:")
    for_each task in pending {
        println("  - ${task["title"]}")
    }
}
```
