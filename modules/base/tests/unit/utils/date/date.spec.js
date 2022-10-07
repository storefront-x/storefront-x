import { describe, it, expect } from 'vitest'
import toDate from '#ioc/utils/date/toDate'

describe('utils/date', () => {
  describe('toDate', () => {
    it('returns null on nullish values', () => {
      expect(toDate()).toBe(null)
      expect(toDate(null)).toBe(null)
      expect(toDate(undefined)).toBe(null)
      expect(toDate(0)).toBe(null)
      expect(toDate(false)).toBe(null)
      expect(toDate('')).toBe(null)
    })

    it('parses string dates', () => {
      expect(toDate('2021-05-01 17:06:00')).toEqual(new Date('2021-05-01 17:06:00'))
    })

    it('returns null when input is non-date', () => {
      expect(toDate('string')).toBe(null)
    })
  })
})
