---
include: *.md
---

# Documentation Examples Accuracy

All code examples in documentation (README files, comments, JSDoc) must be accurate and demonstrate the actual behavior of the functions.

## Requirements

1. Examples must produce the exact outputs shown in comments
2. Examples should be simple and focused on demonstrating the feature
3. Include proper syntax highlighting for code blocks
4. Maintain alphabetical ordering of sections in documentation
5. Include badges for npm version, package size, and other project metrics when appropriate

## Examples

### Good ✅

```markdown
[![NPM](https://img.shields.io/npm/v/string-ts)](https://www.npmjs.org/package/string-ts)
![Library size](https://img.shields.io/bundlephobia/minzip/string-ts)

# string-ts

Strongly-typed string functions for all!

## Usage

```typescript
import { camelCase, kebabCase } from 'string-ts';

// camelCase example
const str1 = 'hello-world';
const result1 = camelCase(str1);
//    ^ 'helloWorld'

// kebabCase example
const str2 = 'helloWorld';
const result2 = kebabCase(str2);
//    ^ 'hello-world'
```
```

### Bad ❌

```markdown
# string-ts

Strongly-typed string functions.

## Usage

```typescript
// Incorrect output
const str = 'hello-world';
const result = camelCase(str);
//    ^ 'HelloWorld' // WRONG! camelCase would produce 'helloWorld'

// Inconsistent style
const myString = 'hello-world';
const output = camelCase(myString);
```
```