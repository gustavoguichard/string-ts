# Statement of Work - string-ts

## Purpose

`string-ts` provides strongly typed string manipulation utilities for TypeScript. Standard string methods operate purely at runtime and lose information about literal types, as noted in the README:

```
const str = 'hello-world'
const result = str.replace('-', ' ') // you should use: as 'hello world'
//    ^? string
```

The library addresses this limitation by offering counterparts that operate both at runtime and at the type level. Using `replace` from `string-ts` preserves literal types:

```
import { replace } from 'string-ts'
const str = 'hello-world'
const result = replace(str, '-', ' ')
//    ^ 'hello world'
```

## Why it matters

TypeScript produces the best static analysis when types are specific. By keeping literal and union types intact after transformations, `string-ts` prevents accidental widening of types.

## Installation

```
npm install string-ts
```

The project is optimized for tree shaking and has been tested with Webpack, Vite and Rollup. It currently targets TypeScript v5+ and assumes ASCII-only input.

## Project Layout

- **src/native** – strongly typed counterparts of native `String.prototype` methods (e.g. `charAt`, `replace`)
- **src/utils** – additional features such as word casing (`camelCase`, `snakeCase`) and object key transformation
- **src/internal** – helper types and runtime utilities used by the rest of the codebase
- **src/index.ts** – main entry point exporting all public APIs
- **tests** – each function has dedicated Vitest tests alongside the implementation

## Design and Patterns

Functions are implemented with TypeScript generics so their return types reflect the result of the operation. For example `charAt` uses a conditional type that relies on literal checks:

```ts
export type CharAt<T extends string, index extends number> = All<[
  IsStringLiteral<T>,
  IsNumberLiteral<index>
]> extends true
  ? Split<T>[index]
  : string
```

Transformations that change object keys rely on small runtime helpers, such as `transformKeys` and `deepTransformKeys`, which check the input type and apply a provided transformation function.

## Getting Started for Contributors

1. Install dependencies with `npm install`.
2. Run the test suite using `npm test` to ensure everything passes.
3. Explore `src/index.ts` to view all exports and see how the modules are organized.
4. Review the tests located next to the implementation files for practical examples of every function.

Newcomers should read through the README for a deeper explanation of the problem domain and the available API surface.

## Utilities and Tooling

- **Vitest** for testing (`npm test`)
- **tsup** for bundling (`npm run build`)
- **Biome** (`biome.json`) for code formatting and linting

With these tools, the project maintains a clean codebase and high test coverage.

