# Strongly-typed string functions for all!

![A demonstration of string-ts](https://github.com/gustavoguichard/string-ts/assets/566971/0aa5603f-871d-4eb7-8ace-6a73466cec4d)

## 😬 The problem

When you are working with literal strings, the string manipulation functions only work at the runtime level and the types don't follow those transformations.
You end up losing type information and possibly having to cast the result.

```ts
const str = 'hello-world'
const result = str.replace('-', ' ') // you should use: as 'hello world'
//    ^? string
```

## 🤓 The solution

This library aims to solve this problem by providing a set of common functions that work with literal strings at both type and runtime level.

```ts
import { replace } from 'string-ts'

const str = 'hello-world'
const result = replace(str, '-', ' ')
//    ^ 'hello world'
```

## 🔍 Why this matters

TypeScript yields the best static analysis when types are highly specific.
Literals are more specific than type `string`.
This library preserves literals (and unions of literals) after transformations, unlike most existing utility libraries (and built-in string methods.)

## In-depth example

In the below example, I want to get a strongly-typed, camel-case version of `process.env`.
One flow results in a loose type, and the other results in a more precise type.
This example should illustrate the highly-specific and flexible nature of `string-ts`.

```ts
import { deepCamelKeys } from 'string-ts'
import { camelCase, mapKeys } from 'lodash-es'
import z from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.string(),
})

function getEnvLoose() {
  const rawEnv = EnvSchema.parse(process.env)
  const env = mapKeys(rawEnv, (_v, k) => camelCase(k))
  //    ^? Dictionary<string>

  // `Dictionary<string>` is too loose
  // TypeScript is okay with this, 'abc' is expected to be of type `string`
  // This will have unexpected behavior at runtime
  console.log(env.abc)
}

function getEnvPrecise() {
  const rawEnv = EnvSchema.parse(process.env)
  const env = deepCamelKeys(rawEnv)
  //    ^? { nodeEnv: string }

  // Error: Property 'abc' does not exist on type '{ nodeEnv: string; }'
  // Our type is more specific, so TypeScript catches this error.
  // This mistake will be caught at compile time
  console.log(env.abc)
}

function main() {
  getEnvLoose()
  getEnvPrecise()
}

main()
```

## 📦 Installation

```bash
npm install string-ts
```

---

# 📖 API

- [Runtime counterparts of native type utilities](#runtime-counterparts-of-native-type-utilities)
  - [capitalize](#capitalize)
  - [uncapitalize](#uncapitalize)
- [Strongly-typed alternatives to native runtime utilities](#strongly-typed-alternatives-to-native-runtime-utilities)
  - [charAt](#charat)
  - [concat](#concat)
  - [endsWith](#endsWith)
  - [join](#join)
  - [length](#length)
  - [replace](#replace)
  - [replaceAll](#replaceall)
  - [slice](#slice)
  - [split](#split)
  - [startsWith](#startsWith)
  - [toLowerCase](#tolowercase)
  - [toUpperCase](#touppercase)
  - [trim](#trim)
  - [trimEnd](#trimend)
  - [trimStart](#trimstart)
- [Strongly-typed alternatives to common loosely-typed functions](#strongly-typed-alternatives-to-common-loosely-typed-functions)
  - [toCamelCase](#tocamelcase)
  - [toConstantCase](#toconstantcase)
  - [toDelimiterCase](#todelimitercase)
  - [toKebabCase](#tokebabcase)
  - [toPascalCase](#topascalcase)
  - [toSnakeCase](#tosnakecase)
  - [toTitleCase](#totitlecase)
  - [words](#words)
- [Strongly-typed shallow transformation of objects](#strongly-typed-shallow-transformation-of-objects)
  - [camelKeys](#camelkeys)
  - [constantKeys](#constantkeys)
  - [delimiterKeys](#delimiterkeys)
  - [kebabKeys](#kebabkeys)
  - [pascalKeys](#pascalkeys)
  - [snakeKeys](#snakekeys)
- [Strongly-typed deep transformation of objects](#strongly-typed-deep-transformation-of-objects)
  - [deepCamelKeys](#deepcamelkeys)
  - [deepConstantKeys](#deepconstantkeys)
  - [deepDelimiterKeys](#deepdelimiterkeys)
  - [deepKebabKeys](#deepkebabkeys)
  - [deepPascalKeys](#deeppascalkeys)
  - [deepSnakeKeys](#deepsnakekeys)
- [Type Utilities](#type-utilities)
  - [Native TS type utilities](#native-ts-type-utilities)
  - [General Type utilities from this library](#general-type-utilities-from-this-library)
  - [Casing type utilities](#casing-type-utilities)
  - [Other exported type utilities](#other-exported-type-utilities)
- [Runtime-only utilities](#runtime-only-utilities)
  - [deepTransformKeys](#deeptransformkeys)

---

## Runtime counterparts of native type utilities

### capitalize

Capitalizes the first letter of a string. This is a runtime counterpart of `Capitalize<T>` from `src/types.d.ts`.

```ts
import { capitalize } from 'string-ts'

const str = 'hello world'
const result = capitalize(str)
//    ^ 'Hello world'
```

### uncapitalize

Uncapitalizes the first letter of a string. This is a runtime counterpart of `Uncapitalize<T>` from `src/types.d.ts`.

```ts
import { uncapitalize } from 'string-ts'

const str = 'Hello world'
const result = uncapitalize(str)
//    ^ 'hello world'
```

## Strongly-typed alternatives to native runtime utilities

### charAt

This function is a strongly-typed counterpart of `String.prototype.charAt`.

```ts
import { charAt } from 'string-ts'

const str = 'hello world'
const result = charAt(str, 6)
//    ^ 'w'
```

### concat

This function is a strongly-typed counterpart of `String.prototype.concat`.

```ts
import { concat } from 'string-ts'

const result = concat('a', 'bc', 'def')
//    ^ 'abcdef'
```

### endsWith

This function is a strongly-typed counterpart of `String.prototype.endsWith`.

```ts
import { endsWith } from 'string-ts'

const result = endsWith('abc', 'c')
//    ^ true
```

### join

This function is a strongly-typed counterpart of `Array.prototype.join`.

```ts
import { join } from 'string-ts'

const str = ['hello', 'world']
const result = join(str, ' ')
//    ^ 'hello world'
```

### length

This function is a strongly-typed counterpart of `String.prototype.length`.

```ts
import { length } from 'string-ts'

const str = 'hello'
const result = length(str)
//    ^ 5
```

### replace

This function is a strongly-typed counterpart of `String.prototype.replace`.

_Warning: this is a partial implementation as we don't support Regex._

```ts
import { replace } from 'string-ts'

const str = 'hello-world-'
const result = replace(str, '-', ' ')
//    ^ 'hello world-'
```

### replaceAll

This function is a strongly-typed counterpart of `String.prototype.replaceAll`.
It also has a polyfill for runtimes older than ES2021.

_Warning: this is a partial implementation as we don't support Regex._

```ts
import { replaceAll } from 'string-ts'

const str = 'hello-world-'
const result = replaceAll(str, '-', ' ')
//    ^ 'hello world '
```

### slice

This function is a strongly-typed counterpart of `String.prototype.slice`.

_Warning: this is a partial implementation. For now we ignore the second argument (endIndex) if the first (startIndex) is negative and we also don't support a negative endIndex._

```ts
import { slice } from 'string-ts'

const str = 'hello-world'
const result = slice(str, 6)
//    ^ 'world'
const result2 = slice(str, 1, 5)
//    ^ 'ello'
const result3 = slice(str, -5)
//    ^ 'world'
```

### split

This function is a strongly-typed counterpart of `String.prototype.split`.

```ts
import { split } from 'string-ts'

const str = 'hello-world'
const result = split(str, '-')
//    ^ ['hello', 'world']
```

### startsWith

This function is a strongly-typed counterpart of `String.prototype.startsWith`.

```ts
import { startsWith } from 'string-ts'

const result = startsWith('abc', 'a')
//    ^ true
```

### toLowerCase

This function is a strongly-typed counterpart of `String.prototype.toLowerCase`.

```ts
import { toLowerCase } from 'string-ts'

const str = 'HELLO WORLD'
const result = toLowerCase(str)
//    ^ 'hello world'
```

### toUpperCase

This function is a strongly-typed counterpart of `String.prototype.toUpperCase`.

```ts
import { toUpperCase } from 'string-ts'

const str = 'hello world'
const result = toUpperCase(str)
//    ^ 'HELLO WORLD'
```

### trim

This function is a strongly-typed counterpart of `String.prototype.trim`.

```ts
import { trim } from 'string-ts'

const str = '  hello world  '
const result = trim(str)
//    ^ 'hello world'
```

### trimEnd

This function is a strongly-typed counterpart of `String.prototype.trimEnd`.

```ts
import { trimEnd } from 'string-ts'

const str = '  hello world  '
const result = trimEnd(str)
//    ^ '  hello world'
```

### trimStart

This function is a strongly-typed counterpart of `String.prototype.trimStart`.

```ts
import { trimStart } from 'string-ts'

const str = '  hello world  '
const result = trimStart(str)
//    ^ 'hello world  '
```

## Strongly-typed alternatives to common loosely-typed functions

### toCamelCase

This function converts a string to `camelCase` at both runtime and type levels.

```ts
import { toCamelCase } from 'string-ts'

const str = 'hello-world'
const result = toCamelCase(str)
//    ^ 'helloWorld'
```

### toConstantCase

This function converts a string to `CONSTANT_CASE` at both runtime and type levels.

```ts
import { toConstantCase } from 'string-ts'

const str = 'helloWorld'
const result = toConstantCase(str)
//    ^ 'HELLO_WORLD'
```

### toDelimiterCase

This function converts a string to a new case with a custom delimiter at both runtime and type levels.

```ts
import { toDelimiterCase } from 'string-ts'

const str = 'helloWorld'
const result = toDelimiterCase(str, '.')
//    ^ 'hello.World'
```

### toKebabCase

This function converts a string to `kebab-case` at both runtime and type levels.

```ts
import { toKebabCase } from 'string-ts'

const str = 'helloWorld'
const result = toKebabCase(str)
//    ^ 'hello-world'
```

### toPascalCase

This function converts a string to `PascalCase` at both runtime and type levels.

```ts
import { toPascalCase } from 'string-ts'

const str = 'hello-world'
const result = toPascalCase(str)
//    ^ 'HelloWorld'
```

### toSnakeCase

This function converts a string to `snake_case` at both runtime and type levels.

```ts
import { toSnakeCase } from 'string-ts'

const str = 'helloWorld'
const result = toSnakeCase(str)
//    ^ 'hello_world'
```

### toTitleCase

This function converts a string to `Title Case` at both runtime and type levels.

```ts
import { toTitleCase } from 'string-ts'

const str = 'helloWorld'
const result = toTitleCase(str)
//    ^ 'Hello World'
```

### words

This function identifies the words in a string and returns a tuple of words split by separators, differences in casing, numbers, and etc.

```ts
import { words } from 'string-ts'

const str = '-20someVery-weird String'
const result = words(str)
//    ^ ['20', 'some', 'Very', 'weird', 'String']
```

## Strongly-typed shallow transformation of objects

### camelKeys

This function shallowly converts the keys of an object to `camelCase` at both runtime and type levels.

```ts
import { camelKeys } from 'string-ts'

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const
const result = camelKeys(data)
//    ^ { helloWorld: { 'foo-bar': 'baz' } }
```

### constantKeys

This function shallowly converts the keys of an object to `CONSTANT_CASE` at both runtime and type levels.

```ts
import { constantKeys } from 'string-ts'

const data = {
  helloWorld: {
    fooBar: 'baz',
  },
} as const
const result = constantKeys(data)
//    ^ { 'HELLO_WORLD': { 'fooBar': 'baz' } }
```

### delimiterKeys

This function shallowly converts the keys of an object to a new case with a custom delimiter at both runtime and type levels.

```ts
import { delimiterKeys } from 'string-ts'

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const
const result = delimiterKeys(data, '.')
//    ^ { 'hello.world': { 'foo-bar': 'baz' } }
```

### kebabKeys

This function shallowly converts the keys of an object to `kebab-case` at both runtime and type levels.

```ts
import { kebabKeys } from 'string-ts'

const data = {
  helloWorld: {
    fooBar: 'baz',
  },
} as const
const result = kebabKeys(data)
//    ^ { 'hello-world': { fooBar: 'baz' } }
```

### pascalKeys

This function shallowly converts the keys of an object to `PascalCase` at both runtime and type levels.

```ts
import { pascalKeys } from 'string-ts'

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const
const result = pascalKeys(data)
//    ^ { HelloWorld: { FooBar: 'baz' } }
```

### snakeKeys

This function shallowly converts the keys of an object to `snake_case` at both runtime and type levels.

```ts
import { snakeKeys } from 'string-ts'

const data = {
  helloWorld: {
    fooBar: 'baz',
  },
} as const
const result = snakeKeys(data)
//    ^ { 'hello_world': { 'fooBar': 'baz' } }
```

## Strongly-typed deep transformation of objects

### deepCamelKeys

This function recursively converts the keys of an object to `camelCase` at both runtime and type levels.

```ts
import { deepCamelKeys } from 'string-ts'

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const
const result = deepCamelKeys(data)
//    ^ { helloWorld: { fooBar: 'baz' } }
```

### deepConstantKeys

This function recursively converts the keys of an object to `CONSTANT_CASE` at both runtime and type levels.

```ts
import { deepConstantKeys } from 'string-ts'

const data = {
  helloWorld: {
    fooBar: 'baz',
  },
} as const
const result = deepConstantKeys(data)
//    ^ { 'HELLO_WORLD': { 'FOO_BAR': 'baz' } }
```

### deepDelimiterKeys

This function recursively converts the keys of an object to a new case with a custom delimiter at both runtime and type levels.

```ts
import { deepDelimiterKeys } from 'string-ts'

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const
const result = deepDelimiterKeys(data, '.')
//    ^ { 'hello.world': { 'foo.bar': 'baz' } }
```

### deepKebabKeys

This function recursively converts the keys of an object to `kebab-case` at both runtime and type levels.

```ts
import { deepKebabKeys } from 'string-ts'

const data = {
  helloWorld: {
    fooBar: 'baz',
  },
} as const
const result = deepKebabKeys(data)
//    ^ { 'hello-world': { 'foo-bar': 'baz' } }
```

### deepPascalKeys

This function recursively converts the keys of an object to `PascalCase` at both runtime and type levels.

```ts
import { deepPascalKeys } from 'string-ts'

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const
const result = deepPascalKeys(data)
//    ^ { HelloWorld: { FooBar: 'baz' } }
```

### deepSnakeKeys

This function recursively converts the keys of an object to `snake_case` at both runtime and type levels.

```ts
import { deepSnakeKeys } from 'string-ts'

const data = {
  helloWorld: {
    fooBar: 'baz',
  },
} as const
const result = deepSnakeKeys(data)
//    ^ { 'hello_world': { 'foo_bar': 'baz' } }
```

## Type Utilities

All the functions presented in this API have associated type counterparts.

```ts
import type * as St from 'string-ts'
```

### Native TS type utilities

```ts
Capitalize<'hello world'> // 'Hello world'
Lowercase<'HELLO WORLD'> // 'hello world'
Uppercase<'hello world'> // 'HELLO WORLD'
```

### General Type utilities from this library

```ts
St.CharAt<'hello world', 6> // 'w'
St.Concat<['a', 'bc', 'def']> // 'abcdef'
St.Join<['hello', 'world'], '-'> // 'hello-world'
St.Length<'hello'> // 5
St.Replace<'hello-world', 'l', '1'> // 'he1lo-world'
St.ReplaceAll<'hello-world', 'l', '1'> // 'he11o-wor1d'
St.Slice<'hello-world', -5> // 'world'
St.Split<'hello-world', '-'> // ['hello', 'world']
St.Trim<' hello world '> // 'hello world'
St.StartsWith<'abc', 'a'> // true
St.TrimEnd<' hello world '> // ' hello world'
St.TrimStart<' hello world '> // 'hello world '
St.Words<'hello-world'> // ['hello', 'world']
```

### Casing type utilities

```ts
St.CamelCase<'hello-world'> // 'helloWorld'
St.ConstantCase<'helloWorld'> // 'HELLO_WORLD'
St.DelimiterCase<'hello world', '.'> // 'hello.world'
St.KebabCase<'helloWorld'> // 'hello-world'
St.PascalCase<'hello-world'> // 'HelloWorld'
St.SnakeCase<'helloWorld'> // 'hello_world'
St.TitleCase<'helloWorld'> // 'Hello World'

// SHALLOW OBJECT KEY TRANSFORMATION
St.CamelKeys<{
  'hello-world': { 'foo-bar': 'baz' }
}> // { helloWorld: { 'foo-bar': 'baz' } }
St.ConstantKeys<{
  helloWorld: { fooBar: 'baz' }
}> // { 'HELLO_WORLD': { fooBar: 'baz' } }
St.DelimiterKeys<{ 'hello-world': { 'foo-bar': 'baz' } }, '.'>
// { 'hello.world': { 'foo-bar': 'baz' } }
St.KebabKeys<{
  helloWorld: { fooBar: 'baz' }
}> // { 'hello-world': { fooBar: 'baz' } }
St.PascalKeys<{
  'hello-world': { 'foo-bar': 'baz' }
}> // { HelloWorld: { 'foo-bar': 'baz' } }
St.SnakeKeys<{
  helloWorld: { fooBar: 'baz' }
}> // { 'hello_world': { fooBar: 'baz' } }

// DEEP OBJECT KEY TRANSFORMATION
St.DeepCamelKeys<{
  'hello-world': { 'foo-bar': 'baz' }
}> // { helloWorld: { fooBar: 'baz' } }
St.DeepConstantKeys<{
  helloWorld: { fooBar: 'baz' }
}> // { 'HELLO_WORLD': { 'FOO_BAR': 'baz' } }
St.DeepDelimiterKeys<
  {
    'hello-world': { 'foo-bar': 'baz' }
  },
  '.'
> // { 'hello.world': { 'foo.bar': 'baz' } }
St.DeepKebabKeys<{
  helloWorld: { fooBar: 'baz' }
}> // { 'hello-world': { 'foo-bar': 'baz' } }
St.DeepPascalKeys<{
  'hello-world': { 'foo-bar': 'baz' }
}> // { HelloWorld: { FooBar: 'baz' } }
St.DeepSnakeKeys<{
  helloWorld: { fooBar: 'baz' }
}> // { 'hello_world': { 'foo_bar': 'baz' } }
```

### Other exported type utilities

```ts
St.IsDigit<'a'> // false
St.IsDigit<'1'> // true
St.IsLetter<'a'> // true
St.IsLetter<'1'> // false
St.IsLower<'a'> // true
St.IsLower<'A'> // false
St.IsUpper<'a'> // false
St.IsUpper<'A'> // true
St.IsSeparator<' '> // true
St.IsSeparator<'-'> // true
St.IsSeparator<'a'> // false
St.IsSpecial<'a'> // false
St.IsSpecial<'!'> // true
St.IsSpecial<' '> // false
```

## Runtime-only utilities

### deepTransformKeys

This function recursively converts the keys of an object to a custom format, but only at runtime level.

```ts
import { deepTransformKeys, toUpperCase } from 'string-ts'

const data = { helloWorld: 'baz' } as const

type MyType<T> = { [K in keyof T as Uppercase<K>]: T[K] }
const result = deepTransformKeys(data, toUpperCase) as MyType<typeof data>
//    ^ { 'HELLOWORLD': 'baz' }
```

## Disclaimer

We don't plan to support international characters.

## Aknowledgements

This library got a lot of inspiration from libraries such as [lodash](https://github.com/lodash/lodash), [ts-reset](https://github.com/total-typescript/ts-reset), [type-fest](https://github.com/sindresorhus/type-fest), [HOTScript](https://github.com/gvergnaud/hotscript), and many others.
