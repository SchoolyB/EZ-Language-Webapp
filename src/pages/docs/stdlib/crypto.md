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
import @crypto

do main() {
    mut hash string = crypto.sha256("Hello, World!")
    println(hash)  // "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"
}
```

**Parameters:** `data` - The string to hash.

**Returns:** `string` - The SHA-256 hash as a 64-character lowercase hex string.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string.

---

### `sha512()`
`(data string) -> string`

Computes the SHA-512 hash of a string.

```ez
import @crypto

do main() {
    mut hash string = crypto.sha512("Hello, World!")
    println(hash)  // 128-character hex string
}
```

**Parameters:** `data` - The string to hash.

**Returns:** `string` - The SHA-512 hash as a 128-character lowercase hex string.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string.

---

### `md5()`
`(data string) -> string`

Computes the MD5 hash of a string.

> **Note:** MD5 is cryptographically broken and should not be used for security purposes. Use it only for checksums or legacy compatibility.

```ez
import @crypto

do main() {
    mut hash string = crypto.md5("Hello, World!")
    println(hash)  // "65a8e27d8879283831b664bd8b7f0ad4"
}
```

**Parameters:** `data` - The string to hash.

**Returns:** `string` - The MD5 hash as a 32-character lowercase hex string.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) if argument is not a string.

---

## Secure Random

### `random_bytes()`
`(length int) -> [byte]`

Generates cryptographically secure random bytes.

```ez
import @crypto

do main() {
    mut bytes [byte] = crypto.random_bytes(16)
    println(bytes)  // e.g., {142, 55, 201, 78, ...}
}
```

**Parameters:** `length` - The number of random bytes to generate.

**Returns:** `[byte]` - An array of random bytes.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7004](/EZ-Language-Webapp/errors/E7004) if argument is not an integer, [E7011](/EZ-Language-Webapp/errors/E7011) if length is negative, [E15001](/EZ-Language-Webapp/errors/E15001) if random generation fails.

---

### `random_hex()`
`(length int) -> string`

Generates a cryptographically secure random hex string.

```ez
import @crypto

do main() {
    mut token string = crypto.random_hex(16)
    println(token)  // e.g., "a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5"
}
```

**Parameters:** `length` - The number of random bytes (output will be 2× this length in hex characters).

**Returns:** `string` - A random hex string of length `2 * length`.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7004](/EZ-Language-Webapp/errors/E7004) if argument is not an integer, [E7011](/EZ-Language-Webapp/errors/E7011) if length is negative, [E15001](/EZ-Language-Webapp/errors/E15001) if random generation fails.

---
