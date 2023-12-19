import { type Reverse, reverse } from './reverse'

namespace ReverseTests {
  type test1 = Expect<Equal<Reverse<'hello'>, 'olleh'>>
  type test2 = Expect<Equal<Reverse<'123'>, '321'>>
  type test3 = Expect<
    Equal<Reverse<'I love TypeScript!'>, '!tpircSepyT evol I'>
  >
  type test4 = Expect<Equal<Reverse<string>, string>>
  type test5 = Expect<Equal<Reverse<Uppercase<string>>, Uppercase<string>>>
}

describe('reverse', () => {
  test('should reverse a string', () => {
    const expected = '!desrever eb ot eraperp ,dlrow lufituaeb olleH'
    const data = 'Hello beautiful world, prepare to be reversed!'
    const result = reverse(data)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('should reverse a long string', () => {
    const expected = 'murobal tse di mina tillom tnuresed aiciffo iuq apluc ni tnus ,tnediorp non tatadipuc taceacco tnis ruetpecxE .rutairap allun taiguf ue erolod mullic esse tilev etatpulov ni tiredneherper ni rolod eruri etua siuD .tauqesnoc odommoc ae xe piuqila tu isin sirobal ocmallu noitaticrexe durtson siuq ,mainev minim da mine tU .auqila angam erolod te erobal tu tnudidicni ropmet domsuie od des ,tile gnicsipida rutetcesnoc ,tema tis rolod muspi meroL'
    const data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    const result = reverse(data)
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
