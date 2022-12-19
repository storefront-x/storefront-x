import { describe, it, expect } from 'vitest'
import isEmail from '#ioc/utils/validation/isEmail'

describe('validation/isEmail', () => {
  it('email is valid', () => {
    expect(isEmail('test@testing.cz')).toBe(true)
    expect(isEmail('a+a@neco.zz')).toBe(true)
    expect(isEmail('example-indeed@strange-example.com')).toBe(true)
    expect(isEmail('332.joe-doe@ma432-CK.yest')).toBe(true)
  })
  it('email is invalid', () => {
    expect(isEmail('test-testing.?cz')).toBe(false)
    expect(isEmail('@test')).toBe(false)
    expect(isEmail('this is"notallowed@example.com')).toBe(false)
    expect(isEmail('')).toBe(false)
  })
})
