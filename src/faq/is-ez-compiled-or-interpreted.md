---
question: "Is EZ compiled or interpreted?"
order: 2
---

Interpreted.

## How It Works

EZ is an interpreted language. The interpreter is written in Go and executes your code directly.

```bash
ez myprogram.ez    # Runs immediately
```

This means:
- Fast iteration — change code, run it, see results
- No build step to wait for
- Easy to get started

## Why Interpreted?

Building an interpreter is significantly simpler than building a compiler. Starting interpreted allowed me to:
- Nail down the language design
- Iterate quickly on features
- Get something working and usable

Many successful languages followed this path — prove the language works, then optimize.

---
