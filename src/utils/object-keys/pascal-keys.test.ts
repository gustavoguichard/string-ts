import { type PascalKeys, pascalKeys } from './pascal-keys.js'
import { type Dict } from '../../internal/fixtures.js'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      PascalKeys<{
        someValue: { deepNested: true }
        otherValue: true
      }>,
      { SomeValue: { deepNested: true }; OtherValue: true }
    >
  >
  type test2 = Expect<Equal<PascalKeys<Dict<string>>, Dict<string>>>
}

test('pascalKeys', () => {
  const expected = {
    Some: { deepNested: { value: true } },
    OtherValue: true,
  }
  const result = pascalKeys({
    some: { deepNested: { value: true } },
    otherValue: true,
  })
  expect(result).toEqual(expected)
  type test = Expect<Equal<typeof result, typeof expected>>
})
