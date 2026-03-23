# Bug Fix Request

You are working in an existing production codebase.

## Goal
Fix the reported issue with the smallest safe change.

## Problem Summary
[Describe the bug in 2 to 5 lines.]

## Reproduction
- Expected:
- Actual:
- Steps to reproduce:
  1.
  2.
  3.

## Constraints
- Do not refactor unrelated code.
- Preserve current behavior outside the bug.
- Avoid introducing new dependencies unless clearly justified.
- Prefer fixing root cause over patching symptoms.

## What to do
1. Inspect only the files needed for this bug.
2. Identify likely root cause.
3. Propose the safest fix.
4. Implement the change.
5. Verify build, lint, tests, and edge cases if possible.
6. Summarize changed files, why the bug happened, and any remaining risk.

## Output format
- Root cause
- Files changed
- Fix summary
- Verification done
- Remaining risk
