/* eslint-disable @typescript-eslint/ban-ts-comment */
import { replaceAll } from './replace-all.js'

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
})

describe('replaceAll polyfill', () => {
  const replaceAllPlaceholder = String.prototype.replaceAll

  beforeAll(() => {
    // @ts-ignore
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
