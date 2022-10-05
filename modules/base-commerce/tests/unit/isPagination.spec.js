import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import isPagination from '#ioc/mixins/isPagination'
import { createRouter, createWebHistory } from 'vue-router'

const Component = {
  template: `<div class="test">{{currentPage}}</div>`,
}

const routes = [
  {
    path: '/',
    component: Component,
  },
]

let router

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  })
})

describe('mixins/isPagination', () => {
  it('shows current page', async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      },
      propsData: {
        total: 9,
        perPage: 3,
      },
      mixins: [isPagination],
    })

    router.push({ query: { page: 2 } })
    await flushPromises()

    expect(wrapper.vm.currentPage).toEqual(2)

    router.push({ query: { page: 1 } })
    await flushPromises()

    expect(wrapper.vm.currentPage).toEqual(1)
  })

  it('returns correct pagination url', async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      },
      propsData: {
        total: 9,
        perPage: 3,
      },
      mixins: [isPagination],
    })

    expect(wrapper.vm.getUrlFor(3)).toEqual('/?page=3')
  })
})
