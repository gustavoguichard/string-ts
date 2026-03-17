---
name: string-ts-usage
description: Generate code examples and usage patterns for the string-ts library. Use when writing examples, documentation, demos, answering questions about string-ts API, or helping users understand how to use string-ts for type-safe string manipulation, case conversion, object key transformation, environment variables, and payload transformation.
---

# string-ts Usage Guide

## What is string-ts?

A strongly-typed string manipulation library for TypeScript. Every function works at **both runtime AND type level**, preserving literal string types through transformations — something native JS string methods cannot do.

```ts
// Native JS loses the literal type:
const str = 'hello-world'
const result = str.replace('-', ' ') // type: string

// string-ts preserves it:
import { replace } from 'string-ts'
const result = replace('hello-world', '-', ' ') // type: 'hello world'
```

**Key constraints**: ASCII-only (no international characters or emojis). Requires TypeScript 5+.

## Installation

```bash
npm install string-ts
```

## Use Case 1: Environment Variables

Transform `SCREAMING_SNAKE_CASE` environment variables into type-safe camelCase config objects.

### Basic env config

```ts
import { deepCamelKeys } from 'string-ts'

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_PORT: process.env.DATABASE_PORT,
  API_BASE_URL: process.env.API_BASE_URL,
  MAX_RETRY_COUNT: process.env.MAX_RETRY_COUNT,
} as const

const config = deepCamelKeys(env)
// type: { databaseUrl: ..., databasePort: ..., apiBaseUrl: ..., maxRetryCount: ... }

config.databaseUrl   // ✅ autocomplete works
config.dataBaseUrl   // ❌ TypeScript error — catches typos
```

### Nested env config

```ts
import { deepCamelKeys } from 'string-ts'

const rawConfig = {
  APP_NAME: 'my-app',
  SERVER: {
    HOST_NAME: 'localhost',
    PORT_NUMBER: '3000',
  },
  AUTH: {
    JWT_SECRET: 'secret',
    TOKEN_EXPIRY: '3600',
  },
} as const

const config = deepCamelKeys(rawConfig)
// {
//   appName: 'my-app',
//   server: { hostName: 'localhost', portNumber: '3000' },
//   auth: { jwtSecret: 'secret', tokenExpiry: '3600' }
// }
```

## Use Case 2: API Payload Transformation

Transform between snake_case (common in Ruby/Python APIs) and camelCase (JS convention).

### Incoming response (snake_case → camelCase)

```ts
import { deepCamelKeys } from 'string-ts'
import type { DeepCamelKeys } from 'string-ts'

type ApiResponse = {
  user_id: number
  first_name: string
  last_name: string
  email_address: string
  created_at: string
  address_info: {
    street_name: string
    zip_code: string
  }
}

function fetchUser(): Promise<DeepCamelKeys<ApiResponse>> {
  return fetch('/api/user')
    .then(res => res.json())
    .then(data => deepCamelKeys(data))
}

const user = await fetchUser()
user.firstName     // ✅ type-safe
user.addressInfo.streetName // ✅ deeply transformed
```

### Outgoing request (camelCase → snake_case)

```ts
import { deepSnakeKeys } from 'string-ts'

const payload = {
  firstName: 'John',
  lastName: 'Doe',
  emailAddress: 'john@example.com',
  shippingAddress: {
    streetName: '123 Main St',
    zipCode: '12345',
  },
} as const

const body = deepSnakeKeys(payload)
// {
//   first_name: 'John',
//   last_name: 'Doe',
//   email_address: 'john@example.com',
//   shipping_address: { street_name: '123 Main St', zip_code: '12345' }
// }
```

## Use Case 3: Type-Safe Routing and Path Building

```ts
import { join, split, replace } from 'string-ts'

const segments = split('/api/v1/users', '/')
// type: ['', 'api', 'v1', 'users']

const path = join(['api', 'v1', 'users'], '/')
// type: 'api/v1/users'

const endpoint = replace('/users/:id/posts/:postId', ':id', '42')
// type: '/users/42/posts/:postId'
```

## Use Case 4: CSS Class and HTML Attribute Generation

```ts
import { kebabCase } from 'string-ts'

const componentName = 'UserProfileCard' as const
const className = kebabCase(componentName)
// type: 'user-profile-card'
```

```ts
import { camelCase } from 'string-ts'

const dataAttr = 'data-user-id' as const
const propName = camelCase(dataAttr)
// type: 'dataUserId'
```

## Most Common Functions

### Case Conversions

```ts
import {
  camelCase,
  pascalCase,
  kebabCase,
  snakeCase,
  constantCase,
  titleCase,
  delimiterCase,
  capitalize,
  uncapitalize,
} from 'string-ts'

camelCase('hello-world')      // 'helloWorld'
pascalCase('hello-world')     // 'HelloWorld'
kebabCase('helloWorld')       // 'hello-world'
snakeCase('helloWorld')       // 'hello_world'
constantCase('helloWorld')    // 'HELLO_WORLD'
titleCase('helloWorld')       // 'Hello World'
delimiterCase('helloWorld', '.') // 'hello.world'
capitalize('hello')           // 'Hello'
uncapitalize('Hello')         // 'hello'
```

### Strongly-Typed Native Methods

```ts
import {
  replace,
  replaceAll,
  split,
  join,
  trim,
  slice,
  includes,
  startsWith,
  endsWith,
  repeat,
  length,
  charAt,
} from 'string-ts'

replace('hello world', 'world', 'ts')    // 'hello ts'
replaceAll('ababa', 'a', 'o')            // 'obobo'
split('a-b-c', '-')                      // ['a', 'b', 'c']
join(['a', 'b', 'c'], '-')              // 'a-b-c'
trim('  hello  ')                        // 'hello'
slice('hello', 1, 4)                     // 'ell'
includes('hello', 'ell')                 // true
startsWith('hello', 'hel')              // true
endsWith('hello', 'llo')                // true
repeat('ab', 3)                          // 'ababab'
length('hello')                          // 5
charAt('hello', 1)                       // 'e'
```

### Object Key Transformations

```ts
import {
  camelKeys,        // shallow
  deepCamelKeys,    // recursive
  snakeKeys,
  deepSnakeKeys,
  kebabKeys,
  deepKebabKeys,
  pascalKeys,
  deepPascalKeys,
  constantKeys,
  deepConstantKeys,
  delimiterKeys,
  deepDelimiterKeys,
} from 'string-ts'

// Shallow — only transforms top-level keys
camelKeys({ 'foo-bar': { 'baz-qux': 1 } })
// { fooBar: { 'baz-qux': 1 } }

// Deep — transforms keys at every level
deepCamelKeys({ 'foo-bar': { 'baz-qux': 1 } })
// { fooBar: { bazQux: 1 } }
```

### Utility Functions

```ts
import { words, reverse, truncate } from 'string-ts'

words('helloWorld')                // ['hello', 'World']
words('hello-world')               // ['hello', 'world']
reverse('hello')                   // 'olleh'
truncate('Hello, World!', 8)       // 'Hello...'
truncate('Hello, World!', 8, '…')  // 'Hello, …'
```

## Type-Level Usage

All functions have corresponding types for use in generics and type utilities:

```ts
import type {
  CamelCase,
  SnakeCase,
  KebabCase,
  PascalCase,
  Split,
  Join,
  Replace,
  DeepCamelKeys,
  DeepSnakeKeys,
} from 'string-ts'

type A = CamelCase<'hello-world'>        // 'helloWorld'
type B = SnakeCase<'helloWorld'>          // 'hello_world'
type C = Split<'a-b-c', '-'>             // ['a', 'b', 'c']
type D = Join<['a', 'b'], '.'>           // 'a.b'
type E = Replace<'hello', 'l', 'r'>      // 'herlo'
```

### Character type guards (type-level only)

```ts
import type { IsDigit, IsLetter, IsUpper, IsLower, IsSeparator } from 'string-ts'

type A = IsDigit<'5'>      // true
type B = IsLetter<'a'>     // true
type C = IsUpper<'A'>      // true
type D = IsLower<'a'>      // true
type E = IsSeparator<'-'>  // true
```

## Native String Method Augmentation

Opt-in to enhance native string methods with strong types:

```ts
import 'string-ts/native'

const str = 'hello-world' as const
str.split('-')           // type: ['hello', 'world'] (instead of string[])
str.replace('-', '_')    // type: 'hello_world' (instead of string)
str.toUpperCase()        // type: 'HELLO-WORLD'
str.trim()               // type: 'hello-world'
```

## Tips

- Always use `as const` on string literals to get the best type inference
- Every runtime function has a matching type export (e.g., `camelCase` → `CamelCase`)
- Use `deep*Keys` functions for nested objects, `*Keys` for flat/shallow transforms
- Regex patterns in `replace`/`replaceAll` fall back to `string` return type
- The library is fully tree-shakeable — import only what is needed
