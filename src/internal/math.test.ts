import type { Math } from '../internal/math.js'

namespace MathTest {
  // NOTE: `Subtract` only supports non-negative integers
  type testSubtract1 = Expect<Equal<Math.Subtract<2, 1>, 1>>
  type testSubtract2 = Expect<Equal<Math.Subtract<2, 2>, 0>>

  type testIsNegative1 = Expect<Equal<Math.IsNegative<2>, false>>
  type testIsNegative2 = Expect<Equal<Math.IsNegative<0>, false>>
  type testIsNegative3 = Expect<Equal<Math.IsNegative<-1>, true>>

  type testAbs1 = Expect<Equal<Math.Abs<-1>, 1>>
  type testAbs2 = Expect<Equal<Math.Abs<1>, 1>>
  type testAbs3 = Expect<Equal<Math.Abs<0>, 0>>
  type testAbs4 = Expect<Equal<Math.Abs<-0>, 0>>

  type testGetPositiveIndex1 = Expect<
    Equal<Math.GetPositiveIndex<'abc', -1>, 2>
  >
}

test('dummy test', () => expect(true).toBe(true))
