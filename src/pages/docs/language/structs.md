---
layout: '../../../layouts/DocsLayout.astro'
title: 'Structs'
description: 'User-defined composite types in EZ.'
---

# Structs

Structs are user-defined composite types that group related data together. In EZ, structs are always declared with `const` since the type definition itself is immutable.

## Defining Structs

Use `const` with the `struct` keyword to define a new type:

```ez
const Person struct {
    name string
    age int
    email string
}

const Point struct {
    x int
    y int
}
```

> **Note:** Struct fields must be on separate lines. Inline declarations like `const Point struct { x int; y int }` are not allowed.

## Multi-Member Declarations

Fields of the same type can be declared on a single line:

```ez
const User struct {
    name, email string      // both are strings
    age int
    active, verified bool   // both are booleans
}

const Point3D struct {
    x, y, z float           // all three are floats
}
```

## Creating Instances

### Literal Initialization

Create struct instances using literal syntax with named fields:

```ez
mut person = Person{
    name: "Alice",
    age: 30,
    email: "alice@example.com"
}

// Single line for simple structs
mut point = Point{x: 10, y: 20}

// Zero-initialized
mut origin = Point{}  // x=0, y=0
```

### Using new()

Create a heap-allocated struct with `new()`. This returns a pointer (`^Type`):

```ez
mut person = new(Person)  // Returns ^Person
person^.name = "Bob"
person^.age = 25
person^.email = "bob@example.com"
```

Default values:
- `int`, `float`: `0`
- `string`: `""`
- `bool`: `false`
- `char`: `'\0'`

## Accessing Fields

Use dot notation to read and write fields:

```ez
mut user = User{name: "Alice", age: 30}

// Reading fields
println(user.name)   // "Alice"
println(user.age)    // 30

// Writing fields (only for mut variables)
user.age = 31
user.email = "alice@newmail.com"
```

## Nested Structs

Structs can contain other structs:

```ez
const Address struct {
    street string
    city string
    zipcode int
}

const Employee struct {
    name string
    id int
    address Address
}

do main() {
    mut emp = Employee{
        name: "John Doe",
        id: 12345,
        address: Address{
            street: "123 Main St",
            city: "Austin",
            zipcode: 78701
        }
    }

    // Access nested fields
    println(emp.name)              // "John Doe"
    println(emp.address.city)      // "Austin"
    println(emp.address.zipcode)   // 78701

    // Modify nested fields
    emp.address.street = "456 Oak Ave"
    emp.address.city = "Dallas"
}
```

## Structs in Arrays

```ez
const Task struct {
    title string
    done bool
}

do main() {
    mut tasks [Task] = {
        Task{title: "Write docs", done: false},
        Task{title: "Fix bugs", done: true},
        Task{title: "Add tests", done: false}
    }

    for_each task in tasks {
        if task.done {
            println("[x]", task.title)
        } otherwise {
            println("[ ]", task.title)
        }
    }
}
```

## Structs as Function Parameters

```ez
const Rectangle struct {
    width int
    height int
}

do area(rect Rectangle) -> int {
    return rect.width * rect.height
}

do scale(rect Rectangle, factor int) -> Rectangle {
    return Rectangle{
        width: rect.width * factor,
        height: rect.height * factor
    }
}

do main() {
    mut r = Rectangle{width: 10, height: 5}
    println("Area:", area(r))  // 50

    mut scaled = scale(r, 2)
    println("Scaled:", scaled.width, "x", scaled.height)  // 20 x 10
}
```

## Returning Structs

Functions can return struct literals directly:

```ez
const Point struct {
    x int
    y int
}

do createPoint(x, y int) -> Point {
    return Point{x: x, y: y}
}

do origin() -> Point {
    return Point{x: 0, y: 0}
}

do main() {
    mut p1 = createPoint(10, 20)
    mut p2 = origin()

    println("p1:", p1.x, p1.y)  // 10 20
    println("p2:", p2.x, p2.y)  // 0 0
}
```

## Struct-Namespaced Functions

Functions can be declared inside struct blocks as namespaced free functions:

```ez
import @math

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

do main() {
    // Called as Type.func()
    mut p = Point.create(3, 4)
    mut d = Point.distance(Point{x: 0, y: 0}, p)
    println("Distance from origin:", d)  // 5.0
}
```

Rules:
- No implicit `self` or `this` — every parameter is explicit
- `private` restricts access to other functions in the same struct
- Called as `StructName.func_name(args...)`
- Cross-module: `module.StructName.func_name(args...)`

## Const vs Mut Structs

The struct *type definition* is always `const`, but *instances* can be either:

```ez
const Config struct {
    debug bool
    timeout int
}

// Mutable instance - fields can be changed
mut config = Config{debug: true, timeout: 30}
config.timeout = 60  // OK

// Immutable instance - fields cannot be changed
const defaults = Config{debug: false, timeout: 30}
// defaults.timeout = 60  // Error! Cannot modify const
```

> **Important:** When a struct instance is declared with `const`, all of its fields are protected from modification. This includes nested struct fields.

## JSON Serialization with #json

Use the `#json` attribute to enable JSON serialization and deserialization for a struct. This allows `json.parse()` to decode JSON strings into the struct type and `json.stringify()` to encode struct values as JSON.

```ez
import @json

#json
const User struct {
    name string
    age int
    active bool
}

do main() {
    mut u User = json.parse("{\"name\": \"Alice\", \"age\": 25, \"active\": true}")
    println(u.name)            // Alice
    println(json.stringify(u)) // {"name":"Alice","age":25,"active":true}
}
```

### Rules

- Field names in the JSON must match the struct field names exactly
- Without `#json`, the struct has no serialization machinery and `json.parse()` into it will fail
- `#json` can only be applied to struct declarations

See [Attributes](/EZ-Language-Webapp/docs/language/attributes#json) for more details.

## Example Program

```ez
import @arrays

const Product struct {
    name string
    price float
    quantity int
}

const Cart struct {
    items [Product]
    discount float
}

do addToCart(&cart Cart, product Product) {
    arrays.append(cart.items, product)
}

do calculateTotal(cart Cart) -> float {
    mut total = 0.0
    for_each item in cart.items {
        total += item.price * float(item.quantity)
    }
    return total * (1.0 - cart.discount)
}

do main() {
    mut cart = Cart{
        items: {},
        discount: 0.1  // 10% discount
    }

    arrays.append(cart.items, Product{name: "Book", price: 29.99, quantity: 2})
    arrays.append(cart.items, Product{name: "Pen", price: 4.99, quantity: 5})

    println("Shopping Cart:")
    for_each item in cart.items {
        println(" -", item.name, "x", item.quantity, "@ $${item.price}")
    }

    mut total = calculateTotal(cart)
    println("Total (with 10% discount): $${total}")
}
```

## See Also
- [Types](/EZ-Language-Webapp/docs/language/types) — primitive and composite types
- [Functions](/EZ-Language-Webapp/docs/language/functions) — structs as parameters and return values
- [Variables](/EZ-Language-Webapp/docs/language/variables) — `mut` vs `const` for struct instances
- [Enums](/EZ-Language-Webapp/docs/language/enums) — another way to define custom types
