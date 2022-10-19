import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { describe, it, expect } from 'vitest'
import useEventBus from '#ioc/composables/useEventBus.js'

describe('composables/useEventBus', () => {
  it('works', async () => {
    const Emitter = {
      template: `<button @click="globalEmit">Emit</button>`,
      setup() {
        const { emit } = useEventBus('test')

        function globalEmit() {
          emit('foo')
        }

        return { globalEmit }
      },
    }

    const Listener = {
      template: `<div>{{ eventPayload ?? "bar" }}</div>`,
      setup() {
        const { listen } = useEventBus('test')

        const eventPayload = ref()

        listen((value) => {
          eventPayload.value = value
        })

        return { eventPayload }
      },
    }

    const Component = {
      template: `<Emitter/>
        <Listener/>`,
      components: {
        Emitter,
        Listener,
      },
    }

    let wrapper = mount(Component)

    expect(wrapper.html()).toContain('bar')

    await wrapper.get('button').trigger('click')

    expect(wrapper.html()).toContain('foo')
  })

  it('clears listeners after unmount', async () => {
    let result = 1
    const Emitter = {
      template: `<button @click="globalEmit">Emit</button>`,
      setup() {
        const { emit } = useEventBus('test')

        function globalEmit() {
          emit(1)
        }

        return { globalEmit }
      },
    }

    const Listener = {
      template: `<div></div>`,
      setup() {
        const { listen } = useEventBus('test')

        listen((value) => {
          result += value
        })
      },
    }

    const Component = {
      template: `<Emitter/>
        <div v-if="isListener"><Listener/></div>`,
      components: {
        Emitter,
        Listener,
      },
      data: () => ({
        isListener: true,
      }),
    }

    let wrapper = mount(Component)

    expect(result).toBe(1)

    await wrapper.get('button').trigger('click')

    expect(result).toBe(2)

    await wrapper.setData({ isListener: false })

    await wrapper.get('button').trigger('click')

    expect(result).toBe(2)
  })
})
