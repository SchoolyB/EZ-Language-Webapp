---
layout: '../../../layouts/DocsLayout.astro'
title: '@arrays'
description: 'Array manipulation and utility functions.'
---

# @arrays

The `@arrays` module provides functions for manipulating and working with arrays.

## Import

```ez
import @arrays
```

## Adding and Removing Elements

### `append()`
`(arr [type], value type) -> void`

Adds an element to the end of an array.

```ez
import @arrays

do append_to_array(){
    temp arr [int] = {1, 2, 3}
    arrays.append(arr, 4)
    std.println(arr)  // {1, 2, 3, 4}
}
```

**Parameters:** `arr` - The array, `value` - Element to add.

**Returns:** Nothing (mutates array in place).

### `pop()`
`(arr [type]) -> type`

Removes and returns the last element of an array.

```ez
import @std, @arrays

do pop_from_array(){
    temp arr [int] = {1, 2, 3}
    temp last int = arrays.pop(arr)
    std.println(last)  // 3
    std.println(arr)   // {1, 2}
}
```

**Parameters:** `arr` - The array.

**Returns:** The removed element.

**Errors:** [E9001](/language.ez/errors/E9001) if the array is empty.

### `shift()`
`(arr [type]) -> type`

Removes and returns the first element of an array.

```ez
import @std, @arrays

do main(){
    temp arr [int] = {1, 2, 3}
    temp first int = arrays.shift(arr)
    std.println(first)  // 1
    std.println(arr)    // {2, 3}
}
```

**Parameters:** `arr` - The array.

**Returns:** The removed element.

**Errors:** [E9001](/language.ez/errors/E9001) if the array is empty.

### `unshift()`
`(arr [type], value type) -> void`

Adds an element to the beginning of an array.

```ez
import @std, @arrays

do main(){
    temp arr [int] = {2, 3, 4}
    arrays.unshift(arr, 1)
    std.println(arr)  // {1, 2, 3, 4}
}
```

**Parameters:** `arr` - The array, `value` - Element to add.

**Returns:** Nothing (mutates array in place).

### `insert()`
`(arr [type], index int, value type) -> void`

Inserts an element at a specific index.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {1, 2, 4}
    arrays.insert(arr, 2, 3)  // insert 3 at index 2
    std.println(arr)  // {1, 2, 3, 4}
}
```

**Parameters:** `arr`, `index`, `value`.

**Returns:** Nothing (mutates array in place).

**Errors:** [E5003](/language.ez/errors/E5003) if the index is out of bounds.

### `remove_at()`
`(arr [type], index int) -> void`

Removes the element at a specific index.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {1, 2, 3, 4}
    arrays.remove_at(arr, 1)
    std.println(arr)  // {1, 3, 4}
}
```

**Parameters:** `arr`, `index`.

**Returns:** Nothing (mutates array in place).

**Errors:** [E5003](/language.ez/errors/E5003) if the index is out of bounds.

## Accessing Elements

### `get()`
`(arr [type], index int) -> type`

Returns the element at a specific index.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {10, 20, 30}
    temp val int = arrays.get(arr, 1)
    std.println(val)  // 20
}
```

**Parameters:** `arr`, `index`.

**Returns:** The element at the index.

**Errors:** [E5003](/language.ez/errors/E5003) if the index is out of bounds.

### `set()`
`(arr [type], index int, value type) -> void`

Sets the element at a specific index.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {1, 2, 3}
    arrays.set(arr, 1, 20)
    std.println(arr)  // {1, 20, 3}
}
```

**Parameters:** `arr`, `index`, `value`.

**Returns:** Nothing (mutates array in place).

**Errors:** [E5003](/language.ez/errors/E5003) if the index is out of bounds.

### `first()` / `last()`
`(arr [type]) -> type`

Returns the first or last element of an array.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {10, 20, 30}
    std.println(arrays.first(arr))  // 10
    std.println(arrays.last(arr))   // 30
}
```

**Parameters:** `arr` - The array.

**Returns:** The first or last element.

## Searching

### `contains()`
`(arr [type], value type) -> bool`

Checks if an array contains a value.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {1, 2, 3, 4, 5}
    std.println(arrays.contains(arr, 3))  // true
    std.println(arrays.contains(arr, 9))  // false
}
```

**Parameters:** `arr`, `value`.

**Returns:** `bool` - true if found.

### `index()`
`(arr [type], value type) -> int`

Returns the index of the first occurrence of a value, or -1 if not found.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {10, 20, 30, 20}
    std.println(arrays.index(arr, 20))  // 1
    std.println(arrays.index(arr, 99))  // -1
}
```

**Parameters:** `arr`, `value`.

**Returns:** `int` - Index or -1.

### `last_index()`
`(arr [type], value type) -> int`

Returns the index of the last occurrence of a value, or -1 if not found.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {10, 20, 30, 20}
    std.println(arrays.last_index(arr, 20))  // 3
    std.println(arrays.last_index(arr, 99))  // -1
}
```

**Parameters:** `arr`, `value`.

**Returns:** `int` - Index or -1.

## Transforming

### `reverse()`
`(arr [type]) -> void`

Reverses an array in place.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {1, 2, 3, 4, 5}
    arrays.reverse(arr)
    std.println(arr)  // {5, 4, 3, 2, 1}
}
```

**Parameters:** `arr` - The array.

**Returns:** Nothing (mutates array in place).

### `slice()`
`(arr [type], start int, end int) -> [type]`

Returns a portion of an array.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {1, 2, 3, 4, 5}
    temp sub [int] = arrays.slice(arr, 1, 4)
    std.println(sub)  // {2, 3, 4}
}
```

**Parameters:** `arr`, `start`, `end`.

**Returns:** A new array with the slice.

**Errors:** [E7004](/language.ez/errors/E7004) if indices are not integers.

### `concat()`
`(arr1 [type], arr2 [type]) -> [type]`

Concatenates two or more arrays.

```ez
import @std, @arrays

do main() {
    temp a [int] = {1, 2}
    temp b [int] = {3, 4}
    temp c [int] = arrays.concat(a, b)
    std.println(c)  // {1, 2, 3, 4}
}
```

**Parameters:** Two or more arrays.

**Returns:** A new concatenated array.

**Errors:** [E7002](/language.ez/errors/E7002) if arguments are not arrays.

### `repeat()`
`(value type, count int) -> [type]`

Creates an array with a value repeated n times.

```ez
import @std, @arrays

do main() {
    temp arr [int] = arrays.repeat(0, 5)
    std.println(arr)  // {0, 0, 0, 0, 0}
}
```

**Parameters:** `value`, `count`.

**Returns:** A new array.

**Errors:** [E7004](/language.ez/errors/E7004) if count is not an integer.

## Numeric Arrays

### `sum()`
`(arr [number]) -> number`

Returns the sum of all elements in a numeric array.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {1, 2, 3, 4, 5}
    std.println(arrays.sum(arr))  // 15
}
```

**Parameters:** `arr` - A numeric array.

**Returns:** The sum.

**Errors:** [E9002](/language.ez/errors/E9002) if the array is not numeric.

### `product()`
`(arr [number]) -> number`

Returns the product of all elements in a numeric array.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {1, 2, 3, 4, 5}
    std.println(arrays.product(arr))  // 120
}
```

**Parameters:** `arr` - A numeric array.

**Returns:** The product.

**Errors:** [E9002](/language.ez/errors/E9002) if the array is not numeric.

### `min()` / `max()`
`(arr [number]) -> number`

Returns the minimum or maximum value in an array.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {5, 2, 8, 1, 9}
    std.println(arrays.min(arr))  // 1
    std.println(arrays.max(arr))  // 9
}
```

**Parameters:** `arr` - A numeric array.

**Returns:** The min or max value.

**Errors:** [E9001](/language.ez/errors/E9001) if the array is empty.

### `avg()`
`(arr [number]) -> float`

Returns the average of a numeric array.

```ez
import @std, @arrays

do main() {
    temp arr [int] = {2, 4, 6, 8, 10}
    std.println(arrays.avg(arr))  // 6.0
}
```

**Parameters:** `arr` - A numeric array.

**Returns:** `float` - The average.

**Errors:** [E9001](/language.ez/errors/E9001) if the array is empty, [E9002](/language.ez/errors/E9002) if not numeric.

## Utilities

### `range()`
`(start int, end int, step? int) -> [int]`

Creates an array of integers in a range.

```ez
import @std, @arrays

do main() {
    temp arr [int] = arrays.range(0, 5)
    std.println(arr)  // {0, 1, 2, 3, 4}

    // With step
    temp odds [int] = arrays.range(1, 10, 2)
    std.println(odds)  // {1, 3, 5, 7, 9}
}
```

**Parameters:** `start`, `end`, optional `step`.

**Returns:** A new array of integers.

**Errors:** [E9003](/language.ez/errors/E9003) if step is zero.

### `join()`
`(arr [type], separator string) -> string`

Joins array elements into a string with a separator.

```ez
import @std, @arrays

do main() {
    temp arr [string] = {"a", "b", "c"}
    std.println(arrays.join(arr, "-"))  // "a-b-c"

    temp nums [int] = {1, 2, 3}
    std.println(arrays.join(nums, ", "))  // "1, 2, 3"
}
```

**Parameters:** `arr`, `separator`.

**Returns:** `string` - The joined string.

**Errors:** [E7003](/language.ez/errors/E7003) if separator is not a string.

### `zip()`
`(arr1 [type], arr2 [type]) -> [[type]]`

Combines two arrays into an array of pairs.

```ez
import @arrays

do main() {
    temp names [string] = {"Alice", "Bob"}
    temp ages [int] = {25, 30}
    temp pairs [[type]] = arrays.zip(names, ages)
    // {{"Alice", 25}, {"Bob", 30}}
}
```

**Parameters:** Two arrays.

**Returns:** `[[type]]` - A 2D array of pairs.

**Errors:** [E7002](/language.ez/errors/E7002) if arguments are not arrays.

### `chunk()`
`(arr [type], size int) -> [[type]]`

Splits an array into chunks of the specified size.

```ez
import @arrays

do main() {
    temp nums [int] = {1, 2, 3, 4, 5, 6, 7}
    temp chunks [[int]] = arrays.chunk(nums, 3)
    // {{1, 2, 3}, {4, 5, 6}, {7}}
}
```

**Parameters:** `arr` - The array to split, `size` - The chunk size.

**Returns:** `[[type]]` - A 2D array of chunks.

**Errors:** [E9004](/language.ez/errors/E9004) if chunk size is not greater than zero.

### `flatten()`
`(arr [[type]]) -> [type]`

Flattens a 2D array into a 1D array.

```ez
import @arrays

do main() {
    temp matrix [[int]] = {{1, 2}, {3, 4}, {5, 6}}
    temp flat [int] = arrays.flatten(matrix)
    // {1, 2, 3, 4, 5, 6}
}
```

**Parameters:** `arr` - A 2D array to flatten.

**Returns:** `[type]` - A flattened 1D array.

**Errors:** [E7002](/language.ez/errors/E7002) if argument is not a 2D array.

## Example Program

```ez
import @std
import @arrays

do main() {
    // Build a list dynamically
    temp scores [int] = {}
    arrays.append(scores, 85)
    arrays.append(scores, 92)
    arrays.append(scores, 78)
    arrays.append(scores, 95)
    arrays.append(scores, 88)

    std.println("Scores:", scores)
    std.println("Count:", len(scores))
    std.println("Sum:", arrays.sum(scores))
    std.println("Average:", arrays.avg(scores))
    std.println("Highest:", arrays.max(scores))
    std.println("Lowest:", arrays.min(scores))

    // Remove lowest score
    temp lowest_idx int = arrays.index(scores, arrays.min(scores))
    arrays.remove_at(scores, lowest_idx)

    std.println("After dropping lowest:", scores)
    std.println("New average:", arrays.avg(scores))
}
```
