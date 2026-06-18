---
layout: '../../layouts/DocsLayout.astro'
title: 'Editor Support'
description: 'Editor extensions and syntax highlighting for EZ.'
---

# Editor Support

Community-maintained extensions for writing EZ in your editor.

---

## Zed

[ez-syntax](https://github.com/SchoolyB/ez-syntax) provides syntax highlighting for the [Zed](https://zed.dev) editor.

**Features:**
- Keyword and control flow highlighting
- Primitive and sized type recognition (`int`, `i8`–`i256`, `u8`–`u256`, `f32`, `f64`)
- Built-in function highlighting (`len`, `type_of`, `panic`, `assert`, etc.)
- String interpolation and raw string support
- Module imports and `@` prefixes
- Comments (line and block)
- Number literals (decimal, hex, binary)

**Install:**

1. Clone the repository:
   ```bash
   git clone https://github.com/SchoolyB/ez-syntax.git
   ```
2. Open Zed's Command Palette (`Cmd+Shift+P` on macOS)
3. Select **"zed: install dev extension"**
4. Point to the cloned directory

Open any `.ez` file to see syntax highlighting.

---

## Tree-sitter Grammar

[tree-sitter-ez](https://github.com/SchoolyB/tree-sitter-ez) is the Tree-sitter grammar definition for EZ. It powers the Zed extension above and can be used by any editor with Tree-sitter support (Neovim, Helix, Emacs, etc.).

**Repository:** [github.com/SchoolyB/tree-sitter-ez](https://github.com/SchoolyB/tree-sitter-ez)

---
