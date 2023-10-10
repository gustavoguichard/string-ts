import * as subject from '../separators'

describe('SEPARATOR_REGEX', () => {
  test('dummy regex test', () => {
    expect(subject.SEPARATOR_REGEX.test('[test]')).toEqual(true)
    expect(subject.SEPARATOR_REGEX.test('te.st')).toEqual(true)
    expect(subject.SEPARATOR_REGEX.test('te$st')).toEqual(false)
    expect(subject.SEPARATOR_REGEX.test('test')).toEqual(false)
  })
})
