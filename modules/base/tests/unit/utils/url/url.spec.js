import { describe, it, expect } from 'vitest'
import objectToQuery from '#ioc/utils/url/objectToQuery'
import queryToObject from '#ioc/utils/url/queryToObject'

describe('utils/url', () => {
  describe('objectToQuery', () => {
    it('returns empty string when object is nullish', () => {
      expect(objectToQuery()).toBe('')
    })

    it('transforms object to query', () => {
      expect(objectToQuery({ a: 1 })).toBe('a=1')
      expect(objectToQuery({ a: 1, b: 2 })).toBe('a=1&b=2')
    })

    it('transforms array values', () => {
      expect(objectToQuery({ a: [1, 2, 3] })).toBe('a=1&a=2&a=3')
    })

    it('allows different array separator', () => {
      expect(objectToQuery({ a: [1, 2, 3] }, { arraySeparator: ',' })).toBe('a=1,2,3')
    })

    it('strigifies nested objects', () => {
      expect(objectToQuery({ a: { b: 1, c: 2 } })).toBe(`a=${encodeURIComponent('{"b":1,"c":2}')}`)
    })
  })

  describe('queryToObject', () => {
    it('parses simple query', () => {
      expect(queryToObject('username=asd&password=qwe')).toEqual({ username: 'asd', password: 'qwe' })
    })
  })
})
