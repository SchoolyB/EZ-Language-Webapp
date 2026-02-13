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

---

### `now_ns()`
`() -> int`

Returns the current Unix timestamp in nanoseconds.

```ez
import @std, @time

do get_time_nanoseconds() {
    temp timestamp_ns int = time.now_ns()
    std.println(timestamp_ns)  // e.g., 1701234567890000000
}
```

**Returns:** `int` - Unix timestamp in nanoseconds.

## Sleeping

> **Note:** The `@std` module also provides [`sleep_seconds()`](/EZ-Language-Webapp/docs/stdlib/std), [`sleep_milliseconds()`](/EZ-Language-Webapp/docs/stdlib/std), and [`sleep_nanoseconds()`](/EZ-Language-Webapp/docs/stdlib/std) functions. Use whichever module you already have imported.

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

**Errors:** [E7005](/EZ-Language-Webapp/errors/E7005) if the argument is not a number.

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

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

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
import @std, @time

do get_iso_time() {
    temp ts int = time.now()
    std.println(time.iso(ts))  // e.g., "2024-12-15T14:30:45Z"

    // Can also be called without arguments for current time
    std.println(time.iso())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - ISO 8601 formatted date string.

---

### `date()`
`([timestamp int]) -> string`

Returns a timestamp as a YYYY-MM-DD string. Uses current time if no argument is provided.

```ez
import @std, @time

do get_date_string() {
    temp ts int = time.now()
    std.println(time.date(ts))  // e.g., "2024-12-15"

    // Can also be called without arguments for current time
    std.println(time.date())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - Date string in YYYY-MM-DD format.

---

### `clock()`
`([timestamp int]) -> string`

Returns a timestamp as an HH:mm:ss string. Uses current time if no argument is provided.

```ez
import @std, @time

do get_clock_string() {
    temp ts int = time.now()
    std.println(time.clock(ts))  // e.g., "14:30:45"

    // Can also be called without arguments for current time
    std.println(time.clock())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - Time string in HH:mm:ss format.

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

**Errors:** [E11001](/EZ-Language-Webapp/errors/E11001) if parsing fails, [E7003](/EZ-Language-Webapp/errors/E7003) if arguments are not strings.

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

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

## Date Arithmetic

### `add_days()` / `add_hours()` / `add_minutes()` / `add_seconds()` / `add_weeks()` / `add_months()` / `add_years()`
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

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `add_weeks()`
`(timestamp int, weeks int) -> int`

Adds weeks to a timestamp.

```ez
import @std, @time

do add_weeks_demo() {
    temp today int = time.now()
    temp next_week int = time.add_weeks(today, 1)
    temp last_week int = time.add_weeks(today, -1)
    std.println("Next week:", time.format(next_week, "YYYY-MM-DD"))
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
import @std, @time

do add_months_demo() {
    temp today int = time.now()
    temp next_month int = time.add_months(today, 1)
    temp six_months_ago int = time.add_months(today, -6)
    std.println("Next month:", time.format(next_month, "YYYY-MM-DD"))
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
import @std, @time

do add_years_demo() {
    temp today int = time.now()
    temp next_year int = time.add_years(today, 1)
    temp decade_ago int = time.add_years(today, -10)
    std.println("Next year:", time.format(next_year, "YYYY-MM-DD"))
}
```

**Parameters:** `timestamp`, `years`.

**Returns:** `int` - New timestamp.

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

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

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `diff_days()`
`(timestamp1 int, timestamp2 int) -> int`

Returns the difference between two timestamps in days.

```ez
import @std, @time

do days_between() {
    temp start int = time.make(2024, 1, 1)
    temp end int = time.make(2024, 12, 31)
    temp days int = time.diff_days(end, start)
    std.println("Days between:", days)
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
import @std, @time

do hours_between() {
    temp start int = time.make(2024, 1, 1)
    temp end int = time.make(2024, 1, 2)
    temp hours int = time.diff_hours(end, start)
    std.println("Hours between:", hours)  // 24
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
import @std, @time

do minutes_between() {
    temp start int = time.make(2024, 1, 1, 12, 0, 0)
    temp end int = time.make(2024, 1, 1, 14, 30, 0)
    temp minutes int = time.diff_minutes(end, start)
    std.println("Minutes between:", minutes)  // 150
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
import @std, @time

do check_before() {
    temp past int = time.make(2020, 1, 1)
    temp future int = time.make(2025, 1, 1)
    std.println(time.is_before(past, future))  // true
    std.println(time.is_before(future, past))  // false
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
import @std, @time

do check_after() {
    temp past int = time.make(2020, 1, 1)
    temp future int = time.make(2025, 1, 1)
    std.println(time.is_after(future, past))  // true
    std.println(time.is_after(past, future))  // false
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
import @std, @time

do extract_date_parts() {
    temp ts int = time.now()
    std.println("Year:", time.year(ts))
    std.println("Month:", time.month(ts))
    std.println("Day:", time.day(ts))
    std.println("Hour:", time.hour(ts))
    std.println("Minute:", time.minute(ts))
    std.println("Second:", time.second(ts))

    // Can also be called without arguments for current time
    std.println("Current year:", time.year())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - The component value.

### `weekday()`
`([timestamp int]) -> int`

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

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - Day of week (0-6).

---

### `weekday_name()`
`([timestamp int]) -> string`

Returns the name of the day (e.g., "Monday"). Uses current time if no argument is provided.

```ez
import @std, @time

do get_weekday_name() {
    temp ts int = time.now()
    std.println(time.weekday_name(ts))  // e.g., "Monday"

    // Can also be called without arguments for current time
    std.println(time.weekday_name())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - Name of the day.

---

### `month_name()`
`([timestamp int]) -> string`

Returns the name of the month (e.g., "January"). Uses current time if no argument is provided.

```ez
import @std, @time

do get_month_name() {
    temp ts int = time.now()
    std.println(time.month_name(ts))  // e.g., "January"

    // Can also be called without arguments for current time
    std.println(time.month_name())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `string` - Name of the month.

---

### `day_of_year()`
`([timestamp int]) -> int`

Returns the day of the year (1-366). Uses current time if no argument is provided.

```ez
import @std, @time

do get_day_of_year() {
    temp ts int = time.now()
    std.println(time.day_of_year(ts))  // e.g., 350

    // Can also be called without arguments for current time
    std.println(time.day_of_year())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - Day of the year (1-366).

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

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

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

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if arguments are not integers.

---

### `timezone()`
`() -> string`

Returns the local timezone name (e.g., "EST", "UTC").

```ez
import @std, @time

do get_timezone() {
    temp tz string = time.timezone()
    std.println(tz)  // e.g., "EST"
}
```

**Returns:** `string` - Local timezone name.

---

### `utc_offset()`
`() -> int`

Returns the UTC offset in seconds for the local timezone.

```ez
import @std, @time

do get_utc_offset() {
    temp offset int = time.utc_offset()
    std.println(offset)  // e.g., -18000 for EST (UTC-5)
}
```

**Returns:** `int` - UTC offset in seconds.

---

### `start_of_day()` / `end_of_day()`
`(timestamp int) -> int`

Returns the timestamp for the start (00:00:00) or end (23:59:59) of the day.

```ez
import @std, @time

do day_boundaries() {
    temp ts int = time.now()
    temp start int = time.start_of_day(ts)
    temp end int = time.end_of_day(ts)
    std.println("Start of day:", time.format(start, "YYYY-MM-DD HH:mm:ss"))
    std.println("End of day:", time.format(end, "YYYY-MM-DD HH:mm:ss"))
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
import @std, @time

do month_boundaries() {
    temp ts int = time.now()
    temp start int = time.start_of_month(ts)
    temp end int = time.end_of_month(ts)
    std.println("Start of month:", time.format(start, "YYYY-MM-DD"))
    std.println("End of month:", time.format(end, "YYYY-MM-DD"))
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
import @std, @time

do year_boundaries() {
    temp ts int = time.now()
    temp start int = time.start_of_year(ts)
    temp end int = time.end_of_year(ts)
    std.println("Start of year:", time.format(start, "YYYY-MM-DD"))
    std.println("End of year:", time.format(end, "YYYY-MM-DD"))
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
import @std, @time

do get_quarter() {
    temp ts int = time.now()
    std.println(time.quarter(ts))  // e.g., 4

    // Can also be called without arguments for current time
    std.println(time.quarter())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - Quarter of the year (1-4).

---

### `week_of_year()`
`([timestamp int]) -> int`

Returns the ISO week number of the year (1-53). Uses current time if no argument is provided.

```ez
import @std, @time

do get_week_of_year() {
    temp ts int = time.now()
    std.println(time.week_of_year(ts))  // e.g., 50

    // Can also be called without arguments for current time
    std.println(time.week_of_year())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `int` - ISO week number (1-53).

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

**Errors:** [E7004](/EZ-Language-Webapp/errors/E7004) if the argument is not an integer.

## Conversion

### `from_unix()`
`(seconds int) -> int`

Alias for identity — converts Unix seconds to a timestamp (pass-through for clarity).

```ez
import @std, @time

do convert_from_unix() {
    temp ts int = time.from_unix(1701234567)
    std.println(time.format(ts, "YYYY-MM-DD HH:mm:ss"))
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
import @std, @time

do convert_from_unix_ms() {
    temp ts int = time.from_unix_ms(1701234567890)
    std.println(time.format(ts, "YYYY-MM-DD HH:mm:ss"))
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
import @std, @time

do convert_to_unix() {
    temp ts int = time.now()
    temp unix_ts int = time.to_unix(ts)
    std.println(unix_ts)
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
import @std, @time

do convert_to_unix_ms() {
    temp ts int = time.now()
    temp ms int = time.to_unix_ms(ts)
    std.println(ms)  // e.g., 1701234567000
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
import @std, @time

do check_weekend() {
    temp ts int = time.now()
    if time.is_weekend(ts) {
        std.println("It's the weekend!")
    }

    // Can also be called without arguments for current time
    std.println(time.is_weekend())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `bool` - true if Saturday or Sunday.

---

### `is_weekday()`
`([timestamp int]) -> bool`

Returns true if the timestamp falls on a weekday (Monday-Friday). Uses current time if no argument is provided.

```ez
import @std, @time

do check_weekday() {
    temp ts int = time.now()
    if time.is_weekday(ts) {
        std.println("It's a weekday!")
    }

    // Can also be called without arguments for current time
    std.println(time.is_weekday())
}
```

**Parameters:** `timestamp` *(optional)* - A Unix timestamp. Defaults to current time.

**Returns:** `bool` - true if Monday through Friday.

---

### `is_today()`
`(timestamp int) -> bool`

Returns true if the timestamp is on the same date as today.

```ez
import @std, @time

do check_today() {
    temp ts int = time.now()
    std.println(time.is_today(ts))  // true

    temp past int = time.make(2020, 1, 1)
    std.println(time.is_today(past))  // false
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
import @std, @time

do check_same_day() {
    temp morning int = time.make(2024, 12, 15, 8, 0, 0)
    temp evening int = time.make(2024, 12, 15, 20, 0, 0)
    temp next_day int = time.make(2024, 12, 16, 8, 0, 0)

    std.println(time.is_same_day(morning, evening))  // true
    std.println(time.is_same_day(morning, next_day))  // false
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
import @std, @time

do get_relative_time() {
    temp now int = time.now()
    temp past int = time.add_hours(now, -2)
    temp future int = time.add_minutes(now, 30)

    std.println(time.relative(past))    // e.g., "2 hours ago"
    std.println(time.relative(future))  // e.g., "in 30 minutes"
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
