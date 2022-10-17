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

    wrapper.unmount()

    const NewListener = {
      template: `<div>{{ eventPayload }}</div>`,
      setup() {
        const { listen } = useEventBus('test')

        const eventPayload = ref('bar')

        listen((value) => {
          eventPayload.value = value
        })

        return { eventPayload }
      },
    }

    wrapper = mount(NewListener)

    expect(wrapper.html()).toContain('bar')
  })
})
