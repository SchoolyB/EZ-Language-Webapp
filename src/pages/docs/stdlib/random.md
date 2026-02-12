---
layout: '../../../layouts/DocsLayout.astro'
title: '@random'
description: 'Random number generation and randomization utilities.'
---

# @random

The `@random` module provides functions for generating random numbers, selecting random elements, and shuffling collections.

## Import

```ez
import @random
```

## Random Numbers

### `float()`
`() -> float` or `(min float, max float) -> float`

Returns a random floating-point number.

```ez
import @std, @random

do random_float_demo() {
    // Random float from 0.0 to 1.0 (exclusive)
    temp f float = random.float()
    std.println(f)  // e.g., 0.7234...

    // Random float in range [min, max)
    temp f2 float = random.float(5.0, 10.0)
    std.println(f2)  // e.g., 7.123...
}
```

**Parameters:**
- None: Returns float in range [0.0, 1.0)
- `min`, `max`: Returns float in range [min, max)

**Returns:** `float` - A random floating-point number.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E8006](/EZ-Language-Webapp/errors/E8006) if max <= min.

---

### `int()`
`(max int) -> int` or `(min int, max int) -> int`

Returns a random integer.

```ez
import @std, @random

do random_int_demo() {
    // Random int from 0 to max-1
    temp i int = random.int(100)
    std.println(i)  // 0-99

    // Random int in range [min, max)
    temp i2 int = random.int(10, 20)
    std.println(i2)  // 10-19
}
```

**Parameters:**
- `max`: Returns int in range [0, max)
- `min`, `max`: Returns int in range [min, max)

**Returns:** `int` - A random integer.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E8006](/EZ-Language-Webapp/errors/E8006) if max <= 0 or max <= min.

---

### `bool()`
`() -> bool`

Returns a random boolean with 50/50 probability.

```ez
import @std, @random

do coin_flip() {
    if random.bool() {
        std.println("Heads!")
    } otherwise {
        std.println("Tails!")
    }
}
```

**Returns:** `bool` - Either `true` or `false`.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) if called with arguments.

---

### `byte()`
`() -> byte`

Returns a random byte value (0-255).

```ez
import @std, @random

do random_byte_demo() {
    temp b byte = random.byte()
    std.println(b)  // 0-255
}
```

**Returns:** `byte` - A random byte value.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) if called with arguments.

---

### `char()`
`() -> char` or `(min char, max char) -> char`

Returns a random character.

```ez
import @std, @random

do random_char_demo() {
    // Random printable ASCII character (space to ~)
    temp c char = random.char()
    std.println(c)

    // Random lowercase letter
    temp letter char = random.char('a', 'z')
    std.println(letter)  // a-z
}
```

**Parameters:**
- None: Returns random printable ASCII character (codes 32-126)
- `min`, `max`: Returns character in given range (inclusive)

**Returns:** `char` - A random character.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7003](/EZ-Language-Webapp/errors/E7003) for non-char/int arguments, [E8006](/EZ-Language-Webapp/errors/E8006) if max <= min.

---

## Collection Functions

### `choice()`
`(arr [type]) -> type`

Returns a random element from an array.

```ez
import @std, @random

do pick_random() {
    temp colors [string] = {"red", "green", "blue", "yellow"}
    temp picked string = random.choice(colors)
    std.println("You got:", picked)

    temp numbers [int] = {10, 20, 30, 40, 50}
    temp num int = random.choice(numbers)
    std.println("Random number:", num)
}
```

**Parameters:** `arr` - An array of any type.

**Returns:** A random element from the array.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7002](/EZ-Language-Webapp/errors/E7002) if argument is not an array, [E10002](/EZ-Language-Webapp/errors/E10002) if array is empty.

---

### `shuffle()`
`(arr [type]) -> [type]`

Returns a new array with elements in random order. The original array is not modified.

```ez
import @std, @random

do shuffle_demo() {
    temp cards [int] = {1, 2, 3, 4, 5}
    temp shuffled [int] = random.shuffle(cards)

    std.println("Original:", cards)    // {1, 2, 3, 4, 5}
    std.println("Shuffled:", shuffled) // e.g., {3, 1, 5, 2, 4}
}
```

**Parameters:** `arr` - An array of any type.

**Returns:** A new array with elements randomly reordered. Does **not** modify the original.

> **Note:** [`arrays.shuffle()`](/EZ-Language-Webapp/docs/stdlib/arrays) shuffles in place instead of returning a new array.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7002](/EZ-Language-Webapp/errors/E7002) if argument is not an array.

---

### `sample()`
`(arr [type], n int) -> [type]`

Returns a new array containing n unique random elements from the source array.

```ez
import @std, @random

do sample_demo() {
    temp pool [int] = {10, 20, 30, 40, 50}

    // Pick 3 unique random elements
    temp picked [int] = random.sample(pool, 3)
    std.println(picked)  // e.g., {30, 10, 50}

    // Pick 0 returns empty array
    temp empty [int] = random.sample(pool, 0)
    std.println(empty)  // {}
}
```

**Parameters:**
- `arr` - Source array
- `n` - Number of elements to sample

**Returns:** A new array with n unique random elements.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) for wrong argument count, [E7002](/EZ-Language-Webapp/errors/E7002) if first argument is not an array, [E7004](/EZ-Language-Webapp/errors/E7004) if second argument is not an integer, [E10001](/EZ-Language-Webapp/errors/E10001) if n is negative, [E10002](/EZ-Language-Webapp/errors/E10002) if n exceeds array length.

---

## Example Program

```ez
import @std
import @random

do main() {
    // Simulate rolling dice
    std.println("=== Dice Game ===")
    temp die1 int = random.int(1, 7)  // 1-6
    temp die2 int = random.int(1, 7)  // 1-6
    std.println("You rolled: ${die1} + ${die2} = ${die1 + die2}")

    // Random password generator
    std.println("\n=== Password Generator ===")
    temp chars [string] = {"a", "b", "c", "d", "e", "1", "2", "3", "!", "@", "#"}
    temp password string = ""
    for i in range(0, 8) {
        password = password + random.choice(chars)
    }
    std.println("Generated password:", password)

    // Shuffle a deck (represented as numbers 1-10)
    std.println("\n=== Card Shuffle ===")
    temp deck [int] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    temp shuffled [int] = random.shuffle(deck)
    std.println("Shuffled deck:", shuffled)

    // Draw 3 cards
    temp hand [int] = random.sample(deck, 3)
    std.println("Your hand:", hand)

    // Coin flip simulation
    std.println("\n=== Coin Flips ===")
    temp heads int = 0
    for i in range(0, 10) {
        if random.bool() {
            heads++
        }
    }
    std.println("Heads: ${heads}/10")
}
```
