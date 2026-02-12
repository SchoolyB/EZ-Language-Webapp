---
question: "Why doesn't EZ have OOP?"
order: 4
---

No classes. No inheritance. No `this` or `self`. This is a deliberate design choice, not a limitation.

## The Short Answer

Data is data. Use structs and variables. You don't need a class hierarchy to write good software.

## The Problems with OOP

### Unnecessary Complexity

OOP introduces concepts that get in the way of actually learning to program:
- Class hierarchies and inheritance chains
- Abstract classes vs interfaces vs traits
- Polymorphism, encapsulation, abstraction (the "pillars")
- Constructor overloading, method overriding, visibility modifiers

### Hidden Behavior

OOP encourages hiding behavior inside objects. EZ encourages making behavior explicit. When you call a function in EZ, you can see exactly what it takes and what it returns. No surprises.

## What EZ Offers Instead

### Structs for Data

```ez
const User struct {
    name string,
    email string,
    age int
}

temp user User = User{name: "Alice", email: "alice@example.com", age: 30}
```

### Functions for Behavior

```ez
do validate_user(u User) -> Error {
    if len(u.name) == 0 {
        return error("name cannot be empty")
    }
    if u.age < 0 {
        return error("age cannot be negative")
    }
    return nil
}
```

### Modules for Organization

Got a lot of types? Put them in their own file:

```
myproject/
├── main.ez
└── types/
    └── user.ez      # module types
```

```ez
// types/user.ez
module types

const User struct {
    name string,
    email string
}
```

```ez
// main.ez
import types

do main() {
    temp u types.User = types.User{name: "Alice", email: "a@b.com"}
}
```

No cyclical imports. No dependency injection frameworks. Just organize your code like files in folders.

---
