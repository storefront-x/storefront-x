# Translate .claude/ Configuration Files to English — Design

## Overview

All Claude Code configuration files (CLAUDE.md, .claude/rules/, .claude/agents/, .claude/commands/) are currently written in Czech. Since the Storefront X framework is used across multiple countries and by developers with different language backgrounds, these files should be in English to maximize accessibility and contribution potential.

## Scope

### Files to Translate (13 files)

| File | Current Language | Lines |
|------|-----------------|-------|
| `CLAUDE.md` | Czech | ~120 |
| `.claude/rules/sfx.md` | Czech | ~90 |
| `.claude/rules/cowork.md` | Czech | ~80 |
| `.claude/rules/vue.md` | Czech | ~100 |
| `.claude/rules/tailwind.md` | Czech | ~90 |
| `.claude/rules/e2e.md` | Czech | ~60 |
| `.claude/agents/codebase-locator.md` | Czech | ~80 |
| `.claude/agents/codebase-analyzer.md` | Czech | ~90 |
| `.claude/agents/codebase-pattern-finder.md` | Czech | ~95 |
| `.claude/agents/docs-researcher.md` | Czech | ~87 |
| `.claude/agents/upgrade_notes_analyzer.md` | Czech | ~121 |
| `.claude/commands/create_plan.md` | Czech | ~148 |
| `.claude/commands/implement_plan.md` | Czech | ~101 |

### Files Already in English (no changes needed)

- `.claude/agents/pull_request_diff_fetcher.md`
- `.claude/agents/web-search-research.md`
- `.claude/skills/**` (all skills are already in English)

## Translation Rules

### What Gets Translated

- All prose text, section descriptions, explanatory comments
- Section headings (e.g., "Odpovědnosti" → "Responsibilities")
- YAML frontmatter `description` fields in agent files
- Inline comments inside code blocks (e.g., `# Hlavní způsob testování` → `# Primary way of testing`)
- Anti-pattern labels and guidance text

### What Stays Unchanged

- Code blocks (the actual code — commands, JS/TS/Vue content)
- File paths (`modules/core/src/Core.js`)
- Framework class names used as proper nouns (`IocConcept`, `GeneratingConcept`, `ExtendingConcept`, etc.)
- CLI commands (`yarn dev`, `sfx build`, `yarn lint`)
- URLs

### Key Terminology Mapping

| Czech | English |
|-------|---------|
| Koncepty | Concepts |
| IOC kontejner | IOC container |
| Bootstrap | Bootstrap (unchanged — technical term) |
| Moduly | Modules |
| Výstupní formát | Output format |
| Odpovědnosti | Responsibilities |
| Strategie | Strategy |
| Důležité pokyny | Important notes |
| Klíčové příkazy | Key commands |
| Hraniční případy | Edge cases |
| Datový tok | Data flow |
| Vstupní bod | Entry point |
| Závislosti | Dependencies |

## Implementation Approach

Sequential translation by category ensures consistent terminology:

1. **Phase 1 — CLAUDE.md** — establishes baseline terminology for the rest
2. **Phase 2 — Rules** (sfx, cowork, vue, tailwind, e2e) — development conventions
3. **Phase 3 — Agents** (codebase-locator, codebase-analyzer, codebase-pattern-finder, docs-researcher, upgrade_notes_analyzer) — agent system prompts
4. **Phase 4 — Commands** (create_plan, implement_plan) — command prompts

## Success Criteria

- All 13 files are fully translated to English
- No Czech text remains (except as literal strings inside code examples that demonstrate Czech content)
- Technical accuracy is preserved — the translated content guides Claude correctly
- YAML frontmatter `description` fields are translated (these appear in the task tool selector)
- Code blocks and file paths are unchanged
- Framework class names remain as-is
