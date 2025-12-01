---
layout: '../../../layouts/DocsLayout.astro'
title: 'Functions'
description: 'Function declarations and usage in EZ.'
---

# Functions

Functions in EZ are declared with the `do` keyword. They support typed parameters, return values, and multiple returns.

## Basic Functions

Use `do` to declare a function:

```ez
do greet() {
    std.println("Hello!")
}

do main() {
    greet()  // "Hello!"
}
```

## Parameters

Parameters require type annotations:

```ez
do greet(name string) {
    std.println("Hello, ${name}!")
}

do add(x int, y int) {
    std.println(x + y)
}

do main() {
    greet("Alice")  // "Hello, Alice!"
    add(5, 10)      // 15
}
```

## Type Sharing

Parameters of the same type can share a type annotation:

```ez
// x, y, and z all share the int type
do sum(x, y, z int) -> int {
    return x + y + z
}

// a and b are floats, divisor is int
do calculate(a, b float, divisor int) -> float {
    return (a + b) / float(divisor)
}

do main() {
    std.println(sum(1, 2, 3))           // 6
    std.println(calculate(10.0, 20.0, 3))  // 10.0
}
```

## Return Values

Use `->` to specify a return type:

```ez
do add(x, y int) -> int {
    return x + y
}

do isEven(n int) -> bool {
    return n % 2 == 0
}

do formatName(first, last string) -> string {
    return first + " " + last
}

do main() {
    temp sum int = add(10, 20)
    std.println(sum)  // 30

    if isEven(4) {
        std.println("4 is even")
    }

    temp name string = formatName("John", "Doe")
    std.println(name)  // "John Doe"
}
```

## Multiple Return Values

Functions can return multiple values:

```ez
do divmod(dividend, divisor int) -> (int, int) {
    temp quotient int = dividend / divisor
    temp remainder int = dividend % divisor
    return quotient, remainder
}

do minmax(a, b, c int) -> (int, int) {
    temp min int = a
    temp max int = a

    if b < min { min = b }
    if c < min { min = c }
    if b > max { max = b }
    if c > max { max = c }

    return min, max
}

do main() {
    temp q, r = divmod(17, 5)
    std.println("17 / 5 =", q, "remainder", r)  // 3 remainder 2

    temp min, max = minmax(5, 2, 8)
    std.println("min:", min, "max:", max)  // min: 2 max: 8
}
```

## Array Parameters

```ez
do sum(numbers [int]) -> int {
    temp total int = 0
    for_each n in numbers {
        total += n
    }
    return total
}

do contains(arr [string], target string) -> bool {
    for_each item in arr {
        if item == target {
            return true
        }
    }
    return false
}

do main() {
    temp nums [int] = {1, 2, 3, 4, 5}
    std.println("Sum:", sum(nums))  // 15

    temp names [string] = {"Alice", "Bob", "Charlie"}
    std.println(contains(names, "Bob"))    // true
    std.println(contains(names, "David"))  // false
}
```

## Struct Parameters

```ez
const Point struct {
    x int
    y int
}

do distance(p1, p2 Point) -> float {
    temp dx int = p2.x - p1.x
    temp dy int = p2.y - p1.y
    return math.sqrt(float(dx * dx + dy * dy))
}

do translate(p Point, dx, dy int) -> Point {
    return Point{x: p.x + dx, y: p.y + dy}
}

do main() {
    temp a Point = Point{x: 0, y: 0}
    temp b Point = Point{x: 3, y: 4}

    std.println("Distance:", distance(a, b))  // 5.0

    temp moved Point = translate(a, 10, 20)
    std.println("Moved to:", moved.x, moved.y)  // 10 20
}
```

## Early Returns

Use `return` to exit a function early:

```ez
do findIndex(arr [int], target int) -> int {
    for i in range(0, len(arr)) {
        if arr[i] == target {
            return i  // Found, return early
        }
    }
    return -1  // Not found
}

do validate(age int) -> bool {
    if age < 0 {
        return false  // Invalid
    }
    if age > 150 {
        return false  // Invalid
    }
    return true
}
```

## Void Functions

Functions without a return type don't return a value:

```ez
do printHeader(title string) {
    std.println("===================")
    std.println(title)
    std.println("===================")
}

do logError(message string) {
    std.println("[ERROR]", message)
}
```

## Recursion

Functions can call themselves:

```ez
do factorial(n int) -> int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n - 1)
}

do fibonacci(n int) -> int {
    if n <= 1 {
        return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

do main() {
    std.println("5! =", factorial(5))   // 120
    std.println("fib(10) =", fibonacci(10))  // 55
}
```

## The main() Function

Every EZ program needs a `main()` function as its entry point:

```ez
import @std

do main() {
    std.println("Program started")
    // Your code here
    std.println("Program finished")
}
```

## Example Program

```ez
import @std
import @math

const Circle struct {
    x float
    y float
    radius float
}

do createCircle(x, y, radius float) -> Circle {
    return Circle{x: x, y: y, radius: radius}
}

do area(c Circle) -> float {
    return math.PI * c.radius * c.radius
}

do circumference(c Circle) -> float {
    return 2.0 * math.PI * c.radius
}

do scale(c Circle, factor float) -> Circle {
    return Circle{
        x: c.x,
        y: c.y,
        radius: c.radius * factor
    }
}

do overlaps(c1, c2 Circle) -> bool {
    temp dx float = c2.x - c1.x
    temp dy float = c2.y - c1.y
    temp distance float = math.sqrt(dx * dx + dy * dy)
    return distance < (c1.radius + c2.radius)
}

do main() {
    temp circle1 Circle = createCircle(0.0, 0.0, 5.0)
    temp circle2 Circle = createCircle(8.0, 0.0, 4.0)

    std.println("Circle 1:")
    std.println("  Area:", area(circle1))
    std.println("  Circumference:", circumference(circle1))

    std.println("Circle 2:")
    std.println("  Area:", area(circle2))

    if overlaps(circle1, circle2) {
        std.println("Circles overlap!")
    } otherwise {
        std.println("Circles do not overlap")
    }

    temp bigger Circle = scale(circle1, 2.0)
    std.println("Scaled radius:", bigger.radius)  // 10.0
}
```
