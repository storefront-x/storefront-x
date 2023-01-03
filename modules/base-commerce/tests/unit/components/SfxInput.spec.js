import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeAll } from 'vitest'
import SfxForm from '#ioc/components/SfxForm'
import SfxInput from '#ioc/components/SfxInput'
import validators from '~/.sfx/validators'

describe('components/SfxInput', () => {
  beforeAll(() => {
    validators.__test__ = function (value, expected) {
      return value === expected || 'Validation error'
    }
    validators.__min__ = function (value, min) {
      return value.length > min || 'Too short'
    }
    validators.__max__ = function (value, max) {
      return value.length < max || 'Too long'
    }
    validators.__oneOf__ = function (value, ...allowed) {
      return allowed.includes(value) || 'Not one of'
    }
    validators.__name__ = function () {
      return this.name
    }
  })

  it('handles validation', async () => {
    const Component = {
      template: `
        <SfxForm ref="form">
          <SfxInput ref="input" name="a" :value="value" :validators="[validator]" />
        </SfxForm>
      `,
      components: {
        SfxForm,
        SfxInput,
      },
      data() {
        return {
          value: 1,
        }
      },
      methods: {
        validator(value) {
          return value > 10 || 'Value has to be at least 10!'
        },
      },
    }

    const wrapper = mount(Component)
    const form = wrapper.vm.$refs.form
    const input = wrapper.vm.$refs.input

    expect(form.isValid).toEqual(false)
    expect(input.errors).toEqual(['Value has to be at least 10!'])

    await wrapper.setData({
      value: 100,
    })

    expect(form.isValid).toEqual(true)
    expect(input.errors).toEqual([])
  })

  it('handles global validators', async () => {
    const Component = {
      template: `
        <SfxForm ref="form">
          <SfxInput ref="input" name="a" :value="value" validators="__test__:c" />
        </SfxForm>
      `,
      components: {
        SfxForm,
        SfxInput,
      },
      data() {
        return {
          value: 'C',
        }
      },
    }

    const wrapper = mount(Component)
    const form = wrapper.vm.$refs.form
    const input = wrapper.vm.$refs.input

    expect(form.isValid).toEqual(false)
    expect(input.errors).toEqual(['Validation error'])

    await wrapper.setData({
      value: 'c',
    })
    expect(form.isValid).toEqual(true)
    expect(input.errors).toEqual([])
  })

  it('handles complex validators', async () => {
    const Component = {
      template: `
        <SfxForm ref="form">
          <SfxInput ref="input" name="password" :value="password" validators="__min__:8|__max__:12|__oneOf__:asdfghjkl,qwertzuiop,yxcvbnm" />
        </SfxForm>
      `,
      components: {
        SfxForm,
        SfxInput,
      },
      data() {
        return {
          password: 'weak',
        }
      },
    }

    const wrapper = mount(Component)
    const form = wrapper.vm.$refs.form
    const input = wrapper.vm.$refs.input

    expect(form.isValid).toEqual(false)
    expect(input.errors).toEqual(['Too short', 'Not one of'])

    await wrapper.setData({
      password: 'mySuperStrongPassword',
    })

    expect(form.isValid).toEqual(false)
    expect(input.errors).toEqual(['Too long', 'Not one of'])

    await wrapper.setData({
      password: 'asdfghjkl',
    })

    expect(form.isValid).toEqual(true)
    expect(input.errors).toEqual([])
  })

  it('validator has access to the validated input', () => {
    const Component = {
      template: `
        <SfxForm ref="form">
          <SfxInput ref="inputA" name="a" v-model="value" validators="__name__" />
          <SfxInput ref="inputB" name="b" v-model="value" :validators="[nameValidator]" />
        </SfxForm>
      `,
      components: {
        SfxForm,
        SfxInput,
      },
      data() {
        return {
          value: 1,
        }
      },
      methods: {
        nameValidator(value, input) {
          return input.name
        },
      },
    }

    const wrapper = mount(Component)
    const form = wrapper.vm.$refs.form
    const inputA = wrapper.vm.$refs.inputA
    const inputB = wrapper.vm.$refs.inputB

    expect(form.isValid).toEqual(false)
    expect(inputA.errors).toEqual(['a'])
    expect(inputB.errors).toEqual(['b'])
  })
})
