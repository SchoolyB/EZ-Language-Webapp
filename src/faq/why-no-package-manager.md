---
question: "Why doesn't EZ have a package manager?"
order: 5
---

EZ has no package manager. No `ez install`. No `ez add`. No dependency hell. This is by design.

## The Short Answer

The language is the only tool you need. Write your own code, use the stdlib, or copy what you find. That's it.

## Why Not?

### Security

Every package you install is code you didn't write running on your machine. Supply chain attacks are real — malicious packages, compromised maintainer accounts, dependency confusion attacks. When you write your own code or use the stdlib, you know exactly what's running.

### Complexity

Package managers bring tool fragmentation, lockfiles, version conflicts, and transitive dependency trees. EZ has one tool: `ez`. That's it.

### Understanding

When you write code yourself, you understand it. When you pull in a dependency, you're trusting a black box. EZ encourages you to own your code.

## How EZ Handles It

1. **The stdlib** — Built into the language. Always available. Always works.
2. **Your own code** — Write what you need. You'll understand it better anyway.
3. **Modules** — Organize your own code into files and directories.
4. **Copy what you find** — Someone wrote a function that does what you need? Copy it into your project. No dependency, no breaking changes.
5. **Suggest it for the stdlib** — If it's generally useful, propose it. If it fits EZ's philosophy, it might get added for everyone.

## What You Gain

- **Simplicity** — One tool, no ecosystem to learn
- **Security** — No supply chain attacks
- **Understanding** — You know every line of code in your project
- **Stability** — No breaking changes from upstream

---
