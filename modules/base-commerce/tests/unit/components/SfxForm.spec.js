import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SfxForm from '#ioc/components/SfxForm'
import SfxInput from '#ioc/components/SfxInput'

describe('components/SfxForm', () => {
  it('works', () => {
    const Component = {
      template: `
        <SfxForm ref="form"></SfxForm>
      `,
      components: {
        SfxForm,
      },
    }

    const wrapper = mount(Component)
    const form = wrapper.vm.$refs.form

    expect(form.isValid).toEqual(true)
  })

  it('can contain inputs', () => {
    const Component = {
      template: `
        <SfxForm ref="form">
          <SfxInput name="a" value="b" />
          <SfxInput name="c" :value="1" />
        </SfxForm>
      `,
      components: {
        SfxForm,
        SfxInput,
      },
    }

    const wrapper = mount(Component)
    const form = wrapper.vm.$refs.form

    expect(form.isValid).toEqual(true)
    expect(form.getData()).toEqual({
      a: 'b',
      c: 1,
    })
  })

  it('can be submitted', async () => {
    const onSubmit = vi.fn()

    const Component = {
      template: `
        <SfxForm ref="form" @submit="onSubmit">
          <SfxInput name="a" value="b" />
          <SfxInput name="c" :value="1" />
          <button type="submit">Submit</button>
        </SfxForm>
      `,
      components: {
        SfxForm,
        SfxInput,
      },
      methods: {
        onSubmit,
      },
    }

    const wrapper = mount(Component)

    await wrapper.get('button').trigger('submit')

    expect(onSubmit).toHaveBeenCalledWith({ a: 'b', c: 1 })
  })

  it('can be arbitrarily nested', async () => {
    const onSubmit = vi.fn()

    const Component = {
      template: `
        <SfxForm ref="form" @submit="onSubmit">
          <SfxInput name="a" value="b" />
          <SfxInput name="c" :value="1" />
          <SfxForm name="nested">
            <SfxInput name="d" value="e" />
            <SfxInput name="f" value="g" />
          </SfxForm>
          <button type="submit">Submit</button>
        </SfxForm>
      `,
      components: {
        SfxForm,
        SfxInput,
      },
      methods: {
        onSubmit,
      },
    }

    const wrapper = mount(Component)

    await wrapper.get('button').trigger('submit')

    expect(onSubmit).toHaveBeenCalledWith({ a: 'b', c: 1, nested: { d: 'e', f: 'g' } })
  })
})
