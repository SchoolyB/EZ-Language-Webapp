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
@time

do get_current_time() {
    mut timestamp int = time.now()
    println(timestamp)  // e.g., 1701234567
}
```

**Returns:** `int` - Unix timestamp in seconds.

### `now_ms()`
`() -> int`

Returns the current Unix timestamp in milliseconds.

```ez
@time

do get_time_milliseconds() {
    mut timestamp_ms int = time.now_ms()
    println(timestamp_ms)  // e.g., 1701234567890
}
```

**Returns:** `int` - Unix timestamp in milliseconds.

### `tick()`
`() -> int`

Returns a high-precision tick count for measuring elapsed time.

```ez
@time

do measure_elapsed_time() {
    mut start int = time.tick()
    // ... do some work ...
    mut elapsed int = time.elapsed_ms(start)
    println("Took " + string(elapsed) + "ms")
}
```

**Returns:** `int` - Tick value for use with elapsed_ms.

---

### `now_ns()`
`() -> int`

Returns the current Unix timestamp in nanoseconds.

```ez
@time

do get_time_nanoseconds() {
    mut timestamp_ns int = time.now_ns()
    println(timestamp_ns)  // e.g., 1701234567890000000
}
```

**Returns:** `int` - Unix timestamp in nanoseconds.

## Sleeping

> **Note:** The built-in functions `sleep_s()`, `sleep_ms()`, and `sleep_ns()` are also available without any import.

### `sleep()`
`(seconds number) -> void`

Pauses execution for a specified number of seconds.

```ez
@time

do sleep_demo() {
    println("Starting...")
    time.sleep(2)  // Wait 2 seconds
    println("Done!")
}
```

**Parameters:** `seconds` - Number of seconds to sleep.

**Returns:** Nothing.

**Errors:** [E7005](/EZ-Language-Webapp/errors/E7005) if the argument is not a number.

### `sleep_ms()`
`(milliseconds int) -> void`

Pauses execution for a specified number of milliseconds.

```ez
@time

do sleep_ms_demo() {
    println("Starting...")
    time.sleep_ms(500)  // Wait 500 milliseconds
    println("Done!")
}
```

**Parameters:** `milliseconds` - Number of milliseconds to sleep.

**Returns:** Nothing.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

## Formatting

### `format()`
`(timestamp int, format string) -> string`

Formats a timestamp as a human-readable string.

```ez
@time

do format_time() {
    mut ts int = time.now()

    // Common formats
    println(time.format(ts, "YYYY-MM-DD"))        // "2024-12-15"
    println(time.format(ts, "HH:mm:ss"))          // "14:30:45"
    println(time.format(ts, "YYYY-MM-DD HH:mm")) // "2024-12-15 14:30"
    println(time.format(ts, "MMM DD, YYYY"))     // "Dec 15, 2024"
}
```

**Parameters:** `timestamp`, `format`.

**Returns:** `string` - Formatted date string.

**Errors:** [E7003](/EZ-Language-Webapp/errors/E7003) if format is not a string, [E7004](/EZ-Language-Webapp/errors/E7004) if timestamp is not an integer.

### Format Tokens

- `YYYY` - 4-digit year
- `MM` - 2-digit month (01-12)
- `DD` - 2-digit day (01-31)
- `HH` - 2-digit hour (00-23)
- `mm` - 2-digit minute (00-59)
- `ss` - 2-digit second (00-59)
- `MMM` - 3-letter month name (Jan, Feb, ...)

---

### `iso()`
`([timestamp int]) -> string`

Returns a timestamp in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ). Uses current time if no argument is provided.

```ez
@time

do get_iso_time() {
    mut ts int = time.now()
    println(time.iso(ts))  // e.g., "2024-12-15T14:30:45Z"

    // Can also be called without arguments for current time
    println(time.iso())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - ISO 8601 formatted date string.

---

### `date()`
`([timestamp int]) -> string`

Returns a timestamp as a YYYY-MM-DD string. Uses current time if no argument is provided.

```ez
@time

do get_date_string() {
    mut ts int = time.now()
    println(time.date(ts))  // e.g., "2024-12-15"

    // Can also be called without arguments for current time
    println(time.date())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - Date string in YYYY-MM-DD format.

---

### `clock()`
`([timestamp int]) -> string`

Returns a timestamp as an HH:mm:ss string. Uses current time if no argument is provided.

```ez
@time

do get_clock_string() {
    mut ts int = time.now()
    println(time.clock(ts))  // e.g., "14:30:45"

    // Can also be called without arguments for current time
    println(time.clock())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - Time string in HH:mm:ss format.

## Parsing

### `parse()`
`(date_string string, format string) -> int`

Parses a date string into a Unix timestamp.

```ez
@time

do parse_date() {
    mut ts int = time.parse("2024-12-15", "YYYY-MM-DD")
    println(ts)

    mut ts2 int = time.parse("Dec 15, 2024", "MMM DD, YYYY")
    println(ts2)
}
```

**Parameters:** `date_string`, `format`.

**Returns:** `int` - Unix timestamp.

**Errors:** [E11001](/EZ-Language-Webapp/errors/E11001) if parsing fails, [E7003](/EZ-Language-Webapp/errors/E7003) if arguments are not strings.

## Creating Timestamps

### `make()`
`(year int, month int, day int, hour? int, minute? int, second? int) -> int`

Creates a timestamp from year, month, day, and optionally hour, minute, second.

```ez
import @time

do create_timestamp() {
    // Date only (midnight)
    mut ts int = time.make(2024, 12, 15)

    // Date and time
    mut ts2 int = time.make(2024, 12, 15, 14, 30, 0)
}
```

**Parameters:** `year`, `month`, `day`, [`hour`, `minute`, `second`].

**Returns:** `int` - Unix timestamp.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

## Date Arithmetic

### `add_days()` / `add_hours()` / `add_minutes()` / `add_seconds()` / `add_weeks()` / `add_months()` / `add_years()`
`(timestamp int, amount int) -> int`

Adds time to a timestamp and returns a new timestamp.

```ez
import @time

do add_time() {
    mut today int = time.now()
    mut tomorrow int = time.add_days(today, 1)
    mut yesterday int = time.add_days(today, -1)

    mut later int = time.add_hours(today, 5)
    mut much_later int = time.add_minutes(today, 90)
}
```

**Parameters:** `timestamp`, `amount`.

**Returns:** `int` - New timestamp.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `add_weeks()`
`(timestamp int, weeks int) -> int`

Adds weeks to a timestamp.

```ez
@time

do add_weeks_demo() {
    mut today int = time.now()
    mut next_week int = time.add_weeks(today, 1)
    mut last_week int = time.add_weeks(today, -1)
    println("Next week:", time.format(next_week, "YYYY-MM-DD"))
}
```

**Parameters:** `timestamp`, `weeks`.

**Returns:** `int` - New timestamp.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `add_months()`
`(timestamp int, months int) -> int`

Adds months to a timestamp.

```ez
@time

do add_months_demo() {
    mut today int = time.now()
    mut next_month int = time.add_months(today, 1)
    mut six_months_ago int = time.add_months(today, -6)
    println("Next month:", time.format(next_month, "YYYY-MM-DD"))
}
```

**Parameters:** `timestamp`, `months`.

**Returns:** `int` - New timestamp.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `add_years()`
`(timestamp int, years int) -> int`

Adds years to a timestamp.

```ez
@time

do add_years_demo() {
    mut today int = time.now()
    mut next_year int = time.add_years(today, 1)
    mut decade_ago int = time.add_years(today, -10)
    println("Next year:", time.format(next_year, "YYYY-MM-DD"))
}
```

**Parameters:** `timestamp`, `years`.

**Returns:** `int` - New timestamp.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

### `diff()`
`(timestamp1 int, timestamp2 int) -> int`

Returns the difference between two timestamps in seconds.

```ez
@time

do time_difference() {
    mut start int = time.make(2024, 1, 1)
    mut end int = time.make(2024, 12, 31)
    mut diff_seconds int = time.diff(end, start)
    mut diff_days int = diff_seconds / 86400
    println("Days in 2024:", diff_days)
}
```

**Parameters:** `timestamp1`, `timestamp2`.

**Returns:** `int` - Difference in seconds.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `diff_days()`
`(timestamp1 int, timestamp2 int) -> int`

Returns the difference between two timestamps in days.

```ez
@time

do days_between() {
    mut start int = time.make(2024, 1, 1)
    mut end int = time.make(2024, 12, 31)
    mut days int = time.diff_days(end, start)
    println("Days between:", days)
}
```

**Parameters:** `timestamp1`, `timestamp2`.

**Returns:** `int` - Difference in days.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `diff_hours()`
`(timestamp1 int, timestamp2 int) -> int`

Returns the difference between two timestamps in hours.

```ez
@time

do hours_between() {
    mut start int = time.make(2024, 1, 1)
    mut end int = time.make(2024, 1, 2)
    mut hours int = time.diff_hours(end, start)
    println("Hours between:", hours)  // 24
}
```

**Parameters:** `timestamp1`, `timestamp2`.

**Returns:** `int` - Difference in hours.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `diff_minutes()`
`(timestamp1 int, timestamp2 int) -> int`

Returns the difference between two timestamps in minutes.

```ez
@time

do minutes_between() {
    mut start int = time.make(2024, 1, 1, 12, 0, 0)
    mut end int = time.make(2024, 1, 1, 14, 30, 0)
    mut minutes int = time.diff_minutes(end, start)
    println("Minutes between:", minutes)  // 150
}
```

**Parameters:** `timestamp1`, `timestamp2`.

**Returns:** `int` - Difference in minutes.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `is_before()`
`(timestamp1 int, timestamp2 int) -> bool`

Returns true if timestamp1 is before timestamp2.

```ez
@time

do check_before() {
    mut past int = time.make(2020, 1, 1)
    mut future int = time.make(2025, 1, 1)
    println(time.is_before(past, future))  // true
    println(time.is_before(future, past))  // false
}
```

**Parameters:** `timestamp1`, `timestamp2`.

**Returns:** `bool` - true if timestamp1 is before timestamp2.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `is_after()`
`(timestamp1 int, timestamp2 int) -> bool`

Returns true if timestamp1 is after timestamp2.

```ez
@time

do check_after() {
    mut past int = time.make(2020, 1, 1)
    mut future int = time.make(2025, 1, 1)
    println(time.is_after(future, past))  // true
    println(time.is_after(past, future))  // false
}
```

**Parameters:** `timestamp1`, `timestamp2`.

**Returns:** `bool` - true if timestamp1 is after timestamp2.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

## Date Components

### `year()` / `month()` / `day()` / `hour()` / `minute()` / `second()`
`([timestamp int]) -> int`

Extracts components from a timestamp. If no timestamp is provided, uses the current time.

```ez
@time

do extract_date_parts() {
    mut ts int = time.now()
    println("Year:", time.year(ts))
    println("Month:", time.month(ts))
    println("Day:", time.day(ts))
    println("Hour:", time.hour(ts))
    println("Minute:", time.minute(ts))
    println("Second:", time.second(ts))

    // Can also be called without arguments for current time
    println("Current year:", time.year())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - The component value.

### `weekday()`
`([timestamp int]) -> int`

Returns the day of the week (0 = Sunday, 6 = Saturday).

```ez
@time

do get_weekday() {
    mut ts int = time.now()
    mut day int = time.weekday(ts)

    mut days [string] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}
    println("Today is:", days[day])
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - Day of week (0-6).

---

### `weekday_name()`
`([timestamp int]) -> string`

Returns the name of the day (e.g., "Monday"). Uses current time if no argument is provided.

```ez
@time

do get_weekday_name() {
    mut ts int = time.now()
    println(time.weekday_name(ts))  // e.g., "Monday"

    // Can also be called without arguments for current time
    println(time.weekday_name())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - Name of the day.

---

### `month_name()`
`([timestamp int]) -> string`

Returns the name of the month (e.g., "January"). Uses current time if no argument is provided.

```ez
@time

do get_month_name() {
    mut ts int = time.now()
    println(time.month_name(ts))  // e.g., "January"

    // Can also be called without arguments for current time
    println(time.month_name())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - Name of the month.

---

### `day_of_year()`
`([timestamp int]) -> int`

Returns the day of the year (1-366). Uses current time if no argument is provided.

```ez
@time

do get_day_of_year() {
    mut ts int = time.now()
    println(time.day_of_year(ts))  // e.g., 350

    // Can also be called without arguments for current time
    println(time.day_of_year())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - Day of the year (1-366).

## Calendar Utilities

### `is_leap_year()`
`(year int) -> bool`

Checks if a year is a leap year.

```ez
@time

do check_leap_year() {
    println(time.is_leap_year(2024))  // true
    println(time.is_leap_year(2023))  // false
}
```

**Parameters:** `year` - The year to check.

**Returns:** `bool` - true if leap year.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

### `days_in_month()`
`(year int, month int) -> int`

Returns the number of days in a given month.

```ez
@time

do get_days_in_month() {
    println(time.days_in_month(2024, 2))  // 29 (leap year)
    println(time.days_in_month(2023, 2))  // 28
    println(time.days_in_month(2024, 12)) // 31
}
```

**Parameters:** `year`, `month`.

**Returns:** `int` - Number of days.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `timezone()`
`() -> string`

Returns the local timezone name (e.g., "EST", "UTC").

```ez
@time

do get_timezone() {
    mut tz string = time.timezone()
    println(tz)  // e.g., "EST"
}
```

**Returns:** `string` - Local timezone name.

---

### `utc_offset()`
`() -> int`

Returns the UTC offset in seconds for the local timezone.

```ez
@time

do get_utc_offset() {
    mut offset int = time.utc_offset()
    println(offset)  // e.g., -18000 for EST (UTC-5)
}
```

**Returns:** `int` - UTC offset in seconds.

---

### `start_of_day()` / `end_of_day()`
`(timestamp int) -> int`

Returns the timestamp for the start (00:00:00) or end (23:59:59) of the day.

```ez
@time

do day_boundaries() {
    mut ts int = time.now()
    mut start int = time.start_of_day(ts)
    mut end int = time.end_of_day(ts)
    println("Start of day:", time.format(start, "YYYY-MM-DD HH:mm:ss"))
    println("End of day:", time.format(end, "YYYY-MM-DD HH:mm:ss"))
}
```

**Parameters:** `timestamp` - A Unix timestamp.

**Returns:** `int` - Timestamp for start or end of day.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

---

### `start_of_month()` / `end_of_month()`
`(timestamp int) -> int`

Returns the timestamp for the start or end of the month.

```ez
@time

do month_boundaries() {
    mut ts int = time.now()
    mut start int = time.start_of_month(ts)
    mut end int = time.end_of_month(ts)
    println("Start of month:", time.format(start, "YYYY-MM-DD"))
    println("End of month:", time.format(end, "YYYY-MM-DD"))
}
```

**Parameters:** `timestamp` - A Unix timestamp.

**Returns:** `int` - Timestamp for start or end of month.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

---

### `start_of_year()` / `end_of_year()`
`(timestamp int) -> int`

Returns the timestamp for the start or end of the year.

```ez
@time

do year_boundaries() {
    mut ts int = time.now()
    mut start int = time.start_of_year(ts)
    mut end int = time.end_of_year(ts)
    println("Start of year:", time.format(start, "YYYY-MM-DD"))
    println("End of year:", time.format(end, "YYYY-MM-DD"))
}
```

**Parameters:** `timestamp` - A Unix timestamp.

**Returns:** `int` - Timestamp for start or end of year.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

---

### `quarter()`
`([timestamp int]) -> int`

Returns the quarter of the year (1-4). Uses current time if no argument is provided.

```ez
@time

do get_quarter() {
    mut ts int = time.now()
    println(time.quarter(ts))  // e.g., 4

    // Can also be called without arguments for current time
    println(time.quarter())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - Quarter of the year (1-4).

---

### `week_of_year()`
`([timestamp int]) -> int`

Returns the ISO week number of the year (1-53). Uses current time if no argument is provided.

```ez
@time

do get_week_of_year() {
    mut ts int = time.now()
    println(time.week_of_year(ts))  // e.g., 50

    // Can also be called without arguments for current time
    println(time.week_of_year())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - ISO week number (1-53).

## Performance Timing

### `elapsed_ms()`
`(start_tick int) -> int`

Returns milliseconds elapsed since a tick value.

```ez
@time

do benchmark_operation() {
    mut start int = time.tick()

    // Do some work
    for i in range(0, 1000000) {
        mut x int = i * 2
    }

    mut elapsed int = time.elapsed_ms(start)
    println("Operation took " + string(elapsed) + "ms")
}
```

**Parameters:** `start_tick` - A tick value from time.tick().

**Returns:** `int` - Milliseconds elapsed.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

## Conversion

### `from_unix()`
`(seconds int) -> int`

Alias for identity — converts Unix seconds to a timestamp (pass-through for clarity).

```ez
@time

do convert_from_unix() {
    mut ts int = time.from_unix(1701234567)
    println(time.format(ts, "YYYY-MM-DD HH:mm:ss"))
}
```

**Parameters:** `seconds` - Unix timestamp in seconds.

**Returns:** `int` - Timestamp in seconds.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

---

### `from_unix_ms()`
`(milliseconds int) -> int`

Converts Unix milliseconds to a seconds timestamp.

```ez
@time

do convert_from_unix_ms() {
    mut ts int = time.from_unix_ms(1701234567890)
    println(time.format(ts, "YYYY-MM-DD HH:mm:ss"))
}
```

**Parameters:** `milliseconds` - Unix timestamp in milliseconds.

**Returns:** `int` - Timestamp in seconds.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

---

### `to_unix()`
`(timestamp int) -> int`

Returns the Unix timestamp in seconds (identity/pass-through).

```ez
@time

do convert_to_unix() {
    mut ts int = time.now()
    mut unix_ts int = time.to_unix(ts)
    println(unix_ts)
}
```

**Parameters:** `timestamp` - A Unix timestamp.

**Returns:** `int` - Unix timestamp in seconds.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

---

### `to_unix_ms()`
`(timestamp int) -> int`

Converts a seconds timestamp to milliseconds.

```ez
@time

do convert_to_unix_ms() {
    mut ts int = time.now()
    mut ms int = time.to_unix_ms(ts)
    println(ms)  // e.g., 1701234567000
}
```

**Parameters:** `timestamp` - A Unix timestamp in seconds.

**Returns:** `int` - Unix timestamp in milliseconds.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

## Convenience Checks

### `is_weekend()`
`([timestamp int]) -> bool`

Returns true if the timestamp falls on Saturday or Sunday. Uses current time if no argument is provided.

```ez
@time

do check_weekend() {
    mut ts int = time.now()
    if time.is_weekend(ts) {
        println("It's the weekend!")
    }

    // Can also be called without arguments for current time
    println(time.is_weekend())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `bool` - true if Saturday or Sunday.

---

### `is_weekday()`
`([timestamp int]) -> bool`

Returns true if the timestamp falls on a weekday (Monday-Friday). Uses current time if no argument is provided.

```ez
@time

do check_weekday() {
    mut ts int = time.now()
    if time.is_weekday(ts) {
        println("It's a weekday!")
    }

    // Can also be called without arguments for current time
    println(time.is_weekday())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `bool` - true if Monday through Friday.

---

### `is_today()`
`(timestamp int) -> bool`

Returns true if the timestamp is on the same date as today.

```ez
@time

do check_today() {
    mut ts int = time.now()
    println(time.is_today(ts))  // true

    mut past int = time.make(2020, 1, 1)
    println(time.is_today(past))  // false
}
```

**Parameters:** `timestamp` - A Unix timestamp.

**Returns:** `bool` - true if the timestamp is today.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

---

### `is_same_day()`
`(timestamp1 int, timestamp2 int) -> bool`

Returns true if two timestamps fall on the same calendar day.

```ez
@time

do check_same_day() {
    mut morning int = time.make(2024, 12, 15, 8, 0, 0)
    mut evening int = time.make(2024, 12, 15, 20, 0, 0)
    mut next_day int = time.make(2024, 12, 16, 8, 0, 0)

    println(time.is_same_day(morning, evening))  // true
    println(time.is_same_day(morning, next_day))  // false
}
```

**Parameters:** `timestamp1`, `timestamp2`.

**Returns:** `bool` - true if both timestamps are on the same day.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `relative()`
`(timestamp int) -> string`

Returns a human-readable relative time string (e.g., "5 minutes ago", "in 2 hours").

```ez
@time

do get_relative_time() {
    mut now int = time.now()
    mut past int = time.add_hours(now, -2)
    mut future int = time.add_minutes(now, 30)

    println(time.relative(past))    // e.g., "2 hours ago"
    println(time.relative(future))  // e.g., "in 30 minutes"
}
```

**Parameters:** `timestamp` - A Unix timestamp.

**Returns:** `string` - Human-readable relative time string.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

## Constants

The `@time` module provides constants for weekdays, months, and durations to make code more readable and avoid magic numbers.

### Weekday Constants

Use these with `time.weekday()` for readable day-of-week comparisons:

```ez
@time
using std

do main() {
    mut today int = time.weekday()
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
@time
using std

do main() {
    mut current_month int = time.month()
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
@time
using std

do main() {
    mut now int = time.now()
    mut one_hour_later int = now + time.HOUR()
    mut next_week int = now + time.WEEK()

    // Combine for complex durations
    mut timeout int = 30 * time.MINUTE()
    mut two_days int = 2 * time.DAY()
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
