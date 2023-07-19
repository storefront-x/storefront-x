import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import usePagination from '#ioc/composables/usePagination'
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

describe('composables/usePagination', () => {
  it('shows current page', async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      },
      propsData: {
        total: 9,
        perPage: 3,
      },
      setup: () => {
        const pagination = usePagination()
        return { pagination }
      },
    })

    router.push({ query: { page: 2 } })

    await flushPromises()

    expect(wrapper.vm.pagination.currentPage).toEqual(2)

    router.push({ query: { page: 1 } })
    await flushPromises()

    expect(wrapper.vm.pagination.currentPage).toEqual(1)
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
      setup: () => {
        const pagination = usePagination()
        return { pagination }
      },
    })

    expect(wrapper.vm.pagination.getUrlFor(3)).toEqual('/?page=3')
  })
})
