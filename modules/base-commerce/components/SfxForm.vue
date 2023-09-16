<template>
  <Component :is="tag ? tag : $Form ? 'div' : 'form'" method="POST" @submit.prevent="onSubmit" @keydown="onKeydown">
    <slot />
  </Component>
</template>

<script lang="ts">
// @ts-nocheck
import debounce from '#ioc/utils/debounce'
import isObject from '#ioc/utils/isObject'
import { defineComponent } from 'vue'

export const $Form = '$Form'

export default defineComponent({
  provide() {
    return {
      [$Form]: this,
    }
  },

  inject: {
    [$Form]: { default: null },
  },

  props: {
    tag: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    standalone: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: null,
    },
  },
  emits: ['submit', 'keydown', 'input', 'blur'],

  data: () => ({
    inputs: {},
    forms: {},
  }),

  computed: {
    isValid() {
      for (const input of Object.values(this.inputs)) {
        if (input.isValid === false) return false
      }

      for (const form of Object.values(this.forms)) {
        if (form.isValid === false) return false
      }

      return true
    },
  },

  watch: {
    value(newValue) {
      this.setData(newValue)
    },
  },

  created() {
    if (this.standalone) return
    if (this.$Form) this.$Form._registerForm(this)
  },

  unmounted() {
    if (this.standalone) return
    if (this.$Form) this.$Form._unregisterForm(this)
  },

  methods: {
    setData(values) {
      for (const component in values) {
        if (!this.inputs[component]) continue

        this.inputs[component].setData(values[component])
      }
    },

    getData() {
      const data = {}

      for (const input of Object.values(this.inputs)) {
        data[input.name] = input.innerValue
      }

      for (const form of Object.values(this.forms)) {
        data[form.name] = form.getData()
      }

      return data
    },

    validate() {
      for (const input of Object.values(this.inputs)) {
        input.showFeedback = true
      }

      for (const form of Object.values(this.forms)) {
        form.validate()
      }

      return this.isValid
    },

    getFirstInvalidInput() {
      for (const input of Object.values(this.inputs)) {
        if (input.isValid === false) return input
      }

      for (const form of Object.values(this.forms)) {
        if (form.isValid === false) return form.getFirstInvalidInput()
      }

      return null
    },

    onSubmit() {
      if (this.validate()) {
        this.$emit('submit', this.getData())
      } else {
        this.getFirstInvalidInput().$el.scrollIntoView({ behavior: 'smooth' })
      }
    },

    // Browser autofill will cause multiple inputs to fire blur at once.
    // We debounce it so form fires it only once.
    onBlur: debounce(function () {
      this.$emit('blur', this.getData())
      if (this.$Form && this.standalone) this.$Form.onBlur()
    }),

    onInput: debounce(function () {
      this.$emit('input', this.getData())
      if (this.$Form && this.standalone) this.$Form.onInput()
    }),

    onKeydown() {
      this.$emit('keydown', this.getData())
    },

    _registerInput(input) {
      if (isObject(this.value) && input.name in this.value) {
        input.setData(this.value[input.name])
      }

      this.inputs[input.name] = input
    },

    _unregisterInput(input) {
      delete this.inputs[input.name]
    },

    _registerForm(form) {
      if (!form.name) throw new Error('Nested "SfxForm" component requires "name" prop.')

      this.forms[form.name] = form
    },

    _unregisterForm(form) {
      delete this.forms[form.name]
    },
  },
})
</script>
