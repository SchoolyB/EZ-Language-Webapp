---
layout: '../../../layouts/DocsLayout.astro'
title: '@server'
description: 'HTTP server for building web APIs and services.'
---

# @server

The `@server` module provides functions for building HTTP servers, including routing, response helpers, and a listener to serve requests.

## Import

```ez
import @server
```

## Quick Start

```ez
@server
using std

do main() {
    mut router Router = server.router()
    server.route(router, "GET", "/", server.text(200, "Hello, World!"))
    server.route(router, "GET", "/api/health", server.json(200, {"status": "ok"}))
    println("Server running on http://localhost:8080")
    server.listen(8080, router)
}
```

---

## Response Helpers

### `text()`
`(status int, body string) -> Response`

Creates a Response with `text/plain` Content-Type.

```ez
mut resp = server.text(200, "Hello, World!")
```

**Parameters:**
- `status` - HTTP status code (e.g., 200, 404)
- `body` - The plain text response body

**Returns:** A `Response` with Content-Type set to `text/plain`.

---

### `json()`
`(status int, data type) -> Response`

Creates a Response with `application/json` Content-Type. Automatically encodes the data to JSON. The `data` argument can be any JSON-serializable EZ value.

```ez
// Map → JSON object
mut resp = server.json(200, {"name": "Alice", "age": 30})

// Struct → JSON object (respects `json:` field tags)
mut user User = User{name: "Alice", age: 30}
mut resp2 = server.json(200, user)

// Array → JSON array
mut resp3 = server.json(200, {1, 2, 3})

// Primitives
mut resp4 = server.json(200, "hello")  // JSON string
mut resp5 = server.json(200, 42)       // JSON number
mut resp6 = server.json(200, true)     // JSON boolean
```

**Parameters:**
- `status` - HTTP status code (e.g., 200, 201)
- `data` - The data to encode as JSON. Accepts maps (string keys only), structs, arrays, strings, ints, floats, bools, and nil

**Returns:** A `Response` with Content-Type set to `application/json`.

| EZ Type | JSON Output |
|---------|-------------|
| `map` (string keys) | Object `{"key": "value"}` |
| `struct` | Object from fields |
| `array` | Array `[1, 2, 3]` |
| `string` | String `"hello"` |
| `int` / `float` | Number |
| `bool` | `true` / `false` |
| `nil` | `null` |

> **Note:** Maps with non-string keys will produce error E13003. Functions cannot be encoded to JSON.

---

### `html()`
`(status int, body string) -> Response`

Creates a Response with `text/html` Content-Type.

```ez
mut resp = server.html(200, "<h1>Welcome</h1><p>Hello from EZ!</p>")
```

**Parameters:**
- `status` - HTTP status code (e.g., 200, 404)
- `body` - The HTML response body

**Returns:** A `Response` with Content-Type set to `text/html`.

---

## Routing

### `router()`
`() -> Router`

Creates a new empty Router. The Router struct contains an empty routes array that is populated by calling `server.route()`.

```ez
mut router Router = server.router()
```

**Parameters:** None.

**Returns:** A `Router` struct with an empty routes array.

---

### `route()`
`(router Router, method string, path string, response Response) -> void`

Adds a route to an existing Router. Mutates the router's routes array in place.

```ez
mut router Router = server.router()
server.route(router, "GET", "/", server.text(200, "Home"))
server.route(router, "POST", "/api/users", server.json(201, {"created": true}))
server.route(router, "GET", "/about", server.html(200, "<h1>About</h1>"))
```

**Parameters:**
- `router` - The Router to add the route to
- `method` - HTTP method: `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"PATCH"`
- `path` - The URL path to match (e.g., `"/"`, `"/api/users"`)
- `response` - The Response to send when the route is matched

**Returns:** Nothing. The router is mutated in place.

---

## Starting the Server

### `listen()`
`(port int, router Router) -> void`

Starts an HTTP server on the given port using the given router. This function blocks until the server encounters an error. The port must be between 1 and 65535.

```ez
@server
using std

do main() {
    mut router Router = server.router()
    server.route(router, "GET", "/", server.text(200, "Hello!"))
    println("Listening on port 3000...")
    server.listen(3000, router)
}
```

**Parameters:**
- `port` - The port number to listen on (1-65535)
- `router` - The Router containing all registered routes

**Returns:** Nothing. Blocks until the server encounters an error.

---

## Example Program

```ez
@server
using std

do main() {
    // Create a new router
    mut router Router = server.router()

    // Plain text response
    server.route(router, "GET", "/", server.text(200, "Welcome to the API"))

    // JSON endpoints
    server.route(router, "GET", "/api/health", server.json(200, {"status": "ok"}))
    server.route(router, "GET", "/api/users", server.json(200, {
        "users": [
            {"id": 1, "name": "Alice"},
            {"id": 2, "name": "Bob"}
        ]
    }))
    server.route(router, "POST", "/api/users", server.json(201, {"created": true}))

    // HTML page
    server.route(router, "GET", "/page", server.html(200, "<h1>Hello</h1><p>Served by EZ.</p>"))

    println("Server running on http://localhost:8080")
    server.listen(8080, router)
}
```

## Tips

**Choose the right response helper** - Use `server.text()` for plain text, `server.json()` for API data, and `server.html()` for web pages:

```ez
server.route(router, "GET", "/text", server.text(200, "plain text"))
server.route(router, "GET", "/data", server.json(200, {"key": "value"}))
server.route(router, "GET", "/page", server.html(200, "<h1>HTML</h1>"))
```

**Use meaningful status codes** - Return appropriate HTTP status codes with your responses:

```ez
server.route(router, "GET", "/api/items", server.json(200, {"items": []}))
server.route(router, "POST", "/api/items", server.json(201, {"created": true}))
server.route(router, "GET", "/not-here", server.json(404, {"error": "not found"}))
```
