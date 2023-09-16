<template>
  <input v-model="innerValue" :type="type" :name="prefixedName" @blur="onBlur" />
</template>

<script lang="ts">
// @ts-nocheck
import isFunction from '#ioc/utils/isFunction'
import isNullish from '#ioc/utils/isNullish'
import isString from '#ioc/utils/isString'
import { defineComponent } from 'vue'

import validators from '~/.sfx/validators'

export default defineComponent({
  inject: ['$Form'],

  props: {
    type: {
      type: String,
      // Note: The `type` is `null` by default. The <input> without `type` behaves as `type="text"`.
      //  See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: null,
      default: null,
    },
    validators: {
      type: [String, Array],
      default: () => [],
    },
  },
  emits: ['blur', 'input'],

  data: ({ value }) => ({
    innerValue: value,
    showFeedback: false,
    required: false,
  }),

  computed: {
    isValid() {
      if (this.required && isNullish(this.innerValue)) return false
      for (const validator of this.mappedValidators) {
        if (validator.call(this, this.innerValue) !== true) return false
      }
      return true
    },
    isInvalid() {
      return !this.isValid
    },
    isRequired() {
      const validators = isString(this.validators) ? this.validators.split('|') : this.validators
      return validators.includes('required')
    },
    errors() {
      const errors = []
      for (const validator of this.mappedValidators) {
        const result = validator.call(this, this.innerValue)
        if (isString(result)) errors.push(result)
      }
      return errors
    },
    mappedValidators() {
      const _validators = isString(this.validators) ? this.validators.split('|') : this.validators
      return _validators
        .map((validator) => {
          if (isFunction(validator)) return (value) => validator(value, this)
          const [name, args = ''] = validator.split(':')
          const _validator = validators[name]
          if (isNullish(_validator)) {
            if (process.env.NODE_ENV !== 'production') {
              console.warn('Unknown validator "%s"', validator)
            }
            return null
          }
          return function (value) {
            return _validator.call(this, value, ...args.split(','))
          }
        })
        .filter((validator) => !!validator)
    },
    prefixedName() {
      if (this.$Form?.name) return `${this.$Form.name}-${this.name}`
      return this.name
    },
  },

  watch: {
    value(value) {
      this.innerValue = value
    },

    innerValue(value) {
      this.innerValue = value

      this.$emit('input', value)

      this.$Form.onInput()
    },
  },

  created() {
    this.$Form._registerInput(this)
    this.required = this.isRequired
  },

  unmounted() {
    this.$Form._unregisterInput(this)
  },

  methods: {
    onInput(e) {
      this.innerValue = e.target.value
    },

    onBlur() {
      if (this.validators.length) this.showFeedback = true

      this.$emit('blur', this.innerValue)

      this.$Form.onBlur()
    },

    setData(value) {
      this.innerValue = value
    },

    getData() {
      return this.innerValue
    },
  },
})
</script>
