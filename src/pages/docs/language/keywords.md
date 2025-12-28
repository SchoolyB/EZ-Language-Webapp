---
layout: '../../../layouts/DocsLayout.astro'
title: 'Keywords'
description: 'Complete reference of all EZ keywords and built-in functions.'
---

# Keywords Reference

EZ uses plain English keywords designed to be readable and beginner-friendly. If you're coming from another language, some of these will look different from what you're used to.

<div id="keyword-search" class="mb-8">
  <input
    type="search"
    id="keyword-filter"
    placeholder="Filter keywords..."
    class="w-full px-4 py-2 border border-[#e5e5e5] dark:border-[#333333] rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
  />
</div>

## Variables & Constants

### temp

Declares a mutable variable — a value that can change.

```ez
temp count int = 0
count = 10  // allowed
```

**Why "temp"?** It stands for "temporary." Use `temp` for values that will change during your program's execution, like counters, user input, or calculated results.

### const

Declares an immutable constant — a value that cannot change. Also used to define structs and enums.

```ez
const PI float = 3.14159
const MAX_SIZE int = 100

// Also used for type definitions
const Person struct {
    name string
    age int
}
```

**Why "const"?** It's short for "constant." Use `const` for values that should never change, like configuration settings, mathematical constants (PI), or type definitions.

## Functions

### do

Declares a function.

```ez
import @std

do greet(name string) {
    std.println("Hello, ${name}!")
}

do add(a, b int) -> int {
    return a + b
}
```

**Why "do"?** Functions *do* things. Reads naturally: "do greet" means "do the greet action."

### return

Exits a function and optionally returns a value.

```ez
do double(x int) -> int {
    return x * 2
}

do validate(n int) -> bool {
    if n < 0 {
        return false  // early return
    }
    return true
}
```

## Control Flow

### if

Starts a conditional block. Executes code only if the condition is true.

```ez
import @std

if score >= 90 {
    std.println("A grade!")
}
```

### or

Adds an alternative condition — like `else if` in other languages.

```ez
import @std

if score >= 90 {
    std.println("A")
} or score >= 80 {
    std.println("B")
} or score >= 70 {
    std.println("C")
}
```

**Why "or"?** Reads naturally: "if this, *or* that, *or* that."

### otherwise

The fallback case — like `else` in other languages.

```ez
import @std

if score >= 60 {
    std.println("Pass")
} otherwise {
    std.println("Fail")
}
```

**Why "otherwise"?** Reads like English: "if passing, celebrate; *otherwise*, study more."

### for

Numeric loop that iterates over a range.

```ez
import @std

for i in range(0, 5) {
    std.println(i)  // 0, 1, 2, 3, 4
}
```

### for_each

Iterates over each item in a collection.

```ez
import @std

temp names [string] = {"Alice", "Bob", "Charlie"}

for_each name in names {
    std.println("Hello, ${name}")
}
```

**Why "for_each"?** Explicit about looping over *each* item in a collection.

### as_long_as

Loops while a condition is true — like `while` in other languages.

```ez
import @std

temp count int = 0

as_long_as count < 5 {
    std.println(count)
    count++
}
```

**Why "as_long_as"?** Reads naturally: "keep going *as long as* this is true."

### loop

Infinite loop that runs until you `break` out of it.

```ez
temp attempts int = 0

loop {
    attempts++
    if attempts >= 3 {
        break
    }
}
```

### break

Immediately exits the current loop.

```ez
import @std

for i in range(0, 100) {
    if i == 5 {
        break  // stop at 5
    }
    std.println(i)
}
```

### continue

Skips to the next iteration of the loop.

```ez
import @std

for i in range(0, 10) {
    if i % 2 == 0 {
        continue  // skip even numbers
    }
    std.println(i)  // only odd numbers
}
```

### in

Used with `for` to iterate over a range, or to check if a value exists in a collection.

```ez
import @std

// In a for loop
for i in range(0, 10) {
    std.println(i)
}

// Membership check
temp nums [int] = {1, 2, 3}
if 2 in nums {
    std.println("Found it!")
}
```

### when

Starts a pattern matching block — like `switch` in other languages.

```ez
import @std

temp day int = 3

when day {
    is 1 { std.println("Monday") }
    is 2 { std.println("Tuesday") }
    is 3 { std.println("Wednesday") }
    default { std.println("Other day") }
}
```

**Why "when"?** Reads naturally: "*when* day *is* 1, do this."

### is

Specifies a case in a `when` block.

```ez
when value {
    is 1 { /* matches 1 */ }
    is 2, 3, 4 { /* matches 2, 3, or 4 */ }
    is range(5, 10) { /* matches 5-9 */ }
    default { /* fallback */ }
}
```

### default

The fallback case in a `when` block — executes when no `is` case matches.

```ez
when status {
    is "active" { /* handle active */ }
    is "pending" { /* handle pending */ }
    default { /* handle all other cases */ }
}
```

**Note:** `default` is required unless using `#strict` with an enum that has all cases covered.

## Type Conversion

### cast

Converts values between types. Works with single values and arrays.

```ez
// Single value conversion
temp x = cast(42, u8)        // int -> u8
temp y = cast(3.14, int)     // float -> int
temp z = cast(65, char)      // int -> char

// Array element-wise conversion
temp bytes [byte] = {65, 66, 67}
temp u8_arr = cast(bytes, [u8])  // [byte] -> [u8]
```

**Why "cast"?** Explicitly converts (casts) a value from one type to another.

**Note:** Although `cast()` uses function-like syntax, it is a language keyword, not a regular function. The second argument must be a valid EZ type, which the interpreter validates at check-time (before execution). This is why `cast()` is documented here rather than solely in built-in functions — though it also appears there for discoverability. See also: [cast() in Built-in Functions](/language.ez/docs/stdlib/builtins#cast).

#### Supported Conversions

| Target Type | Accepted Source Types |
|-------------|----------------------|
| `int` | int, float, string, char, byte |
| `float` | float, int, string, byte, char |
| `string` | any (uses string representation) |
| `char` | char, int, float, byte, string (len=1) |
| `byte` | byte, int, float, char, string |
| `i8/i16/i32/i64/i128/i256` | int, float, string, byte, char |
| `u8/u16/u32/u64/u128/u256` | int, float, string, byte, char |
| `f32/f64` | float, int, string, byte, char |
| `bool` | bool, int (0=false, else=true), string ("true"/"false") |

#### Array Conversions

For arrays, `cast()` applies the conversion to each element:

```ez
temp nums [int] = {1, 2, 3}
temp strs = cast(nums, [string])  // ["1", "2", "3"]
```

#### Error Handling

Invalid conversions produce errors:

```ez
// Range error with index info
temp result = cast([-1, 2, 3], [u8])
// Error: "cast failed at index 0: value -1 out of u8 range (0 to 255)"
```

## Types

### Primitive Types

| Keyword | Description |
|---------|-------------|
| `int` | Integer (whole number) |
| `float` | Floating-point (decimal) number |
| `string` | Text |
| `char` | Single character |
| `bool` | Boolean (`true` or `false`) |

```ez
temp age int = 25
temp price float = 19.99
temp name string = "Alice"
temp letter char = 'A'
temp active bool = true
```

### Sized Integers

For when you need precise control over size:

| Signed | Unsigned | Size |
|--------|----------|------|
| `i8` | `u8` | 8 bits |
| `i16` | `u16` | 16 bits |
| `i32` | `u32` | 32 bits |
| `i64` | `u64` | 64 bits |
| `i128` | `u128` | 128 bits |
| `i256` | `u256` | 256 bits |

```ez
temp byte u8 = 255
temp big i64 = 9223372036854775807
```

### struct

Defines a composite type with named fields.

```ez
const Point struct {
    x int
    y int
}

temp p Point = Point{x: 10, y: 20}
```

### enum

Defines a type with a fixed set of named values.

```ez
const Status enum {
    PENDING
    ACTIVE
    DONE
}

temp s int = Status.ACTIVE
```

### map

Key-value collection type.

```ez
temp ages map[string:int] = {
    "Alice": 30,
    "Bob": 25
}
```

## Modules

### import

Brings a module into your file. Must be at the top.

```ez
import @std
import @math, @arrays
import "./mymodule"
```

### using

Makes module contents available without a prefix.

```ez
import @std

do main() {
    using std
    println("No prefix!")  // instead of std.println()
}
```

### module

Declares that a file belongs to a module (for files you want to import).

```ez
module myutils

do helper() {
    // ...
}
```

## Visibility

By default, all user-declared functions, types, and variables are **public** — they can be accessed from other modules that import yours.

### private

Makes a declaration private to its module. Private items cannot be accessed from outside the module.

```ez
module mylib

// Private variable — only accessible within this module
private temp internal_count int = 0

// Private function — only callable within this module
private do helper() {
    internal_count++
}

// Private type — only usable within this module
private const InternalState struct {
    value int
}

// Public function (default) — accessible from other modules
do get_count() -> int {
    helper()  // can call private function internally
    return internal_count
}
```

**Why "private"?** Hides implementation details so other modules only see what they need.

## Boolean Values

### true

Boolean true value.

### false

Boolean false value.

```ez
temp isValid bool = true
temp hasError bool = false
```

## Quick Reference Table

| EZ Keyword | Other Languages | Purpose |
|------------|-----------------|---------|
| `temp` | `let`, `var` | Mutable variable |
| `const` | `const`, `final` | Immutable value |
| `do` | `function`, `func`, `fn`, `def` | Declare function |
| `or` | `else if`, `elif` | Alternative condition |
| `otherwise` | `else` | Fallback condition |
| `for_each` | `for...of`, `for...in`, `foreach` | Iterate collection |
| `as_long_as` | `while` | Conditional loop |
| `loop` | `while(true)`, `loop` | Infinite loop |
| `when` | `switch`, `match` | Pattern matching |
| `is` | `case` | Pattern case |
| `default` | `default`, `_` | Fallback case |
| `cast` | type casts, `as` | Type conversion |
| `private` | `private`, `internal` | Module-private declaration |

For attributes (`#enum`, `#flags`, `#strict`, `#suppress`), see [Attributes](/language.ez/docs/language/attributes).

<script>
  function initKeywordFilter() {
    const filterInput = document.getElementById('keyword-filter');
    if (!filterInput) return;

    filterInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase().trim();
      const content = document.querySelector('.docs-content');
      if (!content) return;

      const allElements = content.querySelectorAll('h2, h3, p, pre, table, ul, ol, div, blockquote');

      if (!query) {
        // Show everything
        allElements.forEach(function(el) {
          el.style.display = '';
        });
        return;
      }

      // Build sections: each h3 (keyword) with its following content until next heading
      let sections = [];
      let currentSection = null;

      allElements.forEach(function(el) {
        if (el.tagName === 'H2') {
          // H2 is a category header - always include it, will show if any child matches
          if (currentSection) sections.push(currentSection);
          currentSection = { heading: el, elements: [], isCategory: true, parent: null };
        } else if (el.tagName === 'H3') {
          // H3 is a keyword - this is what we filter on
          if (currentSection) sections.push(currentSection);
          currentSection = { heading: el, elements: [], isCategory: false };
        } else if (currentSection) {
          currentSection.elements.push(el);
        }
      });
      if (currentSection) sections.push(currentSection);

      // Find which h2 categories contain matching h3 keywords
      let visibleCategories = new Set();

      // First pass: determine which h3 keywords match
      sections.forEach(function(section) {
        if (!section.isCategory) {
          const headingText = section.heading.textContent.toLowerCase();
          const matches = headingText.includes(query);

          section.visible = matches;

          // Show/hide the keyword section
          section.heading.style.display = matches ? '' : 'none';
          section.elements.forEach(function(el) {
            el.style.display = matches ? '' : 'none';
          });
        }
      });

      // Second pass: show h2 categories that have visible h3 children
      let lastCategory = null;
      let categoryHasVisibleChildren = false;

      sections.forEach(function(section) {
        if (section.isCategory) {
          // Before moving to new category, update the previous one
          if (lastCategory) {
            lastCategory.heading.style.display = categoryHasVisibleChildren ? '' : 'none';
          }
          lastCategory = section;
          categoryHasVisibleChildren = false;
        } else {
          if (section.visible) {
            categoryHasVisibleChildren = true;
          }
        }
      });

      // Handle the last category
      if (lastCategory) {
        lastCategory.heading.style.display = categoryHasVisibleChildren ? '' : 'none';
      }
    });
  }

  // Initialize on load
  initKeywordFilter();

  // Re-initialize after Astro page transitions
  document.addEventListener('astro:after-swap', initKeywordFilter);
</script>
