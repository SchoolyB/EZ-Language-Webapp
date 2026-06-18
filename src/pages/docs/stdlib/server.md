---
layout: '../../../layouts/DocsLayout.astro'
title: '@server'
description: 'HTTP server for building web APIs and services.'
---

# @server

The `@server` module provides functions for building HTTP servers, including routing with path parameters, response helpers, CORS, middleware, and a listener to serve requests.

## Import

```ez
import @server
```

## Quick Start

```ez
import @server
using std

do home(req HttpRequest) -> HttpResponse {
    return server.text(200, "Hello, World!")
}

do health(req HttpRequest) -> HttpResponse {
    return server.json(200, {"status": "ok"})
}

do main() {
    mut router = server.add_router()
    server.add_route(router, "GET", "/", ()home)
    server.add_route(router, "GET", "/api/health", ()health)
    println("Server running on http://localhost:8080")
    server.listen(router, 8080)
}
```

---

## Response Builders

### `text()`
`(status int, body string) -> HttpResponse`

Creates an HttpResponse with `text/plain` Content-Type.

```ez
mut resp = server.text(200, "Hello, World!")
```

**Parameters:**
- `status` - HTTP status code (e.g., 200, 404)
- `body` - The plain text response body

**Returns:** An `HttpResponse` with Content-Type set to `text/plain`.

---

### `json()`
`(status int, data) -> HttpResponse`

Creates an HttpResponse with `application/json` Content-Type. Automatically encodes the data to JSON. The `data` argument can be any JSON-serializable EZ value.

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

**Returns:** An `HttpResponse` with Content-Type set to `application/json`.

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
`(status int, body string) -> HttpResponse`

Creates an HttpResponse with `text/html` Content-Type.

```ez
mut resp = server.html(200, "<h1>Welcome</h1><p>Hello from EZ!</p>")
```

**Parameters:**
- `status` - HTTP status code (e.g., 200, 404)
- `body` - The HTML response body

**Returns:** An `HttpResponse` with Content-Type set to `text/html`.

---

### `redirect()`
`(status int, url string) -> HttpResponse`

Creates a redirect HttpResponse. Sets the `Location` header to the given URL.

```ez
mut resp = server.redirect(301, "https://example.com/new-page")
```

**Parameters:**
- `status` - HTTP redirect status code (e.g., 301, 302, 307, 308)
- `url` - The URL to redirect to

**Returns:** An `HttpResponse` with the `Location` header set.

---

## Routing

### `add_router()`
`() -> Router`

Creates a new empty Router.

```ez
mut router = server.add_router()
```

**Parameters:** None.

**Returns:** A `Router` struct with an empty routes array.

---

### `add_route()`
`(router Router, method string, path string, ()handler)`

Adds a route to an existing Router. The handler is a function reference that receives an `HttpRequest` and returns an `HttpResponse`.

```ez
do home(req HttpRequest) -> HttpResponse {
    return server.text(200, "Home")
}

do create_user(req HttpRequest) -> HttpResponse {
    return server.json(201, {"created": true})
}

mut router = server.add_router()
server.add_route(router, "GET", "/", ()home)
server.add_route(router, "POST", "/api/users", ()create_user)
```

**Parameters:**
- `router` - The Router to add the route to
- `method` - HTTP method: `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"PATCH"`
- `path` - The URL path to match (e.g., `"/"`, `"/api/users"`, `"/users/:id"`)
- `handler` - A function reference `()handler` that takes `HttpRequest` and returns `HttpResponse`

**Returns:** Nothing. The router is mutated in place.

#### Path Parameters

Use `:param` segments in the path to capture dynamic values. Captured values are available via `req.params["param_name"]`.

```ez
do get_user(req HttpRequest) -> HttpResponse {
    mut id = req.params["id"]
    return server.json(200, {"user_id": id})
}

server.add_route(router, "GET", "/users/:id", ()get_user)
```

---

### `cors()`
`(router Router, origin string)`

Enables CORS (Cross-Origin Resource Sharing) on the router with the given origin.

```ez
mut router = server.add_router()
server.cors(router, "*")                    // allow all origins
server.cors(router, "https://example.com")  // allow specific origin
```

**Parameters:**
- `router` - The Router to enable CORS on
- `origin` - The allowed origin (use `"*"` for all origins)

---

### `use()`
`(router Router, ()middleware)`

Registers a middleware function on the router.

```ez
do log_request(req HttpRequest) -> HttpResponse {
    println(req.method + " " + req.path)
    return server.text(200, "")
}

mut router = server.add_router()
server.use(router, ()log_request)
```

**Parameters:**
- `router` - The Router to add middleware to
- `middleware` - A function reference `()middleware`

---

## Types

### `HttpRequest`

The `HttpRequest` struct is passed to every route handler. It is only available when `@server` is imported.

| Field | Type | Description |
|-------|------|-------------|
| `method` | `string` | HTTP method (GET, POST, etc.) |
| `path` | `string` | Request path |
| `query` | `map[string:string]` | Query parameters |
| `headers` | `map[string:string]` | Request headers |
| `params` | `map[string:string]` | Path parameters (from `:param` segments) |
| `body` | `string` | Raw request body |

### `HttpResponse`

The `HttpResponse` struct is returned by response builder functions (`text()`, `json()`, `html()`, `redirect()`).

| Field | Type | Description |
|-------|------|-------------|
| `status` | `int` | HTTP status code |
| `body` | `string` | Response body |
| `headers` | `map[string:string]` | Response headers |

---

## Starting the Server

### `listen()`
`(router Router, port int)`

Starts an HTTP server on the given port using the given router. This function blocks until the server is killed. The port must be between 1 and 65535.

```ez
import @server
using std

do home(req HttpRequest) -> HttpResponse {
    return server.text(200, "Hello!")
}

do main() {
    mut router = server.add_router()
    server.add_route(router, "GET", "/", ()home)
    println("Listening on port 3000...")
    server.listen(router, 3000)
}
```

**Parameters:**
- `router` - The Router containing all registered routes
- `port` - The port number to listen on (1-65535)

**Returns:** Nothing. Blocks until the server is killed.

---

## Complete Example

```ez
import @server
using std

do home(req HttpRequest) -> HttpResponse {
    return server.text(200, "Welcome to the API")
}

do health(req HttpRequest) -> HttpResponse {
    return server.json(200, {"status": "ok"})
}

do get_user(req HttpRequest) -> HttpResponse {
    mut id = req.params["id"]
    return server.json(200, {"id": id, "name": "Alice"})
}

do create_user(req HttpRequest) -> HttpResponse {
    return server.json(201, {"created": true})
}

do about_page(req HttpRequest) -> HttpResponse {
    return server.html(200, "<h1>About</h1><p>Served by EZ.</p>")
}

do main() {
    mut router = server.add_router()

    // Enable CORS for all origins
    server.cors(router, "*")

    // Routes
    server.add_route(router, "GET", "/", ()home)
    server.add_route(router, "GET", "/api/health", ()health)
    server.add_route(router, "GET", "/users/:id", ()get_user)
    server.add_route(router, "POST", "/api/users", ()create_user)
    server.add_route(router, "GET", "/about", ()about_page)

    println("Server running on http://localhost:8080")
    server.listen(router, 8080)
}
```

## Tips

**Routes use handler functions** — Unlike passing a pre-built response, each route handler receives the `HttpRequest` and can inspect the request before building a response:

```ez
do greet(req HttpRequest) -> HttpResponse {
    mut name = req.params["name"]
    return server.text(200, "Hello, " + name + "!")
}

server.add_route(router, "GET", "/greet/:name", ()greet)
```

**Use meaningful status codes** — Return appropriate HTTP status codes:

```ez
server.text(200, "OK")           // success
server.json(201, {"id": 1})      // created
server.json(404, {"error": "not found"})  // not found
server.redirect(301, "/new-url") // permanent redirect
```
