import { type ReplaceAll, replaceAll } from './replace-all.js'

namespace TypeTests {
  type test1 = Expect<
    Equal<ReplaceAll<'some nice string', ' ', '-'>, 'some-nice-string'>
  >
  type test2 = Expect<
    Equal<ReplaceAll<'some nice string', RegExp, '-'>, string>
  >
  type test3 = Expect<Equal<ReplaceAll<string, ' ', '-'>, string>>
  type test4 = Expect<Equal<ReplaceAll<Uppercase<string>, ' ', '-'>, string>>
  type test5 = Expect<
    Equal<ReplaceAll<'some nice string', string, '-'>, string>
  >
  type test6 = Expect<
    Equal<ReplaceAll<'some nice string', ' ', string>, string>
  >
  type test7 = Expect<
    Equal<ReplaceAll<'a-b-c' | 'd-e-f', '-', '='>, 'a=b=c' | 'd=e=f'>
  >
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('replaceAll', () => {
  test('should replace all chars in a string at both type level and runtime level once', () => {
    const data = 'some nice string'
    const result = replaceAll(data, ' ')
    expect(result).toEqual('somenicestring')
    type test = Expect<Equal<typeof result, 'somenicestring'>>
  })

  test('accepts an argument for the replacement', () => {
    const data = 'some nice string'
    const result = replaceAll(data, ' ', '@')
    expect(result).toEqual('some@nice@string')
    type test = Expect<Equal<typeof result, 'some@nice@string'>>
  })

  test('should replace chars but not at type level when using RegExp', () => {
    const data = 'some nice string'
    const result = replaceAll(data, / /g, '-')
    expect(result).toEqual('some-nice-string')
    // Note: `string` instead of `some-nice-string`
    type test = Expect<Equal<typeof result, string>>
  })

  test('should interpret $ replacement patterns at both type and runtime level', () => {
    const r1 = replaceAll('a-b-c', '-', '$&$&')
    expect(r1).toEqual('a--b--c')
    type t1 = Expect<Equal<typeof r1, 'a--b--c'>>

    const r2 = replaceAll('a-b-c', '-', '$$')
    expect(r2).toEqual('a$b$c')
    type t2 = Expect<Equal<typeof r2, 'a$b$c'>>

    const r3 = replaceAll('a-b-c', '-', '$`')
    expect(r3).toEqual('aaba-bc')
    type t3 = Expect<Equal<typeof r3, 'aaba-bc'>>

    const r4 = replaceAll('a-b-c', '-', "$'")
    expect(r4).toEqual('ab-cbcc')
    type t4 = Expect<Equal<typeof r4, 'ab-cbcc'>>
  })
})

describe('replaceAll polyfill', () => {
  const replaceAllPlaceholder = String.prototype.replaceAll

  beforeAll(() => {
    // @ts-expect-error
    String.prototype.replaceAll = undefined
  })

  afterAll(() => {
    String.prototype.replaceAll = replaceAllPlaceholder
  })

  test('it works through a polyfill', () => {
    const spy = vi.spyOn(String.prototype, 'replace')
    const data = 'some nice string'
    const result = replaceAll(data, ' ', '@')
    expect(result).toEqual('some@nice@string')
    expect(spy).toHaveBeenCalledWith(/ /g, '@')
  })
})
