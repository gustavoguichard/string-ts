import { type Dedent, dedent } from './dedent'

namespace DedentTests {
  type test1 = Expect<Equal<Dedent<'  hello'>, 'hello'>>
  type test2 = Expect<Equal<Dedent<' 123'>, '123'>>
}

describe('dedent', () => {
  test('should dedent a string', () => {
    const expected = `Leading and trailing lines will be trimmed, so you can write something like
this and have it work as you expect:
  * how convenient it is
  * that I can use an indented list
      - and still have it do the right thing
That's all.`
    const data = `
  Leading and trailing lines will be trimmed, so you can write something like
  this and have it work as you expect:
    * how convenient it is
    * that I can use an indented list
        - and still have it do the right thing
  That's all.
`
    const result = dedent(data)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
