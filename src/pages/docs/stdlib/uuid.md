---
layout: '../../../layouts/DocsLayout.astro'
title: '@uuid'
description: 'UUID generation and validation utilities.'
---

# @uuid

The `@uuid` module provides functions for generating and validating UUIDs (Universally Unique Identifiers) following RFC 4122 and RFC 9562.

## Import

```ez
import @uuid
```

## UUID Type

All generator and parse functions return a `UUID` struct type (not a plain string). Use `uuid.to_string()` to convert to a string when needed.

---

## Functions

### `generate()`
`() -> UUID`

Generates a new random UUID v4, hyphenated.

```ez
import @uuid

do main() {
    mut id UUID = uuid.generate()
    println(uuid.to_string(id))  // e.g., "550e8400-e29b-41d4-a716-446655440000"
}
```

---

### `generate_hyphenated()`
`() -> UUID`

Alias for `generate()`. Generates a UUID v4 in standard hyphenated format.

---

### `generate_random()`
`() -> UUID`

Generates an RFC 4122 v4 (random) UUID, hyphenated, lowercase.

```ez
mut id UUID = uuid.generate_random()
```

---

### `generate_time_ordered()`
`() -> UUID`

Generates an RFC 9562 v7 (time-ordered) UUID, hyphenated, lowercase. UUIDs generated with this function sort by creation time.

```ez
mut id UUID = uuid.generate_time_ordered()
```

---

### `generate_compact()`
`(id UUID) -> string`

Strips hyphens from a UUID, returning a 32-character hex string.

```ez
mut id UUID = uuid.generate()
mut compact string = uuid.generate_compact(id)
println(compact)  // e.g., "550e8400e29b41d4a716446655440000"
```

---

### `parse()`
`(s string) -> UUID`

Validates and normalizes a 36-character hyphenated UUID string to lowercase. Panics on invalid input — use `is_valid()` first for a non-panicking check.

```ez
mut id UUID = uuid.parse("550E8400-E29B-41D4-A716-446655440000")
println(uuid.to_string(id))  // lowercase: "550e8400-e29b-41d4-a716-446655440000"
```

---

### `to_string()`
`(id UUID) -> string`

Converts a UUID to its 36-character hyphenated string representation.

```ez
mut id UUID = uuid.generate()
mut s string = uuid.to_string(id)
println(s)
```

---

### `is_valid()`
`(s string) -> bool`

Checks if a string is a valid UUID in standard format.

```ez
println(uuid.is_valid("550e8400-e29b-41d4-a716-446655440000"))  // true
println(uuid.is_valid("not-a-uuid"))                             // false
```

---

## Constants

| Constant | Type | Value |
|----------|------|-------|
| `NIL_UUID` | `UUID` | All-zero UUID (`00000000-0000-0000-0000-000000000000`) |

---
