/* eslint-disable no-import-assign */
import { describe, it, expect } from 'vitest'
import ToMoney from '#ioc/mappers/ToMoney'

describe('mappers/ToMoney', () => {
  it('exists', () => {
    expect(ToMoney).toBeDefined()
  })

  it('converts 81.82 correctly', () => {
    expect(ToMoney({ value: 81.82 }).value).toBe(8182)
  })
})
