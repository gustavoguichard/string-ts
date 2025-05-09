---
include: *.ts, *.tsx
---

# Edge Case Handling Requirements

String manipulation functions must properly handle edge cases to ensure consistent behavior. Always test and account for edge cases in both type-level and runtime implementations.

## Critical Edge Cases

1. Empty strings
2. Empty delimiters/separators 
3. Negative indexes for position-based operations
4. Cases where target length is shorter than input string
5. Non-literal types (e.g., `string` instead of string literals)

## Examples

### Good ✅

```typescript
// Properly handling empty strings and negative cases in types
type TrimStart<T extends string> = T extends ` ${infer rest}`
  ? TrimStart<rest>
  : T

// Handling negative indexes in runtime
function slice<T extends string, S extends number = 0, E extends number = Length<T>>(
  str: T, 
  start: S = 0 as S, 
  end: E = str.length as E
): Slice<T, S, E> {
  return str.slice(start, end) as Slice<T, S, E>
}

// Handling non-literal types
type CharAt<T extends string, index extends number> = All<
  [IsStringLiteral<T>, IsNumberLiteral<index>]
> extends true
  ? Split<T>[index]
  : string
```

### Bad ❌

```typescript
// Not handling empty string inputs
type Split<
  T,
  delimiter extends string,
> = T extends `${infer first}${delimiter}${infer rest}`
  ? [first, ...Split<rest, delimiter>]
  : [T] // This could result in [''] for empty strings, which might be unexpected

// Not handling negative indexes
function charAt<T extends string, I extends number>(
  str: T,
  index: I
): CharAt<T, I> {
  // No handling for negative indexes
  return str.charAt(index) as CharAt<T, I>
}
```