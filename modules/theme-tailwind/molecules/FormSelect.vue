<template>
  <div>
    <Label v-if="label" class="mb-1" :for="prefixedName" :required="isRequired">{{ label }}</Label>

    <select
      :id="prefixedName"
      v-model="innerValue"
      class="w-full"
      :class="colors"
      :name="name"
      :multiple="multiple"
      :autocomplete="autocomplete"
      :disabled="disabled"
      @blur="onBlur"
      @change="change"
    >
      <slot />
    </select>

    <Error v-if="showFeedback && isInvalid" :errors="errors" />
  </div>
</template>

<script>
import SfxInput from '#ioc/components/SfxInput'
import Label from '#ioc/atoms/Label'
import Error from '#ioc/atoms/Error'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Label,
    Error,
  },

  extends: SfxInput,

  props: {
    label: {
      type: String,
      default: null,
    },
    autocomplete: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: 'primary',
    },
    modelValue: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],

  computed: {
    colors() {
      return {
        'rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 w-full border border-gray-300':
          this.color === 'primary',
      }
    },
  },

  methods: {
    change(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
})
</script>
