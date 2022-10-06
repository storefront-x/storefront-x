import { describe, it, expect } from 'vitest'
import multiply from '#ioc/utils/money/multiply'

describe('utils/money/multiply', () => {
  it('exists', () => {
    expect(multiply).toBeDefined()
  })

  it('multiplies money by number', () => {
    const result = multiply({ value: 10, currency: 'CZK' }, 4)
    expect(result).toEqual({ value: 40, currency: 'CZK' })
  })
})
