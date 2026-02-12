---
layout: '../../../layouts/DocsLayout.astro'
title: '@math'
description: 'Mathematical functions and constants.'
---

# @math

The `@math` module provides mathematical functions and constants. For random number generation, see the [@random](/EZ-Language-Webapp/docs/stdlib/random) module.

## Import

```ez
import @math
```

## Constants

```ez
import @std, @math

do show_constants() {
    std.println(math.PI)       // 3.141592653589793
    std.println(math.E)        // 2.718281828459045
    std.println(math.PHI)      // 1.618033988749895
    std.println(math.SQRT2)    // 1.4142135623730951
    std.println(math.LN2)      // 0.6931471805599453
    std.println(math.LN10)     // 2.302585092994046
    std.println(math.TAU)      // 6.283185307179586
    std.println(math.INF)      // +Inf
    std.println(math.NEG_INF)  // -Inf
    std.println(math.EPSILON)  // ~2.22e-16 (smallest difference from 1.0)
    std.println(math.MAX_FLOAT)  // ~1.80e+308 (largest float)
    std.println(math.MIN_FLOAT)  // ~5e-324 (smallest positive float)
}
```

## Basic Math Functions

### `abs()`
`(n number) -> number`

Returns the absolute value of a number.

```ez
import @std, @math

do absolute_value() {
    std.println(math.abs(-5))     // 5
    std.println(math.abs(5))      // 5
    std.println(math.abs(-3.14))  // 3.14
}
```

**Parameters:** `n` - A number (int or float).

**Returns:** The absolute value.

### `min()` / `max()`
`(numbers ...number) -> number`

Returns the minimum or maximum of two or more numbers.

```ez
import @std, @math

do min_max_demo() {
    std.println(math.min(3, 7))        // 3
    std.println(math.max(3, 7))        // 7
    std.println(math.min(1, 5, 3, 2))  // 1
    std.println(math.max(1, 5, 3, 2))  // 5
}
```

**Parameters:** Two or more numbers.

**Returns:** The smallest or largest value.

### `avg()`
`(numbers ...number) -> float`

Returns the average of one or more numbers.

```ez
import @std, @math

do average_demo() {
    std.println(math.avg(2, 4, 6))  // 4.0
    std.println(math.avg(10, 20))   // 15.0
}
```

**Parameters:** One or more numbers.

**Returns:** `float` - The arithmetic mean.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) if called with no arguments.

### `floor()` / `ceil()` / `round()`
`(n float) -> int`

Rounding functions.

```ez
import @std, @math

do rounding_demo() {
    std.println(math.floor(3.7))  // 3
    std.println(math.ceil(3.2))   // 4
    std.println(math.round(3.5))  // 4
    std.println(math.round(3.4))  // 3
}
```

**Parameters:** `n` - A float.

**Returns:** `int` - The rounded value.

## Power and Roots

### `pow()`
`(base number, exponent number) -> number`

Returns base raised to the power of exponent.

```ez
import @std, @math

do power_demo() {
    std.println(math.pow(2, 8))    // 256
    std.println(math.pow(10, 3))   // 1000
    std.println(math.pow(2.5, 2))  // 6.25
}
```

**Parameters:** `base`, `exponent` - Numbers.

**Returns:** The result of base^exponent.

### `sqrt()`
`(n number) -> float`

Returns the square root of a number.

```ez
import @std, @math

do square_root_demo() {
    std.println(math.sqrt(16))  // 4.0
    std.println(math.sqrt(2))   // 1.4142135623730951
}
```

**Parameters:** `n` - A non-negative number.

**Returns:** `float` - The square root.

**Errors:** [E8001](/EZ-Language-Webapp/errors/E8001) if the argument is negative.

## Logarithms

### `log()`
`(n number) -> float`

Returns the natural logarithm (base e) of a number.

```ez
import @std, @math

do natural_log_demo() {
    std.println(math.log(math.E))  // 1.0
    std.println(math.log(10))      // 2.302585...
}
```

**Parameters:** `n` - A positive number.

**Returns:** `float` - The natural logarithm.

**Errors:** [E8002](/EZ-Language-Webapp/errors/E8002) if the argument is not positive.

### `log2()`
`(n number) -> float`

Returns the base-2 logarithm of a number.

```ez
import @std, @math

do log2_demo() {
    std.println(math.log2(8))   // 3.0
    std.println(math.log2(16))  // 4.0
}
```

**Parameters:** `n` - A positive number.

**Returns:** `float` - The base-2 logarithm.

**Errors:** [E8002](/EZ-Language-Webapp/errors/E8002) if the argument is not positive.

### `log10()`
`(n number) -> float`

Returns the base-10 logarithm of a number.

```ez
import @std, @math

do log10_demo() {
    std.println(math.log10(100))   // 2.0
    std.println(math.log10(1000))  // 3.0
}
```

**Parameters:** `n` - A positive number.

**Returns:** `float` - The base-10 logarithm.

**Errors:** [E8002](/EZ-Language-Webapp/errors/E8002) if the argument is not positive.

### `log_base()`
`(value number, base number) -> float`

Returns the logarithm of a value with an arbitrary base.

```ez
import @std, @math

do log_base_demo() {
    std.println(math.log_base(8, 2))     // 3.0 (since 2^3 = 8)
    std.println(math.log_base(1000, 10)) // 3.0 (since 10^3 = 1000)
    std.println(math.log_base(27, 3))    // 3.0 (since 3^3 = 27)
    std.println(math.log_base(1, 7))     // 0.0 (any log of 1 is 0)
    std.println(math.log_base(5, 5))     // 1.0 (log_b(b) = 1)
}
```

**Parameters:**
- `value` - A positive number
- `base` - A positive number != 1

**Returns:** `float` - The logarithm of value with the given base.

**Errors:** [E8002](/EZ-Language-Webapp/errors/E8002) if value is not positive, or if base is not positive or equals 1.

---

## Trigonometry

### `sin()` / `cos()` / `tan()`
`(angle float) -> float`

Trigonometric functions (arguments in radians).

```ez
import @std, @math

do trig_demo() {
    std.println(math.sin(0))            // 0.0
    std.println(math.cos(0))            // 1.0
    std.println(math.sin(math.PI / 2))  // 1.0
}
```

**Parameters:** `angle` - Angle in radians.

**Returns:** `float` - The trigonometric value.

### `asin()` / `acos()` / `atan()`
`(value float) -> float`

Inverse trigonometric functions (return radians).

```ez
import @std, @math

do inverse_trig_demo() {
    std.println(math.asin(1))  // 1.5707963... (PI/2)
    std.println(math.acos(0))  // 1.5707963... (PI/2)
    std.println(math.atan(1))  // 0.7853981... (PI/4)
}
```

**Parameters:** `value` - A number (asin/acos require [-1, 1]).

**Returns:** `float` - Angle in radians.

**Errors:** [E8003](/EZ-Language-Webapp/errors/E8003) if value is outside [-1, 1].

## Other Functions

### `factorial()`
`(n int) -> int`

Returns the factorial of a non-negative integer.

```ez
import @std, @math

do factorial_demo() {
    std.println(math.factorial(5))   // 120
    std.println(math.factorial(0))   // 1
    std.println(math.factorial(10))  // 3628800
}
```

**Parameters:** `n` - A non-negative integer (0-20).

**Returns:** `int` - n!

**Errors:** [E8004](/EZ-Language-Webapp/errors/E8004) for negative numbers, [E8005](/EZ-Language-Webapp/errors/E8005) for values > 20.

---

## Special Value Checks

### `is_nan()`
`(value number) -> bool`

Checks if a number is NaN (not a number).

```ez
std.println(math.is_nan(0.0 / 0.0))  // true
std.println(math.is_nan(42.0))       // false
```

**Parameters:** `value` - A number.

**Returns:** `bool` - `true` if the value is NaN.

---

### `is_finite()`
`(value number) -> bool`

Checks if a number is finite (not infinite and not NaN).

```ez
std.println(math.is_finite(42.0))      // true
std.println(math.is_finite(math.INF))  // false
```

**Parameters:** `value` - A number.

**Returns:** `bool` - `true` if finite.

---

### `is_inf()`
`(value number) -> bool`

Checks if a number is infinite.

```ez
std.println(math.is_inf(math.INF))      // true
std.println(math.is_inf(math.NEG_INF))  // true
std.println(math.is_inf(42.0))          // false
```

**Parameters:** `value` - A number.

**Returns:** `bool` - `true` if infinite.

---

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

    // Trigonometry
    temp angle float = math.PI / 4  // 45 degrees
    std.println("sin(45°):", math.sin(angle))
    std.println("cos(45°):", math.cos(angle))
}
```
