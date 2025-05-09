---
include: *.ts, *.tsx
---

# Consistent Naming Conventions

Maintain consistent naming patterns throughout the codebase to improve readability and predictability.

## Naming Guidelines

1. **Functions**: Use `lowerCamelCase` for all function names (e.g., `camelCase`, `trimStart`)
2. **Types**: Use `PascalCase` for all type definitions (e.g., `CamelCase`, `TrimStart`)
3. **Files**: Use `kebab-case` for all filenames (e.g., `camel-case.ts`, `trim-start.ts`)
4. **Case Transformations**: Prefer direct naming (e.g., `camelCase`) over "to" prefix (e.g., `toCamelCase`)

## Deprecated Functions

For backward compatibility, older naming patterns should be preserved but marked as deprecated:

```typescript
/**
 * @deprecated
 * Use `camelCase` instead.
 */
export const toCamelCase = camelCase
```

## Examples

### Good ✅
```typescript
// Type definition in PascalCase
export type KebabCase<T extends string> = Lowercase<
  DelimiterCase<RemoveApostrophe<T>, '-'>
>

// Function in lowerCamelCase
export function kebabCase<T extends string>(str: T): KebabCase<T> {
  return toLowerCase(delimiterCase(removeApostrophe(str), '-'))
}

// Deprecated function with notice
/**
 * @deprecated
 * Use `kebabCase` instead.
 */
export const toKebabCase = kebabCase
```

### Bad ❌
```typescript
// Inconsistent naming
export type kebab_case<T extends string> = Lowercase<
  DelimiterCase<RemoveApostrophe<T>, '-'>
>

export function KebabCase<T extends string>(str: T) {
  return toLowerCase(delimiterCase(removeApostrophe(str), '-'))
}

// Missing deprecation notice
export const toKebabCase = kebabCase
```