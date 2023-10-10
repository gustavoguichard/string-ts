import type { DelimiterCase } from './to-delimiter-case.js'
import type { CamelCase } from './to-camel-case.js'
import type { PascalCase } from './to-pascal-case.js'
import type { KebabCase } from './to-kebab-case.js'
import type { SnakeCase } from './to-snake-case.js'
import type { ConstantCase } from './to-constant-case.js'
import type { TitleCase } from './to-title-case.js'
import type { WEIRD_TEXT } from '../internal/fixtures.js'

type WeirdTextUnion = typeof WEIRD_TEXT | 'dont.distribute unions'

namespace TypeTransforms {
  type test = Expect<
    Equal<
      DelimiterCase<WeirdTextUnion, '%'>,
      | 'some%Weird%cased%$*%String%1986%Foo%Bar%W%FOR%WUMBO'
      | 'dont%distribute%unions'
    >
  >
  type test1 = Expect<
    Equal<
      CamelCase<WeirdTextUnion>,
      'someWeirdCased$*String1986FooBarWForWumbo' | 'dontDistributeUnions'
    >
  >
  type test2 = Expect<
    Equal<
      PascalCase<WeirdTextUnion>,
      'SomeWeirdCased$*String1986FooBarWForWumbo' | 'DontDistributeUnions'
    >
  >
  type test3 = Expect<
    Equal<
      KebabCase<WeirdTextUnion>,
      | 'some-weird-cased-$*-string-1986-foo-bar-w-for-wumbo'
      | 'dont-distribute-unions'
    >
  >
  type test4 = Expect<
    Equal<
      SnakeCase<WeirdTextUnion>,
      | 'some_weird_cased_$*_string_1986_foo_bar_w_for_wumbo'
      | 'dont_distribute_unions'
    >
  >
  type test5 = Expect<
    Equal<
      ConstantCase<WeirdTextUnion>,
      | 'SOME_WEIRD_CASED_$*_STRING_1986_FOO_BAR_W_FOR_WUMBO'
      | 'DONT_DISTRIBUTE_UNIONS'
    >
  >
  type test6 = Expect<
    Equal<
      TitleCase<WeirdTextUnion>,
      | 'Some Weird Cased $* String 1986 Foo Bar W For Wumbo'
      | 'Dont Distribute Unions'
    >
  >
}

test('dummy test', () => expect(true).toBe(true))
