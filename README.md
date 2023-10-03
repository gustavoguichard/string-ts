# Strongly-typed string functions for all!

## 😬 The problem

When you are working with literal strings, the string manipulation functions only work at the runtime level and the types don't follow those transformations.
You end up losing type information and possibly having to cast the result.

```ts
const str = 'hello-world';
const result = str.replace('-', ' '); // you should use: as 'hello world'
//    ^? string
```

## 🤓 The solution
This library aims to solve this problem by providing a set of common functions that work with literal strings at both type and runtime level.

```ts
import { replace } from 'string-ts';

const str = 'hello-world';
const result = replace(str, '-', ' ');
//    ^ 'hello world'
```

## 📦 Installation

```bash
npm install string-ts
```

****
# 📖 API
- [Runtime counterparts of native type utilities](#runtime-counterparts-of-native-type-utilities)
  - [capitalize](#capitalize)
- [Strongly-typed alternatives to native runtime utilities](#strongly-typed-alternatives-to-native-runtime-utilities)
  - [toUpperCase](#touppercase)
  - [toLowerCase](#tolowercase)
  - [trim](#trim)
  - [trimStart](#trimstart)
  - [trimEnd](#trimend)
  - [join](#join)
  - [replace](#replace)
  - [replaceAll](#replaceall)
  - [split](#split)
- [Strongly-typed alternatives to common loosely-typed functions](#strongly-typed-alternatives-to-common-loosely-typed-functions)
  - [words](#words)
  - [toDelimiterCase](#todelimitercase)
  - [toCamelCase](#tocamelcase)
  - [toPascalCase](#topascalcase)
  - [toKebabCase](#tokebabcase)
  - [toSnakeCase](#tosnakecase)
  - [toConstantCase](#toconstantcase)
  - [toTitleCase](#totitlecase)
- [Strongly-typed deep transformation of objects](#strongly-typed-transformation-of-objects)
  - [DelimiterKeys](#delimiterkeys)
  - [CamelKeys](#camelkeys)
  - [PascalKeys](#pascalkeys)
  - [KebabKeys](#kebabkeys)
  - [SnakeKeys](#snakekeys)
  - [ConstantKeys](#constantkeys)
- [Strongly-typed deep transformation of objects](#strongly-typed-deep-transformation-of-objects)
  - [deepDelimiterKeys](#deepdelimiterkeys)
  - [deepCamelKeys](#deepcamelkeys)
  - [deepPascalKeys](#deeppascalkeys)
  - [deepKebabKeys](#deepkebabkeys)
  - [deepSnakeKeys](#deepsnakekeys)
  - [deepConstantKeys](#deepconstantkeys)
- [Type Utilities](#type-utilities)
  - [Native TS type utilities](#native-ts-type-utilities)
  - [General Type utilities from this library](#general-type-utilities-from-this-library)
  - [Casing type utilities](#casing-type-utilities)
  - [Other exported type utilities](#other-exported-type-utilities)
- [Runtime-only utilities](#runtime-only-utilities)
  - [deepTransformKeys](#deeptransformkeys)

****

## Runtime counterparts of native type utilities

### capitalize
Capitalizes the first letter of a string. This is a runtime counterpart of `Capitalize<T>` from `src/types.d.ts`.

```ts
import { capitalize } from 'string-ts';

const str = 'hello world';
const result = capitalize(str);
//    ^ 'Hello world'
```

## Strongly-typed alternatives to native runtime utilities
### toUpperCase
This function is a strongly-typed counterpart of `String.prototype.toUpperCase`.

```ts
import { toUpperCase } from 'string-ts';

const str = 'hello world';
const result = toUpperCase(str);
//    ^ 'HELLO WORLD'
```

### toLowerCase
This function is a strongly-typed counterpart of `String.prototype.toLowerCase`.

```ts
import { toLowerCase } from 'string-ts';

const str = 'HELLO WORLD';
const result = toLowerCase(str);
//    ^ 'hello world'
```

### trim
This function is a strongly-typed counterpart of `String.prototype.trim`.

```ts
import { trim } from 'string-ts';

const str = '  hello world  ';
const result = trim(str);
//    ^ 'hello world'
```

### trimStart
This function is a strongly-typed counterpart of `String.prototype.trimStart`.

```ts
import { trimStart } from 'string-ts';

const str = '  hello world  ';
const result = trimStart(str);
//    ^ 'hello world  '
```

### trimEnd
This function is a strongly-typed counterpart of `String.prototype.trimEnd`.

```ts
import { trimEnd } from 'string-ts';

const str = '  hello world  ';
const result = trimEnd(str);
//    ^ '  hello world'
```

### join
This function is a strongly-typed counterpart of `Array.prototype.join`.

```ts
import { join } from 'string-ts';

const str = ['hello', 'world'] as ['hello', 'world'];
const result = join(str, ' ');
//    ^ 'hello world'
```

### replace
This function is a strongly-typed counterpart of `String.prototype.replace`.

```ts
import { replace } from 'string-ts';

const str = 'hello-world-';
const result = replace(str, '-', ' ');
//    ^ 'hello world-'
```

### replaceAll
This function is a strongly-typed counterpart of `String.prototype.replaceAll`.

```ts
import { replaceAll } from 'string-ts';

const str = 'hello-world-';
const result = replaceAll(str, '-', ' ');
//    ^ 'hello world '
```

### split
This function is a strongly-typed counterpart of `String.prototype.split`.

```ts
import { split } from 'string-ts';

const str = 'hello-world';
const result = split(str, '-');
//    ^ ['hello', 'world']
```

## Strongly-typed alternatives to common loosely-typed functions

### words
This function identifies the words in a string and returns a tuple of words split by separators, differences in casing, numbers, and etc.

```ts
import { words } from 'string-ts';

const str = '-20someVery-weird String';
const result = words(str);
//    ^ ['20', 'some', 'Very', 'weird', 'String']
```

### toDelimiterCase
This function converts a string to a new case with a custom delimiter at both runtime and type levels.

```ts
import { toDelimiterCase } from 'string-ts';

const str = 'helloWorld';
const result = toDelimiterCase(str, '.');
//    ^ 'hello.World'
```

### toCamelCase
This function converts a string to `camelCase` at both runtime and type levels.

```ts
import { toCamelCase } from 'string-ts';

const str = 'hello-world';
const result = toCamelCase(str);
//    ^ 'helloWorld'
```

### toPascalCase
This function converts a string to `PascalCase` at both runtime and type levels.

```ts
import { toPascalCase } from 'string-ts';

const str = 'hello-world';
const result = toPascalCase(str);
//    ^ 'HelloWorld'
```

### toKebabCase
This function converts a string to `kebab-case` at both runtime and type levels.

```ts
import { toKebabCase } from 'string-ts';

const str = 'helloWorld';
const result = toKebabCase(str);
//    ^ 'hello-world'
```

### toSnakeCase
This function converts a string to `snake_case` at both runtime and type levels.

```ts
import { toSnakeCase } from 'string-ts';

const str = 'helloWorld';
const result = toSnakeCase(str);
//    ^ 'hello_world'
```

### toConstantCase
This function converts a string to `CONSTANT_CASE` at both runtime and type levels.

```ts
import { toConstantCase } from 'string-ts';

const str = 'helloWorld';
const result = toConstantCase(str);
//    ^ 'HELLO_WORLD'
```

### toTitleCase
This function converts a string to `Title Case` at both runtime and type levels.

```ts
import { toTitleCase } from 'string-ts';

const str = 'helloWorld';
const result = toTitleCase(str);
//    ^ 'Hello World'
```

## Strongly-typed transformation of objects

### delimiterKeys
This function recursively converts the keys of an object to a new case with a custom delimiter at both runtime and type levels.

```ts
import { delimiterKeys } from 'string-ts';

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const;
const result = delimiterKeys(data, '.');
//    ^ { 'hello.world': { 'foo-bar': 'baz' } }
```

### camelKeys
This function recursively converts the keys of an object to `camelCase` at both runtime and type levels.

```ts
import { camelKeys } from 'string-ts';

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const;
const result = camelKeys(data);
//    ^ { helloWorld: { 'foo-bar': 'baz' } }
```

### pascalKeys
This function recursively converts the keys of an object to `PascalCase` at both runtime and type levels.

```ts
import { pascalKeys } from 'string-ts';

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const;
const result = pascalKeys(data);
//    ^ { HelloWorld: { FooBar: 'baz' } }
```

### kebabKeys
This function recursively converts the keys of an object to `kebab-case` at both runtime and type levels.

```ts
import { kebabKeys } from 'string-ts';

const data = {
  'helloWorld': {
    'fooBar': 'baz',
  },
} as const;
const result = kebabKeys(data);
//    ^ { 'hello-world': { fooBar: 'baz' } }
```

### snakeKeys
This function recursively converts the keys of an object to `snake_case` at both runtime and type levels.

```ts
import { snakeKeys } from 'string-ts';

const data = {
  'helloWorld': {
    'fooBar': 'baz',
  },
} as const;
const result = snakeKeys(data);
//    ^ { 'hello_world': { 'fooBar': 'baz' } }
```

### constantKeys
This function recursively converts the keys of an object to `CONSTANT_CASE` at both runtime and type levels.

```ts
import { constantKeys } from 'string-ts';

const data = {
  'helloWorld': {
    'fooBar': 'baz',
  },
} as const;
const result = constantKeys(data);
//    ^ { 'HELLO_WORLD': { 'fooBar': 'baz' } }
```

## Strongly-typed deep transformation of objects

### deepDelimiterKeys
This function recursively converts the keys of an object to a new case with a custom delimiter at both runtime and type levels.

```ts
import { deepDelimiterKeys } from 'string-ts';

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const;
const result = deepDelimiterKeys(data, '.');
//    ^ { 'hello.world': { 'foo.bar': 'baz' } }
```

### deepCamelKeys
This function recursively converts the keys of an object to `camelCase` at both runtime and type levels.

```ts
import { deepCamelKeys } from 'string-ts';

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const;
const result = deepCamelKeys(data);
//    ^ { helloWorld: { fooBar: 'baz' } }
```

### deepPascalKeys
This function recursively converts the keys of an object to `PascalCase` at both runtime and type levels.

```ts
import { deepPascalKeys } from 'string-ts';

const data = {
  'hello-world': {
    'foo-bar': 'baz',
  },
} as const;
const result = deepPascalKeys(data);
//    ^ { HelloWorld: { FooBar: 'baz' } }
```

### deepKebabKeys
This function recursively converts the keys of an object to `kebab-case` at both runtime and type levels.

```ts
import { deepKebabKeys } from 'string-ts';

const data = {
  'helloWorld': {
    'fooBar': 'baz',
  },
} as const;
const result = deepKebabKeys(data);
//    ^ { 'hello-world': { 'foo-bar': 'baz' } }
```

### deepSnakeKeys
This function recursively converts the keys of an object to `snake_case` at both runtime and type levels.

```ts
import { deepSnakeKeys } from 'string-ts';

const data = {
  'helloWorld': {
    'fooBar': 'baz',
  },
} as const;
const result = deepSnakeKeys(data);
//    ^ { 'hello_world': { 'foo_bar': 'baz' } }
```

### deepConstantKeys
This function recursively converts the keys of an object to `CONSTANT_CASE` at both runtime and type levels.

```ts
import { deepConstantKeys } from 'string-ts';

const data = {
  'helloWorld': {
    'fooBar': 'baz',
  },
} as const;
const result = deepConstantKeys(data);
//    ^ { 'HELLO_WORLD': { 'FOO_BAR': 'baz' } }
```

## Type Utilities
All the functions presented in this API have associated type counterparts.

```ts
import type * as St from 'string-ts';
```

### Native TS type utilities
```ts
Capitalize<'hello world'> // 'Hello world'
Lowercase<'HELLO WORLD'> // 'hello world'
Uppercase<'hello world'> // 'HELLO WORLD'
```

### General Type utilities from this library
```ts
St.Words<'hello-world'> // ['hello', 'world']
St.Join<['hello', 'world'], '-'> // 'hello-world'
St.Replace<'hello-world', 'l', '1'> // 'he1lo-world'
St.ReplaceAll<'hello-world', 'l', '1'> // 'he11o-wor1d'
St.Split<'hello-world', '-'> // ['hello', 'world']
St.TrimStart<' hello world '> // 'hello world '
St.TrimEnd<' hello world '> // ' hello world'
St.Trim<' hello world '> // 'hello world'
```

### Casing type utilities
```ts
St.CamelCase<'hello-world'> // 'helloWorld'
St.PascalCase<'hello-world'> // 'HelloWorld'
St.KebabCase<'helloWorld'> // 'hello-world'
St.SnakeCase<'helloWorld'> // 'hello_world'
St.ConstantCase<'helloWorld'> // 'HELLO_WORLD'
St.TitleCase<'helloWorld'> // 'Hello World'
St.DelimiterCase<'hello world', '.'> // 'hello.world'

St.DeepDelimiterKeys<{
  'hello-world': { 'foo-bar': 'baz' }
}, '.'> // { 'hello.world': { 'foo.bar': 'baz' } }
St.DeepCamelKeys<{
  'hello-world': { 'foo-bar': 'baz' }
}> // { helloWorld: { fooBar: 'baz' } }
St.DeepPascalKeys<{
  'hello-world': { 'foo-bar': 'baz' }
}> // { HelloWorld: { FooBar: 'baz' } }
St.DeepKebabKeys<{
  'helloWorld': { 'fooBar': 'baz' }
}> // { 'hello-world': { 'foo-bar': 'baz' } }
St.DeepSnakeKeys<{
  'helloWorld': { 'fooBar': 'baz' }
}> // { 'hello_world': { 'foo_bar': 'baz' } }
St.DeepConstantKeys<{
  'helloWorld': { 'fooBar': 'baz' }
}> // { 'HELLO_WORLD': { 'FOO_BAR': 'baz' } }
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
import { deepTransformKeys, toUpperCase } from 'string-ts';

const data = { 'helloWorld': 'baz' } as const;

type MyType<T> = { [K in keyof T as Uppercase<K>]: T[K] }
const result = deepTransformKeys(data, toUpperCase) as MyType<typeof data>;
//    ^ { 'HELLOWORLD': 'baz' }
```


## Disclaimer
This library doesn't support every internal character for the sake of keeping the maintainer's sanity.
