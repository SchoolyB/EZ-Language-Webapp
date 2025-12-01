# EZ Issue Templates

Use these templates when creating issues for the EZ repository.

---

## Bug Report

**Title format:** `Bug: <Short, descriptive summary>`

```markdown
## Description

[1-3 sentences describing the bug clearly and concisely]

## Severity

**[High/Medium/Low]** - [Brief justification]

- **High**: Crashes, data corruption, core functionality broken, blocks common workflows
- **Medium**: Incorrect behavior but has workaround, affects less common use cases
- **Low**: Minor inconvenience, cosmetic issues, edge cases

## Reproduction

```ez
[Minimal EZ code that reproduces the bug]
[Remove any unnecessary code - keep it focused]
```

## Expected Behavior

[What SHOULD happen when running the code above]

## Actual Behavior

[What ACTUALLY happens - include error messages if applicable]

## Additional Context

[Optional: Any of the following if relevant]
- Related issues or error codes
- Which branch/version this was found on
- Possible fix suggestions
```

---

## Feature Request

**Title format:** `Feature: <Short, descriptive summary>`

```markdown
## Description

[1-3 sentences describing the feature and its purpose]

## Tasks

[Break down into actionable items with checkboxes]

- [ ] Task 1 description
- [ ] Task 2 description
- [ ] Task 3 description

## Proposed Syntax/Usage

```ez
[Example EZ code showing how the feature would be used]
```

## Expected Behavior

[How the feature should work when implemented]

## Notes

[Any of the following if relevant]
- Design considerations
- Related issues
- Breaking changes (if any)
```

---

## Documentation

**Title format:** `Documentation: <Short, descriptive summary>`

```markdown
## Description

[1-2 sentences describing what documentation needs to be created/updated]

## Files to Update

- [ ] `path/to/file.md` - What changes needed
- [ ] `path/to/file2.md` - What changes needed

## Content Requirements

[Describe what the documentation should cover]

## Notes

[Additional context or references]
```

---

## Tests

**Title format:** `Tests: <Short, descriptive summary>`

```markdown
## Description

[1-2 sentences describing what tests need to be written]

## Implementation

- [ ] `path/to/test_file.go` - Brief description
- [ ] `path/to/test_file2.go` - Brief description

## Test Requirements

- [Bullet points of testing requirements]
- [e.g., "Test both success and error cases"]

## Notes

[Additional context or requirements]
```

---

## Cleanup

**Title format:** `Cleanup: <Short, descriptive summary>`

```markdown
## Description

[1-2 sentences describing what needs to be cleaned up and why]

## Files Affected

- `path/to/file.go` - What to remove/change
- `path/to/file2.go` - What to remove/change

## Reason

[Why this cleanup is needed]

## Notes

[Any additional context]
```

---

## Labels

Apply appropriate labels to your issue:

| Label | Use When |
|-------|----------|
| `lexer` | Tokenization, lexical errors (E1xxx) |
| `parser` | AST construction, parse errors (E2xxx) |
| `typechecker` | Type validation, type errors (E3xxx) |
| `interpreter` | Runtime execution, runtime errors (E4xxx, E5xxx) |
| `module-system` | Imports, exports, module loading (E6xxx) |
| `stdlib` | Standard library functions |
| `tests` | Unit tests, test infrastructure |
| `breaking-change` | Changes that break existing EZ code |
| `critical` | Crashes, data loss, blocks usage |

---

## Example Bug Report

**Title:** `Bug: Negation of stdlib function results doesn't work correctly`

**Labels:** `bug`, `stdlib`, `interpreter`

```markdown
## Description

When a boolean value is returned from a stdlib function (like `maps.has()`), negating it with `!` does not work correctly. The negation always returns `false` regardless of the actual value.

## Severity

**High** - This causes subtle logic errors in user code.

## Reproduction

```ez
import & use @std
import @maps

do main() {
    temp users map[string:int] = {"alice": 25}

    temp h1 bool = maps.has(users, "charlie")  // Returns false
    println("h1 = ${h1}")       // Prints: false
    println("!h1 = ${!h1}")     // Prints: false (WRONG! Should be true)

    if !h1 {
        println("This should print but doesn't")
    }
}
```

## Expected Behavior

`!h1` should be `true` when `h1` is `false`.

## Actual Behavior

`!h1` returns `false` even when `h1` is `false`.

## Additional Context

Negation works correctly for literal booleans and user-defined function returns, but NOT for stdlib module function returns.
```
