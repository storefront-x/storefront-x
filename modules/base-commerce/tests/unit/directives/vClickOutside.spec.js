import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import vClickOutside from '#ioc/directives/vClickOutside'

describe('directives/ClickOutside', () => {
  it('calls handler when clicked outside of the element', async () => {
    let a = 0
    let b = 0
    document.body.innerHTML = `
    <div>
      <h1>Non Vue app</h1>
      <div id="app"></div>
    </div>
  `
    const wrapper = mount(
      {
        template: `
        <div>
          <div>
            <div id="a" v-click-outside="onClickOutsideA">a</div>
          </div>
          <div>
            <div id="b" v-click-outside="onClickOutsideB">b</div>
          </div>
        </div>
      `,
        methods: {
          onClickOutsideA() {
            a++
          },
          onClickOutsideB() {
            b++
          },
        },
      },
      {
        attachTo: document.getElementById('app'),
        global: {
          directives: {
            ClickOutside: vClickOutside,
          },
        },
      },
    )

    await wrapper.find('#a').trigger('click')
    expect(a).toBe(0)
    expect(b).toBe(1)
    await wrapper.find('#b').trigger('click')
    expect(a).toBe(1)
    expect(b).toBe(1)
  })
})
