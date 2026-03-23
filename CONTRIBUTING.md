# Contributing to OptiClaude

Thanks for wanting to contribute to **OptiClaude**.

This project is a practical, beginner-friendly global Claude Code setup for Windows users. The goal is simple: make Claude Code easier to install, easier to understand, and more useful across projects and future sessions.

If you want to help improve the setup, documentation, templates, helpers, or overall contributor experience, you are welcome here.

---

## Table of Contents

- [What We're Looking For](#what-were-looking-for)
- [Project Goals](#project-goals)
- [Quick Start](#quick-start)
- [Ways to Contribute](#ways-to-contribute)
  - [README and setup flow](#readme-and-setup-flow)
  - [Templates](#templates)
  - [Helpers and hooks](#helpers-and-hooks)
  - [Settings and global configuration](#settings-and-global-configuration)
  - [Compatibility and troubleshooting](#compatibility-and-troubleshooting)
- [Repository Structure](#repository-structure)
- [Contribution Guidelines](#contribution-guidelines)
- [Testing Your Changes](#testing-your-changes)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Good First Contributions](#good-first-contributions)
- [What Not to Submit](#what-not-to-submit)
- [Questions and Suggestions](#questions-and-suggestions)

---

## What We're Looking For

We welcome contributions that make OptiClaude:

- easier for beginners to install
- more reliable on Windows
- better documented
- easier to test and verify
- more useful across different repositories
- easier to extend safely

Good contributions include:

- clearer installation steps
- better troubleshooting guidance
- improved templates
- safer helper scripts
- better defaults in `settings.json`
- better generic guidance in `CLAUDE.md`
- fixes for confusing wording or broken steps
- compatibility improvements for new Claude Code behavior

---

## Project Goals

OptiClaude is meant to be:

- **global** across current and future repositories
- **portable** across Windows machines
- **safe** for new users
- **practical** instead of overly complex
- **easy to customize** later

Contributions should support those goals.

When in doubt, prefer:

- simpler setup
- lower risk
- clearer docs
- fewer assumptions
- easier recovery if something fails

---

## Quick Start

### 1. Fork and clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/OptiClaude.git
cd OptiClaude
```

### 2. Create a branch

```bash
git checkout -b feat/my-contribution
```

### 3. Make your changes

Examples:

- update `README.md`
- improve `templates/`
- fix `helpers/`
- improve `CLAUDE.md`
- improve `settings.json`

### 4. Test locally

At minimum, verify that your changes are clear, consistent, and do not break the documented setup flow.

### 5. Commit and push

```bash
git add .
git commit -m "docs: improve setup guidance"
git push -u origin feat/my-contribution
```

### 6. Open a pull request

Explain what changed, why it helps, and how you tested it.

---

## Ways to Contribute

### README and setup flow

This is one of the highest-impact areas.

You can help by improving:

- quick-start clarity
- beginner installation flow
- command accuracy
- verification steps
- troubleshooting
- structure and readability
- wording for non-technical users

Good examples:

- simplify a setup section
- fix an incorrect command
- add a missing explanation
- improve “what to do if this fails”

---

### Templates

Templates live under:

```text
templates/
templates/data/
```

These help users structure tasks, prompts, project kickoff notes, release checklists, reviews, and other repeatable workflows.

Good template contributions include:

- clearer task templates
- better examples
- reusable prompt structures
- improved checklists
- better starter data files
- more helpful comments or instructions

A strong template should be:

- generic enough to reuse
- specific enough to be helpful
- easy to copy and edit
- free of private or user-specific details

---

### Helpers and hooks

Helpers live under:

```text
helpers/
```

Current examples include:

- `hook-handler.cjs`
- `auto-memory-hook.mjs`

Good contributions here include:

- safer logic
- cleaner error handling
- better comments
- more reliable behavior
- improvements that reduce setup friction
- better support for global session continuity

Please be careful here. Helper scripts can directly affect startup and hook behavior, so changes should be minimal, well explained, and tested.

---

### Settings and global configuration

Key files include:

- `settings.json`
- `CLAUDE.md`

Good contributions include:

- safer defaults
- more portable path handling
- clearer comments or structure
- less fragile plugin guidance
- better generic project instructions
- improvements that reduce confusion for new users

Avoid adding large numbers of optional tools to the default config unless they are clearly installable and low-risk.

---

### Compatibility and troubleshooting

This is another very valuable area.

Useful contributions include:

- Windows CMD fixes
- Git for Windows / Git Bash notes
- Claude Code version compatibility notes
- plugin troubleshooting
- MCP troubleshooting
- line-ending notes for Windows
- path-related fixes
- clearer recovery steps

If you fix a real issue you hit yourself, that is often an excellent contribution.

---

## Repository Structure

Current structure is expected to stay simple and readable.

```text
OptiClaude/
├── CLAUDE.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── settings.json
├── helpers/
│   ├── auto-memory-hook.mjs
│   └── hook-handler.cjs
└── templates/
    ├── README.md
    ├── bugfix-task.md
    ├── code-review.md
    ├── docs-update.md
    ├── feature-request.md
    ├── project-kickoff.md
    ├── prompt-improve.md
    ├── refactor-task.md
    ├── release-checklist.md
    ├── test-plan.md
    └── data/
        ├── prompts-catalog.example.json
        ├── repo-profile.example.json
        ├── session-summary.example.md
        ├── task-brief.example.json
        ├── template-usage-notes.md
        └── verification-checklist.example.json
```

If you add new files, keep naming clear and keep the structure tidy.

---

## Contribution Guidelines

Please keep contributions:

- focused
- easy to review
- easy to revert
- well explained
- aligned with the project goals

### General rules

- Keep changes small unless a larger rewrite is clearly needed.
- Do not change unrelated files in the same PR.
- Avoid broad refactors unless there is a strong reason.
- Prefer practical improvements over clever complexity.
- Preserve backward compatibility where possible.
- Explain any tradeoffs clearly in the PR.

### Documentation changes

If you update setup commands, installation steps, or troubleshooting:

- verify they actually work
- say what environment you tested on
- avoid guessing
- note anything you did not verify

### Script changes

If you update helpers or hook-related logic:

- keep changes narrow
- explain failure modes
- avoid unsafe shell behavior
- preserve portability

---

## Testing Your Changes

The project is documentation-first, but changes should still be tested in a practical way.

### For README or docs changes

Try to validate:

- commands are accurate
- paths are correct
- steps are in the right order
- the flow is understandable for a new user

### For `settings.json` changes

Check that:

- paths are portable
- enabled plugins match the documented install flow
- hook commands point to valid helper locations
- user-scope behavior is clearly documented

### For `CLAUDE.md` changes

Check that:

- the file stays generic enough for broad use
- instructions are clear and not overly repo-specific
- the tone supports safe, maintainable contributions

### For helper changes

Check that:

- the script runs
- expected files exist in the documented locations
- the behavior fails gracefully when a dependency is missing
- startup is not blocked unnecessarily

If you could not fully test something, say that clearly in the PR.

---

## Pull Request Process

### PR title examples

Use simple, descriptive titles such as:

- `docs: improve Windows installation flow`
- `docs: add plugin troubleshooting`
- `feat: add new reusable template`
- `fix: improve helper path handling`
- `fix: make settings.json more portable`
- `docs: improve contributing guide`

### PR description template

You can use this structure:

```md
## Summary
What changed and why.

## Type
- [ ] Documentation
- [ ] Template
- [ ] Helper script
- [ ] Settings/config
- [ ] CLAUDE.md improvement
- [ ] Bug fix

## Testing
What you tested, where you tested it, and any limits.

## Checklist
- [ ] Change is focused
- [ ] No sensitive data included
- [ ] Commands and paths were checked
- [ ] Docs were updated if needed
- [ ] I explained anything not fully verified
```

### Review expectations

Please expect feedback on:

- clarity
- correctness
- install reliability
- beginner-friendliness
- maintainability

---

## Style Guidelines

### For documentation

- Use simple language
- Prefer explicit steps
- Avoid unnecessary jargon
- Keep headings clear
- Prefer copy-paste-friendly commands
- Explain why a step matters when helpful

### For templates

- Keep them reusable
- Use clean section headers
- Avoid private examples
- Prefer practical prompts and checklists
- Make them easy to scan

### For scripts

- Prefer readable code
- Add comments where behavior is not obvious
- Avoid hidden side effects
- Keep error messages understandable

### File naming

Use lowercase and hyphens where appropriate.

Good examples:

- `feature-request.md`
- `release-checklist.md`
- `repo-profile.example.json`

---

## Good First Contributions

If you are new to the project, these are good places to start:

- improve one README section
- fix a typo or broken command
- improve one troubleshooting section
- add one helpful template
- improve template examples under `templates/data/`
- simplify one confusing explanation
- improve comments in a helper file
- improve wording in `CLAUDE.md`

---

## What Not to Submit

Please avoid:

- secrets, API keys, tokens, or private paths
- highly personal configuration
- untested installation commands
- repo-specific assumptions presented as universal defaults
- overly complex setup steps without strong justification
- duplicate templates with only tiny wording differences
- changes that make the beginner flow harder to follow

Also avoid adding many optional tools to the default setup unless they are clearly stable and worth the added complexity.

---

## Questions and Suggestions

If you are not sure whether an idea fits, open an issue or draft PR and explain:

- what problem you found
- what change you want to make
- why it helps users
- any tradeoffs or risks

That is enough to start a useful discussion.

---

Thanks for contributing to OptiClaude.

Good contributions here do not need to be flashy. Clearer docs, safer defaults, cleaner templates, and smoother setup steps all make a real difference.
