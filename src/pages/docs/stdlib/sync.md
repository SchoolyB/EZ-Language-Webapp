---
layout: '../../../layouts/DocsLayout.astro'
title: '@sync'
description: 'Synchronization primitives for thread-safe access.'
---

# @sync

The `@sync` module provides synchronization primitives for thread-safe access to shared data. Compiler-only feature; requires POSIX threads.

## Import

```ez
import @sync
```

## Functions

### `mutex()`
`() -> Mutex`

Creates a new mutex.

```ez
import @sync

do main() {
    mut mtx = sync.mutex()
    ensure sync.destroy(mtx)

    // Use the mutex...
}
```

---

### `lock()`
`(m Mutex)`

Acquires a mutex. Blocks until the mutex is available.

```ez
sync.lock(mtx)
// Critical section...
sync.unlock(mtx)
```

---

### `unlock()`
`(m Mutex)`

Releases a mutex.

```ez
sync.unlock(mtx)
```

---

### `destroy()`
`(m Mutex)`

Destroys a mutex and frees its resources.

```ez
sync.destroy(mtx)
```

---
