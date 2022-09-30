/* eslint-disable no-import-assign */
import { describe, it, expect, beforeAll } from 'vitest'
import ToMoney from '../../mappers/ToMoney'
import * as PRICE_OFFSET from '../../config/PRICE_OFFSET'

describe('ToMoney', () => {
  beforeAll(() => {
    PRICE_OFFSET.default = 1000
  })

  it('exists', () => {
    expect(ToMoney).toBeDefined()
  })

  it('converts 81.82 correctly', () => {
    expect(ToMoney({ value: 81.82 }).value).toBe(81820)
  })
})
