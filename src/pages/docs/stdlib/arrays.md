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

### append / push

Adds an element to the end of an array.

```ez
temp arr [int] = {1, 2, 3}
arrays.append(arr, 4)
std.println(arr)  // {1, 2, 3, 4}

arrays.push(arr, 5)  // alias for append
```

**Parameters:** `arr` - The array, `value` - Element to add.

**Returns:** Nothing (mutates array in place).

### pop

Removes and returns the last element of an array.

```ez
temp arr [int] = {1, 2, 3}
temp last int = arrays.pop(arr)
std.println(last)  // 3
std.println(arr)   // {1, 2}
```

**Parameters:** `arr` - The array.

**Returns:** The removed element.

**Errors:** [E9001](/errors/E9001) if the array is empty.

### shift

Removes and returns the first element of an array.

```ez
temp arr [int] = {1, 2, 3}
temp first int = arrays.shift(arr)
std.println(first)  // 1
std.println(arr)    // {2, 3}
```

**Parameters:** `arr` - The array.

**Returns:** The removed element.

**Errors:** [E9002](/errors/E9002) if the array is empty.

### unshift

Adds an element to the beginning of an array.

```ez
temp arr [int] = {2, 3, 4}
arrays.unshift(arr, 1)
std.println(arr)  // {1, 2, 3, 4}
```

**Parameters:** `arr` - The array, `value` - Element to add.

**Returns:** Nothing (mutates array in place).

### insert

Inserts an element at a specific index.

```ez
temp arr [int] = {1, 2, 4}
arrays.insert(arr, 2, 3)  // insert 3 at index 2
std.println(arr)  // {1, 2, 3, 4}
```

**Parameters:** `arr`, `index`, `value`.

**Returns:** Nothing (mutates array in place).

**Errors:** [E9003](/errors/E9003) if the index is out of bounds.

### remove_at

Removes the element at a specific index.

```ez
temp arr [int] = {1, 2, 3, 4}
arrays.remove_at(arr, 1)
std.println(arr)  // {1, 3, 4}
```

**Parameters:** `arr`, `index`.

**Returns:** Nothing (mutates array in place).

**Errors:** [E9006](/errors/E9006) if the index is out of bounds.

## Accessing Elements

### get

Returns the element at a specific index.

```ez
temp arr [int] = {10, 20, 30}
temp val int = arrays.get(arr, 1)
std.println(val)  // 20
```

**Parameters:** `arr`, `index`.

**Returns:** The element at the index.

**Errors:** [E9004](/errors/E9004) if the index is out of bounds.

### set

Sets the element at a specific index.

```ez
temp arr [int] = {1, 2, 3}
arrays.set(arr, 1, 20)
std.println(arr)  // {1, 20, 3}
```

**Parameters:** `arr`, `index`, `value`.

**Returns:** Nothing (mutates array in place).

**Errors:** [E9005](/errors/E9005) if the index is out of bounds.

### first / last

Returns the first or last element of an array.

```ez
temp arr [int] = {10, 20, 30}
std.println(arrays.first(arr))  // 10
std.println(arrays.last(arr))   // 30
```

**Parameters:** `arr` - The array.

**Returns:** The first or last element.

## Searching

### contains

Checks if an array contains a value.

```ez
temp arr [int] = {1, 2, 3, 4, 5}
std.println(arrays.contains(arr, 3))  // true
std.println(arrays.contains(arr, 9))  // false
```

**Parameters:** `arr`, `value`.

**Returns:** `bool` - true if found.

### index_of

Returns the index of the first occurrence of a value, or -1 if not found.

```ez
temp arr [int] = {10, 20, 30, 20}
std.println(arrays.index_of(arr, 20))  // 1
std.println(arrays.index_of(arr, 99))  // -1
```

**Parameters:** `arr`, `value`.

**Returns:** `int` - Index or -1.

## Transforming

### reverse

Reverses an array in place.

```ez
temp arr [int] = {1, 2, 3, 4, 5}
arrays.reverse(arr)
std.println(arr)  // {5, 4, 3, 2, 1}
```

**Parameters:** `arr` - The array.

**Returns:** Nothing (mutates array in place).

### slice

Returns a portion of an array.

```ez
temp arr [int] = {1, 2, 3, 4, 5}
temp sub [int] = arrays.slice(arr, 1, 4)
std.println(sub)  // {2, 3, 4}
```

**Parameters:** `arr`, `start`, `end`.

**Returns:** A new array with the slice.

**Errors:** [E9016](/errors/E9016) if indices are not integers.

### concat

Concatenates two or more arrays.

```ez
temp a [int] = {1, 2}
temp b [int] = {3, 4}
temp c [int] = arrays.concat(a, b)
std.println(c)  // {1, 2, 3, 4}
```

**Parameters:** Two or more arrays.

**Returns:** A new concatenated array.

**Errors:** [E9014](/errors/E9014) if arguments are not arrays.

### repeat

Creates an array with a value repeated n times.

```ez
temp arr [int] = arrays.repeat(0, 5)
std.println(arr)  // {0, 0, 0, 0, 0}
```

**Parameters:** `value`, `count`.

**Returns:** A new array.

**Errors:** [E9017](/errors/E9017) if count is not an integer.

## Numeric Arrays

### sum

Returns the sum of all elements in a numeric array.

```ez
temp arr [int] = {1, 2, 3, 4, 5}
std.println(arrays.sum(arr))  // 15
```

**Parameters:** `arr` - A numeric array.

**Returns:** The sum.

**Errors:** [E9010](/errors/E9010) if the array is not numeric.

### product

Returns the product of all elements in a numeric array.

```ez
temp arr [int] = {1, 2, 3, 4, 5}
std.println(arrays.product(arr))  // 120
```

**Parameters:** `arr` - A numeric array.

**Returns:** The product.

**Errors:** [E9011](/errors/E9011) if the array is not numeric.

### min / max

Returns the minimum or maximum value in an array.

```ez
temp arr [int] = {5, 2, 8, 1, 9}
std.println(arrays.min(arr))  // 1
std.println(arrays.max(arr))  // 9
```

**Parameters:** `arr` - A numeric array.

**Returns:** The min or max value.

**Errors:** [E9007](/errors/E9007) min if array is empty, [E9008](/errors/E9008) max if array is empty.

### avg

Returns the average of a numeric array.

```ez
temp arr [int] = {2, 4, 6, 8, 10}
std.println(arrays.avg(arr))  // 6.0
```

**Parameters:** `arr` - A numeric array.

**Returns:** `float` - The average.

**Errors:** [E9009](/errors/E9009) if array is empty, [E9012](/errors/E9012) if not numeric.

## Utilities

### range

Creates an array of integers in a range.

```ez
temp arr [int] = arrays.range(0, 5)
std.println(arr)  // {0, 1, 2, 3, 4}

// With step
temp odds [int] = arrays.range(1, 10, 2)
std.println(odds)  // {1, 3, 5, 7, 9}
```

**Parameters:** `start`, `end`, optional `step`.

**Returns:** A new array of integers.

**Errors:** [E9013](/errors/E9013) if step is zero.

### join

Joins array elements into a string with a separator.

```ez
temp arr [string] = {"a", "b", "c"}
std.println(arrays.join(arr, "-"))  // "a-b-c"

temp nums [int] = {1, 2, 3}
std.println(arrays.join(nums, ", "))  // "1, 2, 3"
```

**Parameters:** `arr`, `separator`.

**Returns:** `string` - The joined string.

**Errors:** [E9018](/errors/E9018) if separator is not a string.

### zip

Combines two arrays into an array of pairs.

```ez
temp names [string] = {"Alice", "Bob"}
temp ages [int] = {25, 30}
temp pairs = arrays.zip(names, ages)
// {{"Alice", 25}, {"Bob", 30}}
```

**Parameters:** Two arrays.

**Returns:** An array of pairs.

**Errors:** [E9015](/errors/E9015) if arguments are not arrays.

## Example Program

```ez
import @std
import @arrays

do main() {
    // Build a list dynamically
    temp scores [int] = {}
    arrays.push(scores, 85)
    arrays.push(scores, 92)
    arrays.push(scores, 78)
    arrays.push(scores, 95)
    arrays.push(scores, 88)

    std.println("Scores:", scores)
    std.println("Count:", len(scores))
    std.println("Sum:", arrays.sum(scores))
    std.println("Average:", arrays.avg(scores))
    std.println("Highest:", arrays.max(scores))
    std.println("Lowest:", arrays.min(scores))

    // Remove lowest score
    temp lowest_idx int = arrays.index_of(scores, arrays.min(scores))
    arrays.remove_at(scores, lowest_idx)

    std.println("After dropping lowest:", scores)
    std.println("New average:", arrays.avg(scores))
}
```
