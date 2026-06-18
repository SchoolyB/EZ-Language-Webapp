---
layout: '../../../layouts/DocsLayout.astro'
title: '@io'
description: 'File system operations including reading, writing, and path utilities.'
---

# @io

The `@io` module provides file system operations including reading, writing, directory management, and path utilities.

## Import

```ez
import @io
```

## File Reading

### `read_file()`
`(path string) -> string`

Reads the entire contents of a file as a string.

```ez
import @io

do main() {
    mut content, err = io.read_file("config.txt")
    if err != nil {
        println("Error: ${err.message}")
    }
    println(content)
}
```

**Parameters:** `path` - Path to the file to read.

**Returns:** The file contents as a string. When used with destructuring, returns `(string, Error)`.

---

### `read_bytes()`
`(path string) -> [byte]`

Reads the entire contents of a file as a byte array.

```ez
import @io

do main() {
    mut data, err = io.read_bytes("image.png")
    if err != nil {
        println("Error: ${err.message}")
    }
}
```

**Parameters:** `path` - Path to the file to read.

**Returns:** A byte array. When used with destructuring, returns `([byte], Error)`.

---

### `read_lines()`
`(path string) -> [string]`

Reads a file and returns its content as an array of lines. Strips `\r\n` line endings.

```ez
import @io

do main() {
    mut lines, err = io.read_lines("data.txt")
    if err != nil {
        println("Error: ${err.message}")
        return
    }
    for_each line in lines {
        println(line)
    }
}
```

**Parameters:** `path` - Path to the file to read.

**Returns:** An array of strings. When used with destructuring, returns `([string], Error)`.

---

## File Writing

### `write_file()`
`(path string, content string) -> bool`

Writes content to a file (creates or overwrites).

```ez
import @io

do main() {
    mut ok, err = io.write_file("output.txt", "Hello World")
    if err != nil {
        println("Write failed: ${err.message}")
    }
}
```

**Parameters:**
- `path` - Path to the file
- `content` - String content to write

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

### `append_file()`
`(path string, content string) -> bool`

Appends content to a file (creates if it doesn't exist).

```ez
import @io

do main() {
    mut ok, err = io.append_file("log.txt", "New log entry\n")
}
```

**Parameters:**
- `path` - Path to the file
- `content` - String content to append

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

## File Operations

### `file_exists()`
`(path string) -> bool`

Checks if a file exists.

```ez
import @io

do main() {
    if io.file_exists("config.txt") {
        println("Config found")
    }
}
```

**Parameters:** `path` - Path to check.

**Returns:** `true` if the file exists, `false` otherwise.

---

### `is_file()`
`(path string) -> bool`

Checks if a path is a regular file.

```ez
import @io

do main() {
    if io.is_file("data.txt") {
        mut content, _ = io.read_file("data.txt")
        println(content)
    }
}
```

**Parameters:** `path` - Path to check.

**Returns:** `true` if the path is a regular file.

---

### `is_directory()`
`(path string) -> bool`

Checks if a path is a directory.

```ez
import @io

do main() {
    if io.is_directory("src") {
        mut files, _ = io.list_dir("src")
        for_each f in files {
            println(f)
        }
    }
}
```

**Parameters:** `path` - Path to check.

**Returns:** `true` if the path is a directory.

---

### `file_size()`
`(path string) -> int`

Returns the size of a file in bytes. Returns `-1` on error.

```ez
import @io

do main() {
    mut size, err = io.file_size("data.bin")
    if err != nil {
        println("Error: ${err.message}")
        return
    }
    println("File is ${size} bytes")
}
```

**Parameters:** `path` - Path to the file.

**Returns:** Size in bytes. When used with destructuring, returns `(int, Error)`.

---

### `delete_file()`
`(path string) -> bool`

Deletes a file.

```ez
import @io

do main() {
    mut ok, err = io.delete_file("temp.txt")
}
```

**Parameters:** `path` - Path to the file to delete.

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

### `rename_file()`
`(old_path string, new_path string) -> bool`

Renames a file.

```ez
import @io

do main() {
    mut ok, err = io.rename_file("old.txt", "new.txt")
}
```

**Parameters:**
- `old_path` - Current path
- `new_path` - New path

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

### `copy_file()`
`(src string, dst string) -> bool`

Copies a file.

```ez
import @io

do main() {
    mut ok, err = io.copy_file("original.txt", "backup.txt")
}
```

**Parameters:**
- `src` - Source file path
- `dst` - Destination file path

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

### `move_file()`
`(src string, dst string) -> bool`

Moves a file.

```ez
import @io

do main() {
    mut ok, err = io.move_file("file.txt", "archive/file.txt")
}
```

**Parameters:**
- `src` - Source file path
- `dst` - Destination file path

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

## Directory Operations

### `make_dir()`
`(path string) -> bool`

Creates a directory (parent must exist).

```ez
import @io

do main() {
    mut ok, err = io.make_dir("new_folder")
}
```

**Parameters:** `path` - Path for the new directory.

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

### `make_dir_all()`
`(path string) -> bool`

Creates a directory and all parent directories as needed.

```ez
import @io

do main() {
    mut ok, err = io.make_dir_all("path/to/nested/folder")
}
```

**Parameters:** `path` - Path for the new directory (including parents).

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

### `list_dir()`
`(path string) -> [string]`

Lists the contents of a directory.

```ez
import @io

do main() {
    mut entries, err = io.list_dir("src")
    if err != nil {
        println("Error: ${err.message}")
        return
    }
    for_each entry in entries {
        println(entry)
    }
}
```

**Parameters:** `path` - Path to the directory.

**Returns:** An array of filenames. When used with destructuring, returns `([string], Error)`.

---

### `remove_dir()`
`(path string) -> bool`

Removes an empty directory.

```ez
import @io

do main() {
    mut ok, err = io.remove_dir("empty_folder")
}
```

**Parameters:** `path` - Path to the directory.

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

### `remove_dir_all()`
`(path string) -> bool`

Recursively removes a directory and all its contents. **Use with caution!**

```ez
import @io

do main() {
    mut ok, err = io.remove_dir_all("build_output")
}
```

**Parameters:** `path` - Path to remove recursively.

**Returns:** `bool` success. When used with destructuring, returns `(bool, Error)`.

---

## Directory Traversal

### `glob()`
`(pattern string) -> [string]`

Finds all files matching a glob pattern. Returns an empty array on no match.

```ez
import @io

do main() {
    mut matches, err = io.glob("src/*.ez")
    if err == nil {
        for_each file in matches {
            println(file)
        }
    }
}
```

**Parameters:** `pattern` - A glob pattern (supports `*`, `?`, `**`, `[...]`).

**Returns:** An array of matching file paths. When used with destructuring, returns `([string], Error)`.

---

### `walk()`
`(path string) -> [string]`

Recursively walks a directory tree and returns all files.

```ez
import @io

do main() {
    mut files, err = io.walk("src")
    if err == nil {
        println("Found ${len(files)} files")
        for_each file in files {
            println(file)
        }
    }
}
```

**Parameters:** `path` - The root directory to walk.

**Returns:** An array of all file paths recursively. When used with destructuring, returns `([string], Error)`.

---

## Path Utilities

### `path_join()`
`(parts [string]) -> string`

Joins path components. If any segment is an absolute path, it replaces the accumulated path up to that point.

```ez
import @io

do main() {
    mut p = io.path_join({"home", "user", "docs"})
    println(p)  // "home/user/docs"

    // Absolute segment replaces accumulated path
    mut q = io.path_join({"a/b", "/abs"})
    println(q)  // "/abs"
}
```

**Parameters:** `parts` - An array of path components.

**Returns:** The joined path string.

---

### `dirname()`
`(path string) -> string`

Returns the parent directory portion of a path.

```ez
import @io

do main() {
    mut dir = io.dirname("/home/user/file.txt")
    println(dir)  // "/home/user"
}
```

**Parameters:** `path` - A file path.

**Returns:** The directory part.

---

### `basename()`
`(path string) -> string`

Returns the filename component of a path.

```ez
import @io

do main() {
    mut name = io.basename("/home/user/file.txt")
    println(name)  // "file.txt"
}
```

**Parameters:** `path` - A file path.

**Returns:** The base name.

---

### `extension()`
`(path string) -> string`

Returns the file extension including the dot. Returns an empty string if there is no extension.

```ez
import @io

do main() {
    mut ext = io.extension("document.pdf")
    println(ext)  // ".pdf"
}
```

**Parameters:** `path` - A file path.

**Returns:** The extension (e.g., `".txt"`) or `""` if none.

---

### `is_absolute()`
`(path string) -> bool`

Checks if a path is absolute.

```ez
import @io

do main() {
    println(io.is_absolute("/home/user"))  // true
    println(io.is_absolute("./file.txt"))  // false
}
```

**Parameters:** `path` - A path to check.

**Returns:** `true` if the path is absolute.

---

### `normalize()`
`(path string) -> string`

Cleans and normalizes a path (removes redundant separators, `.` and `..`).

```ez
import @io

do main() {
    mut clean = io.normalize("a/b/../c/./d")
    println(clean)  // "a/c/d"
}
```

**Parameters:** `path` - Path to normalize.

**Returns:** The normalized path.

---

## Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `O_RDONLY` | `0` | Open for reading only |
| `O_WRONLY` | `1` | Open for writing only |
| `O_RDWR` | `2` | Open for reading and writing |

---

## Error-Returning Variants

Most functions that can fail have an error-returning variant usable via multi-variable destructuring. The plain form panics on hard errors; the error form returns `(T, Error)`.

| Function | Error-returning variant |
|----------|------------------------|
| `read_file` | `(string, Error)` |
| `read_bytes` | `([byte], Error)` |
| `read_lines` | `([string], Error)` |
| `file_size` | `(int, Error)` |
| `write_file` | `(bool, Error)` |
| `append_file` | `(bool, Error)` |
| `delete_file` | `(bool, Error)` |
| `rename_file` | `(bool, Error)` |
| `copy_file` | `(bool, Error)` |
| `move_file` | `(bool, Error)` |
| `list_dir` | `([string], Error)` |
| `make_dir` | `(bool, Error)` |
| `make_dir_all` | `(bool, Error)` |
| `remove_dir` | `(bool, Error)` |
| `remove_dir_all` | `(bool, Error)` |
| `walk` | `([string], Error)` |
| `glob` | `([string], Error)` |

```ez
// Always use destructuring; single-variable assignment is a compile error
mut content, err = io.read_file("data.txt")
if err != nil {
    println("read failed: ${err.message}")
}

// Discard the error with _
mut content, _ = io.read_file("data.txt")
```

---

## Path Resolution

All relative paths passed to `@io` functions are resolved relative to the **current working directory** of the process (the directory from which the program was launched). They are **not** resolved relative to the source file that contains the call.

---
