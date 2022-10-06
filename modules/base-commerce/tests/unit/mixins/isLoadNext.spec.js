import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import isLoadNext from '#ioc/mixins/IsLoadNext'
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

describe('mixins/isLoadNext', () => {
  it('shows current page', async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      },
      propsData: {
        total: 9,
        perPage: 3,
      },
      mixins: [isLoadNext],
    })

    router.push({ query: { page: 2 } })
    await flushPromises()

    expect(wrapper.vm.currentPage).toEqual(2)

    router.push({ path: '/', query: { page: 1 } })
    await flushPromises()

    expect(wrapper.vm.currentPage).toEqual(1)
  })

  it('loads next page', async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      },
      propsData: {
        total: 9,
        perPage: 3,
      },
      mixins: [isLoadNext],
    })

    wrapper.vm.loadMore()
    await flushPromises()

    expect(wrapper.vm.loadedPages).toEqual(2)
  })

  it('shows correct bool canLoadMore', async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      },
      propsData: {
        total: 9,
        perPage: 3,
      },
      mixins: [isLoadNext],
    })

    router.push({ query: { page: 2 } })
    await flushPromises()

    expect(wrapper.vm.canLoadMore).toEqual(true)

    router.push({ path: '/', query: { page: 3 } })
    await flushPromises()

    expect(wrapper.vm.canLoadMore).toEqual(false)
  })

  it('displays correct loadMoreUrl', async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      },
      propsData: {
        total: 12,
        perPage: 3,
      },
      mixins: [isLoadNext],
    })

    wrapper.vm.loadMore()
    await flushPromises()

    expect(wrapper.vm.loadMoreUrl).toEqual('?pages=3')

    wrapper.vm.loadMore()
    await flushPromises()

    expect(wrapper.vm.loadMoreUrl).toEqual('?pages=4')
  })
})
