describe('Array.prototype.join', () => {
  test('test 1', () => {
    const testArray = ['a', 'b', 'c'] as const
    const result = testArray.join(', ')
    const expected = 'a, b, c'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.charAt', () => {
  test('test 1', () => {
    const result = 'abcdef'.charAt(2)
    const expected = 'c'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.concat', () => {
  test('test 1', () => {
    const result = 'abc'.concat('d')
    const expected = 'abcd'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.endsWith', () => {
  test('test 1', () => {
    const result = 'abc'.endsWith('c')
    const expected = true
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 2', () => {
    const result = 'abc'.endsWith('d')
    const expected = false
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 3', () => {
    const result = 'a,b,c'.endsWith('b,c', 5)
    const expected = true
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 4', () => {
    const result = 'a,b,c'.endsWith('b,c', 4)
    const expected = false
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.includes', () => {
  test('test 1', () => {
    const result = 'abc'.includes('b')
    const expected = true
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 2', () => {
    const result = 'abc'.includes('d')
    const expected = false
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 3', () => {
    const result = 'abc'.includes('b', 1)
    const expected = true
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 4', () => {
    const result = 'abc'.includes('b', 2)
    const expected = false
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.padEnd', () => {
  test('test 1', () => {
    const result = 'abc'.padEnd(10, '-')
    const expected = 'abc-------'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 2', () => {
    const result = 'abc'.padEnd(10)
    const expected = 'abc       '
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.padStart', () => {
  test('test 1', () => {
    const result = 'abc'.padStart(10, '-')
    const expected = '-------abc'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 2', () => {
    const result = 'abc'.padStart(10)
    const expected = '       abc'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.repeat', () => {
  test('test 1', () => {
    const result = 'abc'.repeat(3)
    const expected = 'abcabcabc'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 2', () => {
    const result = 'abc'.repeat(0)
    const expected = ''
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.slice', () => {
  test('test 1', () => {
    const result = 'abcdef'.slice(2, 4)
    const expected = 'cd'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 2', () => {
    const result = 'abcdef'.slice(3)
    const expected = 'def'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 3', () => {
    const result = 'abcdef'.slice()
    const expected = 'abcdef'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.replace', () => {
  test('test 1', () => {
    const result = 'a.b.c'.replace('.', ',')
    const expected = 'a,b.c'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.replaceAll', () => {
  test('test 1', () => {
    const result = 'a.b.c'.replaceAll('.', ',')
    const expected = 'a,b,c'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.slice', () => {
  test('test 1', () => {
    const result = 'abcdef'.slice(2, 4)
    const expected = 'cd'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 2', () => {
    const result = 'abcdef'.slice(3)
    const expected = 'def'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 3', () => {
    const result = 'abcdef'.slice()
    const expected = 'abcdef'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.split', () => {
  test('test 1', () => {
    const result = 'a,b,c'.split(',')
    const expected = ['a', 'b', 'c'] as const
    type Mutable<T extends readonly unknown[]> = [...T]
    type Expected = Mutable<typeof expected>
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, Expected>>
  })
})

describe('String.prototype.startsWith', () => {
  test('test 1', () => {
    const result = 'abc'.startsWith('a')
    const expected = true
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 2', () => {
    const result = 'abc'.startsWith('b')
    const expected = false
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 3', () => {
    const result = 'abc'.startsWith('b', 1)
    const expected = true
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })

  test('test 4', () => {
    const result = 'abc'.startsWith('b', 2)
    const expected = false
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.toLowerCase', () => {
  test('test 1', () => {
    const result = 'ABC'.toLowerCase()
    const expected = 'abc'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.toUpperCase', () => {
  test('test 1', () => {
    const result = 'abc'.toUpperCase()
    const expected = 'ABC'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.trim', () => {
  test('test 1', () => {
    const result = '  foo  '.trim()
    const expected = 'foo'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.trimEnd', () => {
  test('test 1', () => {
    const result = '  foo  '.trimEnd()
    const expected = '  foo'
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})

describe('String.prototype.trimStart', () => {
  test('test 1', () => {
    const result = '  foo  '.trimStart()
    const expected = 'foo  '
    expect(result).toEqual(expected)
    type test = Expect<Equal<typeof result, typeof expected>>
  })
})
