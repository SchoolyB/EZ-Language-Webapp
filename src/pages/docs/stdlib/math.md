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
import @math

do show_constants() {
    println(math.PI)       // 3.141592653589793
    println(math.E)        // 2.718281828459045
    println(math.PHI)      // 1.618033988749895
    println(math.SQRT2)    // 1.4142135623730951
    println(math.LN2)      // 0.6931471805599453
    println(math.LN10)     // 2.302585092994046
    println(math.TAU)      // 6.283185307179586
    println(math.INF)      // +Inf
    println(math.NEG_INF)  // -Inf
    println(math.EPSILON)  // ~2.22e-16 (smallest difference from 1.0)
    println(math.MAX_FLOAT)  // ~1.80e+308 (largest float)
    println(math.MIN_FLOAT)  // ~5e-324 (smallest positive float)
}
```

## Basic Math Functions

### `abs()`
`(n number) -> number`

Returns the absolute value of a number.

```ez
import @math

do absolute_value() {
    println(math.abs(-5))     // 5
    println(math.abs(5))      // 5
    println(math.abs(-3.14))  // 3.14
}
```

**Parameters:** `n` - A number (int or float).

**Returns:** The absolute value.

### `min()` / `max()`
`(numbers ...number) -> number`

Returns the minimum or maximum of two or more numbers.

```ez
import @math

do min_max_demo() {
    println(math.min(3, 7))        // 3
    println(math.max(3, 7))        // 7
    println(math.min(1, 5, 3, 2))  // 1
    println(math.max(1, 5, 3, 2))  // 5
}
```

**Parameters:** Two or more numbers.

**Returns:** The smallest or largest value.

### `avg()`
`(numbers ...number) -> float`

Returns the average of one or more numbers.

```ez
import @math

do average_demo() {
    println(math.avg(2, 4, 6))  // 4.0
    println(math.avg(10, 20))   // 15.0
}
```

**Parameters:** One or more numbers.

**Returns:** `float` - The arithmetic mean.

**Errors:** [E7001](/EZ-Language-Webapp/errors/E7001) if called with no arguments.

---

### `sign()`
`(n number) -> int`

Returns -1, 0, or 1 indicating the sign of a number.

```ez
import @math

do sign_demo() {
    println(math.sign(-42))   // -1
    println(math.sign(0))     // 0
    println(math.sign(3.14))  // 1
}
```

**Parameters:** `n` - A number (int or float).

**Returns:** `int` - `-1` if negative, `0` if zero, `1` if positive.

---

### `neg()`
`(n number) -> number`

Returns the negation of a number.

```ez
import @math

do neg_demo() {
    println(math.neg(5))     // -5
    println(math.neg(-3))    // 3
    println(math.neg(0))     // 0
}
```

**Parameters:** `n` - A number (int or float).

**Returns:** The negation of the number.

---

### `clamp()`
`(value number, min number, max number) -> number`

Constrains a value between a minimum and maximum.

```ez
import @math

do clamp_demo() {
    println(math.clamp(15, 0, 10))   // 10
    println(math.clamp(-5, 0, 10))   // 0
    println(math.clamp(5, 0, 10))    // 5
}
```

**Parameters:**
- `value` - The number to clamp
- `min` - The minimum bound
- `max` - The maximum bound

**Returns:** The clamped value.

---

### `trunc()`
`(n float) -> int`

Truncates a float to an integer (removes decimal part without rounding).

```ez
import @math

do trunc_demo() {
    println(math.trunc(3.7))   // 3
    println(math.trunc(-3.7))  // -3
    println(math.trunc(5.0))   // 5
}
```

**Parameters:** `n` - A float.

**Returns:** `int` - The truncated value.

---

### `floor()` / `ceil()` / `round()`
`(n float) -> int`

Rounding functions.

```ez
import @math

do rounding_demo() {
    println(math.floor(3.7))  // 3
    println(math.ceil(3.2))   // 4
    println(math.round(3.5))  // 4
    println(math.round(3.4))  // 3
}
```

**Parameters:** `n` - A float.

**Returns:** `int` - The rounded value.

## Power and Roots

### `pow()`
`(base number, exponent number) -> number`

Returns base raised to the power of exponent.

```ez
import @math

do power_demo() {
    println(math.pow(2, 8))    // 256
    println(math.pow(10, 3))   // 1000
    println(math.pow(2.5, 2))  // 6.25
}
```

**Parameters:** `base`, `exponent` - Numbers.

**Returns:** The result of base^exponent.

### `sqrt()`
`(n number) -> float`

Returns the square root of a number.

```ez
import @math

do square_root_demo() {
    println(math.sqrt(16))  // 4.0
    println(math.sqrt(2))   // 1.4142135623730951
}
```

**Parameters:** `n` - A non-negative number.

**Returns:** `float` - The square root.

**Errors:** [E8001](/EZ-Language-Webapp/errors/E8001) if the argument is negative.

---

### `cbrt()`
`(n number) -> float`

Returns the cube root of a number.

```ez
import @math

do cbrt_demo() {
    println(math.cbrt(27))   // 3.0
    println(math.cbrt(8))    // 2.0
    println(math.cbrt(-8))   // -2.0
}
```

**Parameters:** `n` - A number (int or float).

**Returns:** `float` - The cube root.

---

### `hypot()`
`(a number, b number) -> float`

Returns the hypotenuse: sqrt(a² + b²).

```ez
import @math

do hypot_demo() {
    println(math.hypot(3, 4))   // 5.0
    println(math.hypot(5, 12))  // 13.0
}
```

**Parameters:** `a`, `b` - Numbers.

**Returns:** `float` - The hypotenuse.

---

### `exp()`
`(n number) -> float`

Returns e raised to the power of n.

```ez
import @math

do exp_demo() {
    println(math.exp(0))   // 1.0
    println(math.exp(1))   // 2.718281828459045
    println(math.exp(2))   // 7.38905609893065
}
```

**Parameters:** `n` - A number.

**Returns:** `float` - e^n.

---

### `exp2()`
`(n number) -> float`

Returns 2 raised to the power of n.

```ez
import @math

do exp2_demo() {
    println(math.exp2(0))   // 1.0
    println(math.exp2(3))   // 8.0
    println(math.exp2(10))  // 1024.0
}
```

**Parameters:** `n` - A number.

**Returns:** `float` - 2^n.

---

## Logarithms

### `log()`
`(n number) -> float`

Returns the natural logarithm (base e) of a number.

```ez
import @math

do natural_log_demo() {
    println(math.log(math.E))  // 1.0
    println(math.log(10))      // 2.302585...
}
```

**Parameters:** `n` - A positive number.

**Returns:** `float` - The natural logarithm.

**Errors:** [E8002](/EZ-Language-Webapp/errors/E8002) if the argument is not positive.

### `log2()`
`(n number) -> float`

Returns the base-2 logarithm of a number.

```ez
import @math

do log2_demo() {
    println(math.log2(8))   // 3.0
    println(math.log2(16))  // 4.0
}
```

**Parameters:** `n` - A positive number.

**Returns:** `float` - The base-2 logarithm.

**Errors:** [E8002](/EZ-Language-Webapp/errors/E8002) if the argument is not positive.

### `log10()`
`(n number) -> float`

Returns the base-10 logarithm of a number.

```ez
import @math

do log10_demo() {
    println(math.log10(100))   // 2.0
    println(math.log10(1000))  // 3.0
}
```

**Parameters:** `n` - A positive number.

**Returns:** `float` - The base-10 logarithm.

**Errors:** [E8002](/EZ-Language-Webapp/errors/E8002) if the argument is not positive.

### `log_base()`
`(value number, base number) -> float`

Returns the logarithm of a value with an arbitrary base.

```ez
import @math

do log_base_demo() {
    println(math.log_base(8, 2))     // 3.0 (since 2^3 = 8)
    println(math.log_base(1000, 10)) // 3.0 (since 10^3 = 1000)
    println(math.log_base(27, 3))    // 3.0 (since 3^3 = 27)
    println(math.log_base(1, 7))     // 0.0 (any log of 1 is 0)
    println(math.log_base(5, 5))     // 1.0 (log_b(b) = 1)
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
import @math

do trig_demo() {
    println(math.sin(0))            // 0.0
    println(math.cos(0))            // 1.0
    println(math.sin(math.PI / 2))  // 1.0
}
```

**Parameters:** `angle` - Angle in radians.

**Returns:** `float` - The trigonometric value.

### `asin()` / `acos()` / `atan()`
`(value float) -> float`

Inverse trigonometric functions (return radians).

```ez
import @math

do inverse_trig_demo() {
    println(math.asin(1))  // 1.5707963... (PI/2)
    println(math.acos(0))  // 1.5707963... (PI/2)
    println(math.atan(1))  // 0.7853981... (PI/4)
}
```

**Parameters:** `value` - A number (asin/acos require [-1, 1]).

**Returns:** `float` - Angle in radians.

**Errors:** [E8003](/EZ-Language-Webapp/errors/E8003) if value is outside [-1, 1].

---

### `atan2()`
`(y float, x float) -> float`

Returns the angle in radians between the positive x-axis and the point (x, y).

```ez
import @math

do atan2_demo() {
    println(math.atan2(1, 1))    // 0.7853981... (PI/4)
    println(math.atan2(0, -1))   // 3.1415926... (PI)
    println(math.atan2(-1, 0))   // -1.5707963... (-PI/2)
}
```

**Parameters:**
- `y` - The y-coordinate
- `x` - The x-coordinate

**Returns:** `float` - Angle in radians.

---

### `sinh()` / `cosh()` / `tanh()`
`(value float) -> float`

Hyperbolic trigonometric functions.

```ez
import @math

do hyperbolic_trig_demo() {
    println(math.sinh(0))   // 0.0
    println(math.cosh(0))   // 1.0
    println(math.tanh(0))   // 0.0
    println(math.sinh(1))   // 1.1752011936438014
    println(math.cosh(1))   // 1.5430806348152437
    println(math.tanh(1))   // 0.7615941559557649
}
```

**Parameters:** `value` - A float.

**Returns:** `float` - The hyperbolic trigonometric value.

---

### `deg_to_rad()`
`(degrees float) -> float`

Converts degrees to radians.

```ez
import @math

do deg_to_rad_demo() {
    println(math.deg_to_rad(180))  // 3.141592653589793
    println(math.deg_to_rad(90))   // 1.5707963267948966
    println(math.deg_to_rad(45))   // 0.7853981633974483
}
```

**Parameters:** `degrees` - An angle in degrees.

**Returns:** `float` - The angle in radians.

---

### `rad_to_deg()`
`(radians float) -> float`

Converts radians to degrees.

```ez
import @math

do rad_to_deg_demo() {
    println(math.rad_to_deg(math.PI))      // 180.0
    println(math.rad_to_deg(math.PI / 2))  // 90.0
    println(math.rad_to_deg(1))             // 57.29577951308232
}
```

**Parameters:** `radians` - An angle in radians.

**Returns:** `float` - The angle in degrees.

---

## Other Functions

### `factorial()`
`(n int) -> int`

Returns the factorial of a non-negative integer.

```ez
import @math

do factorial_demo() {
    println(math.factorial(5))   // 120
    println(math.factorial(0))   // 1
    println(math.factorial(10))  // 3628800
}
```

**Parameters:** `n` - A non-negative integer (0-20).

**Returns:** `int` - n!

**Errors:** [E8004](/EZ-Language-Webapp/errors/E8004) for negative numbers, [E8005](/EZ-Language-Webapp/errors/E8005) for values > 20.

---

### `gcd()`
`(a int, b int) -> int`

Returns the greatest common divisor.

```ez
import @math

do gcd_demo() {
    println(math.gcd(12, 8))    // 4
    println(math.gcd(100, 75))  // 25
    println(math.gcd(7, 13))    // 1
}
```

**Parameters:** `a`, `b` - Integers.

**Returns:** `int` - The greatest common divisor.

---

### `lcm()`
`(a int, b int) -> int`

Returns the least common multiple.

```ez
import @math

do lcm_demo() {
    println(math.lcm(4, 6))    // 12
    println(math.lcm(3, 7))    // 21
    println(math.lcm(12, 18))  // 36
}
```

**Parameters:** `a`, `b` - Integers.

**Returns:** `int` - The least common multiple.

---

### `is_prime()`
`(n int) -> bool`

Checks if a number is prime.

```ez
import @math

do is_prime_demo() {
    println(math.is_prime(7))   // true
    println(math.is_prime(4))   // false
    println(math.is_prime(13))  // true
    println(math.is_prime(1))   // false
}
```

**Parameters:** `n` - An integer.

**Returns:** `bool` - `true` if the number is prime.

---

### `is_even()`
`(n int) -> bool`

Returns true if n is even.

```ez
import @math

do is_even_demo() {
    println(math.is_even(4))   // true
    println(math.is_even(7))   // false
    println(math.is_even(0))   // true
}
```

**Parameters:** `n` - An integer.

**Returns:** `bool` - `true` if n is even.

---

### `is_odd()`
`(n int) -> bool`

Returns true if n is odd.

```ez
import @math

do is_odd_demo() {
    println(math.is_odd(3))   // true
    println(math.is_odd(8))   // false
    println(math.is_odd(-1))  // true
}
```

**Parameters:** `n` - An integer.

**Returns:** `bool` - `true` if n is odd.

---

### `sum()`
`(numbers ...number) -> number`

Returns the sum of all arguments.

```ez
import @math

do sum_demo() {
    println(math.sum(1, 2, 3))        // 6
    println(math.sum(10, 20, 30, 40))  // 100
    println(math.sum(1.5, 2.5))        // 4.0
}
```

**Parameters:** One or more numbers.

**Returns:** The sum of all arguments.

---

### `lerp()`
`(a float, b float, t float) -> float`

Linear interpolation between a and b by factor t (0.0 to 1.0).

```ez
import @math

do lerp_demo() {
    println(math.lerp(0, 10, 0.5))   // 5.0
    println(math.lerp(0, 10, 0.0))   // 0.0
    println(math.lerp(0, 10, 1.0))   // 10.0
    println(math.lerp(0, 10, 0.25))  // 2.5
}
```

**Parameters:**
- `a` - The start value
- `b` - The end value
- `t` - The interpolation factor (0.0 to 1.0)

**Returns:** `float` - The interpolated value.

---

### `map_range()`
`(value float, in_min float, in_max float, out_min float, out_max float) -> float`

Maps a value from one range to another.

```ez
import @math

do map_range_demo() {
    println(math.map_range(5, 0, 10, 0, 100))    // 50.0
    println(math.map_range(0.5, 0, 1, 0, 255))   // 127.5
    println(math.map_range(25, 0, 100, 0, 1))     // 0.25
}
```

**Parameters:**
- `value` - The value to map
- `in_min` - The lower bound of the input range
- `in_max` - The upper bound of the input range
- `out_min` - The lower bound of the output range
- `out_max` - The upper bound of the output range

**Returns:** `float` - The mapped value.

---

### `distance()`
`(x1 float, y1 float, x2 float, y2 float) -> float`

Returns the Euclidean distance between two 2D points.

```ez
import @math

do distance_demo() {
    println(math.distance(0, 0, 3, 4))    // 5.0
    println(math.distance(1, 1, 4, 5))    // 5.0
    println(math.distance(0, 0, 0, 0))    // 0.0
}
```

**Parameters:**
- `x1`, `y1` - Coordinates of the first point
- `x2`, `y2` - Coordinates of the second point

**Returns:** `float` - The Euclidean distance.

---

### `random()`
`(min int, max int) -> int`

Returns a random integer between min and max (inclusive).

```ez
import @math

do random_demo() {
    println(math.random(1, 10))    // Random int between 1 and 10
    println(math.random(0, 100))   // Random int between 0 and 100
}
```

**Parameters:**
- `min` - The minimum value (inclusive)
- `max` - The maximum value (inclusive)

**Returns:** `int` - A random integer in the range [min, max].

---

### `random_float()`
`(min float, max float) -> float`

Returns a random float between min and max.

```ez
import @math

do random_float_demo() {
    println(math.random_float(0.0, 1.0))    // Random float between 0.0 and 1.0
    println(math.random_float(-1.0, 1.0))   // Random float between -1.0 and 1.0
}
```

**Parameters:**
- `min` - The minimum value
- `max` - The maximum value

**Returns:** `float` - A random float in the range [min, max].

---

## Special Value Checks

### `is_nan()`
`(value number) -> bool`

Checks if a number is NaN (not a number).

```ez
println(math.is_nan(0.0 / 0.0))  // true
println(math.is_nan(42.0))       // false
```

**Parameters:** `value` - A number.

**Returns:** `bool` - `true` if the value is NaN.

---

### `is_finite()`
`(value number) -> bool`

Checks if a number is finite (not infinite and not NaN).

```ez
println(math.is_finite(42.0))      // true
println(math.is_finite(math.INF))  // false
```

**Parameters:** `value` - A number.

**Returns:** `bool` - `true` if finite.

---

### `is_inf()`
`(value number) -> bool`

Checks if a number is infinite.

```ez
println(math.is_inf(math.INF))      // true
println(math.is_inf(math.NEG_INF))  // true
println(math.is_inf(42.0))          // false
```

**Parameters:** `value` - A number.

**Returns:** `bool` - `true` if infinite.

---

## Example Program

```ez
import @math

do main() {
    // Calculate hypotenuse
    mut a float = 3.0
    mut b float = 4.0
    mut c float = math.sqrt(math.pow(a, 2) + math.pow(b, 2))
    println("Hypotenuse:", c)  // 5.0

    // Circle calculations
    mut radius float = 5.0
    mut area float = math.PI * math.pow(radius, 2)
    mut circumference float = 2 * math.PI * radius
    println("Area:", area)
    println("Circumference:", circumference)

    // Trigonometry
    mut angle float = math.PI / 4  // 45 degrees
    println("sin(45°):", math.sin(angle))
    println("cos(45°):", math.cos(angle))
}
```
