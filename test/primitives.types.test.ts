import type { Join } from '../src/join.js'
import type { Replace } from '../src/replace.js'
import type { ReplaceAll } from '../src/replaceAll.js'
import type { TrimStart } from '../src/trimStart.js'
import type { TrimEnd } from '../src/trimEnd.js'
import type { Trim } from '../src/trim.js'
import type { Split } from '../src/split.js'
import type { CharAt } from '../src/charAt.js'
import type { Slice } from '../src/slice.js'
import type { Length } from '../src/length.js'
import type { Concat } from '../src/concat.js'
import type { StartsWith } from '../src/startsWith.js'
import type { EndsWith } from '../src/endsWith.js'
import type { Includes } from '../src/includes.js'

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
