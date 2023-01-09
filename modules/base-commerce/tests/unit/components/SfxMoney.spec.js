import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import SfxMoney from '#ioc/components/SfxMoney'
import formatters from '~/.sfx/formatters/money'

// TODO change to vi.mock when new vite released with fix
describe('components/SfxMoney', () => {
  beforeAll(() => {
    formatters.TEST = { default: (value) => `${value} TEST` }
    formatters.MULTI = { default: (value) => `${value} MULTI` }
    formatters.HTML = { default: () => 'a<br>b' }
  })
  it('renders empty string when formatter is missing', () => {
    const wrapper = mount(
      {
        template: `
        <SfxMoney :money="{ currency: 'missing', value }" />
      `,
        components: {
          SfxMoney,
        },
        data: () => ({
          value: 1000,
        }),
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.text()).toBe('')
  })

  it('renders properly formatted money', async () => {
    const wrapper = mount(
      {
        template: `
        <SfxMoney :money="{ currency: 'TEST', value }" />
      `,
        components: {
          SfxMoney,
        },
        data: () => ({
          value: 1000,
        }),
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.text()).toBe('10 TEST')

    await wrapper.setData({ value: 100 })

    expect(wrapper.text()).toBe('1 TEST')
  })

  it('renders HTML', () => {
    const wrapper = mount(
      {
        template: `
        <SfxMoney :money="{ currency: 'HTML', value }" />
      `,
        components: {
          SfxMoney,
        },
        data: () => ({
          value: 1000,
        }),
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.html()).toBe('<span>a<br>b</span>')
  })

  it('it allows rendering via default scoped slot', () => {
    const wrapper = mount(
      {
        template: `
        <SfxMoney :money="{ currency: 'TEST', value: 1000 }" #default="{ html }">
          <div v-html="html" />
        </SfxMoney>
      `,
        components: {
          SfxMoney,
        },
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.html()).toBe('<div>10 TEST</div>')
  })

  it('it adding class to root element', () => {
    const wrapper = mount(
      {
        template: `
        <SfxMoney :money="{ currency: 'TEST', value: 1000 }" class="price" />
      `,
        components: {
          SfxMoney,
        },
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.html()).toBe('<span class="price">10 TEST</span>')
  })

  it('it allows changing root element via el prop', () => {
    const wrapper = mount(
      {
        template: `
        <SfxMoney :money="{ currency: 'TEST', value: 1000 }" el="del" />
      `,
        components: {
          SfxMoney,
        },
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.html()).toBe('<del>10 TEST</del>')
  })

  it('renders empty string when props missing', () => {
    const wrapper = mount(
      {
        template: `
        <SfxMoney />
      `,
        components: {
          SfxMoney,
        },
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.html()).toBe('<span></span>')
  })

  it('renders span when slot is rootless', () => {
    const wrapper = mount(
      {
        template: `
      <SfxMoney :money="{ currency: 'TEST', value: 1000 }"/>
      `,
        components: {
          SfxMoney,
        },
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.html()).toBe('<span>10 TEST</span>')
  })

  it('renders attributes', () => {
    const wrapper = mount(
      {
        template: `
      <SfxMoney :money="{ currency: 'TEST', value: 1000 }" />
      `,
        components: {
          SfxMoney,
        },
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.html()).toBe('<span>10 TEST</span>')
  })

  it('renders attributes with scoped slot', () => {
    const wrapper = mount(
      {
        template: `
      <SfxMoney :money="{ currency: 'TEST', value: 1000 }" v-slot="{ html }">{{ html }}</SfxMoney>
      `,
        components: {
          SfxMoney,
        },
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.html()).toBe('10 TEST')
  })

  it('allows negating the value', () => {
    const wrapper = mount(
      {
        template: `
        <SfxMoney :money="{ currency: 'TEST', value }" negate />
      `,
        components: {
          SfxMoney,
        },
        data: () => ({
          value: 1000,
        }),
      },
      { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } },
    )

    expect(wrapper.text()).toBe('-10 TEST')
  })
})
