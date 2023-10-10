import type * as Subject from '../src/internals'

namespace Internals {
  type test = Expect<
    Equal<
      Subject.PascalCaseAll<['one', 'two', 'three']>,
      ['One', 'Two', 'Three']
    >
  >

  type test1 = Expect<
    Equal<
      Subject.Reject<['one', '', 'two', '', 'three'], ''>,
      ['one', 'two', 'three']
    >
  >

  type test2 = Expect<Equal<Subject.DropSuffix<'helloWorld', 'World'>, 'hello'>>

  type test3 = Expect<Equal<Subject.TupleOf<3, ' '>, [' ', ' ', ' ']>>
}

test('dummy test', () => expect(true).toBe(true))
