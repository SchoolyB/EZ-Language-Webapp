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

### `rand_float()`
`() -> float` or `(min float, max float) -> float`

Returns a random floating-point number.

```ez
import @random

do main() {
    // Random float from 0.0 to 1.0 (exclusive)
    mut f = random.rand_float()
    println(f)  // e.g., 0.7234...

    // Random float in range [min, max)
    mut f2 = random.rand_float(5.0, 10.0)
    println(f2)  // e.g., 7.123...
}
```

**Parameters:**
- None: Returns float in range [0.0, 1.0)
- `min`, `max`: Returns float in range [min, max)

**Returns:** `float` - A random floating-point number.

---

### `rand_int()`
`(max int) -> int` or `(min int, max int) -> int`

Returns a random integer.

```ez
import @random

do main() {
    // Random int from 0 to max-1
    mut i = random.rand_int(100)
    println(i)  // 0-99

    // Random int in range [min, max)
    mut i2 = random.rand_int(10, 20)
    println(i2)  // 10-19
}
```

**Parameters:**
- `max`: Returns int in range [0, max)
- `min`, `max`: Returns int in range [min, max)

**Returns:** `int` - A random integer.

---

### `rand_bool()`
`() -> bool`

Returns a random boolean with 50/50 probability.

```ez
import @random

do main() {
    if random.rand_bool() {
        println("Heads!")
    } otherwise {
        println("Tails!")
    }
}
```

**Returns:** `bool` - Either `true` or `false`.

---

### `rand_byte()`
`() -> byte`

Returns a random byte value (0-255).

```ez
import @random

do main() {
    mut b = random.rand_byte()
    println(b)  // 0-255
}
```

**Returns:** `byte` - A random byte value.

---

### `rand_char()`
`() -> char` or `(min char, max char) -> char`

Returns a random character.

```ez
import @random

do main() {
    // Random printable ASCII character
    mut c = random.rand_char()
    println(c)

    // Random lowercase letter
    mut letter = random.rand_char('a', 'z')
    println(letter)  // a-z
}
```

**Parameters:**
- None: Returns random printable ASCII character
- `min`, `max`: Returns character in given range (inclusive)

**Returns:** `char` - A random character.

---

### `random_hex()`
`(length int) -> string`

Generates a cryptographically secure random hex string.

```ez
import @random

do main() {
    mut hex = random.random_hex(16)
    println(hex)  // e.g., "a3f2b1c04e9d7801"
}
```

**Parameters:** `length` - Number of hex characters to generate.

**Returns:** `string` - A random hexadecimal string.

---

## Collection Functions

### `choice()`
`(arr [T]) -> T`

Returns a random element from an array.

```ez
import @random

do main() {
    mut colors [string] = {"red", "green", "blue", "yellow"}
    mut picked = random.choice(colors)
    println("You got:", picked)
}
```

**Parameters:** `arr` - An array of any type.

**Returns:** A random element from the array. Panics if the array is empty.

---

### `shuffle()`
`(arr [T]) -> [T]`

Returns a new array with elements in random order. The original array is not modified.

```ez
import @random

do main() {
    mut cards [int] = {1, 2, 3, 4, 5}
    mut shuffled = random.shuffle(cards)

    println("Original:", cards)    // {1, 2, 3, 4, 5}
    println("Shuffled:", shuffled) // e.g., {3, 1, 5, 2, 4}
}
```

**Parameters:** `arr` - An array of any type.

**Returns:** A new array with elements randomly reordered.

---

### `sample()`
`(arr [T], n int) -> [T]`

Returns a new array containing n unique random elements from the source array.

```ez
import @random

do main() {
    mut pool [int] = {10, 20, 30, 40, 50}

    // Pick 3 unique random elements
    mut picked = random.sample(pool, 3)
    println(picked)  // e.g., {30, 10, 50}
}
```

**Parameters:**
- `arr` - Source array
- `n` - Number of elements to sample

**Returns:** A new array with n unique random elements. Panics if n exceeds array length.

---

## Example Program

```ez
import @random

do main() {
    // Simulate rolling dice
    println("=== Dice Game ===")
    mut die1 = random.rand_int(1, 7)  // 1-6
    mut die2 = random.rand_int(1, 7)  // 1-6
    println("You rolled: ${die1} + ${die2} = ${die1 + die2}")

    // Random password generator
    println("\n=== Password Generator ===")
    mut chars [string] = {"a", "b", "c", "d", "e", "1", "2", "3", "!", "@", "#"}
    mut password string = ""
    for i in range(0, 8) {
        password = password + random.choice(chars)
    }
    println("Generated password:", password)

    // Shuffle a deck (represented as numbers 1-10)
    println("\n=== Card Shuffle ===")
    mut deck [int] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    mut shuffled = random.shuffle(deck)
    println("Shuffled deck:", shuffled)

    // Draw 3 cards
    mut hand = random.sample(deck, 3)
    println("Your hand:", hand)

    // Coin flip simulation
    println("\n=== Coin Flips ===")
    mut heads = 0
    for i in range(0, 10) {
        if random.rand_bool() {
            heads++
        }
    }
    println("Heads: ${heads}/10")
}
```
