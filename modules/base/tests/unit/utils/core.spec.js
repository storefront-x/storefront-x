import { describe, it, expect } from 'vitest'
import isObject from '#ioc/utils/isObject'
import isDeepEqual from '#ioc/utils/isDeepEqual'

describe('utils/core', () => {
  describe('isObject', () => {
    it('returns true for objects', () => {
      class Person {}

      expect(isObject({})).toBe(true)
      expect(isObject({ a: 1 })).toBe(true)
      expect(isObject(new Person())).toBe(true)
      expect(isObject(1)).toBe(false)
      expect(isObject(null)).toBe(false)
      expect(isObject(undefined)).toBe(false)
      expect(isObject([])).toBe(false)
      expect(isObject(Person)).toBe(false)
    })
  })

  describe('isDeepEqual', () => {
    it('deep compares two values', () => {
      expect(isDeepEqual(1, 1)).toBe(true)
      expect(isDeepEqual('a', 'a')).toBe(true)
      expect(isDeepEqual([], [])).toBe(true)
      expect(isDeepEqual([1, 2], [1, 2])).toBe(true)
      expect(isDeepEqual({}, {})).toBe(true)
      expect(isDeepEqual({ a: 'a' }, { a: 'a' })).toBe(true)
      expect(isDeepEqual({ a: 'a', b: 'b' }, { b: 'b', a: 'a' })).toBe(true)

      expect(isDeepEqual(1, 2)).toBe(false)
      expect(isDeepEqual('a', 'b')).toBe(false)
      expect(isDeepEqual([], [1])).toBe(false)
      expect(isDeepEqual([1, 2], [2, 1])).toBe(false)
      expect(isDeepEqual({}, { a: 'a' })).toBe(false)

      expect(
        isDeepEqual(
          {
            a: 'a',
            b: 'b',
            c: {
              d: [1, 2, 'a', { g: { h: 'ch' } }],
              x: {
                x: 1,
                y: ['z'],
              },
            },
          },
          {
            a: 'a',
            b: 'b',
            c: {
              d: [1, 2, 'a', { g: { h: 'ch' } }],
              x: {
                x: 1,
                y: ['z'],
              },
            },
          },
        ),
      ).toBe(true)

      expect(
        isDeepEqual(
          {
            a: 'a',
            b: 'b',
            c: {
              d: [1, 2, 'a', { g: { h: 'ch' } }],
              x: {
                x: 1,
                y: ['z'],
              },
            },
          },
          {
            a: 'a',
            b: 'b',
            c: {
              d: [1, 2, 'a', { g: { ch: 'ch' } }],
              x: {
                x: 1,
                y: ['z'],
              },
            },
          },
        ),
      ).toBe(false)
    })
  })
})
