import type { Math } from '../internal/math.js'

namespace MathTest {
  // NOTE: `Subtract` only supports non-negative integers
  type testSubtract1 = Expect<Equal<Math.Subtract<2, 1>, 1>>
  type testSubtract2 = Expect<Equal<Math.Subtract<2, 2>, 0>>
  type testSubtract3 = Expect<Equal<Math.Subtract<number, 2>, number>>
  type testSubtract4 = Expect<Equal<Math.Subtract<2, number>, number>>

  type testIsNegative1 = Expect<Equal<Math.IsNegative<2>, false>>
  type testIsNegative2 = Expect<Equal<Math.IsNegative<0>, false>>
  type testIsNegative3 = Expect<Equal<Math.IsNegative<-1>, true>>
  type testIsNegative4 = Expect<Equal<Math.IsNegative<number>, boolean>>

  type testAbs1 = Expect<Equal<Math.Abs<-1>, 1>>
  type testAbs2 = Expect<Equal<Math.Abs<1>, 1>>
  type testAbs3 = Expect<Equal<Math.Abs<0>, 0>>
  type testAbs4 = Expect<Equal<Math.Abs<-0>, 0>>
  type testAbs5 = Expect<Equal<Math.Abs<number>, number>>

  type testGetPositiveIndex1 = Expect<
    Equal<Math.GetPositiveIndex<'abc', -1>, 2>
  >
  type testGetPositiveIndex2 = Expect<
    Equal<Math.GetPositiveIndex<string, -1>, number>
  >
}

test('dummy test', () => expect(true).toBe(true))
