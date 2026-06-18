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
mut data [[string]] = {
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
import @csv

do main() {
    mut text string = "name,age\nAlice,30\nBob,25"
    mut data, err = csv.parse(text)
    if err != nil {
        println("Error:", err.message)
        return
    }

    println(len(data))     // 3
    println(data[0])       // {"name", "age"}
    println(data[1])       // {"Alice", "30"}
}
```

**Parameters:** `text` - A CSV-formatted string.

**Returns:**
- `[[string]]` - 2D array of rows and fields.
- `Error` - `nil` on success, or an Error if parsing fails.

**Notes:** Handles quoted fields, escaped quotes, and newlines within quotes per the CSV standard.

---

### `encode()`
`(data [[string]]) -> (string, Error)`

Converts a 2D array to a CSV string.

```ez
import @csv

do main() {
    mut data [[string]] = {{"name", "age"}, {"Alice", "30"}}
    mut result, err = csv.encode(data)
    if err == nil {
        println(result)  // "name,age\nAlice,30\n"
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

### `read_file()`
`(path string, [options map]) -> ([[string]], Error)`

Reads a CSV file and returns a 2D array.

```ez
import @csv

do main() {
    mut data, err = csv.read_file("data.csv")
    if err != nil {
        println("Error:", err.message)
        return
    }

    for_each row in data {
        println(row)
    }
}
```

**With options:**

```ez
mut data, err = csv.read_file("data.tsv", {"delimiter": "\t", "skip_empty": true})
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
import @csv

do main() {
    mut headers, err = csv.headers("data.csv")
    if err != nil {
        println("Error:", err.message)
        return
    }

    println("Columns:", headers)  // {"name", "age", "city"}
}
```

**Parameters:** `path` - Path to the CSV file.

**Returns:**
- `[string]` - Array of header field names.
- `Error` - `nil` on success, or an Error if file cannot be read.

---

### `write_file()`
`(path string, data [[string]], [options map]) -> (bool, Error)`

Writes a 2D array to a CSV file.

```ez
import @csv

do main() {
    mut data [[string]] = {
        {"id", "name", "value"},
        {"1", "foo", "100"},
        {"2", "bar", "200"}
    }

    mut ok, err = csv.write_file("output.csv", data)
    if err != nil {
        println("Error:", err.message)
        return
    }

    println("Written:", ok)  // true
}
```

**With options:**

```ez
mut ok, err = csv.write_file("output.tsv", data, {"delimiter": "\t"})
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
mut result, err = csv.parse(text)
if err != nil {
    println("Error code:", err.code)
    println("Error message:", err.message)
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
