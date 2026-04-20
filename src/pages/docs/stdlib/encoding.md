---
layout: '../../../layouts/DocsLayout.astro'
title: '@encoding'
description: 'Base64, hex, and URL encoding/decoding utilities.'
---

# @encoding

The `@encoding` module provides functions for encoding and decoding data in various formats including Base64, hexadecimal, and URL encoding. These functions work with strings. For byte-level encoding, see [`@bytes`](/EZ-Language-Webapp/docs/stdlib/bytes).

## Import

```ez
import @encoding
```

## Base64

### `base64_encode()`
`(data string) -> string`

Encodes a string to Base64.

```ez
import @encoding

do main() {
    mut encoded string = encoding.base64_encode("Hello, World!")
    println(encoded)  // "SGVsbG8sIFdvcmxkIQ=="
}
```

**Parameters:** `data` - The string to encode.

**Returns:** `string` - The Base64-encoded string.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string.

---

### `base64_decode()`
`(data string) -> (string, Error)`

Decodes a Base64 string.

```ez
import @encoding

do main() {
    mut decoded string, err Error = encoding.base64_decode("SGVsbG8sIFdvcmxkIQ==")
    if err == nil {
        println(decoded)  // "Hello, World!"
    } otherwise {
        println("Error:", err.message)
    }
}
```

**Parameters:** `data` - The Base64-encoded string to decode.

**Returns:**
- `string` - The decoded string (empty on error).
- `Error` - `nil` on success, or an Error struct with `message` and `code` fields.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string, [E16001](/EZ-Language-Webapp/errors/E16001) for invalid Base64 input.

---

## Hexadecimal

### `hex_encode()`
`(data string) -> string`

Encodes a string to lowercase hexadecimal.

```ez
import @encoding

do main() {
    mut encoded string = encoding.hex_encode("Hello")
    println(encoded)  // "48656c6c6f"
}
```

**Parameters:** `data` - The string to encode.

**Returns:** `string` - The hex-encoded string (lowercase).

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string.

---

### `hex_decode()`
`(data string) -> (string, Error)`

Decodes a hexadecimal string.

```ez
import @encoding

do main() {
    mut decoded string, err Error = encoding.hex_decode("48656c6c6f")
    if err == nil {
        println(decoded)  // "Hello"
    } otherwise {
        println("Error:", err.message)
    }
}
```

**Parameters:** `data` - The hex-encoded string to decode (case-insensitive).

**Returns:**
- `string` - The decoded string (empty on error).
- `Error` - `nil` on success, or an Error struct with `message` and `code` fields.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string, [E16002](/EZ-Language-Webapp/errors/E16002) for invalid hex input.

---

## URL Encoding

### `url_encode()`
`(data string) -> string`

URL percent-encodes a string for use in query parameters.

```ez
import @encoding

do main() {
    mut encoded string = encoding.url_encode("hello world?foo=bar")
    println(encoded)  // "hello+world%3Ffoo%3Dbar"
}
```

**Parameters:** `data` - The string to encode.

**Returns:** `string` - The URL-encoded string.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string.

---

### `url_decode()`
`(data string) -> (string, Error)`

Decodes a URL percent-encoded string.

```ez
import @encoding

do main() {
    mut decoded string, err Error = encoding.url_decode("hello+world%3Ffoo%3Dbar")
    if err == nil {
        println(decoded)  // "hello world?foo=bar"
    } otherwise {
        println("Error:", err.message)
    }
}
```

**Parameters:** `data` - The URL-encoded string to decode.

**Returns:**
- `string` - The decoded string (empty on error).
- `Error` - `nil` on success, or an Error struct with `message` and `code` fields.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string, [E16003](/EZ-Language-Webapp/errors/E16003) for invalid URL encoding.

---

## Example Program

```ez
import @encoding

do main() {
    println("=== Encoding Demo ===")

    mut original string = "Hello, World!"

    // Base64
    println("\n-- Base64 --")
    mut b64 string = encoding.base64_encode(original)
    println("Encoded:", b64)

    mut b64_decoded string, b64_err Error = encoding.base64_decode(b64)
    if b64_err == nil {
        println("Decoded:", b64_decoded)
    }

    // Hex
    println("\n-- Hexadecimal --")
    mut hex string = encoding.hex_encode(original)
    println("Encoded:", hex)

    mut hex_decoded string, hex_err Error = encoding.hex_decode(hex)
    if hex_err == nil {
        println("Decoded:", hex_decoded)
    }

    // URL
    println("\n-- URL Encoding --")
    mut query string = "name=John Doe&city=New York"
    mut url_enc string = encoding.url_encode(query)
    println("Encoded:", url_enc)

    mut url_decoded string, url_err Error = encoding.url_decode(url_enc)
    if url_err == nil {
        println("Decoded:", url_decoded)
    }
}
```
