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

## Query Functions

### `is_empty()`
`(arr [T]) -> bool`

Checks if an array is empty.

```ez
import @arrays

do main() {
    mut arr [int] = {}
    println(arrays.is_empty(arr))  // true
    arrays.append(arr, 1)
    println(arrays.is_empty(arr))  // false
}
```

**Parameters:** `arr` - The array.

**Returns:** `bool` - `true` if the array has no elements.

---

### `contains()`
`(arr [T], value T) -> bool`

Checks if an array contains a value.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3, 4, 5}
    println(arrays.contains(arr, 3))  // true
    println(arrays.contains(arr, 9))  // false
}
```

**Parameters:** `arr`, `value`.

**Returns:** `bool` - true if found.

---

### `index_of()`
`(arr [T], value T) -> int`

Returns the index of the first occurrence of a value, or -1 if not found.

```ez
import @arrays

do main() {
    mut arr [int] = {10, 20, 30, 20}
    println(arrays.index_of(arr, 20))  // 1
    println(arrays.index_of(arr, 99))  // -1
}
```

**Parameters:** `arr`, `value`.

**Returns:** `int` - Index or -1.

---

### `count()`
`(arr [T], value T) -> int`

Counts the number of occurrences of a value in an array.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3, 2, 4, 2}
    println(arrays.count(arr, 2))  // 3
    println(arrays.count(arr, 9))  // 0
}
```

**Parameters:** `arr`, `value`.

**Returns:** `int` - Number of occurrences.

---

### `is_equal()`
`(a [T], b [T]) -> bool`

Structural equality comparison. Compares length first, then elements. `T` must be a primitive (`int`, `uint`, `float`, `bool`, `char`, `byte`, sized variants) or `string`.

```ez
import @arrays

do main() {
    mut a [int] = {1, 2, 3}
    mut b [int] = {1, 2, 3}
    mut c [int] = {1, 2, 4}
    println(arrays.is_equal(a, b))  // true
    println(arrays.is_equal(a, c))  // false
}
```

**Parameters:** `a`, `b` - Two arrays to compare.

**Returns:** `bool` - `true` if arrays have the same length and elements.

> **Note:** The `==` and `!=` operators on arrays are **not allowed**. Use `arrays.is_equal(a, b)` for equality.

---

## Access Functions

### `get_first()` / `get_last()`
`(arr [T]) -> T`

Returns the first or last element of an array. Panics if the array is empty.

```ez
import @arrays

do main() {
    mut arr [int] = {10, 20, 30}
    println(arrays.get_first(arr))  // 10
    println(arrays.get_last(arr))   // 30
}
```

**Parameters:** `arr` - The array.

**Returns:** The first or last element.

---

## Modification Functions

### `append()`
`(&arr [T], value T) -> void`

Adds an element to the end of an array.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3}
    arrays.append(arr, 4)
    println(arr)  // {1, 2, 3, 4}
}
```

**Parameters:** `arr` - The array, `value` - Element to add.

**Returns:** Nothing (mutates array in place).

---

### `prepend()`
`(&arr [T], value T) -> void`

Adds an element to the beginning of an array.

```ez
import @arrays

do main() {
    mut arr [int] = {2, 3, 4}
    arrays.prepend(arr, 1)
    println(arr)  // {1, 2, 3, 4}
}
```

**Parameters:** `arr` - The array, `value` - Element to add.

**Returns:** Nothing (mutates array in place).

---

### `insert_at()`
`(&arr [T], index int, value T) -> void`

Inserts an element at a specific index.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 4}
    arrays.insert_at(arr, 2, 3)  // insert 3 at index 2
    println(arr)  // {1, 2, 3, 4}
}
```

**Parameters:** `arr`, `index`, `value`.

**Returns:** Nothing (mutates array in place).

---

### `remove_at()`
`(&arr [T], index int) -> void`

Removes the element at a specific index.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3, 4}
    arrays.remove_at(arr, 1)
    println(arr)  // {1, 3, 4}
}
```

**Parameters:** `arr`, `index`.

**Returns:** Nothing (mutates array in place).

---

### `remove()`
`(&arr [T], value T)`

Removes the first occurrence of a value from an array.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3, 2, 4}
    arrays.remove(arr, 2)
    println(arr)  // {1, 3, 2, 4}
}
```

**Parameters:** `arr` - The array, `value` - The value to remove.

**Returns:** Nothing (mutates array in place).

---

### `remove_first()`
`(&arr [T]) -> T`

Removes and returns the first element of an array. Panics if the array is empty.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3}
    mut first = arrays.remove_first(arr)
    println(first)  // 1
    println(arr)    // {2, 3}
}
```

**Parameters:** `arr` - The array.

**Returns:** The removed element.

---

### `remove_last()`
`(&arr [T]) -> T`

Removes and returns the last element of an array. Panics if the array is empty.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3}
    mut last = arrays.remove_last(arr)
    println(last)  // 3
    println(arr)   // {1, 2}
}
```

**Parameters:** `arr` - The array.

**Returns:** The removed element.

---

### `clear()`
`(&arr [T]) -> void`

Removes all elements from an array (in place).

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3}
    arrays.clear(arr)
    println(arr)  // {}
}
```

**Parameters:** `arr` - The array.

**Returns:** Nothing (mutates array in place).

---

### `fill()`
`(&arr [T], value T, count int) -> void`

Fills an array with N copies of a value.

```ez
import @arrays

do main() {
    mut arr [int] = {}
    arrays.fill(arr, 0, 5)
    println(arr)  // {0, 0, 0, 0, 0}
}
```

**Parameters:** `arr` - The array, `value` - The value to fill with, `count` - Number of copies.

**Returns:** Nothing (mutates array in place).

---

### `sort_asc()`
`(&arr [T]) -> void`

Sorts an array in ascending order (in place).

```ez
import @arrays

do main() {
    mut arr [int] = {3, 1, 4, 1, 5}
    arrays.sort_asc(arr)
    println(arr)  // {1, 1, 3, 4, 5}
}
```

**Parameters:** `arr` - The array.

**Returns:** Nothing (mutates array in place).

---

### `sort_desc()`
`(&arr [T]) -> void`

Sorts an array in descending order (in place).

```ez
import @arrays

do main() {
    mut arr [int] = {3, 1, 4, 1, 5}
    arrays.sort_desc(arr)
    println(arr)  // {5, 4, 3, 1, 1}
}
```

**Parameters:** `arr` - The array.

**Returns:** Nothing (mutates array in place).

---

## Transformation Functions

### `reverse()`
`(arr [T]) -> [T]`

Returns a reversed copy of an array.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3, 4, 5}
    mut rev = arrays.reverse(arr)
    println(rev)  // {5, 4, 3, 2, 1}
}
```

**Parameters:** `arr` - The array.

**Returns:** A new reversed array.

---

### `slice()`
`(arr [T], start int, end int) -> [T]`

Returns a portion of an array.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3, 4, 5}
    mut sub = arrays.slice(arr, 1, 4)
    println(sub)  // {2, 3, 4}
}
```

**Parameters:** `arr`, `start`, `end` (exclusive).

**Returns:** A new array with the slice.

---

### `concat()`
`(a [T], b [T]) -> [T]`

Concatenates two arrays.

```ez
import @arrays

do main() {
    mut a [int] = {1, 2}
    mut b [int] = {3, 4}
    mut c = arrays.concat(a, b)
    println(c)  // {1, 2, 3, 4}
}
```

**Parameters:** Two arrays.

**Returns:** A new concatenated array.

---

### `deduplicate()`
`(arr [T]) -> [T]`

Returns a new array with duplicate elements removed.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 2, 3, 3, 3}
    mut uniq = arrays.deduplicate(arr)
    println(uniq)  // {1, 2, 3}
}
```

**Parameters:** `arr` - The array.

**Returns:** A new array with unique elements.

---

### `flatten()`
`(arr [[T]]) -> [T]`

Flattens a 2D array into a 1D array (one level of nesting).

```ez
import @arrays

do main() {
    mut matrix [[int]] = {{1, 2}, {3, 4}, {5, 6}}
    mut flat = arrays.flatten(matrix)
    println(flat)  // {1, 2, 3, 4, 5, 6}
}
```

**Parameters:** `arr` - A 2D array to flatten.

**Returns:** A flattened 1D array.

---

### `split_every()`
`(arr [T], size int) -> [[T]]`

Splits an array into sub-arrays of the given size.

```ez
import @arrays

do main() {
    mut nums [int] = {1, 2, 3, 4, 5, 6, 7}
    mut chunks = arrays.split_every(nums, 3)
    // {{1, 2, 3}, {4, 5, 6}, {7}}
}
```

**Parameters:** `arr` - The array to split, `size` - The chunk size.

**Returns:** A 2D array of chunks.

---

### `pair()`
`(a [T], b [T]) -> [[T]]`

Pairs elements from two arrays into an array of pairs.

```ez
import @arrays

do main() {
    mut names [string] = {"Alice", "Bob"}
    mut ages [int] = {25, 30}
    mut pairs = arrays.pair(names, ages)
    // {{"Alice", 25}, {"Bob", 30}}
}
```

**Parameters:** Two arrays.

**Returns:** A 2D array of pairs.

---

## Computation Functions

### `get_sum()`
`(arr [T]) -> T`

Returns the sum of all elements in a numeric array.

```ez
import @arrays

do main() {
    mut arr [int] = {1, 2, 3, 4, 5}
    println(arrays.get_sum(arr))  // 15
}
```

**Parameters:** `arr` - A numeric array.

**Returns:** The sum.

---

### `get_min()` / `get_max()`
`(arr [T]) -> T`

Returns the minimum or maximum value in an array.

```ez
import @arrays

do main() {
    mut arr [int] = {5, 2, 8, 1, 9}
    println(arrays.get_min(arr))  // 1
    println(arrays.get_max(arr))  // 9
}
```

**Parameters:** `arr` - A numeric array.

**Returns:** The min or max value.

---

## Higher-Order Functions

### `map()`
`(arr [T], ()transform) -> [T]`

Returns a new array with `transform` applied to each element. The transform function must have signature `(T) -> T`.

```ez
import @arrays

do double(n int) -> int { return n * 2 }

do main() {
    mut nums [int] = {1, 2, 3, 4, 5}
    mut doubled = arrays.map(nums, ()double)
    println(doubled)  // {2, 4, 6, 8, 10}
}
```

**Parameters:** `arr` - The array, `transform` - A function reference `()func` of type `(T) -> T`.

**Returns:** A new transformed array.

---

### `filter()`
`(arr [T], ()predicate) -> [T]`

Returns a new array containing only elements for which `predicate` returns true. The predicate function must have signature `(T) -> bool`.

```ez
import @arrays

do is_even(n int) -> bool { return n % 2 == 0 }

do main() {
    mut nums [int] = {1, 2, 3, 4, 5, 6}
    mut evens = arrays.filter(nums, ()is_even)
    println(evens)  // {2, 4, 6}
}
```

**Parameters:** `arr` - The array, `predicate` - A function reference `()func` of type `(T) -> bool`.

**Returns:** A new filtered array.

---

### `reduce()`
`(arr [T], initial T, ()accumulator) -> T`

Reduces the array to a single value by applying `accumulator(acc, element)` for each element, starting with `initial`. The accumulator function must have signature `(T, T) -> T`.

```ez
import @arrays

do add(a int, b int) -> int { return a + b }

do main() {
    mut nums [int] = {1, 2, 3, 4, 5}
    mut total = arrays.reduce(nums, 0, ()add)
    println(total)  // 15
}
```

**Parameters:** `arr` - The array, `initial` - The starting accumulator value, `accumulator` - A function reference `()func` of type `(T, T) -> T`.

**Returns:** The final accumulated value.

---
