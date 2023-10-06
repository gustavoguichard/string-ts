import type * as Subject from './casing'
import type { weirdString } from './casing.test'

type WeirdString = typeof weirdString | 'dont.distribute unions'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      Subject.DelimiterCase<WeirdString, '%'>,
      | 'some%Weird%cased%$*%String%1986%Foo%Bar%W%FOR%WUMBO'
      | 'dont%distribute%unions'
    >
  >
  type test1 = Expect<
    Equal<
      Subject.CamelCase<WeirdString>,
      'someWeirdCased$*String1986FooBarWForWumbo' | 'dontDistributeUnions'
    >
  >
  type test2 = Expect<
    Equal<
      Subject.PascalCase<WeirdString>,
      'SomeWeirdCased$*String1986FooBarWForWumbo' | 'DontDistributeUnions'
    >
  >
  type test3 = Expect<
    Equal<
      Subject.KebabCase<WeirdString>,
      | 'some-weird-cased-$*-string-1986-foo-bar-w-for-wumbo'
      | 'dont-distribute-unions'
    >
  >
  type test4 = Expect<
    Equal<
      Subject.SnakeCase<WeirdString>,
      | 'some_weird_cased_$*_string_1986_foo_bar_w_for_wumbo'
      | 'dont_distribute_unions'
    >
  >
  type test5 = Expect<
    Equal<
      Subject.ConstantCase<WeirdString>,
      | 'SOME_WEIRD_CASED_$*_STRING_1986_FOO_BAR_W_FOR_WUMBO'
      | 'DONT_DISTRIBUTE_UNIONS'
    >
  >
  type test6 = Expect<
    Equal<
      Subject.TitleCase<WeirdString>,
      | 'Some Weird Cased $* String 1986 Foo Bar W For Wumbo'
      | 'Dont Distribute Unions'
    >
  >
}

test('dummy test', () => expect(true).toBe(true))
