---
layout: '../../../layouts/DocsLayout.astro'
title: '@uuid'
description: 'UUID generation and validation utilities.'
---

# @uuid

The `@uuid` module provides functions for generating and validating UUIDs (Universally Unique Identifiers) following RFC 4122.

## Import

```ez
import @uuid
```

## Functions

### `create()`
`() -> string`

Generates a new random UUID v4.

```ez
import @std, @uuid

do main() {
    temp id string = uuid.create()
    std.println(id)  // e.g., "550e8400-e29b-41d4-a716-446655440000"
}
```

**Returns:** `string` - A UUID v4 in standard format (8-4-4-4-12 hex digits with hyphens).

**Errors:** [E7001](/language.ez/errors/E7001) if called with arguments.

---

### `create_compact()`
`() -> string`

Generates a new random UUID v4 without hyphens.

```ez
import @std, @uuid

do main() {
    temp id string = uuid.create_compact()
    std.println(id)  // e.g., "550e8400e29b41d4a716446655440000"
}
```

**Returns:** `string` - A UUID v4 as a 32-character hex string (no hyphens).

**Errors:** [E7001](/language.ez/errors/E7001) if called with arguments.

---

### `is_valid()`
`(str string) -> bool`

Checks if a string is a valid UUID in standard format.

```ez
import @std, @uuid

do main() {
    temp valid bool = uuid.is_valid("550e8400-e29b-41d4-a716-446655440000")
    std.println(valid)  // true

    temp invalid bool = uuid.is_valid("not-a-uuid")
    std.println(invalid)  // false
}
```

**Parameters:** `str` - The string to validate.

**Returns:** `bool` - `true` if the string is a valid UUID, `false` otherwise.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7002](/language.ez/errors/E7002) if argument is not a string.

---

### `NIL()`
`() -> string`

Returns the nil UUID (all zeros).

```ez
import @std, @uuid

do main() {
    temp nil_id string = uuid.NIL()
    std.println(nil_id)  // "00000000-0000-0000-0000-000000000000"
}
```

**Returns:** `string` - The nil UUID `"00000000-0000-0000-0000-000000000000"`.

**Errors:** [E7001](/language.ez/errors/E7001) if called with arguments.

---

## Example Program

```ez
import @std
import @uuid

do main() {
    std.println("=== UUID Demo ===")

    // Generate a new UUID
    temp id string = uuid.create()
    std.println("Generated UUID:", id)

    // Generate compact version
    temp compact string = uuid.create_compact()
    std.println("Compact UUID:", compact)

    // Validate UUIDs
    std.println("\nValidation:")
    std.println("Is '${id}' valid?", uuid.is_valid(id))
    std.println("Is 'hello' valid?", uuid.is_valid("hello"))

    // Nil UUID
    std.println("\nNil UUID:", uuid.NIL())
}
```
