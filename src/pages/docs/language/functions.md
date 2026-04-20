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
    println("Hello!")
}

do main() {
    greet()  // "Hello!"
}
```

## Parameters

Parameters require type annotations:

```ez
do greet(name string) {
    println("Hello, ${name}!")
}

do add(x int, y int) {
    println(x + y)
}

do main() {
    greet("Alice")  // "Hello, Alice!"
    add(5, 10)      // 15
}
```

## Mutable Parameters

By default, function parameters are **read-only**. Use the `&` prefix to declare a parameter as mutable, allowing the function to modify it.

```ez
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
    mut person = Person{name: "Alice", age: 30}
    birthday(person)
    println(person.age)  // 31
}
```

### Rules

| Parameter Declaration | Can modify inside function? |
|-----------------------|----------------------------|
| `p Person`            | No (read-only)             |
| `&p Person`           | Yes (mutable)              |

| Caller Variable | To `p Person`  | To `&p Person` |
|-----------------|----------------|----------------|
| `mut`           | OK (read-only) | OK (writable)  |
| `const`         | OK (read-only) | ERROR          |

Passing a `const` variable to a mutable parameter will produce an error:

```ez
const config = Config{debug: true}
// update_config(config)  // ERROR: cannot pass immutable variable to mutable parameter
```

> **Note:** The `&` mutable parameter syntax applies to user-defined functions only. Standard library functions that modify data (like `arrays.append()`) require the variable to be declared with `mut`, not `const`.

## Default Parameter Values

Parameters can have default values, making them optional when calling the function:

```ez
do greet(name string = "World") -> string {
    return "Hello, ${name}!"
}

do main() {
    println(greet())        // Hello, World!
    println(greet("Alice")) // Hello, Alice!
}
```

### Mixed Required and Optional Parameters

Required parameters must come before parameters with defaults:

```ez
do create_player(name string, health int = 100, mana int = 50) -> string {
    return "${name}: HP=${health}, MP=${mana}"
}

do main() {
    println(create_player("Hero"))           // Hero: HP=100, MP=50
    println(create_player("Boss", 200))      // Boss: HP=200, MP=50
    println(create_player("Wizard", 80, 150)) // Wizard: HP=80, MP=150
}
```

### Default Parameter Rules

- Required parameters must come before optional parameters
- Mutable parameters (`&`) cannot have default values
- Default values are evaluated at call time

---

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
    println(sum(1, 2, 3))              // 6
    println(calculate(10.0, 20.0, 3))  // 10.0
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
    mut sum = add(10, 20)
    println(sum)  // 30

    if isEven(4) {
        println("4 is even")
    }

    mut name = formatName("John", "Doe")
    println(name)  // "John Doe"
}
```

## Multiple Return Values

Functions can return multiple values:

```ez
do divmod(dividend, divisor int) -> (int, int) {
    mut quotient = dividend / divisor
    mut remainder = dividend % divisor
    return quotient, remainder
}
```

### Named Return Variables

You can name your return variables. Named returns are automatically initialized to their zero values and are available as mutable local variables inside the function body.

```ez
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
    println(getUserName())  // "Alice"

    mut a, n = getPersonInfo()
    println(a, n)  // 25 Bob

    mut f, l = getNames()
    println(f, l)  // John Doe
}
```

Named returns support two implicit return patterns:

1. **Bare `return`** — returns the named variables in declaration order
2. **No `return` statement** — falling off the end of the function returns the named variables

Explicit `return` with values also works. All three forms are equivalent:

```ez
do divide(a, b int) -> (quotient int, remainder int) {
    quotient = a / b
    remainder = a % b
    return  // bare return — implicitly returns quotient, remainder
}

do divide2(a, b int) -> (quotient int, remainder int) {
    quotient = a / b
    remainder = a % b
}  // implicit return — falls off end, returns quotient, remainder
```

```ez
do divmod(dividend, divisor int) -> (int, int) {
    mut quotient = dividend / divisor
    mut remainder = dividend % divisor
    return quotient, remainder
}

do minmax(a, b, c int) -> (int, int) {
    mut min = a
    mut max = a

    if b < min { min = b }
    if c < min { min = c }
    if b > max { max = b }
    if c > max { max = c }

    return min, max
}

do main() {
    mut q, r = divmod(17, 5)
    println("17 / 5 =", q, "remainder", r)  // 3 remainder 2

    mut min, max = minmax(5, 2, 8)
    println("min:", min, "max:", max)  // min: 2 max: 8

    // Use _ to discard unwanted return values
    mut quotient, _ = divmod(10, 3)
    println("quotient only:", quotient)  // 3
}
```

## Error Returns

Functions that may fail conventionally return a tuple with the result and an Error:

```ez
do parse(s string) -> (int, Error) {
    if s == "" {
        return 0, error("empty string")
    }
    return 42, nil
}

mut value, err = parse("test")
if err != nil {
    // Handle error
}
```

### or_return

The `or_return` keyword provides error propagation shorthand. When a call returns a non-nil error, `or_return` immediately returns from the enclosing function:

```ez
do load() -> (string, Error) {
    // Bare or_return: propagates the error with zero values
    mut content = read_file("data.txt") or_return
    mut parsed = json.decode(content) or_return
    return parsed, nil
}

// With custom fallback values:
mut content = read_file("data.txt") or_return "", error("failed to load")
```

The enclosing function must have `Error` as its last return type.

## Array Parameters

```ez
do sum(numbers [int]) -> int {
    mut total = 0
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
    mut nums [int] = {1, 2, 3, 4, 5}
    println("Sum:", sum(nums))  // 15

    mut names [string] = {"Alice", "Bob", "Charlie"}
    println(contains(names, "Bob"))    // true
    println(contains(names, "David"))  // false
}
```

## Struct Parameters

```ez
import @math

const Point struct {
    x int
    y int
}

do distance(p1, p2 Point) -> float {
    mut dx = p2.x - p1.x
    mut dy = p2.y - p1.y
    return math.sqrt(float(dx * dx + dy * dy))
}

do translate(p Point, dx, dy int) -> Point {
    return Point{x: p.x + dx, y: p.y + dy}
}

do main() {
    mut a = Point{x: 0, y: 0}
    mut b = Point{x: 3, y: 4}

    println("Distance:", distance(a, b))  // 5.0

    mut moved = translate(a, 10, 20)
    println("Moved to:", moved.x, moved.y)  // 10 20
}
```

## Function References

Functions can be passed as values using the `()` prefix syntax or the `ref()` builtin:

```ez
do is_positive(n int) -> bool { return n > 0 }

// ()func_name — implicit syntax
mut check = ()is_positive

// ref(func_name) — explicit syntax
mut check2 = ref(is_positive)

// Call through the reference
check(5)  // true

// Pass as argument
do filter(arr [int], test func) -> [int] {
    // ...
}
mut positives = filter(numbers, ()is_positive)
```

Function references:
- `()func_name` is the implicit form (shorter)
- `ref(func_name)` is the explicit form (more readable)
- Both produce identical results
- No anonymous functions or lambdas — every reference points to a named function
- The `func` type is used for parameters that accept function references

## Struct-Namespaced Functions

Functions can be declared inside struct blocks as namespaced free functions:

```ez
const Point struct {
    x int
    y int

    do create(x int, y int) -> Point {
        return Point{x: x, y: y}
    }

    do distance(a Point, b Point) -> float {
        return math.sqrt(math.pow(float(a.x - b.x), 2) + math.pow(float(a.y - b.y), 2))
    }

    private do validate(p Point) -> bool {
        return p.x >= 0 && p.y >= 0
    }
}

// Called as Type.func()
mut p = Point.create(3, 4)
mut d = Point.distance(p1, p2)
```

Rules:
- No implicit `self` or `this` — every parameter is explicit
- `private` restricts access to other functions in the same struct
- Called as `StructName.func_name(args...)`
- Cross-module: `module.StructName.func_name(args...)`

## Wildcard Types (?)

The `?` type is a wildcard placeholder that enables generic-style functions. When used in a function's parameter types, `?` is bound to the concrete type of the argument at each call site:

```ez
do identity(x ?) -> ? {
    return x
}

mut a = identity(42)        // ? binds to int, returns int
mut b = identity("hello")   // ? binds to string, returns string
```

All `?` placeholders in a function signature bind to the same concrete type:

```ez
do pick_first(a ?, b ?) -> ? {
    return a
}

pick_first(1, 2)          // OK — both args are int
pick_first(1, "hello")    // Error — conflicting bindings for ?
```

Wildcard types also work with composite types:

```ez
do first(arr [?]) -> ? {
    return arr[0]
}

mut x = first({1, 2, 3})      // ? binds to int
mut y = first({"a", "b"})     // ? binds to string
```

`?` is **only** valid in function parameter types and return types. It is rejected everywhere else (variable declarations, struct fields, etc.).

## Guaranteed Cleanup with `ensure`

The `ensure` keyword guarantees a function call runs when the current function exits, regardless of how it exits:

```ez
import @io

do process_data() {
    mut content, _ = io.read_file("data.txt")
    ensure cleanup()

    if content == "" {
        return  // cleanup() still runs!
    }

    // cleanup() runs when function ends
}
```

### Execution Order (LIFO)

Multiple `ensure` statements run in reverse order (Last-In, First-Out):

```ez
do cleanup1() { println("cleanup 1") }
do cleanup2() { println("cleanup 2") }
do cleanup3() { println("cleanup 3") }

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

### Rules

- `ensure` statements trigger on normal return, early return, and reaching end of function
- Only function calls are allowed after `ensure`:
  ```ez
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
```

## Void Functions

Functions without a return type don't return a value:

```ez
do printHeader(title string) {
    println("===================")
    println(title)
    println("===================")
}

do logError(message string) {
    println("[ERROR]", message)
}
```

## Visibility

By default, all functions are public. The `private` keyword restricts access to the declaring module:

```ez
private do validate(n int) -> bool {
    return n > 0
}

do factorial(n int) -> int {
    // Can call private members within the same module
    if !validate(n) { return 1 }
    // ...
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
    println("5! =", factorial(5))   // 120
    println("fib(10) =", fibonacci(10))  // 55
}
```

## The main() Function

Every EZ program needs a `main()` function as its entry point:

```ez
do main() {
    println("Program started")
    // Your code here
    println("Program finished")
}
```

## Example Program

```ez
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
    mut dx = c2.x - c1.x
    mut dy = c2.y - c1.y
    mut distance = math.sqrt(dx * dx + dy * dy)
    return distance < (c1.radius + c2.radius)
}

do main() {
    mut circle1 = createCircle(0.0, 0.0, 5.0)
    mut circle2 = createCircle(8.0, 0.0, 4.0)

    println("Circle 1:")
    println("  Area:", area(circle1))
    println("  Circumference:", circumference(circle1))

    println("Circle 2:")
    println("  Area:", area(circle2))

    if overlaps(circle1, circle2) {
        println("Circles overlap!")
    } otherwise {
        println("Circles do not overlap")
    }

    mut bigger = scale(circle1, 2.0)
    println("Scaled radius:", bigger.radius)  // 10.0
}
```

## See Also
- [Control Flow](/EZ-Language-Webapp/docs/language/control-flow) — loops and conditionals used within functions
- [Variables](/EZ-Language-Webapp/docs/language/variables) — variable declarations, `mut` vs `const`
- [Structs](/EZ-Language-Webapp/docs/language/structs) — struct types as parameters and return values
- [Keywords](/EZ-Language-Webapp/docs/language/keywords) — `do`, `return`, `ensure` keyword reference
