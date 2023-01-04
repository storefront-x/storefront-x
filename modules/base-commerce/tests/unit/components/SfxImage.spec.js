import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SfxImage from '#ioc/components/SfxImage'

describe('components/SfxImage', () => {
  it('renders', () => {
    const wrapper = mount(SfxImage)

    expect(wrapper).toBeTruthy()
  })

  it('renders src', () => {
    const wrapper = mount(SfxImage, {
      propsData: {
        src: 'source',
      },
    })

    expect(wrapper.html()).toContain('path=source')
  })

  it('supports width and height', () => {
    const wrapper = mount(SfxImage, {
      propsData: {
        src: 'source',
        width: 100,
        height: 200,
      },
    })

    expect(wrapper.html()).toContain('width="100"')
    expect(wrapper.html()).toContain('height="200"')
  })

  it('supports multiples', () => {
    const wrapper = mount(SfxImage, {
      propsData: {
        src: 'source',
        width: 100,
        height: 200,
        multiples: [2],
      },
    })

    expect(wrapper.html()).toMatch(/srcset=".+source.*, .+source.* 2x"/)
  })

  it('supports src-sfx prop', () => {
    const wrapper = mount(SfxImage, {
      propsData: {
        srcSfx: 'source',
      },
    })

    expect(wrapper.html()).toContain('sfx=source')
  })
})
