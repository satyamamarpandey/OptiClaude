# Release Checklist

Use this before shipping a meaningful change.

## Build and quality
- [ ] Project builds successfully
- [ ] Lint passes
- [ ] Tests pass
- [ ] No debug logs left behind
- [ ] No dead code introduced

## Product behavior
- [ ] Main user flow tested
- [ ] Error states tested
- [ ] Empty states checked
- [ ] Loading states checked
- [ ] Backward compatibility considered

## Security and config
- [ ] No secrets committed
- [ ] Environment variables documented
- [ ] External API usage validated
- [ ] Auth-sensitive paths reviewed
- [ ] Upload / file handling validated if relevant

## Docs and communication
- [ ] README updated if needed
- [ ] Migration or upgrade notes added if needed
- [ ] Risks and limitations documented

## Final summary
- Release scope:
- Known issues:
- Rollback plan:
