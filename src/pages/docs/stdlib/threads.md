---
layout: '../../../layouts/DocsLayout.astro'
title: '@threads'
description: 'Thread lifecycle management.'
---

# @threads

The `@threads` module provides thread lifecycle management. Compiler-only feature; requires POSIX threads.

## Import

```ez
import @threads
```

## Functions

### `spawn()`
`(()func) -> Thread`

Spawns a new thread running the given function. The function is passed as a function reference.

```ez
import @threads

do worker() {
    println("Hello from thread!")
}

do main() {
    mut t = threads.spawn(()worker)
    threads.join(t)
}
```

---

### `join()`
`(t Thread)`

Waits for a thread to finish execution.

```ez
threads.join(t)  // Blocks until thread completes
```

---

### `get_id()`
`() -> int`

Gets the current thread's ID.

```ez
import @threads

do main() {
    mut id = threads.get_id()
    println("Main thread ID:", id)
}
```

---

## Example Program

```ez
import @threads
import @sync

mut counter ^int = addr(0)
mut mtx = sync.mutex()

do increment() {
    for i in range(0, 1000) {
        sync.lock(mtx)
        counter^ = counter^ + 1
        sync.unlock(mtx)
    }
}

do main() {
    mut t1 = threads.spawn(()increment)
    mut t2 = threads.spawn(()increment)

    threads.join(t1)
    threads.join(t2)

    println("Counter:", counter^)  // 2000
    sync.destroy(mtx)
}
```
