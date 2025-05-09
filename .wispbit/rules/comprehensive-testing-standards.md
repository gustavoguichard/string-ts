---
include: *.test.ts
---

# Comprehensive Testing Standards

All string utility functions must have thorough tests covering both runtime behavior and type-level correctness.

## Testing Requirements

1. Test both runtime functionality and type-level behavior
2. Include tests for edge cases (empty strings, negative indices, non-literal types)
3. Organize tests in a structured, consistent manner
4. Extract reusable test values to variables

## Test Organization

1. Group type tests within namespaces that reflect the functionality being tested
2. Group runtime tests within describe blocks that match the structure of type tests
3. Organize test suites alphabetically for better navigation

## Examples

### Good ✅

```typescript
// Type-level tests in a namespace
namespace TruncateTests {
  type test1 = Expect<Equal<Truncate<'Hello, world', 9, '...'>, 'Hello,...'>>
  type test2 = Expect<Equal<Truncate<'Hello', 10, '...'>, 'Hello'>>
  // Edge case: negative length
  type test3 = Expect<Equal<Truncate<'Hello', -1, '...'>, '...'>>
}

// Runtime tests in a matching describe block
describe('truncate', () => {
  // Extract reusable test values
  const longText = 'Hello, world';
  const shortText = 'Hello';
  
  test('truncates a string that exceeds target length', () => {
    expect(truncate(longText, 9, '...')).toEqual('Hello,...');
  });
  
  test('does not truncate a string shorter than target length', () => {
    expect(truncate(shortText, 10, '...')).toEqual('Hello');
  });
  
  // Edge case test
  test('handles negative length by returning just the omission', () => {
    expect(truncate(longText, -1, '...')).toEqual('...');
  });
});
```

### Bad ❌

```typescript
// Disorganized testing
describe('string functions', () => {
  test('truncate works', () => {
    expect(truncate('Hello, world', 9, '...')).toEqual('Hello,...');
    expect(truncate('Hello', 10, '...')).toEqual('Hello');
    // Missing edge case tests
  });
  
  // Missing type tests
});
```