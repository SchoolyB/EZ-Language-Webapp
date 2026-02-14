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
temp person Person = Person{
    name: "Alice",
    age: 30,
    email: "alice@example.com"
}

// Single line for simple structs
temp point Point = Point{x: 10, y: 20}
```

### Using new()

Create a struct with default values using `new()`:

```ez
temp person Person = new(Person)
person.name = "Bob"
person.age = 25
person.email = "bob@example.com"
```

Default values:
- `int`, `float`: `0`
- `string`: `""`
- `bool`: `false`
- `char`: `'\0'`

## Accessing Fields

Use dot notation to read and write fields:

```ez
temp user User = User{name: "Alice", age: 30}

// Reading fields
std.println(user.name)   // "Alice"
std.println(user.age)    // 30

// Writing fields (only for temp variables)
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
    temp emp Employee = Employee{
        name: "John Doe",
        id: 12345,
        address: Address{
            street: "123 Main St",
            city: "Austin",
            zipcode: 78701
        }
    }

    // Access nested fields
    std.println(emp.name)              // "John Doe"
    std.println(emp.address.city)      // "Austin"
    std.println(emp.address.zipcode)   // 78701

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
    temp tasks [Task] = {
        Task{title: "Write docs", done: false},
        Task{title: "Fix bugs", done: true},
        Task{title: "Add tests", done: false}
    }

    for_each task in tasks {
        if task.done {
            std.println("[x]", task.title)
        } otherwise {
            std.println("[ ]", task.title)
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
    temp r Rectangle = Rectangle{width: 10, height: 5}
    std.println("Area:", area(r))  // 50

    temp scaled Rectangle = scale(r, 2)
    std.println("Scaled:", scaled.width, "x", scaled.height)  // 20 x 10
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
    temp p1 Point = createPoint(10, 20)
    temp p2 Point = origin()

    std.println("p1:", p1.x, p1.y)  // 10 20
    std.println("p2:", p2.x, p2.y)  // 0 0
}
```

## Const vs Temp Structs

The struct *type definition* is always `const`, but *instances* can be either:

```ez
const Config struct {
    debug bool
    timeout int
}

// Mutable instance - fields can be changed
temp config Config = Config{debug: true, timeout: 30}
config.timeout = 60  // OK

// Immutable instance - fields cannot be changed
const defaults Config = Config{debug: false, timeout: 30}
// defaults.timeout = 60  // Error! Cannot modify const
```

> **Important:** When a struct instance is declared with `const`, all of its fields are protected from modification. This includes nested struct fields. Attempting to modify any field on a `const` struct will produce a checktime error.

## Struct Field Tags for JSON

Struct fields can have tags that control how they are serialized to and deserialized from JSON. Tags use backtick syntax similar to Go.

### Basic Syntax

```ez
const User struct {
    name string `json:"name"`
    email string `json:"email_address"`
    age int `json:"age"`
}
```

When this struct is serialized to JSON, the field names in the output will use the tag values instead of the original field names.

### Available Tag Options

| Tag | Description |
|-----|-------------|
| `json:"name"` | Use custom field name in JSON |
| `json:"-"` | Exclude field from JSON entirely |
| `json:"name,omitempty"` | Omit field if it has a zero value |
| `json:"name,string"` | Encode numeric value as a string |

### Examples

#### Custom Field Names

```ez
const Person struct {
    firstName string `json:"first_name"`
    lastName string `json:"last_name"`
}

temp p Person = Person{firstName: "Alice", lastName: "Smith"}
// JSON output: {"first_name": "Alice", "last_name": "Smith"}
```

#### Excluding Fields

```ez
const Config struct {
    host string `json:"host"`
    password string `json:"-"`  // Never included in JSON
}

temp c Config = Config{host: "localhost", password: "secret123"}
// JSON output: {"host": "localhost"}
```

#### Omit Empty Values

```ez
const Item struct {
    name string `json:"name"`
    description string `json:"description,omitempty"`
}

temp item Item = Item{name: "Widget", description: ""}
// JSON output: {"name": "Widget"}
// (description omitted because it's empty)
```

#### Encoding Numbers as Strings

```ez
const Product struct {
    id int `json:"id,string"`
    price float `json:"price,string"`
}

temp p Product = Product{id: 12345, price: 29.99}
// JSON output: {"id": "12345", "price": "29.99"}
```

## Example Program

```ez
import @std
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
    temp total float = 0.0
    for_each item in cart.items {
        total += item.price * float(item.quantity)
    }
    return total * (1.0 - cart.discount)
}

do main() {
    temp cart Cart = Cart{
        items: {},
        discount: 0.1  // 10% discount
    }

    arrays.append(cart.items, Product{name: "Book", price: 29.99, quantity: 2})
    arrays.append(cart.items, Product{name: "Pen", price: 4.99, quantity: 5})

    std.println("Shopping Cart:")
    for_each item in cart.items {
        std.println(" -", item.name, "x", item.quantity, "@ $${item.price}")
    }

    temp total float = calculateTotal(cart)
    std.println("Total (with 10% discount): $${total}")
}
```

## See Also
- [Types](/EZ-Language-Webapp/docs/language/types) — primitive and composite types
- [Functions](/EZ-Language-Webapp/docs/language/functions) — structs as parameters and return values
- [Variables](/EZ-Language-Webapp/docs/language/variables) — `temp` vs `const` for struct instances
- [Enums](/EZ-Language-Webapp/docs/language/enums) — another way to define custom types
