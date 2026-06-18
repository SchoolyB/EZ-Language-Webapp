---
layout: '../../../layouts/DocsLayout.astro'
title: '@net'
description: 'TCP sockets and DNS resolution.'
---

# @net

The `@net` module provides TCP socket communication and DNS resolution.

## Import

```ez
import @net
```

## Functions

### `connect()`
`(host string, port int) -> Socket`

Connects to a remote host on the specified port.

```ez
import @net

do main() {
    mut sock = net.connect("example.com", 80)
    ensure net.close(sock)

    net.send(sock, "GET / HTTP/1.0\r\nHost: example.com\r\n\r\n")
    mut response = net.receive(sock, 4096)
    println(response)
}
```

---

### `listen()`
`(port int) -> Listener`

Listens for incoming connections on a port.

```ez
mut listener = net.listen(8080)
ensure net.close(listener)
```

---

### `accept()`
`(listener Listener) -> Socket`

Accepts an incoming connection from a listener.

```ez
mut client = net.accept(listener)
```

---

### `send()`
`(sock Socket, data string)`

Sends data over a socket.

```ez
net.send(sock, "Hello from EZ!")
```

---

### `receive()`
`(sock Socket, max int) -> string`

Receives up to `max` bytes from a socket.

```ez
mut data = net.receive(sock, 1024)
```

---

### `close()`
`(sock Socket)`

Closes a socket or listener.

```ez
net.close(sock)
```

---

### `set_timeout()`
`(sock Socket, ms int)`

Sets the read/write timeout in milliseconds.

```ez
net.set_timeout(sock, 5000)  // 5 second timeout
```

---

### `resolve()`
`(hostname string) -> string`

Resolves a hostname to an IP address.

```ez
import @net

do main() {
    mut ip = net.resolve("example.com")
    println(ip)  // e.g., "93.184.216.34"
}
```

---
