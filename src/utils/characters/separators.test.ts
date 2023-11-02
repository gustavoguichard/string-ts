import { SEPARATOR_REGEX } from './separators.js'
import type { IsSeparator } from './separators.js'

namespace TypeChecks {
  type test1 = Expect<Equal<IsSeparator<'1'>, false>>
  type test2 = Expect<Equal<IsSeparator<'a'>, false>>
  type test3 = Expect<Equal<IsSeparator<'A'>, false>>
  type test4 = Expect<Equal<IsSeparator<'$'>, false>>
  type test5 = Expect<Equal<IsSeparator<' '>, true>>
  type test6 = Expect<Equal<IsSeparator<'-'>, true>>
  type test7 = Expect<Equal<IsSeparator<'/'>, true>>
  type test8 = Expect<Equal<IsSeparator<'_'>, true>>
  type test9 = Expect<Equal<IsSeparator<'.'>, true>>
  type test10 = Expect<Equal<IsSeparator<string>, boolean>>
}

describe('SEPARATOR_REGEX', () => {
  test('dummy regex test', () => {
    expect(SEPARATOR_REGEX.test('[test]')).toEqual(true)
    expect(SEPARATOR_REGEX.test('te.st')).toEqual(true)
    expect(SEPARATOR_REGEX.test('te$st')).toEqual(false)
    expect(SEPARATOR_REGEX.test('test')).toEqual(false)
  })
})
