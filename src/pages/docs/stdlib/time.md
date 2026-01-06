---
layout: '../../../layouts/DocsLayout.astro'
title: '@time'
description: 'Time, dates, timestamps, and sleeping functions.'
---

# @time

The `@time` module provides functions for working with time, dates, timestamps, and delays.
Timestamps in EZ are Unix timestamps (seconds since January 1, 1970 UTC).

## Import

```ez
import @time
```

## Current Time

### `now()`
`() -> int`

Returns the current Unix timestamp in seconds.

```ez
import @std, @time

do get_current_time() {
    temp timestamp int = time.now()
    std.println(timestamp)  // e.g., 1701234567
}
```

**Returns:** `int` - Unix timestamp in seconds.

### `now_ms()`
`() -> int`

Returns the current Unix timestamp in milliseconds.

```ez
import @std, @time

do get_time_milliseconds() {
    temp timestamp_ms int = time.now_ms()
    std.println(timestamp_ms)  // e.g., 1701234567890
}
```

**Returns:** `int` - Unix timestamp in milliseconds.

### `tick()`
`() -> int`

Returns a high-precision tick count for measuring elapsed time.

```ez
import @std, @time

do measure_elapsed_time() {
    temp start int = time.tick()
    // ... do some work ...
    temp elapsed int = time.elapsed_ms(start)
    std.println("Took " + string(elapsed) + "ms")
}
```

**Returns:** `int` - Tick value for use with elapsed_ms.

## Sleeping

### `sleep()`
`(seconds number) -> void`

Pauses execution for a specified number of seconds.

```ez
import @std, @time

do sleep_demo() {
    std.println("Starting...")
    time.sleep(2)  // Wait 2 seconds
    std.println("Done!")
}
```

**Parameters:** `seconds` - Number of seconds to sleep.

**Returns:** Nothing.

**Errors:** [E7005](/language.ez/errors/E7005) if the argument is not a number.

### `sleep_ms()`
`(milliseconds int) -> void`

Pauses execution for a specified number of milliseconds.

```ez
import @std, @time

do sleep_ms_demo() {
    std.println("Starting...")
    time.sleep_ms(500)  // Wait 500 milliseconds
    std.println("Done!")
}
```

**Parameters:** `milliseconds` - Number of milliseconds to sleep.

**Returns:** Nothing.

**Errors:** [E7004](/language.ez/errors/E7004) if the argument is not an integer.

## Formatting

### `format()`
`(timestamp int, format string) -> string`

Formats a timestamp as a human-readable string.

```ez
import @std, @time

do format_time() {
    temp ts int = time.now()

    // Common formats
    std.println(time.format(ts, "YYYY-MM-DD"))        // "2024-12-15"
    std.println(time.format(ts, "HH:mm:ss"))          // "14:30:45"
    std.println(time.format(ts, "YYYY-MM-DD HH:mm")) // "2024-12-15 14:30"
    std.println(time.format(ts, "MMM DD, YYYY"))     // "Dec 15, 2024"
}
```

**Parameters:** `timestamp`, `format`.

**Returns:** `string` - Formatted date string.

**Errors:** [E7003](/language.ez/errors/E7003) if format is not a string, [E7004](/language.ez/errors/E7004) if timestamp is not an integer.

### Format Tokens

- `YYYY` - 4-digit year
- `MM` - 2-digit month (01-12)
- `DD` - 2-digit day (01-31)
- `HH` - 2-digit hour (00-23)
- `mm` - 2-digit minute (00-59)
- `ss` - 2-digit second (00-59)
- `MMM` - 3-letter month name (Jan, Feb, ...)

## Parsing

### `parse()`
`(date_string string, format string) -> int`

Parses a date string into a Unix timestamp.

```ez
import @std, @time

do parse_date() {
    temp ts int = time.parse("2024-12-15", "YYYY-MM-DD")
    std.println(ts)

    temp ts2 int = time.parse("Dec 15, 2024", "MMM DD, YYYY")
    std.println(ts2)
}
```

**Parameters:** `date_string`, `format`.

**Returns:** `int` - Unix timestamp.

**Errors:** [E11001](/language.ez/errors/E11001) if parsing fails, [E7003](/language.ez/errors/E7003) if arguments are not strings.

## Creating Timestamps

### `make()`
`(year int, month int, day int, hour? int, minute? int, second? int) -> int`

Creates a timestamp from year, month, day, and optionally hour, minute, second.

```ez
import @time

do create_timestamp() {
    // Date only (midnight)
    temp ts int = time.make(2024, 12, 15)

    // Date and time
    temp ts2 int = time.make(2024, 12, 15, 14, 30, 0)
}
```

**Parameters:** `year`, `month`, `day`, [`hour`, `minute`, `second`].

**Returns:** `int` - Unix timestamp.

**Errors:** [E7004](/language.ez/errors/E7004) if arguments are not integers.

## Date Arithmetic

### `add_days()` / `add_hours()` / `add_minutes()` / `add_seconds()`
`(timestamp int, amount int) -> int`

Adds time to a timestamp and returns a new timestamp.

```ez
import @time

do add_time() {
    temp today int = time.now()
    temp tomorrow int = time.add_days(today, 1)
    temp yesterday int = time.add_days(today, -1)

    temp later int = time.add_hours(today, 5)
    temp much_later int = time.add_minutes(today, 90)
}
```

**Parameters:** `timestamp`, `amount`.

**Returns:** `int` - New timestamp.

**Errors:** [E7004](/language.ez/errors/E7004) if arguments are not integers.

### `diff()`
`(timestamp1 int, timestamp2 int) -> int`

Returns the difference between two timestamps in seconds.

```ez
import @std, @time

do time_difference() {
    temp start int = time.make(2024, 1, 1)
    temp end int = time.make(2024, 12, 31)
    temp diff_seconds int = time.diff(end, start)
    temp diff_days int = diff_seconds / 86400
    std.println("Days in 2024:", diff_days)
}
```

**Parameters:** `timestamp1`, `timestamp2`.

**Returns:** `int` - Difference in seconds.

**Errors:** [E7004](/language.ez/errors/E7004) if arguments are not integers.

## Date Components

### `year()` / `month()` / `day()` / `hour()` / `minute()` / `second()`
`(timestamp int) -> int`

Extracts components from a timestamp.

```ez
import @std, @time

do extract_date_parts() {
    temp ts int = time.now()
    std.println("Year:", time.year(ts))
    std.println("Month:", time.month(ts))
    std.println("Day:", time.day(ts))
    std.println("Hour:", time.hour(ts))
    std.println("Minute:", time.minute(ts))
    std.println("Second:", time.second(ts))
}
```

**Parameters:** `timestamp`.

**Returns:** `int` - The component value.

### `weekday()`
`(timestamp int) -> int`

Returns the day of the week (0 = Sunday, 6 = Saturday).

```ez
import @std, @time

do get_weekday() {
    temp ts int = time.now()
    temp day int = time.weekday(ts)

    temp days [string] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}
    std.println("Today is:", days[day])
}
```

**Parameters:** `timestamp`.

**Returns:** `int` - Day of week (0-6).

## Calendar Utilities

### `is_leap_year()`
`(year int) -> bool`

Checks if a year is a leap year.

```ez
import @std, @time

do check_leap_year() {
    std.println(time.is_leap_year(2024))  // true
    std.println(time.is_leap_year(2023))  // false
}
```

**Parameters:** `year` - The year to check.

**Returns:** `bool` - true if leap year.

**Errors:** [E7004](/language.ez/errors/E7004) if the argument is not an integer.

### `days_in_month()`
`(year int, month int) -> int`

Returns the number of days in a given month.

```ez
import @std, @time

do get_days_in_month() {
    std.println(time.days_in_month(2024, 2))  // 29 (leap year)
    std.println(time.days_in_month(2023, 2))  // 28
    std.println(time.days_in_month(2024, 12)) // 31
}
```

**Parameters:** `year`, `month`.

**Returns:** `int` - Number of days.

**Errors:** [E7004](/language.ez/errors/E7004) if arguments are not integers.

## Performance Timing

### `elapsed_ms()`
`(start_tick int) -> int`

Returns milliseconds elapsed since a tick value.

```ez
import @std, @time

do benchmark_operation() {
    temp start int = time.tick()

    // Do some work
    for i in range(0, 1000000) {
        temp x int = i * 2
    }

    temp elapsed int = time.elapsed_ms(start)
    std.println("Operation took " + string(elapsed) + "ms")
}
```

**Parameters:** `start_tick` - A tick value from time.tick().

**Returns:** `int` - Milliseconds elapsed.

**Errors:** [E7004](/language.ez/errors/E7004) if the argument is not an integer.

## Constants

The `@time` module provides constants for weekdays, months, and durations to make code more readable and avoid magic numbers.

### Weekday Constants

Use these with `time.weekday()` for readable day-of-week comparisons:

```ez
import @std, @time
using std

do main() {
    temp today int = time.weekday()
    if today == time.SATURDAY() || today == time.SUNDAY() {
        println("It's the weekend!")
    }
}
```

| Constant | Value | Description |
|----------|-------|-------------|
| `time.SUNDAY()` | 0 | Sunday |
| `time.MONDAY()` | 1 | Monday |
| `time.TUESDAY()` | 2 | Tuesday |
| `time.WEDNESDAY()` | 3 | Wednesday |
| `time.THURSDAY()` | 4 | Thursday |
| `time.FRIDAY()` | 5 | Friday |
| `time.SATURDAY()` | 6 | Saturday |

### Month Constants

Use these with `time.month()` for readable month comparisons:

```ez
import @std, @time
using std

do main() {
    temp current_month int = time.month()
    if current_month == time.DECEMBER() {
        println("Happy holidays!")
    }
}
```

| Constant | Value | Description |
|----------|-------|-------------|
| `time.JANUARY()` | 1 | January |
| `time.FEBRUARY()` | 2 | February |
| `time.MARCH()` | 3 | March |
| `time.APRIL()` | 4 | April |
| `time.MAY()` | 5 | May |
| `time.JUNE()` | 6 | June |
| `time.JULY()` | 7 | July |
| `time.AUGUST()` | 8 | August |
| `time.SEPTEMBER()` | 9 | September |
| `time.OCTOBER()` | 10 | October |
| `time.NOVEMBER()` | 11 | November |
| `time.DECEMBER()` | 12 | December |

### Duration Constants

Use these for time arithmetic with timestamps (values are in seconds):

```ez
import @std, @time
using std

do main() {
    temp now int = time.now()
    temp one_hour_later int = now + time.HOUR()
    temp next_week int = now + time.WEEK()

    // Combine for complex durations
    temp timeout int = 30 * time.MINUTE()
    temp two_days int = 2 * time.DAY()
}
```

| Constant | Value (seconds) | Description |
|----------|-----------------|-------------|
| `time.SECOND()` | 1 | One second |
| `time.MINUTE()` | 60 | One minute |
| `time.HOUR()` | 3600 | One hour |
| `time.DAY()` | 86400 | One day (24 hours) |
| `time.WEEK()` | 604800 | One week (7 days) |

---

## Example Program

```ez
import @std
import @time

do main() {
    // Current date/time
    temp now int = time.now()
    std.println("Current time:", time.format(now, "YYYY-MM-DD HH:mm:ss"))

    // Calculate age
    temp birthday int = time.make(1990, 6, 15)
    temp age_seconds int = time.diff(now, birthday)
    temp age_years int = age_seconds / (365 * 24 * 60 * 60)
    std.println("Age:", age_years, "years")

    // Future date
    temp next_week int = time.add_days(now, 7)
    std.println("Next week:", time.format(next_week, "MMM DD, YYYY"))

    // Countdown timer
    std.println("Starting 3 second countdown...")
    for i in range(3, 0, -1) {
        std.println(i)
        time.sleep(1)
    }
    std.println("Go!")

    // Performance measurement
    temp start int = time.tick()
    temp sum int = 0
    for i in range(1, 100001) {
        sum += i
    }
    temp elapsed int = time.elapsed_ms(start)
    std.println("Sum:", sum)
    std.println("Calculated in", elapsed, "ms")
}
```
