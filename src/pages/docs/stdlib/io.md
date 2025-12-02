---
layout: '../../../layouts/DocsLayout.astro'
title: '@io'
description: 'File system operations including reading, writing, and path utilities.'
---

# @io

The `@io` module provides file system operations including reading, writing,
directory management, path utilities, and low-level file handle operations.

## Import

```ez
import @io
```

## File Reading

### `read_file()`
`(path: string) -> (string, Error)`

Reads the entire contents of a file as a string.

```ez
temp content, err = io.read_file("config.txt")
if err != nil {
    println("Error: ", err.message)
}
```

**Parameters:** `path` - Path to the file to read.

**Returns:** Tuple of (file contents as string, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041), [E7042](/language.ez/errors/E7042)

---

### `read_bytes()`
`(path: string) -> (byte[], Error)`

Reads the entire contents of a file as a byte array.

```ez
temp data, err = io.read_bytes("image.png")
```

**Parameters:** `path` - Path to the file to read.

**Returns:** Tuple of (byte array, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041), [E7042](/language.ez/errors/E7042)

---

### `read_lines()`
`(path: string) -> (string[], Error)`

Reads a file and returns its content as an array of lines.

```ez
temp lines, err = io.read_lines("data.txt")
for line in lines {
    println(line)
}
```

**Parameters:** `path` - Path to the file to read.

**Returns:** Tuple of (array of strings, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041), [E7042](/language.ez/errors/E7042)

---

## File Writing

### `write_file()`
`(path: string, content: string, [perms: int]) -> (bool, Error)`

Writes content to a file atomically (creates or overwrites).

```ez
temp ok, err = io.write_file("output.txt", "Hello World")
temp ok, err = io.write_file("script.sh", "#!/bin/bash", 0755)
```

**Parameters:**
- `path` - Path to the file
- `content` - String content to write
- `perms` - Optional file permissions (default 0644)

**Returns:** Tuple of (success, error).

**Errors:** [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `write_bytes()`
`(path: string, data: byte[], [perms: int]) -> (bool, Error)`

Writes bytes to a file atomically (creates or overwrites).

```ez
temp data [byte] = bytes.from_string("binary content")
temp ok bool, err Error = io.write_bytes("data.bin", data)
```

**Parameters:**
- `path` - Path to the file
- `data` - Byte array to write
- `perms` - Optional file permissions (default 0644)

**Returns:** Tuple of (success, error).

**Errors:** [E7002](/language.ez/errors/E7002), [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `append_file()`
`(path: string, content: string, [perms: int]) -> (bool, Error)`

Appends content to a file (creates if doesn't exist).

```ez
temp ok, err = io.append_file("log.txt", "New log entry\n")
```

**Parameters:**
- `path` - Path to the file
- `content` - String content to append
- `perms` - Optional file permissions (default 0644)

**Returns:** Tuple of (success, error).

**Errors:** [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `append_line()`
`(path: string, line: string, [perms: int]) -> (bool, Error)`

Appends a line to a file (automatically adds newline).

```ez
temp ok, err = io.append_line("log.txt", "Log entry")
```

**Parameters:**
- `path` - Path to the file
- `line` - Line to append (newline added automatically)
- `perms` - Optional file permissions (default 0644)

**Returns:** Tuple of (success, error).

**Errors:** [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

## Path Existence & Type Checks

### `exists()`
`(path: string) -> bool`

Checks if a path exists (file or directory).

```ez
if io.exists("config.txt") {
    println("Config found")
}
```

**Parameters:** `path` - Path to check.

**Returns:** true if exists, false otherwise.

---

### `is_file()`
`(path: string) -> bool`

Checks if a path is a regular file.

```ez
if io.is_file("data.txt") {
    temp content, _ = io.read_file("data.txt")
}
```

**Parameters:** `path` - Path to check.

**Returns:** true if path is a regular file.

---

### `is_dir()`
`(path: string) -> bool`

Checks if a path is a directory.

```ez
if io.is_dir("src") {
    temp files, _ = io.read_dir("src")
}
```

**Parameters:** `path` - Path to check.

**Returns:** true if path is a directory.

---

## File Operations

### `remove()`
`(path: string) -> (bool, Error)`

Removes a file (not directories).

```ez
temp ok, err = io.remove("temp.txt")
```

**Parameters:** `path` - Path to the file to remove.

**Returns:** Tuple of (success, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7017](/language.ez/errors/E7017), [E7018](/language.ez/errors/E7018), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `remove_dir()`
`(path: string) -> (bool, Error)`

Removes an empty directory.

```ez
temp ok, err = io.remove_dir("empty_folder")
```

**Parameters:** `path` - Path to the directory to remove.

**Returns:** Tuple of (success, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7017](/language.ez/errors/E7017), [E7019](/language.ez/errors/E7019), [E7023](/language.ez/errors/E7023), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `remove_all()`
`(path: string) -> (bool, Error)`

Recursively removes a file or directory. **Use with caution!**

```ez
temp ok, err = io.remove_all("build_output")
```

**Parameters:** `path` - Path to remove recursively.

**Returns:** Tuple of (success, error).

**Errors:** [E7017](/language.ez/errors/E7017), [E7020](/language.ez/errors/E7020), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `rename()`
`(oldPath: string, newPath: string) -> (bool, Error)`

Renames or moves a file or directory.

```ez
temp ok, err = io.rename("old.txt", "new.txt")
temp ok, err = io.rename("file.txt", "subdir/file.txt")
```

**Parameters:**
- `oldPath` - Current path
- `newPath` - New path

**Returns:** Tuple of (success, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `copy()`
`(src: string, dst: string, [perms: int]) -> (bool, Error)`

Copies a file (not directories).

```ez
temp ok, err = io.copy("original.txt", "backup.txt")
```

**Parameters:**
- `src` - Source file path
- `dst` - Destination file path
- `perms` - Optional permissions (default: preserve source permissions)

**Returns:** Tuple of (success, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7017](/language.ez/errors/E7017), [E7021](/language.ez/errors/E7021), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

## Directory Operations

### `mkdir()`
`(path: string, [perms: int]) -> (bool, Error)`

Creates a directory (parent must exist).

```ez
temp ok, err = io.mkdir("new_folder")
temp ok, err = io.mkdir("private", 0700)
```

**Parameters:**
- `path` - Path for new directory
- `perms` - Optional permissions (default 0755)

**Returns:** Tuple of (success, error).

**Errors:** [E7017](/language.ez/errors/E7017), [E7022](/language.ez/errors/E7022), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `mkdir_all()`
`(path: string, [perms: int]) -> (bool, Error)`

Creates a directory and all parent directories as needed.

```ez
temp ok, err = io.mkdir_all("path/to/nested/folder")
```

**Parameters:**
- `path` - Path for new directory (including parents)
- `perms` - Optional permissions (default 0755)

**Returns:** Tuple of (success, error).

**Errors:** [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `read_dir()`
`(path: string) -> (string[], Error)`

Lists the contents of a directory.

```ez
temp entries, err = io.read_dir("src")
for entry in entries {
    println(entry)
}
```

**Parameters:** `path` - Path to the directory.

**Returns:** Tuple of (array of filenames, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

## File Metadata

### `file_size()`
`(path: string) -> (int, Error)`

Returns the size of a file in bytes.

```ez
temp size, err = io.file_size("data.bin")
println("File is ", size, " bytes")
```

**Parameters:** `path` - Path to the file.

**Returns:** Tuple of (size in bytes, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `file_mod_time()`
`(path: string) -> (int, Error)`

Returns the modification time as a Unix timestamp.

```ez
temp mtime, err = io.file_mod_time("file.txt")
```

**Parameters:** `path` - Path to the file.

**Returns:** Tuple of (Unix timestamp, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

## Path Utilities

### `path_join()`
`(parts: ...string) -> string`

Joins path components using the OS-specific separator.

```ez
temp path string = io.path_join("home", "user", "file.txt")
// "home/user/file.txt" on Unix
```

**Parameters:** `parts` - One or more path components.

**Returns:** Joined path string.

**Errors:** [E7041](/language.ez/errors/E7041)

---

### `path_base()`
`(path: string) -> string`

Returns the last element of a path (filename or directory name).

```ez
temp name string = io.path_base("/home/user/file.txt")  // "file.txt"
```

**Parameters:** `path` - A file path.

**Returns:** The base name.

**Errors:** [E7041](/language.ez/errors/E7041)

---

### `path_dir()`
`(path: string) -> string`

Returns the directory portion of a path.

```ez
temp dir string = io.path_dir("/home/user/file.txt")  // "/home/user"
```

**Parameters:** `path` - A file path.

**Returns:** The directory part.

**Errors:** [E7041](/language.ez/errors/E7041)

---

### `path_ext()`
`(path: string) -> string`

Returns the file extension (including the dot).

```ez
temp ext string = io.path_ext("document.pdf")  // ".pdf"
```

**Parameters:** `path` - A file path.

**Returns:** The extension (e.g., ".txt").

**Errors:** [E7041](/language.ez/errors/E7041)

---

### `path_abs()`
`(path: string) -> (string, Error)`

Returns the absolute path.

```ez
temp abs, err = io.path_abs("./file.txt")
```

**Parameters:** `path` - A relative or absolute path.

**Returns:** Tuple of (absolute path, error).

**Errors:** [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `path_clean()`
`(path: string) -> string`

Cleans a path (removes redundant separators, . and ..).

```ez
temp clean string = io.path_clean("a/b/../c/./d")  // "a/c/d"
```

**Parameters:** `path` - Path to clean.

**Returns:** Cleaned path.

**Errors:** [E7041](/language.ez/errors/E7041)

---

### `path_separator()`
`() -> string`

Returns the OS-specific path separator.

```ez
temp sep string = io.path_separator()
```

**Returns:** "/" on Unix, "\\" on Windows.

---

### `expand_path()`
`(path: string) -> string`

Expands ~ to home directory and cleans the path.

```ez
temp path string = io.expand_path("~/Documents")
// "/home/user/Documents" on Unix
```

**Parameters:** `path` - Path possibly containing ~.

**Returns:** Expanded and cleaned path.

**Errors:** [E7029](/language.ez/errors/E7029)

---

## File Handle Constants

### `READ_ONLY`
`int`

Open a file for reading only.

```ez
temp handle, err = io.open("file.txt", io.READ_ONLY)
```

---

### `WRITE_ONLY`
`int`

Open a file for writing only.

```ez
temp handle, err = io.open("file.txt", io.WRITE_ONLY)
```

---

### `READ_WRITE`
`int`

Open a file for reading and writing.

```ez
temp handle, err = io.open("file.txt", io.READ_WRITE)
```

---

### `APPEND`
`int`

Open a file in append mode (writes go to end of file).

```ez
temp handle, err = io.open("log.txt", io.WRITE_ONLY | io.APPEND)
```

---

### `CREATE`
`int`

Create the file if it doesn't exist.

```ez
temp handle, err = io.open("new.txt", io.WRITE_ONLY | io.CREATE)
```

---

### `TRUNCATE`
`int`

Truncate the file to zero length when opened.

```ez
temp handle, err = io.open("file.txt", io.WRITE_ONLY | io.TRUNCATE)
```

---

### `EXCLUSIVE`
`int`

Used with CREATE; error if file already exists.

```ez
temp handle, err = io.open("new.txt", io.WRITE_ONLY | io.CREATE | io.EXCLUSIVE)
```

---

### `SEEK_START`
`int`

Seek relative to the start of the file.

```ez
temp pos, err = io.seek(handle, 0, io.SEEK_START)  // Go to beginning
```

---

### `SEEK_CURRENT`
`int`

Seek relative to the current position.

```ez
temp pos, err = io.seek(handle, 10, io.SEEK_CURRENT)  // Move 10 bytes forward
```

---

### `SEEK_END`
`int`

Seek relative to the end of the file.

```ez
temp pos, err = io.seek(handle, -10, io.SEEK_END)  // 10 bytes before end
```

---

### Combining Flags

File mode flags can be combined using the bitwise OR operator:

```ez
temp mode int = io.WRITE_ONLY | io.CREATE | io.TRUNCATE
temp handle, err = io.open("file.txt", mode)
```

---

## File Handle Types

### `FileHandle`

A handle to an open file. Returned by `open()` and used with `read()`, `write()`, `seek()`, `tell()`, `flush()`, and `close()`.

```ez
temp handle, err = io.open("data.txt")
if err == nil {
    temp content, _ = io.read_all(handle)
    io.close(handle)
}
```

---

## File Handle Operations

### `open()`
`(path: string, [mode: int], [perms: int]) -> (FileHandle, Error)`

Opens a file and returns a file handle.

```ez
temp handle, err = io.open("data.txt")
temp handle, err = io.open("log.txt", io.WRITE_ONLY | io.CREATE | io.APPEND)
```

**Parameters:**
- `path` - Path to the file
- `mode` - Open mode flags (default: io.READ_ONLY)
- `perms` - Permissions for new files (default: 0644)

**Returns:** Tuple of (file handle, error).

**Errors:** [E7016](/language.ez/errors/E7016), [E7017](/language.ez/errors/E7017), [E7040](/language.ez/errors/E7040), [E7041](/language.ez/errors/E7041)

---

### `read()`
`(handle: FileHandle, n: int) -> (byte[], Error)`

Reads up to n bytes from a file handle.

```ez
temp data, err = io.read(handle, 1024)
```

**Parameters:**
- `handle` - An open file handle
- `n` - Maximum bytes to read

**Returns:** Tuple of (bytes read, error).

**Errors:** [E7011](/language.ez/errors/E7011), [E7050](/language.ez/errors/E7050)

---

### `read_all()`
`(handle: FileHandle) -> (byte[], Error)`

Reads all remaining bytes from a file handle.

```ez
temp content, err = io.read_all(handle)
```

**Parameters:** `handle` - An open file handle.

**Returns:** Tuple of (all remaining bytes, error).

**Errors:** [E7050](/language.ez/errors/E7050)

---

### `read_string()`
`(handle: FileHandle, n: int) -> (string, Error)`

Reads up to n bytes from a file handle as a string.

```ez
temp text, err = io.read_string(handle, 100)
```

**Parameters:**
- `handle` - An open file handle
- `n` - Maximum bytes to read

**Returns:** Tuple of (string, error).

**Errors:** [E7011](/language.ez/errors/E7011), [E7050](/language.ez/errors/E7050)

---

### `write()`
`(handle: FileHandle, data: string|byte[]) -> (int, Error)`

Writes data to a file handle.

```ez
temp n, err = io.write(handle, "Hello World")
temp n, err = io.write(handle, bytes.from_string("binary"))
```

**Parameters:**
- `handle` - An open file handle
- `data` - String or byte array to write

**Returns:** Tuple of (bytes written, error).

**Errors:** [E7050](/language.ez/errors/E7050)

---

### `seek()`
`(handle: FileHandle, offset: int, whence: int) -> (int, Error)`

Seeks to a position in the file.

```ez
temp pos, err = io.seek(handle, 0, io.SEEK_START)  // Go to beginning
temp pos, err = io.seek(handle, -10, io.SEEK_END)  // 10 bytes before end
```

**Parameters:**
- `handle` - An open file handle
- `offset` - Byte offset
- `whence` - Reference point (io.SEEK_START, io.SEEK_CURRENT, io.SEEK_END)

**Returns:** Tuple of (new position, error).

**Errors:** [E7050](/language.ez/errors/E7050)

---

### `tell()`
`(handle: FileHandle) -> (int, Error)`

Returns the current position in the file.

```ez
temp pos, err = io.tell(handle)
```

**Parameters:** `handle` - An open file handle.

**Returns:** Tuple of (current position, error).

**Errors:** [E7050](/language.ez/errors/E7050)

---

### `flush()`
`(handle: FileHandle) -> (bool, Error)`

Flushes any buffered data to the file.

```ez
temp ok, err = io.flush(handle)
```

**Parameters:** `handle` - An open file handle.

**Returns:** Tuple of (success, error).

**Errors:** [E7050](/language.ez/errors/E7050)

---

### `close()`
`(handle: FileHandle) -> (bool, Error)`

Closes a file handle.

```ez
temp ok, err = io.close(handle)
```

**Parameters:** `handle` - A file handle to close.

**Returns:** Tuple of (success, error).

---

## Example Program

```ez
import @std
import @io

do main() {
    // Write a file
    temp ok, err = io.write_file("hello.txt", "Hello, World!")
    if err != nil {
        std.println("Write error:", err.message)
        return
    }

    // Read it back
    temp content, err = io.read_file("hello.txt")
    if err == nil {
        std.println("Content:", content)
    }

    // Check file info
    temp size, _ = io.file_size("hello.txt")
    std.println("Size:", size, "bytes")

    // Work with paths
    temp abs, _ = io.path_abs("hello.txt")
    std.println("Absolute path:", abs)
    std.println("Extension:", io.path_ext("hello.txt"))

    // Clean up
    io.remove("hello.txt")
}
```
