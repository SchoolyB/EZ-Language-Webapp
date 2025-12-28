---
layout: '../../../layouts/DocsLayout.astro'
title: '@crypto'
description: 'Cryptographic hashing and secure random generation.'
---

# @crypto

The `@crypto` module provides cryptographic hashing functions and secure random number generation using cryptographically secure random sources.

## Import

```ez
import @crypto
```

## Hash Functions

### `sha256()`
`(data string) -> string`

Computes the SHA-256 hash of a string.

```ez
import @std, @crypto

do main() {
    temp hash string = crypto.sha256("Hello, World!")
    std.println(hash)  // "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"
}
```

**Parameters:** `data` - The string to hash.

**Returns:** `string` - The SHA-256 hash as a 64-character lowercase hex string.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if argument is not a string.

---

### `sha512()`
`(data string) -> string`

Computes the SHA-512 hash of a string.

```ez
import @std, @crypto

do main() {
    temp hash string = crypto.sha512("Hello, World!")
    std.println(hash)  // 128-character hex string
}
```

**Parameters:** `data` - The string to hash.

**Returns:** `string` - The SHA-512 hash as a 128-character lowercase hex string.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if argument is not a string.

---

### `md5()`
`(data string) -> string`

Computes the MD5 hash of a string.

> **Note:** MD5 is cryptographically broken and should not be used for security purposes. Use it only for checksums or legacy compatibility.

```ez
import @std, @crypto

do main() {
    temp hash string = crypto.md5("Hello, World!")
    std.println(hash)  // "65a8e27d8879283831b664bd8b7f0ad4"
}
```

**Parameters:** `data` - The string to hash.

**Returns:** `string` - The MD5 hash as a 32-character lowercase hex string.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7003](/language.ez/errors/E7003) if argument is not a string.

---

## Secure Random

### `random_bytes()`
`(length int) -> [byte]`

Generates cryptographically secure random bytes.

```ez
import @std, @crypto

do main() {
    temp bytes [byte] = crypto.random_bytes(16)
    std.println(bytes)  // e.g., {142, 55, 201, 78, ...}
}
```

**Parameters:** `length` - The number of random bytes to generate.

**Returns:** `[byte]` - An array of random bytes.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7004](/language.ez/errors/E7004) if argument is not an integer, [E7011](/language.ez/errors/E7011) if length is negative, [E15001](/language.ez/errors/E15001) if random generation fails.

---

### `random_hex()`
`(length int) -> string`

Generates a cryptographically secure random hex string.

```ez
import @std, @crypto

do main() {
    temp token string = crypto.random_hex(16)
    std.println(token)  // e.g., "a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5"
}
```

**Parameters:** `length` - The number of random bytes (output will be 2× this length in hex characters).

**Returns:** `string` - A random hex string of length `2 * length`.

**Errors:** [E7001](/language.ez/errors/E7001) for wrong argument count, [E7004](/language.ez/errors/E7004) if argument is not an integer, [E7011](/language.ez/errors/E7011) if length is negative, [E15001](/language.ez/errors/E15001) if random generation fails.

---

## Example Program

```ez
import @std
import @crypto

do main() {
    std.println("=== Crypto Demo ===")

    temp data string = "Hello, World!"

    // Hashing
    std.println("\n-- Hashing --")
    std.println("Data:", data)
    std.println("MD5:   ", crypto.md5(data))
    std.println("SHA256:", crypto.sha256(data))
    std.println("SHA512:", crypto.sha512(data))

    // Secure random
    std.println("\n-- Secure Random --")

    // Generate random bytes
    temp bytes [byte] = crypto.random_bytes(8)
    std.println("Random bytes:", bytes)

    // Generate random tokens
    std.println("Random token (16 bytes):", crypto.random_hex(16))
    std.println("Random token (32 bytes):", crypto.random_hex(32))

    // Practical example: generate a session token
    std.println("\n-- Session Token --")
    temp session_id string = crypto.random_hex(32)
    std.println("Session ID:", session_id)
}
```

## Security Notes

- **SHA-256** and **SHA-512** are secure for hashing passwords (with proper salting) and verifying data integrity.
- **MD5** should only be used for non-security purposes like checksums.
- **random_bytes()** and **random_hex()** use the operating system's cryptographically secure random number generator.
