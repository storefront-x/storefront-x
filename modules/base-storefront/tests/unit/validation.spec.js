import { describe, it, expect } from 'vitest'
import isPhone from '../../utils/validation/isPhone'

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
  })
})
