import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import useLoadMore from '#ioc/composables/useLoadMore'
import { createRouter, createWebHistory } from 'vue-router'

const Component = {
  template: `<div class="test">{{loadMore.currentPage}}</div>`,
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

describe('composables/useLoadMore', () => {
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
        const loadMore = useLoadMore({
          total: 9,
          perPage: 3,
        })
        return { loadMore }
      },
    })

    router.push({ query: { page: 2 } })
    await flushPromises()

    expect(wrapper.vm.loadMore.currentPage).toEqual(2)

    router.push({ path: '/', query: { page: 1 } })
    await flushPromises()

    expect(wrapper.vm.loadMore.currentPage).toEqual(1)
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
      setup: () => {
        const loadMore = useLoadMore({
          total: 9,
          perPage: 3,
        })
        return { loadMore }
      },
    })

    wrapper.vm.loadMore.load()
    await flushPromises()

    expect(wrapper.vm.loadMore.loadedPages).toEqual(2)
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
      setup: () => {
        const loadMore = useLoadMore({
          total: 9,
          perPage: 3,
        })
        return { loadMore }
      },
    })

    router.push({ query: { page: 2 } })
    await flushPromises()

    expect(wrapper.vm.loadMore.canLoadMore).toEqual(true)

    router.push({ path: '/', query: { page: 3 } })
    await flushPromises()

    expect(wrapper.vm.loadMore.canLoadMore).toEqual(false)
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
      setup: () => {
        const loadMore = useLoadMore({
          total: 9,
          perPage: 3,
        })
        return { loadMore }
      },
    })

    wrapper.vm.loadMore.load()
    await flushPromises()

    expect(wrapper.vm.loadMore.loadMoreUrl).toEqual('?page=3&pages=3')

    wrapper.vm.loadMore.load()
    await flushPromises()

    expect(wrapper.vm.loadMore.loadMoreUrl).toEqual('?page=4&pages=4')
  })
})
