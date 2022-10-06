import { describe, test, it, expect } from 'vitest'
import ensureArray from '#ioc/utils/array/ensureArray'
import first from '#ioc/utils/array/first'
import last from '#ioc/utils/array/last'

describe('utils/array', () => {
  describe('ensureArray', () => {
    test('it converts string to array', () => {
      const arr = ensureArray('abc')
      expect(arr).toStrictEqual(['abc'])
    })

    test('it converts object to array', () => {
      const arr = ensureArray({ key: 'abc' })
      expect(arr).toStrictEqual([{ key: 'abc' }])
    })

    test('it converts undefined to empty array', () => {
      const arr = ensureArray(undefined)
      expect(arr).toStrictEqual([])
    })

    test('it converts null to empty array', () => {
      const arr = ensureArray(null)
      expect(arr).toStrictEqual([])
    })

    test('it does not alter existing array', () => {
      expect(ensureArray([])).toStrictEqual([])
      expect(ensureArray([1, 2, 3])).toStrictEqual([1, 2, 3])
    })
  })

  describe('first', () => {
    it('returns first element', () => {
      expect(first([2, 3, 4])).toBe(2)
    })
  })

  describe('last', () => {
    it('returns last element', () => {
      expect(last([2, 3, 4])).toBe(4)
    })
  })
})
