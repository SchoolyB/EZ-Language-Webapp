---
question: "Why doesn't EZ have pointers?"
order: 6
---

EZ uses a simple memory model with **copy-by-default** semantics. This means you already get what pointers provide in other languages without the complexity.

## Semantics

```
On Assignment         In Functions
─────────────────────────────────────────────────────────────────
Copy (independent)    Read-only by default, mutable with &
```

All types — primitives, strings, arrays, maps, and structs — are copied when assigned. This gives you independent data by default.

### What this means in practice

**All assignments create independent copies:**

```ez
temp x int = 10
temp y int = x
y = 20
// x is still 10

temp a [int] = {1, 2, 3}
temp b [int] = a
b[0] = 100
// a[0] is still 1 — they are independent copies
```

**In functions**, parameters are read-only by default. Use `&` to allow modification:

```ez
do birthday(&p Person) {   // & allows modification
    p.age = p.age + 1
}

do get_name(p Person) -> string {   // no & = read-only
    // p.age = 100  // ERROR: cannot modify
    return p.name
}

temp person Person = Person{name: "Alice", age: 30}
birthday(person)  // OK: person.age is now 31
```

## What pointers would add

The only thing explicit pointers add in languages like Go or C is the ability to choose between *value semantics* (copying) and *reference semantics* (sharing). EZ provides this choice through two builtins:

- **`copy()`** — Explicit deep copy (same as default assignment, but clearer intent)
- **`ref()`** — Create a reference for shared data

```ez
temp a Person = Person{name: "Alice", age: 30}

// Copy (default behavior)
temp b Person = a          // independent copy
temp c Person = copy(a)    // also independent copy (explicit)
b.age = 31
// a.age is still 30

// Reference (shared data)
temp d Person = ref(a)     // d references the same data as a
d.age = 40
// a.age is now 40 — they share the same data
```

Use `ref()` when you need multiple variables to share and modify the same data.

## Why this design?

1. **Simplicity** — Pointers are a notorious source of confusion for beginners. Copy-by-default is easier to reason about.
2. **Predictable** — No surprises from accidental sharing. You always know when data is shared because you explicitly used `ref()`.
3. **Full control** — When you do need shared data, `ref()` gives you that capability without pointer syntax.
4. **Proven model** — This approach combines the best of value semantics with opt-in sharing when needed.

## Recursive Data Structures

EZ supports recursive data structures naturally. A struct field typed as its own struct defaults to `nil`:

```ez
const Node struct {
    value int
    next Node  // defaults to nil
}

temp n1 Node = Node{value: 1, next: nil}
temp n2 Node = Node{value: 2, next: nil}
n1.next = n2  // linked list works
```

If you're coming from C or Go and miss pointers, you have `ref()` for shared data and `copy()` for explicit copies.
