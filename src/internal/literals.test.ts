import type {
  All,
  Any,
  IsBooleanLiteral,
  IsNumberLiteral,
  IsStringLiteral,
  IsStringLiteralArray,
} from './literals.js'

namespace LiteralsTests {
  // IsNumberLiteral
  type testINL1 = Expect<Equal<true, IsNumberLiteral<5>>>
  type testINL2 = Expect<Equal<false, IsNumberLiteral<number>>>

  // IsBooleanLiteral
  type testIBL1 = Expect<Equal<IsBooleanLiteral<true>, true>>
  type testIBL2 = Expect<Equal<IsBooleanLiteral<false>, true>>
  type testIBL3 = Expect<Equal<IsBooleanLiteral<boolean>, false>>

  // Any
  type testAny1 = Expect<Equal<Any<[true, false]>, true>>
  type testAny2 = Expect<Equal<Any<[true, boolean]>, true>>
  type testAny3 = Expect<Equal<Any<[false, boolean]>, false>>
  type testAny4 = Expect<Equal<Any<[false, false]>, false>>
  type testAny5 = Expect<Equal<Any<[]>, false>>
  type testAny6 = Expect<Equal<Any<boolean[]>, false>>

  // All
  type testAll1 = Expect<Equal<All<[true, true]>, true>>
  type testAll2 = Expect<Equal<All<[true, false]>, false>>
  type testAll3 = Expect<Equal<All<[true, boolean]>, false>>
  type testAll4 = Expect<Equal<All<[false, boolean]>, false>>
  type testAll5 = Expect<Equal<All<[false, false]>, false>>
  type testAll6 = Expect<Equal<All<[]>, true>>
  type testAll7 = Expect<Equal<All<boolean[]>, false>>

  // IsStringLiteral
  type testISL1 = Expect<Equal<true, IsStringLiteral<'foo'>>>
  type testISL2 = Expect<Equal<true, IsStringLiteral<Uppercase<'foo'>>>>
  type testISL3 = Expect<
    Equal<false, IsStringLiteral<Uppercase<`foo${string}`>>>
  >
  type testISL4 = Expect<Equal<false, IsStringLiteral<`foo${string}`>>>
  type testISL5 = Expect<Equal<false, IsStringLiteral<`foo${number}`>>>
  type testISL6 = Expect<Equal<false, IsStringLiteral<string>>>
  type testISL7 = Expect<Equal<false, IsStringLiteral<Lowercase<string>>>>
  type testISL8 = Expect<
    Equal<false, IsStringLiteral<Uppercase<Lowercase<string>>>>
  >
  type testISL9 = Expect<Equal<true, IsStringLiteral<'abc' | 'def'>>>
  type testISL10 = Expect<Equal<true, IsStringLiteral<Capitalize<'abc'>>>>
  type testISL11 = Expect<Equal<true, IsStringLiteral<Uncapitalize<'abc'>>>>
  type testISL12 = Expect<Equal<false, IsStringLiteral<`${string}abc`>>>
  type testISL13 = Expect<
    Equal<false, IsStringLiteral<'abc' | Uppercase<string>>>
  >
  type testISL14 = Expect<Equal<true, IsStringLiteral<`${boolean}bar`>>>
  type testISL15 = Expect<Equal<true, IsStringLiteral<`${undefined}bar`>>>
  type testISL16 = Expect<Equal<true, IsStringLiteral<`${null}bar`>>>
  type testISL17 = Expect<Equal<false, IsStringLiteral<`${number}`>>>

  // IsStringLiteralArray
  type testISLA1 = Expect<Equal<IsStringLiteralArray<['foo', 'bar']>, true>>
  type testISLA2 = Expect<Equal<IsStringLiteralArray<string[]>, false>>
  type testISLA3 = Expect<
    Equal<IsStringLiteralArray<['abc', 'def', string]>, false>
  >
}

test('dummy test', () => expect(true).toBe(true))
