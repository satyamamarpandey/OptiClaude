# CLAUDE.md

## Project
This is a production software project. Prioritize correctness, maintainability, and minimal-risk changes.

## Expectations
- Keep changes small and focused.
- Do not break existing behavior unless explicitly requested.
- Respect existing folder structure and naming conventions.
- Avoid dead code, debug logs, and unnecessary abstractions.
- Prefer reusable functions/components over repeated logic.

## Workflow
- For simple or localized tasks, work directly.
- For complex or multi-step tasks, create a short plan first.
- Avoid broad refactors unless clearly required.
- When requirements are unclear, preserve current behavior and make the safest reasonable assumption.

## Token Discipline
- Keep responses lean and implementation-focused.
- Avoid restating large context unnecessarily.
- Read only the files needed for the task.
- Work in small batches for large changes.

## Memory and Continuity
- Prefer actual repository context over assumptions.
- Reuse previously established understanding when valid.
- If repository structure conflicts with prior assumptions, trust the current codebase.

## Code Quality
- Use clear naming.
- Keep functions short and single-purpose.
- Handle loading, error, and empty states where relevant.
- Keep code easy to review and revert.

## UI
- Maintain design consistency.
- Prefer clean spacing and readable typography.
- Preserve responsiveness and accessibility.

## Verification
Before finishing:
- build if applicable
- lint if applicable
- run tests if available
- summarize changes and remaining risks

## Security
- Do not expose secrets
- Validate external API usage
- Avoid unsafe shell execution unless clearly necessary

## Output
- Be explicit about what changed
- Flag anything not verified
- Mention follow-up risks briefly
