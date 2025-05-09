---
include: package.json, .github/**
---

# Project Configuration Standards

Maintain consistent project configuration files for dependency management, CI workflows, and contributor recognition.

## Requirements

1. **Package.json**
   - Add `"sideEffects": false` to enable tree-shaking
   - Use consistent versioning syntax for dependencies (e.g., caret `^` or tilde `~`)
   - Update related packages together

2. **Dependabot**
   - Maintain a proper `.github/dependabot.yml` configuration
   - Configure all used package ecosystems (npm, github-actions)
   - Use appropriate update schedule and settings

3. **CI Workflow**
   - CI workflows should run on both push to main branch and pull requests
   - Include tests, linting, type checking, and build steps
   - Test against all supported TypeScript versions

4. **All Contributors**
   - Use the All Contributors spec to recognize all types of contributions
   - Maintain the `.all-contributorsrc` file
   - Include the contributors section in the README

## Examples

### Good ✅

```json
// package.json
{
  "name": "string-ts",
  "version": "1.0.0",
  "sideEffects": false,
  "devDependencies": {
    "@vitest/coverage-v8": "^1.5.2",
    "typescript": "^5.4.5"
  }
}
```

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "daily"
```

```yaml
# .github/workflows/main.yml
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test
      - run: npm run lint
      - run: npm run tsc
      - run: npm run build
```

### Bad ❌

```json
// package.json with inconsistent versioning
{
  "devDependencies": {
    "@vitest/coverage-v8": "^3.0.5", 
    "typescript": "~5.7.3",
    "vitest": "2.0.1" 
  }
}
```

```yaml
# Missing or incomplete dependabot.yml
updates:
  - package-ecosystem: "npm"
    directory: "/"
    # Missing version and schedule
```

```yaml
# Incomplete CI workflow
on:
  push:
    branches: [main]
# Missing pull_request trigger

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run test
      # Missing linting, type checking, and build steps
```