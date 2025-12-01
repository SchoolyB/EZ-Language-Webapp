---
layout: '../../../layouts/DocsLayout.astro'
title: '@math'
description: 'Mathematical functions and constants.'
---

# @math

The `@math` module provides mathematical functions, constants, and random number generation.

## Import

```ez
import @math
```

## Constants

```ez
math.PI      // 3.141592653589793
math.E       // 2.718281828459045
math.TAU     // 6.283185307179586
```

## Basic Math Functions

### abs

Returns the absolute value of a number.

```ez
math.abs(-5)    // 5
math.abs(5)     // 5
math.abs(-3.14) // 3.14
```

**Parameters:** `n` - A number (int or float).

**Returns:** The absolute value.

### min / max

Returns the minimum or maximum of two or more numbers.

```ez
math.min(3, 7)        // 3
math.max(3, 7)        // 7
math.min(1, 5, 3, 2)  // 1
math.max(1, 5, 3, 2)  // 5
```

**Parameters:** Two or more numbers.

**Returns:** The smallest or largest value.

### avg

Returns the average of one or more numbers.

```ez
math.avg(2, 4, 6)  // 4.0
math.avg(10, 20)   // 15.0
```

**Parameters:** One or more numbers.

**Returns:** `float` - The arithmetic mean.

**Errors:** [E8012](/errors/E8012) if called with no arguments.

### floor / ceil / round

Rounding functions.

```ez
math.floor(3.7)  // 3
math.ceil(3.2)   // 4
math.round(3.5)  // 4
math.round(3.4)  // 3
```

**Parameters:** `n` - A float.

**Returns:** `int` - The rounded value.

## Power and Roots

### pow

Returns base raised to the power of exponent.

```ez
math.pow(2, 8)    // 256
math.pow(10, 3)   // 1000
math.pow(2.5, 2)  // 6.25
```

**Parameters:** `base`, `exponent` - Numbers.

**Returns:** The result of base^exponent.

### sqrt

Returns the square root of a number.

```ez
math.sqrt(16)   // 4.0
math.sqrt(2)    // 1.4142135623730951
```

**Parameters:** `n` - A non-negative number.

**Returns:** `float` - The square root.

**Errors:** [E8001](/errors/E8001) if the argument is negative.

## Logarithms

### log

Returns the natural logarithm (base e) of a number.

```ez
math.log(math.E)   // 1.0
math.log(10)       // 2.302585...
```

**Parameters:** `n` - A positive number.

**Returns:** `float` - The natural logarithm.

**Errors:** [E8002](/errors/E8002) if the argument is not positive.

### log2

Returns the base-2 logarithm of a number.

```ez
math.log2(8)   // 3.0
math.log2(16)  // 4.0
```

**Parameters:** `n` - A positive number.

**Returns:** `float` - The base-2 logarithm.

**Errors:** [E8003](/errors/E8003) if the argument is not positive.

### log10

Returns the base-10 logarithm of a number.

```ez
math.log10(100)   // 2.0
math.log10(1000)  // 3.0
```

**Parameters:** `n` - A positive number.

**Returns:** `float` - The base-10 logarithm.

**Errors:** [E8004](/errors/E8004) if the argument is not positive.

## Trigonometry

### sin / cos / tan

Trigonometric functions (arguments in radians).

```ez
math.sin(0)            // 0.0
math.cos(0)            // 1.0
math.sin(math.PI / 2)  // 1.0
```

**Parameters:** `angle` - Angle in radians.

**Returns:** `float` - The trigonometric value.

### asin / acos / atan

Inverse trigonometric functions (return radians).

```ez
math.asin(1)   // 1.5707963... (PI/2)
math.acos(0)   // 1.5707963... (PI/2)
math.atan(1)   // 0.7853981... (PI/4)
```

**Parameters:** `value` - A number (asin/acos require [-1, 1]).

**Returns:** `float` - Angle in radians.

**Errors:** [E8005](/errors/E8005) asin if value outside [-1, 1], [E8006](/errors/E8006) acos if value outside [-1, 1].

## Other Functions

### factorial

Returns the factorial of a non-negative integer.

```ez
math.factorial(5)   // 120
math.factorial(0)   // 1
math.factorial(10)  // 3628800
```

**Parameters:** `n` - A non-negative integer (0-20).

**Returns:** `int` - n!

**Errors:** [E8007](/errors/E8007) for negative numbers, [E8008](/errors/E8008) for values > 20.

## Random Numbers

### random

Returns a random integer.

```ez
// Random int from 0 to max-1
math.random(100)      // 0-99

// Random int from min to max-1
math.random(10, 20)   // 10-19
```

**Parameters:** `max` or `min, max` - Integer bounds.

**Returns:** `int` - A random integer.

**Errors:** [E8009](/errors/E8009) if max is not positive, [E8010](/errors/E8010) if max <= min.

### random_float

Returns a random floating-point number.

```ez
// Random float from 0.0 to 1.0
math.random_float()

// Random float from min to max
math.random_float(0.0, 100.0)
```

**Parameters:** None or `min, max` - Float bounds.

**Returns:** `float` - A random float.

## Example Program

```ez
import @std
import @math

do main() {
    // Calculate hypotenuse
    temp a float = 3.0
    temp b float = 4.0
    temp c float = math.sqrt(math.pow(a, 2) + math.pow(b, 2))
    std.println("Hypotenuse:", c)  // 5.0

    // Circle calculations
    temp radius float = 5.0
    temp area float = math.PI * math.pow(radius, 2)
    temp circumference float = 2 * math.PI * radius
    std.println("Area:", area)
    std.println("Circumference:", circumference)

    // Random dice roll
    temp roll int = math.random(1, 7)  // 1-6
    std.println("You rolled:", roll)
}
```
