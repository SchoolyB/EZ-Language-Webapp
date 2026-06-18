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
