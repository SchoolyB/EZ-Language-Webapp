---
layout: '../../../layouts/DocsLayout.astro'
title: '@channels'
description: 'Message passing between threads.'
---

# @channels

The `@channels` module provides message passing between threads. Compiler-only feature; requires POSIX threads.

## Import

```ez
import @channels
```

## Functions

### `open()`
`(capacity int) -> Channel`

Creates a buffered channel with the given capacity.

```ez
import @channels

do main() {
    mut ch = channels.open(10)
    ensure channels.close(ch)

    // Use the channel...
}
```

---

### `send()`
`(ch Channel, value)`

Sends a value into a channel.

```ez
channels.send(ch, "hello")
channels.send(ch, 42)
```

---

### `receive()`
`(ch Channel) -> T`

Receives a value from a channel. Blocks until a value is available.

```ez
mut msg = channels.receive(ch)
println(msg)
```

---

### `close()`
`(ch Channel)`

Closes a channel.

```ez
channels.close(ch)
```

---

## Example Program

```ez
import @threads
import @channels

do producer(ch Channel) {
    for i in range(0, 5) {
        channels.send(ch, i)
    }
    channels.close(ch)
}

do main() {
    mut ch = channels.open(5)

    mut t = threads.spawn(()producer)

    // Receive all values
    for i in range(0, 5) {
        mut val = channels.receive(ch)
        println("Received:", val)
    }

    threads.join(t)
}
```
