# Task-manager
Trello-like task manager aplication in typescript, react, node.js, postgresql, typeorm (wip)



### Commit convention

#### Commit types:
- build
- ci
- chore
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

#### Full commit message:

#### **type(scope?): subject**
**scope**: What is the scope of this change (e.g. component or file name)
**subject**: Write a short, imperative tense description of the change

#### Legend:
#### commit type:  example use case
**chore**:    Other changes that don't modify src or test files
**docs**:    Documentation only changes
**feat**:   A new feature
**fix**:    A bug fix
**build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
**refactor**:  Reverts a previous commit
**revert**:    reverting commit
**perf**: A code change that improves performance
**style**:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
**test**:   Adding missing tests or correcting existing tests
**style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
**ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)

#### Commit messages examples:
**feat(navigation)**: add navigation
**chore**: run tests on travis ci
**fix(server)**: send cors headers
**feat(blog)**: add comment section
