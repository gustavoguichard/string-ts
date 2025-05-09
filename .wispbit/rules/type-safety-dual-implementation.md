---
include: *.ts, *.tsx
---

# Type Safety and Dual Implementation Pattern

All string utilities in this codebase must follow the dual implementation pattern:

1. Define a type-level implementation that transforms types using TypeScript's type system
2. Implement a corresponding runtime function that performs the same transformation
3. Ensure both implementations handle edge cases consistently
4. Preserve string literal types whenever possible rather than widening to `string`

## Examples

### Good ✅
```typescript
/**
 * Reverses a string in the type system.
 */
export type Reverse<
  T extends string,
  _acc extends string = '',
> = T extends `${infer Head}${infer Tail}`
  ? Reverse<Tail, `${Head}${_acc}`>
  : _acc extends ''
    ? T
    : `${T}${_acc}`

/**
 * A strongly-typed version that reverses a string.
 * @param str the string to reverse.
 * @returns the reversed string in both type level and runtime.
 * @example reverse('hello') // 'olleh'
 */
export function reverse<T extends string>(str: T) {
  return str.split('').reverse().join('') as Reverse<T>
}
```

### Bad ❌
```typescript
// Missing type-level implementation
export function reverse(str: string): string {
  return str.split('').reverse().join('')
}

// Or type and runtime implementations that don't match
export type Reverse<T extends string> = string // Incorrect type implementation

export function reverse<T extends string>(str: T) {
  return str.split('').reverse().join('')
}
```