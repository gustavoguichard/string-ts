---
include: *.ts, *.tsx
---

# Comprehensive Documentation Standards

All exported functions and types must be thoroughly documented to ensure usability and maintainability.

## Requirements

1. Include JSDoc comments for all exported functions and types
2. Always include example usage in function documentation
3. Document parameters with descriptive names and types
4. Document return values
5. Include edge case handling in documentation when relevant

## Examples

### Good ✅
```typescript
/**
 * A strongly-typed version of `String.prototype.charAt`.
 * @param str the string to get the character from.
 * @param index the index of the character.
 * @returns the character in both type level and runtime.
 * @example charAt('hello world', 6) // 'w'
 */
export function charAt<T extends string, I extends number>(
  str: T,
  index: I
): CharAt<T, I> {
  return str.charAt(index) as CharAt<T, I>
}
```

### Bad ❌
```typescript
// Missing documentation
export function charAt<T extends string, I extends number>(
  str: T,
  index: I
): CharAt<T, I> {
  return str.charAt(index) as CharAt<T, I>
}

// Or incomplete documentation
/**
 * Gets a character from a string.
 */
export function charAt(str, index) {
  return str.charAt(index)
}
```