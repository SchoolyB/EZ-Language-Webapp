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

### `generate()`
`() -> string`

Generates a new random UUID v4 without hyphens.

```ez
import @uuid

do main() {
    mut id string = uuid.generate()
    println(id)  // e.g., "550e8400e29b41d4a716446655440000"
}
```

**Returns:** `string` - A UUID v4 as a 32-character hex string (no hyphens).

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) if called with arguments.

---

### `generate_hyphenated()`
`() -> string`

Generates a new random UUID v4 with hyphens.

```ez
import @uuid

do main() {
    mut id string = uuid.generate_hyphenated()
    println(id)  // e.g., "550e8400-e29b-41d4-a716-446655440000"
}
```

**Returns:** `string` - A UUID v4 in standard format (8-4-4-4-12 hex digits with hyphens).

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) if called with arguments.

---

### `is_valid()`
`(str string) -> bool`

Checks if a string is a valid UUID in standard format.

```ez
import @uuid

do main() {
    mut valid bool = uuid.is_valid("550e8400-e29b-41d4-a716-446655440000")
    println(valid)  // true

    mut invalid bool = uuid.is_valid("not-a-uuid")
    println(invalid)  // false
}
```

**Parameters:** `str` - The string to validate.

**Returns:** `bool` - `true` if the string is a valid UUID, `false` otherwise.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7002](/EZ-Language-Webapp/errors/E7002) if argument is not a string.

---

### `NIL()`
`() -> string`

Returns the nil UUID (all zeros).

```ez
import @uuid

do main() {
    mut nil_id string = uuid.NIL()
    println(nil_id)  // "00000000-0000-0000-0000-000000000000"
}
```

**Returns:** `string` - The nil UUID `"00000000-0000-0000-0000-000000000000"`.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) if called with arguments.

---

## Example Program

```ez
import @uuid

do main() {
    println("=== UUID Demo ===")

    // Generate a UUID without hyphens
    mut id string = uuid.generate()
    println("Generated UUID:", id)

    // Generate with hyphens
    mut hyphenated string = uuid.generate_hyphenated()
    println("Hyphenated UUID:", hyphenated)

    // Validate UUIDs
    println("\nValidation:")
    println("Is '${id}' valid?", uuid.is_valid(id))
    println("Is 'hello' valid?", uuid.is_valid("hello"))

    // Nil UUID
    println("\nNil UUID:", uuid.NIL())
}
```
