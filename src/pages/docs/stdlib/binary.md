---
layout: '../../../layouts/DocsLayout.astro'
title: '@binary'
description: 'Binary encoding and decoding of numeric types with endianness control.'
---

# @binary

The `@binary` module provides functions for encoding and decoding numeric types to and from byte arrays, with support for both little-endian and big-endian byte ordering.

## Import

```ez
import @binary
```

## Return Pattern

All functions return a tuple `(result, error)`:
- On success: `(value, nil)`
- On failure: `(nil, Error{message, code})`

```ez
mut data, err = binary.encode_u32_to_little_endian(42)
if err != nil {
    panic(err.message)
}
```

---

## 8-bit Encoding

8-bit values have no endianness, so these functions work without endian suffixes.

### `encode_i8()`
`(i8) -> ([byte], Error)`

Encodes a signed 8-bit integer to a single byte.

```ez
import @binary

do encode_signed_byte() {
    mut data, err = binary.encode_i8(-128)
    // data is a 1-byte array
}
```

---

### `decode_i8()`
`([byte]) -> (i8, Error)`

Decodes a single byte to a signed 8-bit integer.

```ez
import @binary

do decode_signed_byte() {
    mut value, err = binary.decode_i8(data)
    // value is an i8
}
```

---

### `encode_u8()`
`(u8) -> ([byte], Error)`

Encodes an unsigned 8-bit integer to a single byte.

```ez
import @binary

do encode_unsigned_byte() {
    mut data, err = binary.encode_u8(255)
    // data is a 1-byte array
}
```

---

### `decode_u8()`
`([byte]) -> (u8, Error)`

Decodes a single byte to an unsigned 8-bit integer.

```ez
import @binary

do decode_unsigned_byte() {
    mut value, err = binary.decode_u8(data)
    // value is a u8
}
```

---

## 16-bit Encoding

### Little Endian

### `encode_i16_to_little_endian()`
`(i16) -> ([byte], Error)`

Encodes a signed 16-bit integer to 2 bytes in little-endian order.

```ez
import @binary

do encode_i16_le() {
    mut data, err = binary.encode_i16_to_little_endian(1000)
    // data is [0xE8, 0x03] (least significant byte first)
}
```

---

### `decode_i16_from_little_endian()`
`([byte]) -> (i16, Error)`

Decodes 2 bytes in little-endian order to a signed 16-bit integer.

---

### `encode_u16_to_little_endian()`
`(u16) -> ([byte], Error)`

Encodes an unsigned 16-bit integer to 2 bytes in little-endian order.

---

### `decode_u16_from_little_endian()`
`([byte]) -> (u16, Error)`

Decodes 2 bytes in little-endian order to an unsigned 16-bit integer.

---

### Big Endian

### `encode_i16_to_big_endian()`
`(i16) -> ([byte], Error)`

Encodes a signed 16-bit integer to 2 bytes in big-endian order.

```ez
import @binary

do encode_i16_be() {
    mut data, err = binary.encode_i16_to_big_endian(1000)
    // data is [0x03, 0xE8] (most significant byte first)
}
```

---

### `decode_i16_from_big_endian()`
`([byte]) -> (i16, Error)`

Decodes 2 bytes in big-endian order to a signed 16-bit integer.

---

### `encode_u16_to_big_endian()`
`(u16) -> ([byte], Error)`

Encodes an unsigned 16-bit integer to 2 bytes in big-endian order.

---

### `decode_u16_from_big_endian()`
`([byte]) -> (u16, Error)`

Decodes 2 bytes in big-endian order to an unsigned 16-bit integer.

---

## 32-bit Encoding

### Little Endian

### `encode_i32_to_little_endian()`
`(i32) -> ([byte], Error)`

Encodes a signed 32-bit integer to 4 bytes in little-endian order.

---

### `decode_i32_from_little_endian()`
`([byte]) -> (i32, Error)`

Decodes 4 bytes in little-endian order to a signed 32-bit integer.

---

### `encode_u32_to_little_endian()`
`(u32) -> ([byte], Error)`

Encodes an unsigned 32-bit integer to 4 bytes in little-endian order.

```ez
import @binary

do encode_u32_le() {
    mut data, err = binary.encode_u32_to_little_endian(305419896)
    // data is [0x78, 0x56, 0x34, 0x12]
}
```

---

### `decode_u32_from_little_endian()`
`([byte]) -> (u32, Error)`

Decodes 4 bytes in little-endian order to an unsigned 32-bit integer.

---

### Big Endian

### `encode_i32_to_big_endian()`
`(i32) -> ([byte], Error)`

Encodes a signed 32-bit integer to 4 bytes in big-endian order.

---

### `decode_i32_from_big_endian()`
`([byte]) -> (i32, Error)`

Decodes 4 bytes in big-endian order to a signed 32-bit integer.

---

### `encode_u32_to_big_endian()`
`(u32) -> ([byte], Error)`

Encodes an unsigned 32-bit integer to 4 bytes in big-endian order.

---

### `decode_u32_from_big_endian()`
`([byte]) -> (u32, Error)`

Decodes 4 bytes in big-endian order to an unsigned 32-bit integer.

---

## 64-bit Encoding

### Little Endian

### `encode_i64_to_little_endian()`
`(i64) -> ([byte], Error)`

Encodes a signed 64-bit integer to 8 bytes in little-endian order.

---

### `decode_i64_from_little_endian()`
`([byte]) -> (i64, Error)`

Decodes 8 bytes in little-endian order to a signed 64-bit integer.

---

### `encode_u64_to_little_endian()`
`(u64) -> ([byte], Error)`

Encodes an unsigned 64-bit integer to 8 bytes in little-endian order.

---

### `decode_u64_from_little_endian()`
`([byte]) -> (u64, Error)`

Decodes 8 bytes in little-endian order to an unsigned 64-bit integer.

---

### Big Endian

### `encode_i64_to_big_endian()`
`(i64) -> ([byte], Error)`

Encodes a signed 64-bit integer to 8 bytes in big-endian order.

---

### `decode_i64_from_big_endian()`
`([byte]) -> (i64, Error)`

Decodes 8 bytes in big-endian order to a signed 64-bit integer.

---

### `encode_u64_to_big_endian()`
`(u64) -> ([byte], Error)`

Encodes an unsigned 64-bit integer to 8 bytes in big-endian order.

---

### `decode_u64_from_big_endian()`
`([byte]) -> (u64, Error)`

Decodes 8 bytes in big-endian order to an unsigned 64-bit integer.

---

## 128-bit Encoding

### Little Endian

### `encode_i128_to_little_endian()`
`(i128) -> ([byte], Error)`

Encodes a signed 128-bit integer to 16 bytes in little-endian order.

---

### `decode_i128_from_little_endian()`
`([byte]) -> (i128, Error)`

Decodes 16 bytes in little-endian order to a signed 128-bit integer.

---

### `encode_u128_to_little_endian()`
`(u128) -> ([byte], Error)`

Encodes an unsigned 128-bit integer to 16 bytes in little-endian order.

---

### `decode_u128_from_little_endian()`
`([byte]) -> (u128, Error)`

Decodes 16 bytes in little-endian order to an unsigned 128-bit integer.

---

### Big Endian

### `encode_i128_to_big_endian()`
`(i128) -> ([byte], Error)`

Encodes a signed 128-bit integer to 16 bytes in big-endian order.

---

### `decode_i128_from_big_endian()`
`([byte]) -> (i128, Error)`

Decodes 16 bytes in big-endian order to a signed 128-bit integer.

---

### `encode_u128_to_big_endian()`
`(u128) -> ([byte], Error)`

Encodes an unsigned 128-bit integer to 16 bytes in big-endian order.

---

### `decode_u128_from_big_endian()`
`([byte]) -> (u128, Error)`

Decodes 16 bytes in big-endian order to an unsigned 128-bit integer.

---

## 256-bit Encoding

### Little Endian

### `encode_i256_to_little_endian()`
`(i256) -> ([byte], Error)`

Encodes a signed 256-bit integer to 32 bytes in little-endian order.

---

### `decode_i256_from_little_endian()`
`([byte]) -> (i256, Error)`

Decodes 32 bytes in little-endian order to a signed 256-bit integer.

---

### `encode_u256_to_little_endian()`
`(u256) -> ([byte], Error)`

Encodes an unsigned 256-bit integer to 32 bytes in little-endian order.

---

### `decode_u256_from_little_endian()`
`([byte]) -> (u256, Error)`

Decodes 32 bytes in little-endian order to an unsigned 256-bit integer.

---

### Big Endian

### `encode_i256_to_big_endian()`
`(i256) -> ([byte], Error)`

Encodes a signed 256-bit integer to 32 bytes in big-endian order.

---

### `decode_i256_from_big_endian()`
`([byte]) -> (i256, Error)`

Decodes 32 bytes in big-endian order to a signed 256-bit integer.

---

### `encode_u256_to_big_endian()`
`(u256) -> ([byte], Error)`

Encodes an unsigned 256-bit integer to 32 bytes in big-endian order.

---

### `decode_u256_from_big_endian()`
`([byte]) -> (u256, Error)`

Decodes 32 bytes in big-endian order to an unsigned 256-bit integer.

---

## Float Encoding

### Little Endian

### `encode_f32_to_little_endian()`
`(f32) -> ([byte], Error)`

Encodes a 32-bit float to 4 bytes in little-endian order (IEEE 754).

```ez
import @binary

do encode_float32() {
    mut data, err = binary.encode_f32_to_little_endian(3.14)
    // data is 4 bytes representing the float
}
```

---

### `decode_f32_from_little_endian()`
`([byte]) -> (float, Error)`

Decodes 4 bytes in little-endian order to a 32-bit float.

---

### `encode_f64_to_little_endian()`
`(f64) -> ([byte], Error)`

Encodes a 64-bit float to 8 bytes in little-endian order (IEEE 754).

---

### `decode_f64_from_little_endian()`
`([byte]) -> (float, Error)`

Decodes 8 bytes in little-endian order to a 64-bit float.

---

### Big Endian

### `encode_f32_to_big_endian()`
`(f32) -> ([byte], Error)`

Encodes a 32-bit float to 4 bytes in big-endian order (IEEE 754).

---

### `decode_f32_from_big_endian()`
`([byte]) -> (float, Error)`

Decodes 4 bytes in big-endian order to a 32-bit float.

---

### `encode_f64_to_big_endian()`
`(f64) -> ([byte], Error)`

Encodes a 64-bit float to 8 bytes in big-endian order (IEEE 754).

---

### `decode_f64_from_big_endian()`
`([byte]) -> (float, Error)`

Decodes 8 bytes in big-endian order to a 64-bit float.

---

## Example Program

```ez
import @binary

do serialize_u64(v u64) -> [u8] {
    mut data, err = binary.encode_u64_to_little_endian(v)
    if err != nil {
        panic(err.message)
    }
    return cast(data, [u8])
}

do deserialize_u64(bytes [byte]) -> u64 {
    mut value, err = binary.decode_u64_from_little_endian(bytes)
    if err != nil {
        panic(err.message)
    }
    return value
}

do main() {
    // Encode a u64 value
    mut original u64 = 12345678901234
    mut serialized = serialize_u64(original)
    println("Serialized bytes:", serialized)

    // Decode it back
    mut decoded = deserialize_u64(cast(serialized, [byte]))
    println("Decoded value:", decoded)

    // Verify round-trip
    if original == decoded {
        println("Round-trip successful!")
    }
}
```
