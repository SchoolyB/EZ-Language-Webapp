---
layout: '../../../layouts/DocsLayout.astro'
title: '@encoding'
description: 'Base64, hex, and URL encoding/decoding utilities.'
---

# @encoding

The `@encoding` module provides functions for encoding and decoding data in various formats including Base64, hexadecimal, and URL encoding.

## Import

```ez
import @encoding
```

## Base64

### `base64_encode()`
`(data string) -> string`

Encodes a string to Base64.

```ez
import @std, @encoding

do main() {
    temp encoded string = encoding.base64_encode("Hello, World!")
    std.println(encoded)  // "SGVsbG8sIFdvcmxkIQ=="
}
```

**Parameters:** `data` - The string to encode.

**Returns:** `string` - The Base64-encoded string.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if argument is not a string.

---

### `base64_decode()`
`(data string) -> (string, error)`

Decodes a Base64 string.

```ez
import @std, @encoding

do main() {
    temp decoded string, err error = encoding.base64_decode("SGVsbG8sIFdvcmxkIQ==")
    if err == nil {
        std.println(decoded)  // "Hello, World!"
    } otherwise {
        std.println("Error:", err.message)
    }
}
```

**Parameters:** `data` - The Base64-encoded string to decode.

**Returns:**
- `string` - The decoded string (empty on error).
- `error` - `nil` on success, or an Error struct with `message` and `code` fields.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if argument is not a string, [E16001](/language.ez/errors/E16001) for invalid Base64 input.

---

## Hexadecimal

### `hex_encode()`
`(data string) -> string`

Encodes a string to lowercase hexadecimal.

```ez
import @std, @encoding

do main() {
    temp encoded string = encoding.hex_encode("Hello")
    std.println(encoded)  // "48656c6c6f"
}
```

**Parameters:** `data` - The string to encode.

**Returns:** `string` - The hex-encoded string (lowercase).

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if argument is not a string.

---

### `hex_decode()`
`(data string) -> (string, error)`

Decodes a hexadecimal string.

```ez
import @std, @encoding

do main() {
    temp decoded string, err error = encoding.hex_decode("48656c6c6f")
    if err == nil {
        std.println(decoded)  // "Hello"
    } otherwise {
        std.println("Error:", err.message)
    }
}
```

**Parameters:** `data` - The hex-encoded string to decode (case-insensitive).

**Returns:**
- `string` - The decoded string (empty on error).
- `error` - `nil` on success, or an Error struct with `message` and `code` fields.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if argument is not a string, [E16002](/language.ez/errors/E16002) for invalid hex input.

---

## URL Encoding

### `url_encode()`
`(data string) -> string`

URL percent-encodes a string for use in query parameters.

```ez
import @std, @encoding

do main() {
    temp encoded string = encoding.url_encode("hello world?foo=bar")
    std.println(encoded)  // "hello+world%3Ffoo%3Dbar"
}
```

**Parameters:** `data` - The string to encode.

**Returns:** `string` - The URL-encoded string.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if argument is not a string.

---

### `url_decode()`
`(data string) -> (string, error)`

Decodes a URL percent-encoded string.

```ez
import @std, @encoding

do main() {
    temp decoded string, err error = encoding.url_decode("hello+world%3Ffoo%3Dbar")
    if err == nil {
        std.println(decoded)  // "hello world?foo=bar"
    } otherwise {
        std.println("Error:", err.message)
    }
}
```

**Parameters:** `data` - The URL-encoded string to decode.

**Returns:**
- `string` - The decoded string (empty on error).
- `error` - `nil` on success, or an Error struct with `message` and `code` fields.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if argument is not a string, [E16003](/language.ez/errors/E16003) for invalid URL encoding.

---

## Example Program

```ez
import @std
import @encoding

do main() {
    std.println("=== Encoding Demo ===")

    temp original string = "Hello, World!"

    // Base64
    std.println("\n-- Base64 --")
    temp b64 string = encoding.base64_encode(original)
    std.println("Encoded:", b64)

    temp b64_decoded string, b64_err error = encoding.base64_decode(b64)
    if b64_err == nil {
        std.println("Decoded:", b64_decoded)
    }

    // Hex
    std.println("\n-- Hexadecimal --")
    temp hex string = encoding.hex_encode(original)
    std.println("Encoded:", hex)

    temp hex_decoded string, hex_err error = encoding.hex_decode(hex)
    if hex_err == nil {
        std.println("Decoded:", hex_decoded)
    }

    // URL
    std.println("\n-- URL Encoding --")
    temp query string = "name=John Doe&city=New York"
    temp url_enc string = encoding.url_encode(query)
    std.println("Encoded:", url_enc)

    temp url_decoded string, url_err error = encoding.url_decode(url_enc)
    if url_err == nil {
        std.println("Decoded:", url_decoded)
    }
}
```
