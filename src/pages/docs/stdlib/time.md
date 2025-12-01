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

### now

Returns the current Unix timestamp in seconds.

```ez
temp timestamp int = time.now()
std.println(timestamp)  // e.g., 1701234567
```

**Returns:** `int` - Unix timestamp in seconds.

### now_ms

Returns the current Unix timestamp in milliseconds.

```ez
temp timestamp_ms int = time.now_ms()
std.println(timestamp_ms)  // e.g., 1701234567890
```

**Returns:** `int` - Unix timestamp in milliseconds.

### tick

Returns a high-precision tick count for measuring elapsed time.

```ez
temp start int = time.tick()
// ... do some work ...
temp elapsed int = time.elapsed_ms(start)
std.println("Took " + string(elapsed) + "ms")
```

**Returns:** `int` - Tick value for use with elapsed_ms.

## Sleeping

### sleep

Pauses execution for a specified number of seconds.

```ez
std.println("Starting...")
time.sleep(2)  // Wait 2 seconds
std.println("Done!")
```

**Parameters:** `seconds` - Number of seconds to sleep.

**Returns:** Nothing.

**Errors:** [E11001](/language.ez/errors/E11001) if the argument is not a number.

### sleep_ms

Pauses execution for a specified number of milliseconds.

```ez
std.println("Starting...")
time.sleep_ms(500)  // Wait 500 milliseconds
std.println("Done!")
```

**Parameters:** `milliseconds` - Number of milliseconds to sleep.

**Returns:** Nothing.

**Errors:** [E11002](/language.ez/errors/E11002) if the argument is not an integer.

## Formatting

### format

Formats a timestamp as a human-readable string.

```ez
temp ts int = time.now()

// Common formats
time.format(ts, "YYYY-MM-DD")         // "2024-12-15"
time.format(ts, "HH:mm:ss")           // "14:30:45"
time.format(ts, "YYYY-MM-DD HH:mm")   // "2024-12-15 14:30"
time.format(ts, "MMM DD, YYYY")       // "Dec 15, 2024"
```

**Parameters:** `timestamp`, `format`.

**Returns:** `string` - Formatted date string.

**Errors:** [E11003](/language.ez/errors/E11003) if format is not a string, [E11004](/language.ez/errors/E11004) if timestamp is not an integer.

### Format Tokens

- `YYYY` - 4-digit year
- `MM` - 2-digit month (01-12)
- `DD` - 2-digit day (01-31)
- `HH` - 2-digit hour (00-23)
- `mm` - 2-digit minute (00-59)
- `ss` - 2-digit second (00-59)
- `MMM` - 3-letter month name (Jan, Feb, ...)

## Parsing

### parse

Parses a date string into a Unix timestamp.

```ez
temp ts int = time.parse("2024-12-15", "YYYY-MM-DD")
std.println(ts)

temp ts2 int = time.parse("Dec 15, 2024", "MMM DD, YYYY")
std.println(ts2)
```

**Parameters:** `date_string`, `format`.

**Returns:** `int` - Unix timestamp.

**Errors:** [E11005](/language.ez/errors/E11005) if parsing fails, [E11006](/language.ez/errors/E11006) if arguments are not strings.

## Creating Timestamps

### make

Creates a timestamp from year, month, day, and optionally hour, minute, second.

```ez
// Date only (midnight)
temp ts int = time.make(2024, 12, 15)

// Date and time
temp ts2 int = time.make(2024, 12, 15, 14, 30, 0)
```

**Parameters:** `year`, `month`, `day`, [`hour`, `minute`, `second`].

**Returns:** `int` - Unix timestamp.

**Errors:** [E11007](/language.ez/errors/E11007) if arguments are not integers.

## Date Arithmetic

### add_days / add_hours / add_minutes / add_seconds

Adds time to a timestamp and returns a new timestamp.

```ez
temp today int = time.now()
temp tomorrow int = time.add_days(today, 1)
temp yesterday int = time.add_days(today, -1)

temp later int = time.add_hours(today, 5)
temp much_later int = time.add_minutes(today, 90)
```

**Parameters:** `timestamp`, `amount`.

**Returns:** `int` - New timestamp.

**Errors:** [E11008](/language.ez/errors/E11008) if timestamp is not an integer, [E11009](/language.ez/errors/E11009) if amount is not an integer.

### diff

Returns the difference between two timestamps in seconds.

```ez
temp start int = time.make(2024, 1, 1)
temp end int = time.make(2024, 12, 31)
temp diff_seconds int = time.diff(end, start)
temp diff_days int = diff_seconds / 86400
std.println("Days in 2024:", diff_days)
```

**Parameters:** `timestamp1`, `timestamp2`.

**Returns:** `int` - Difference in seconds.

**Errors:** [E11010](/language.ez/errors/E11010) if arguments are not integers.

## Date Components

### year / month / day / hour / minute / second

Extracts components from a timestamp.

```ez
temp ts int = time.now()
std.println("Year:", time.year(ts))
std.println("Month:", time.month(ts))
std.println("Day:", time.day(ts))
std.println("Hour:", time.hour(ts))
std.println("Minute:", time.minute(ts))
std.println("Second:", time.second(ts))
```

**Parameters:** `timestamp`.

**Returns:** `int` - The component value.

### weekday

Returns the day of the week (0 = Sunday, 6 = Saturday).

```ez
temp ts int = time.now()
temp day int = time.weekday(ts)

temp days [string] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}
std.println("Today is:", days[day])
```

**Parameters:** `timestamp`.

**Returns:** `int` - Day of week (0-6).

## Calendar Utilities

### is_leap_year

Checks if a year is a leap year.

```ez
std.println(time.is_leap_year(2024))  // true
std.println(time.is_leap_year(2023))  // false
```

**Parameters:** `year` - The year to check.

**Returns:** `bool` - true if leap year.

**Errors:** [E11011](/language.ez/errors/E11011) if the argument is not an integer.

### days_in_month

Returns the number of days in a given month.

```ez
std.println(time.days_in_month(2024, 2))  // 29 (leap year)
std.println(time.days_in_month(2023, 2))  // 28
std.println(time.days_in_month(2024, 12)) // 31
```

**Parameters:** `year`, `month`.

**Returns:** `int` - Number of days.

**Errors:** [E11012](/language.ez/errors/E11012) if arguments are not integers.

## Performance Timing

### elapsed_ms

Returns milliseconds elapsed since a tick value.

```ez
temp start int = time.tick()

// Do some work
for i in range(0, 1000000) {
    temp x int = i * 2
}

temp elapsed int = time.elapsed_ms(start)
std.println("Operation took " + string(elapsed) + "ms")
```

**Parameters:** `start_tick` - A tick value from time.tick().

**Returns:** `int` - Milliseconds elapsed.

**Errors:** [E11013](/language.ez/errors/E11013) if the argument is not an integer.

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
