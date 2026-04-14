<commit-message-guidelines>

<instruction>
Generate commit messages following the Conventional Commits specification.
This repository is the root repo of a project named jeuvideops.
It contains Git submodules for two video game repositories:
- SpaceInvaders
- TwoSpaceships
Commit messages must reflect whether the change targets:
- the root jeuvideops repository,
- a specific submodule,
- shared CI/CD logic,
- or submodule pointer updates.
</instruction>

<format>
type(optional scope): description
</format>

<scope-rules>
Use a precise scope whenever possible.

Allowed scope examples:
- jeuvideops: for changes in the root repository
- spaceinvaders: for changes specific to the SpaceInvaders submodule
- twospaceships: for changes specific to the TwoSpaceships submodule
- submodules: for updating submodule references in the root repo
- games: for changes affecting both game repositories
- ci: for generic CI/CD documentation or helpers when no single target is better
  </scope-rules>

<type-guidance>
- use ci for GitHub Actions, pipelines, workflow triggers, coverage publishing, deployments
- use build for build tooling, dependency/build environment changes
- use test for adding or updating tests
- use chore for submodule pointer updates, repository maintenance, non-functional config
- use docs for README, pipeline docs, contributor instructions
- use feat/fix/refactor only when the change affects application behavior or code structure
</type-guidance>

<submodule-rules>
If the change is about CI/CD for a specific game, prefer:
- ci(spaceinvaders): ...
- ci(twospaceships): ...
instead of:
- ci: ...

If the commit in the root repo only updates the recorded commit of a submodule, prefer:
- chore(submodules): update spaceinvaders reference
- chore(submodules): update twospaceships reference
  </submodule-rules>

<rules>
- Use imperative mood.
- Do not capitalize the first letter of the description.
- Do not end the subject line with a period.
- Keep it concise, ideally under 50 characters, max 72.
- Be specific about the impacted repository or submodule.
</rules>

<examples>
- ci(jeuvideops): add workflow for submodule validation
- ci(spaceinvaders): add pull request test pipeline
- ci(twospaceships): fix coverage artifact upload
- test(twospaceships): add collision unit tests
- chore(submodules): update twospaceships reference
- chore(submodules): update spaceinvaders reference
- ci(games): add shared pipeline for both game repos
- docs(ci): document submodule pipeline setup
</examples>

</commit-message-guidelines>
