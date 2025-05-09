---
include: *.ts, *.tsx
---

# Object Key Transformation Pattern

When implementing object key transformations, follow a consistent pattern and clearly distinguish between shallow and deep (recursive) transformations.

## Requirements

1. **Shallow vs Deep**: Clearly identify functions that transform only top-level keys versus those that recursively transform nested objects
2. **Naming Convention**: Use `camelKeys` for shallow transforms and `deepCamelKeys` for recursive transforms
3. **Type Definitions**: Provide corresponding type definitions (`CamelKeys<T>` and `DeepCamelKeys<T>`)
4. **Documentation**: Clearly document the transformation depth in JSDoc comments

## Examples

### Good ✅

```typescript
/**
 * A strongly typed function that shallowly transforms the keys of an object to camelCase.
 * The transformation is done both at runtime and type level.
 */
function camelKeys<T>(obj: T): CamelKeys<T> {
  return transformKeys(obj, camelCase) as CamelKeys<T>
}

/**
 * A strongly typed function that recursively transforms the keys of an object to camelCase.
 * The transformation is done both at runtime and type level.
 */
function deepCamelKeys<T>(obj: T): DeepCamelKeys<T> {
  return deepTransformKeys(obj, camelCase) as DeepCamelKeys<T>
}
```

### Bad ❌

```typescript
/**
 * Transforms the keys of an object to camelCase.
 * [No indication if shallow or deep]
 */
function camelKeys<T>(obj: T): CamelKeys<T> {
  return transformKeys(obj, camelCase) as CamelKeys<T>
}

/**
 * A strongly typed function that recursively transforms the keys of an object to camelCase.
 * [Incorrect name - should be deepCamelKeys for recursive]
 */
function camelKeysRecursive<T>(obj: T): DeepCamelKeys<T> {
  return deepTransformKeys(obj, camelCase) as DeepCamelKeys<T>
}
```