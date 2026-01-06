---
layout: '../../../layouts/DocsLayout.astro'
title: '@http'
description: 'HTTP client for making web requests.'
---

# @http

The `@http` module provides an HTTP client for making web requests, along with URL utilities and status code constants.

## Import

```ez
import @http
```

## Response Structure

All request functions return a tuple of `(HttpResponse, error)`. The `HttpResponse` struct contains:

| Field | Type | Description |
|-------|------|-------------|
| `status` | `int` | HTTP status code (e.g., 200, 404) |
| `body` | `string` | Response body as text |
| `headers` | `map[string:[string]]` | Response headers (values are arrays since headers can repeat) |

---

## Request Functions

### `get()`
`(url string) -> (HttpResponse, error)`

Performs an HTTP GET request.

```ez
import @std, @http
using std

do main() {
    temp resp, err = http.get("https://api.example.com/users")
    if err != nil {
        println("Error: ${err.message}")
        return
    }

    if resp.status != http.OK {
        println("Request failed: ${resp.status}")
        return
    }

    println("Body: ${resp.body}")
}
```

**Parameters:** `url` - The URL to request (must be valid).

**Returns:** A tuple of `(HttpResponse, error)`.

**Errors:**
- E14001 - Invalid URL
- E14002 - Request failed

---

### `post()`
`(url string, body string) -> (HttpResponse, error)`

Performs an HTTP POST request with a body.

```ez
import @std, @http
using std

do main() {
    temp resp, err = http.post(
        "https://api.example.com/users",
        http.json_body({"name": "Alice", "email": "alice@example.com"})
    )
    if err != nil {
        println("Error: ${err.message}")
        return
    }

    if resp.status == http.CREATED {
        println("User created successfully!")
    }
}
```

**Parameters:**
- `url` - The URL to request
- `body` - The request body as a string

**Returns:** A tuple of `(HttpResponse, error)`.

---

### `put()`
`(url string, body string) -> (HttpResponse, error)`

Performs an HTTP PUT request with a body.

```ez
temp resp, err = http.put(
    "https://api.example.com/users/123",
    http.json_body({"name": "Alice Updated"})
)
```

**Parameters:**
- `url` - The URL to request
- `body` - The request body as a string

**Returns:** A tuple of `(HttpResponse, error)`.

---

### `patch()`
`(url string, body string) -> (HttpResponse, error)`

Performs an HTTP PATCH request with a body.

```ez
temp resp, err = http.patch(
    "https://api.example.com/users/123",
    http.json_body({"email": "newemail@example.com"})
)
```

**Parameters:**
- `url` - The URL to request
- `body` - The request body as a string

**Returns:** A tuple of `(HttpResponse, error)`.

---

### `delete()`
`(url string) -> (HttpResponse, error)`

Performs an HTTP DELETE request.

```ez
temp resp, err = http.delete("https://api.example.com/users/123")
if err != nil {
    println("Error: ${err.message}")
    return
}

if resp.status == http.NO_CONTENT {
    println("User deleted successfully!")
}
```

**Parameters:** `url` - The URL to request.

**Returns:** A tuple of `(HttpResponse, error)`.

---

### `request()`
`(method string, url string, body string, headers map[string:string], timeout int) -> (HttpResponse, error)`

Performs an advanced HTTP request with custom method, headers, and timeout.

```ez
import @std, @http
using std

do main() {
    temp headers map[string:string] = {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
    }

    temp resp, err = http.request(
        "POST",
        "https://api.example.com/posts",
        http.json_body({"title": "Hello", "body": "World"}),
        headers,
        60  // timeout in seconds
    )

    if err != nil {
        println("Error: ${err.message}")
        return
    }

    println("Status: ${resp.status}")
}
```

**Parameters:**
- `method` - HTTP method: `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"PATCH"`, `"OPTIONS"`, `"HEAD"`
- `url` - The URL to request
- `body` - The request body (use empty string `""` for methods without body)
- `headers` - Custom headers as `map[string:string]`
- `timeout` - Request timeout in seconds (use 0 for default 30 seconds)

**Returns:** A tuple of `(HttpResponse, error)`.

**Errors:**
- E14001 - Invalid URL
- E14002 - Request failed
- E14004 - Invalid HTTP method

---

## URL Utilities

### `encode_url()`
`(text string) -> string`

URL-encodes a string (percent-encoding).

```ez
temp encoded = http.encode_url("hello world")
println(encoded)  // "hello%20world"
```

**Parameters:** `text` - The string to encode.

**Returns:** The URL-encoded string.

---

### `decode_url()`
`(text string) -> (string, error)`

Decodes a URL-encoded string.

```ez
temp decoded, err = http.decode_url("hello%20world")
if err != nil {
    println("Decode error: ${err.message}")
    return
}
println(decoded)  // "hello world"
```

**Parameters:** `text` - The URL-encoded string.

**Returns:** A tuple of `(string, error)`.

**Errors:**
- E14005 - URL decode failed

---

### `build_query()`
`(params map[string:string]) -> string`

Builds a URL query string from a map.

```ez
temp query = http.build_query({"page": "1", "limit": "10", "sort": "name"})
println(query)  // "limit=10&page=1&sort=name"
```

**Parameters:** `params` - A map of query parameters.

**Returns:** The encoded query string.

---

### `json_body()`
`(data map) -> string`

Converts a map to a JSON string for use as a request body.

```ez
temp body = http.json_body({"name": "Alice", "age": 30})
println(body)  // {"age":30,"name":"Alice"}
```

**Parameters:** `data` - A map to convert to JSON.

**Returns:** The JSON string.

---

## Status Code Constants

The `@http` module provides constants for common HTTP status codes, making code more readable:

```ez
if resp.status == http.OK {
    // Handle success
}

if resp.status == http.NOT_FOUND {
    // Handle not found
}
```

### Success (2xx)

| Constant | Value | Description |
|----------|-------|-------------|
| `http.OK` | 200 | Request succeeded |
| `http.CREATED` | 201 | Resource created |
| `http.ACCEPTED` | 202 | Request accepted for processing |
| `http.NO_CONTENT` | 204 | Success with no response body |

### Redirection (3xx)

| Constant | Value | Description |
|----------|-------|-------------|
| `http.MOVED_PERMANENTLY` | 301 | Resource moved permanently |
| `http.FOUND` | 302 | Resource found at different URL |
| `http.NOT_MODIFIED` | 304 | Resource not modified (caching) |
| `http.TEMPORARY_REDIRECT` | 307 | Temporary redirect |
| `http.PERMANENT_REDIRECT` | 308 | Permanent redirect |

### Client Errors (4xx)

| Constant | Value | Description |
|----------|-------|-------------|
| `http.BAD_REQUEST` | 400 | Malformed request |
| `http.UNAUTHORIZED` | 401 | Authentication required |
| `http.PAYMENT_REQUIRED` | 402 | Payment required |
| `http.FORBIDDEN` | 403 | Access denied |
| `http.NOT_FOUND` | 404 | Resource not found |
| `http.METHOD_NOT_ALLOWED` | 405 | HTTP method not allowed |
| `http.CONFLICT` | 409 | Request conflicts with current state |

### Server Errors (5xx)

| Constant | Value | Description |
|----------|-------|-------------|
| `http.INTERNAL_SERVER_ERROR` | 500 | Server error |
| `http.BAD_GATEWAY` | 502 | Invalid response from upstream |
| `http.SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## Error Handling

All request functions return error tuples following EZ's standard pattern:

```ez
temp resp, err = http.get(url)
if err != nil {
    println("Error code:", err.code)
    println("Error message:", err.message)
    return
}
// Use resp
```

### Error Codes

| Code | Description |
|------|-------------|
| E7001 | Wrong number of arguments |
| E7003 | Invalid argument type (expected string) |
| E7007 | Invalid argument type (expected map) |
| E14001 | Invalid URL |
| E14002 | Request failed |
| E14004 | Invalid HTTP method |
| E14005 | URL decode failed |

---

## Example Program

```ez
import @std
import @http
import @json
using std

const User struct {
    id int
    name string
    email string
}

do main() {
    // Fetch users from API
    temp resp, err = http.get("https://jsonplaceholder.typicode.com/users/1")
    if err != nil {
        println("Request failed: ${err.message}")
        return
    }

    if resp.status != http.OK {
        println("Unexpected status: ${resp.status}")
        return
    }

    // Parse JSON response
    temp user User, parse_err = json.decode(resp.body, User)
    if parse_err != nil {
        println("Parse failed: ${parse_err.message}")
        return
    }

    println("User: ${user.name}")
    println("Email: ${user.email}")

    // Access response headers
    if resp.headers["Content-Type"] != nil {
        println("Content-Type: ${resp.headers["Content-Type"][0]}")
    }
}
```

## Tips

**Use `json_body()` for JSON APIs** - When posting JSON data, use `http.json_body()` to convert maps to JSON strings:

```ez
temp resp, err = http.post(url, http.json_body({"key": "value"}))
```

**Check status codes with constants** - Use the provided constants for readable status checks:

```ez
// Instead of:
if resp.status == 200 { ... }

// Use:
if resp.status == http.OK { ... }
```

**Set custom headers for authenticated APIs** - Use `http.request()` when you need custom headers:

```ez
temp headers = {"Authorization": "Bearer ${token}"}
temp resp, err = http.request("GET", url, "", headers, 30)
```
