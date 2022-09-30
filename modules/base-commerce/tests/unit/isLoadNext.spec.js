import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import isLoadNext from '../../mixins/isLoadNext'

describe('isLoadNext', () => {
  it('renders src', () => {
    const Component = {
      template: `<div class="test"></div>`,
    }
    const wrapper = mount(Component, {
      propsData: {
        total: 4,
        perPage: 3,
      },
      mixins: [isLoadNext],
    })

    expect(wrapper.vm.loadedPages).toEqual(1)
  })
})
