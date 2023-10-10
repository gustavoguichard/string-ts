import type { Join } from './join.js'
import type { Replace } from './replace.js'
import type { ReplaceAll } from './replace-all.js'
import type { TrimStart } from './trim-start.js'
import type { TrimEnd } from './trim-end.js'
import type { Trim } from './trim.js'
import type { Split } from './split.js'
import type { CharAt } from './char-at.js'
import type { Slice } from './slice.js'
import type { Length } from './length.js'
import type { Concat } from './concat.js'
import type { StartsWith } from './starts-with.js'
import type { EndsWith } from './ends-with.js'
import type { Includes } from './includes.js'

namespace TypeTests {
  type test1 = Expect<
    Equal<Join<['some', 'nice', 'string'], ' '>, 'some nice string'>
  >
  type test2 = Expect<
    Equal<Replace<'some nice string', ' ', '-'>, 'some-nice string'>
  >
  type test3 = Expect<
    Equal<ReplaceAll<'some nice string', ' ', '-'>, 'some-nice-string'>
  >
  type test4 = Expect<
    Equal<TrimStart<' some nice string '>, 'some nice string '>
  >
  type test5 = Expect<Equal<TrimEnd<' some nice string '>, ' some nice string'>>
  type test6 = Expect<Equal<Trim<' some nice string '>, 'some nice string'>>
  type test7 = Expect<
    Equal<Split<'some nice string', ' '>, ['some', 'nice', 'string']>
  >
  type test8 = Expect<Equal<CharAt<'some nice string', 5>, 'n'>>
  type test9 = Expect<Equal<Slice<'some nice string', 5>, 'nice string'>>
  type test10 = Expect<Equal<Length<'some nice string'>, 16>>

  type test11 = Expect<
    Equal<Concat<['a', 'bc', 'def'] | ['1', '23', '456']>, 'abcdef' | '123456'>
  >

  type test12 = Expect<Equal<StartsWith<'abc', 'a'>, true>>
  type test13 = Expect<Equal<EndsWith<'abc', 'c'>, true>>
  type test14 = Expect<Equal<Includes<'abcde', 'bcd'>, true>>
}

test('dummy test', () => expect(true).toBe(true))
