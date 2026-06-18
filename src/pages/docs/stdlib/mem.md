---
layout: '../../../layouts/DocsLayout.astro'
title: '@mem'
description: 'Arena-based memory allocation.'
---

# @mem

The `@mem` module provides arena-based memory allocation for manual memory management.

EZ uses scope-based memory management by default — allocations are automatically cleaned up when they leave scope, so most programs never need to think about memory. However, for performance-critical code, long-lived data structures, or fine-grained control over allocation patterns, the `@mem` module gives you direct access to arena-based allocation. This is entirely opt-in; the language handles everything else for you.

## Import

```ez
import @mem
```

## Functions

### `arena()`
`(size int) -> Arena`

Creates an arena with the given byte capacity.

```ez
import @mem

do main() {
    mut a = mem.arena(1024)  // 1KB arena
    ensure mem.destroy(a)

    // Allocate within the arena...
}
```

---

### `destroy()`
`(arena Arena)`

Destroys an arena and frees all its memory.

```ez
mem.destroy(a)
```

---

### `reset()`
`(arena Arena)`

Resets an arena, reclaiming all allocations without freeing the underlying memory. Useful for reusing the same arena across iterations.

```ez
mem.reset(a)  // All previous allocations are invalidated
```

---

### `usage()`
`(arena Arena) -> int`

Returns the number of bytes currently used in the arena.

```ez
mut used = mem.usage(a)
println("Arena usage:", used, "bytes")
```

---

### `init()`
`(arena Arena, Type) -> ^Type`

Allocates a zero-initialized value of the given type in the arena.

```ez
const Point struct {
    x int
    y int
}

mut p = mem.init(a, Point)  // Returns ^Point, zero-initialized
p^.x = 10
p^.y = 20
```

---

### `alloc()`
`(arena Arena, value T) -> ^T`

Allocates a copy of the given value in the arena.

```ez
mut p = mem.alloc(a, Point{x: 5, y: 10})  // Returns ^Point
println(p^.x)  // 5
```

---

### `copy()`
`(dest, src, n int)`

Copies `n` bytes from `src` to `dest`.

---

### `zero()`
`(ptr, n int)`

Zeros out `n` bytes at the given pointer.

---

### `set()`
`(ptr, value int, n int)`

Sets `n` bytes at the given pointer to the specified value.

---
