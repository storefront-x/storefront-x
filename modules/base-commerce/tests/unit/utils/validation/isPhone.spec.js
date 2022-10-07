import { describe, it, expect } from 'vitest'
import isPhone from '#ioc/utils/validation/isPhone'

describe('utils/validation', () => {
  describe('isPhone', () => {
    it('validates czech phone', () => {
      expect(isPhone('123456789')).toBe(true)
    })

    it('validates czech phone with prefix', () => {
      expect(isPhone('+420123456789')).toBe(true)
    })

    it('validates czech phone with space after prefix', () => {
      expect(isPhone('+420 123456789')).toBe(true)
    })
    it('invalid phone', () => {
      expect(isPhone('')).toBe(false)
      expect(isPhone('4521YS')).toBe(false)
      expect(isPhone('7458123$45')).toBe(false)
    })
  })
})
