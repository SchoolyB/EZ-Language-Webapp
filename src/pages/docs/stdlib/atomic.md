---
layout: '../../../layouts/DocsLayout.astro'
title: '@atomic'
description: 'Lock-free atomic operations and spinlocks.'
---

# @atomic

The `@atomic` module provides lock-free atomic operations backed by hand-written assembly (ARM64 and x86_64). Compiler-only feature.

## Import

```ez
import @atomic
```

## 64-bit Atomics

All pointer arguments must be `^int` (pointer to int).

### `load()`
`(ptr ^int) -> int`

Atomically loads a value.

```ez
mut x int = 42
mut val = atomic.load(addr(x))
println(val)  // 42
```

---

### `store()`
`(ptr ^int, val int)`

Atomically stores a value.

```ez
atomic.store(addr(x), 100)
```

---

### `add()`
`(ptr ^int, val int) -> int`

Atomically adds to a value. Returns the previous value.

```ez
mut prev = atomic.add(addr(x), 5)  // x becomes x+5, prev = old x
```

---

### `sub()`
`(ptr ^int, val int) -> int`

Atomically subtracts from a value. Returns the previous value.

```ez
mut prev = atomic.sub(addr(x), 3)
```

---

### `exchange()`
`(ptr ^int, val int) -> int`

Atomically swaps the value. Returns the previous value.

```ez
mut old = atomic.exchange(addr(x), 99)
```

---

### `cas()`
`(ptr ^int, expected int, desired int) -> bool`

Compare-and-swap. If the current value equals `expected`, sets it to `desired` and returns `true`. Otherwise returns `false`.

```ez
mut success = atomic.cas(addr(x), 42, 100)  // Only swaps if x == 42
```

---

### `and()`
`(ptr ^int, val int) -> int`

Atomic bitwise AND. Returns the previous value.

---

### `or()`
`(ptr ^int, val int) -> int`

Atomic bitwise OR. Returns the previous value.

---

### `xor()`
`(ptr ^int, val int) -> int`

Atomic bitwise XOR. Returns the previous value.

---

## Spinlock

### `spinlock()`
`() -> SpinLock`

Creates a new spinlock.

```ez
mut lk = atomic.spinlock()
```

---

### `spin_lock()`
`(lk SpinLock)`

Acquires a spinlock (spins until acquired).

---

### `spin_trylock()`
`(lk SpinLock) -> bool`

Tries to acquire a spinlock. Returns `true` if acquired, `false` if already held.

---

### `spin_unlock()`
`(lk SpinLock)`

Releases a spinlock.

---

## Memory Barrier

### `fence()`
`()`

Full memory barrier (sequential consistency).

```ez
atomic.fence()
```

---
