# Git Commit Instructions

## Objective
Write commit messages following the Conventional Commits specification and SemVer rules.

## Format
Use this structure:

<type>[optional scope]: <short description>

[optional body]

[optional footer(s)]

## Rules
- Use lowercase commit types.
- Keep the subject line short, clear, and imperative.
- Do not end the subject with a period.
- Use the body only when additional context is needed.
- Separate subject and body with a blank line.
- Use footers for breaking changes or metadata.
- Make each commit atomic: one logical change per commit.
- Avoid mixing refactors, fixes, and features in the same commit when possible.

## Conventional Commit Types
- feat: a new feature.
- fix: a bug fix.
- docs: documentation only.
- style: formatting only, no code logic change.
- refactor: code change that neither fixes a bug nor adds a feature.
- perf: performance improvement.
- test: adding or updating tests.
- build: changes to build system or dependencies.
- ci: changes to CI configuration.
- chore: maintenance tasks.
- revert: revert a previous commit.

## SemVer Mapping
- feat => MINOR
- fix => PATCH
- any commit with BREAKING CHANGE => MAJOR

## Breaking Changes
Mark a breaking change with one of these:
- Add `!` after the type or scope.
- Add a `BREAKING CHANGE:` footer.

Examples:
- feat!: remove deprecated API
- refactor(parser)!: change token structure
- fix: handle null input
- feat(api): add pagination support

## Good Examples
- feat(auth): add login with GitHub
- fix(api): prevent crash on empty response
- docs(readme): improve setup instructions
- refactor(core): simplify cache handling
- test(user): add validation tests

## Bad Examples
- update stuff
- fixed bug
- some changes
- feat: do many things in one commit

## Atomic Commit Rule
Each commit must contain only one coherent change.
If a change touches multiple concerns, split it into separate commits.

## Optional Copilot Hint
When generating a commit message, prefer:
1. the main user-visible change,
2. the semantic impact on versioning,
3. the smallest accurate scope.
