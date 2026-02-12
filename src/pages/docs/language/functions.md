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
import @std

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
import @std

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

## Mutable Parameters

By default, function parameters are **read-only**. Use the `&` prefix to declare a parameter as mutable, allowing the function to modify it.

```ez
import @std

// & means "I will modify this parameter"
do birthday(&p Person) {
    p.age = p.age + 1  // OK - parameter is mutable
}

// No symbol means "read-only"
do get_name(p Person) -> string {
    // p.age = 100  // ERROR: cannot modify read-only parameter
    return p.name
}

do main() {
    temp person Person = Person{name: "Alice", age: 30}
    birthday(person)
    std.println(person.age)  // 31
}
```

### Rules

| Parameter Declaration | Can modify inside function? |
|-----------------------|----------------------------|
| `p Person`            | No (read-only)             |
| `&p Person`           | Yes (mutable)              |

| Caller Variable | To `p Person`  | To `&p Person` |
|-----------------|----------------|----------------|
| `temp`          | OK (read-only) | OK (writable)  |
| `const`         | OK (read-only) | ERROR          |

Passing a `const` variable to a mutable parameter will produce an error:

```ez
const config Config = Config{debug: true}
// update_config(config)  // ERROR: cannot pass immutable variable to mutable parameter
```

**Related Errors:**
- [E5015](/EZ-Language-Webapp/errors/E5015): cannot modify read-only parameter
- [E5016](/EZ-Language-Webapp/errors/E5016): cannot pass immutable variable to mutable parameter

> **Note:** The `&` mutable parameter syntax applies to user-defined functions only. Standard library functions that modify data (like `arrays.append()`) require the variable to be declared with `temp`, not `const`.

## Default Parameter Values

Parameters can have default values, making them optional when calling the function:

```ez
import @std

do greet(name string = "World") -> string {
    return "Hello, ${name}!"
}

do main() {
    std.println(greet())        // Hello, World!
    std.println(greet("Alice")) // Hello, Alice!
}
```

### Mixed Required and Optional Parameters

Required parameters must come before parameters with defaults:

```ez
import @std

do create_player(name string, health int = 100, mana int = 50) -> string {
    return "${name}: HP=${health}, MP=${mana}"
}

do main() {
    std.println(create_player("Hero"))           // Hero: HP=100, MP=50
    std.println(create_player("Boss", 200))      // Boss: HP=200, MP=50
    std.println(create_player("Wizard", 80, 150)) // Wizard: HP=80, MP=150
}
```

### All Parameters with Defaults

```ez
import @std

do config(debug bool = false, verbose bool = true, level int = 1) -> string {
    return "debug=${debug}, verbose=${verbose}, level=${level}"
}

do main() {
    std.println(config())       // debug=false, verbose=true, level=1
    std.println(config(true))   // debug=true, verbose=true, level=1
}
```

### Expression Defaults

Default values can be expressions:

```ez
import @std

do calculate(multiplier float = 3.14 * 2.0) -> float {
    return multiplier
}

do main() {
    std.println(calculate())    // 6.28
    std.println(calculate(2.0)) // 2.0
}
```

### Grouped Parameters with Default

When grouping parameters of the same type, only the last can have a default:

```ez
import @std

do point(x, y int = 0) -> string {
    return "(${x}, ${y})"
}

do main() {
    std.println(point(5))    // (5, 0)
    std.println(point(3, 4)) // (3, 4)
}
```

### Default Parameter Rules

- Required parameters must come before optional parameters
- Mutable parameters (`&`) cannot have default values
- Default values are evaluated at call time

**Related Errors:**
- [E2039](/EZ-Language-Webapp/errors/E2039): required parameter after parameter with default
- [E2040](/EZ-Language-Webapp/errors/E2040): mutable parameter cannot have default value

---

## Type Sharing

Parameters of the same type can share a type annotation:

```ez
import @std

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
import @std

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
import @std

do divmod(dividend, divisor int) -> (int, int) {
    temp quotient int = dividend / divisor
    temp remainder int = dividend % divisor
    return quotient, remainder
}
```

### Named Return Variables

You can name your return variables. Named returns are automatically initialized to their zero values (`0` for int, `""` for string, `false` for bool, `0.0` for float) and are available as mutable local variables inside the function body.

```ez
import @std

do getUserName() -> (name string) {
    name = "Alice"
    return name
}

do getPersonInfo() -> (age int, name string) {
    age = 25
    name = "Bob"
    return age, name
}

// Named returns can share types
do getNames() -> (first, last string) {
    first = "John"
    last = "Doe"
    return first, last
}

do main() {
    std.println(getUserName())  // "Alice"

    temp a int, n string = getPersonInfo()
    std.println(a, n)  // 25 Bob

    temp f string, l string = getNames()
    std.println(f, l)  // John Doe
}
```

Named returns require an explicit `return` statement — bare `return` without values is not supported.

```ez
// Zero values returned if not assigned
do getZeroInt() -> (count int) {
    return count  // returns 0
}
```

---

```ez
import @std

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

    // Use _ to discard unwanted return values
    temp quotient, _ = divmod(10, 3)
    std.println("quotient only:", quotient)  // 3
}
```

## Array Parameters

```ez
import @std

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
import @std
import @math

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

## Guaranteed Cleanup with `ensure`

The `ensure` keyword guarantees a function call runs when the current function exits, regardless of how it exits (normal return, early return, or reaching end of function). This prevents resource leaks by ensuring cleanup code always runs.

### Problem: Resource Leaks

```ez
import @io, @db

do process_data() {
    temp store, _ = db.open("mydb.ezdb")
    temp file, _ = io.open("data.txt", "r")

    if something_bad {
        return  // store and file never closed!
    }

    // If we forget cleanup or return early, resources leak

    db.close(store)
    io.close(file)
}
```

### Solution: `ensure`

```ez
import @io, @db

do process_data() {
    temp store, _ = db.open("mydb.ezdb")
    ensure db.close(store)

    temp file, _ = io.open("data.txt", "r")
    ensure io.close(file)

    if something_bad {
        return  // Both close calls still run!
    }

    // Even if error here, cleanup happens
}
```

### Execution Order (LIFO)

Multiple `ensure` statements run in reverse order (Last-In, First-Out):

```ez
import @std

do cleanup1() { std.println("cleanup 1") }
do cleanup2() { std.println("cleanup 2") }
do cleanup3() { std.println("cleanup 3") }

do example() {
    ensure cleanup1()  // runs 3rd
    ensure cleanup2()  // runs 2nd
    ensure cleanup3()  // runs 1st
}

do main() {
    example()
    // Output:
    // cleanup 3
    // cleanup 2
    // cleanup 1
}
```

This LIFO order matches how resources are typically acquired and released - resources acquired first should be released last.

### Rules

- `ensure` statements trigger on:
  - Normal return
  - Early return
  - Reaching end of function
- Only function calls are allowed after `ensure`:
  ```ez
  ensure db.close(store)     // OK
  ensure cleanup()           // OK
  // ensure { block }        // Not supported
  ```

---

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
import @std

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
import @std

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
