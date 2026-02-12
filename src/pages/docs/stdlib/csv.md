---
layout: '../../../layouts/DocsLayout.astro'
title: '@csv'
description: 'CSV parsing, stringifying, and file operations.'
---

# @csv

The `@csv` module provides functions for parsing, generating, reading, and writing CSV (comma-separated values) data.

## Import

```ez
import @csv
```

## Data Format

CSV data in EZ is represented as `[[string]]` — a 2D array of strings where each inner array is a row:

```ez
temp data [[string]] = {
    {"name", "age", "city"},
    {"Alice", "30", "NYC"},
    {"Bob", "25", "LA"}
}
```

---

## String Operations

### `parse()`
`(text string) -> ([[string]], Error)`

Parses a CSV string into a 2D array.

```ez
import @std, @csv

do main() {
    temp text string = "name,age\nAlice,30\nBob,25"
    temp data, err = csv.parse(text)
    if err != nil {
        std.println("Error:", err.message)
        return
    }

    std.println(len(data))     // 3
    std.println(data[0])       // {"name", "age"}
    std.println(data[1])       // {"Alice", "30"}
}
```

**Parameters:** `text` - A CSV-formatted string.

**Returns:**
- `[[string]]` - 2D array of rows and fields.
- `Error` - `nil` on success, or an Error if parsing fails.

**Notes:** Handles quoted fields, escaped quotes, and newlines within quotes per the CSV standard.

---

### `stringify()`
`(data [[string]]) -> (string, Error)`

Converts a 2D array to a CSV string.

```ez
import @std, @csv

do main() {
    temp data [[string]] = {{"name", "age"}, {"Alice", "30"}}
    temp result, err = csv.stringify(data)
    if err == nil {
        std.println(result)  // "name,age\nAlice,30\n"
    }
}
```

**Parameters:** `data` - A 2D array of strings.

**Returns:**
- `string` - The CSV-formatted string.
- `Error` - `nil` on success, or an Error if conversion fails.

**Notes:** Fields containing commas, quotes, or newlines are automatically quoted.

---

## File Operations

### `read()`
`(path string, [options map]) -> ([[string]], Error)`

Reads a CSV file and returns a 2D array.

```ez
import @std, @csv

do main() {
    temp data, err = csv.read("data.csv")
    if err != nil {
        std.println("Error:", err.message)
        return
    }

    for_each row in data {
        std.println(row)
    }
}
```

**With options:**

```ez
temp data, err = csv.read("data.tsv", {"delimiter": "\t", "skip_empty": true})
```

**Parameters:**
- `path` - Path to the CSV file.
- `options` *(optional)* - A map with:
  - `"delimiter"` - Field separator (default: `","`)
  - `"skip_empty"` - Skip rows where all fields are empty (default: `false`)

**Returns:**
- `[[string]]` - 2D array of rows and fields.
- `Error` - `nil` on success, or an Error if file cannot be read or parsed.

---

### `headers()`
`(path string) -> ([string], Error)`

Reads just the first row (headers) of a CSV file.

```ez
import @std, @csv

do main() {
    temp headers, err = csv.headers("data.csv")
    if err != nil {
        std.println("Error:", err.message)
        return
    }

    std.println("Columns:", headers)  // {"name", "age", "city"}
}
```

**Parameters:** `path` - Path to the CSV file.

**Returns:**
- `[string]` - Array of header field names.
- `Error` - `nil` on success, or an Error if file cannot be read.

---

### `write()`
`(path string, data [[string]], [options map]) -> (bool, Error)`

Writes a 2D array to a CSV file.

```ez
import @std, @csv

do main() {
    temp data [[string]] = {
        {"id", "name", "value"},
        {"1", "foo", "100"},
        {"2", "bar", "200"}
    }

    temp ok, err = csv.write("output.csv", data)
    if err != nil {
        std.println("Error:", err.message)
        return
    }

    std.println("Written:", ok)  // true
}
```

**With options:**

```ez
temp ok, err = csv.write("output.tsv", data, {"delimiter": "\t"})
```

**Parameters:**
- `path` - Path to write the CSV file.
- `data` - A 2D array of strings.
- `options` *(optional)* - A map with:
  - `"delimiter"` - Field separator (default: `","`)
  - `"quote_all"` - Quote all fields (default: `false`)

**Returns:**
- `bool` - `true` on success.
- `Error` - `nil` on success, or an Error if file cannot be written.

---

## Error Handling

All functions return error tuples:

```ez
temp result, err = csv.parse(text)
if err != nil {
    std.println("Error code:", err.code)
    std.println("Error message:", err.message)
    return
}
```

### Error Codes

| Code | Description |
|------|-------------|
| E7001 | Wrong number of arguments |
| E7003 | Invalid argument type |
| E14001 | CSV parse/read failure |
| E14002 | CSV write failure |

---

## Example Program

```ez
import @std
import @csv
using std

do main() {
    // Create data
    temp records [[string]] = {
        {"name", "email", "role"},
        {"Alice", "alice@example.com", "admin"},
        {"Bob", "bob@example.com", "user"},
        {"Charlie", "charlie@example.com", "user"}
    }

    // Write to file
    temp ok, write_err = csv.write("users.csv", records)
    if write_err != nil {
        println("Write error:", write_err.message)
        return
    }
    println("CSV written successfully")

    // Read back headers
    temp headers, h_err = csv.headers("users.csv")
    if h_err == nil {
        println("Columns:", headers)
    }

    // Read all data
    temp data, read_err = csv.read("users.csv")
    if read_err != nil {
        println("Read error:", read_err.message)
        return
    }

    println("Total rows:", len(data))
    for_each row in data {
        println(row)
    }

    // Round-trip: parse and stringify
    temp csv_str string = "a,b\n1,2\n"
    temp parsed, _ = csv.parse(csv_str)
    temp back, _ = csv.stringify(parsed)
    println("Round-trip match:", back == csv_str)
}
```
