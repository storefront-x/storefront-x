import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SfxCarousel from '#ioc/components/SfxCarousel'

vi.mock('keen-slider/keen-slider.min.css', () => ({ default: '' }))

describe('components/SfxCarousel', () => {
  it('renders', () => {
    const wrapper = mount(SfxCarousel)

    expect(wrapper).toBeTruthy()
  })

  it('displays first page on initial render', () => {
    const wrapper = mount({
      template: `
        <SfxCarousel v-slot="{ slide }" :slides="['slideA', 'slideB', 'slideC']">
          {{ slide }}
        </SfxCarousel>
      `,
      components: {
        SfxCarousel,
      },
    })

    expect(wrapper.text()).toContain('slideA')
    expect(wrapper.text()).not.toContain('slideB')
    expect(wrapper.text()).not.toContain('slideC')
  })

  it('renders all pages', async () => {
    const wrapper = mount(
      {
        template: `
        <SfxCarousel v-slot="{ slide }" :slides="['slideA', 'slideB', 'slideC']">
          {{ slide }}
        </SfxCarousel>
      `,
        components: {
          SfxCarousel,
        },
      },
      {
        attachTo: document.body,
      },
    )

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('slideA')
    expect(wrapper.text()).toContain('slideB')
    expect(wrapper.text()).toContain('slideC')
  })
})
