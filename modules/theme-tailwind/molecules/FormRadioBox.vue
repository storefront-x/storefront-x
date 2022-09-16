<template>
  <div class="flex items-start h-full">
    <p class="sr-only">{{ label }}</p>
    <Label
      :for="`${id}-input`"
      class="border flex items-center justify-center h-full text-sm font-medium uppercase sm:flex-1 cursor-pointer hover:ring-2"
      :style="isCircle ? { 'background-color': background, '--tw-ring-color': background } : ''"
      :class="classes"
    >
      <input
        :id="`${id}-input`"
        type="radio"
        :name="$FormRadioGroup.name"
        class="sr-only"
        :value="innerValue"
        @input="onInput"
      />
      <span v-if="!isCircle" :id="id" :class="{ 'text-primary-500': $FormRadioGroup.innerValue === value }">{{
        label
      }}</span>
    </Label>
  </div>
</template>

<script lang="ts">
import Label from '#ioc/atoms/Label'
import FormInput from '#ioc/molecules/FormInput'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Label,
  },
  extends: FormInput,

  inject: ['$FormRadioGroup'],

  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    isCircle: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '',
    },
  },
  emits: ['input'],

  data: () => ({
    checked: false,
  }),

  computed: {
    id() {
      return `${this.name}`
    },
    classes() {
      if (this.isCircle) {
        if (this.$FormRadioGroup.innerValue === this.value) {
          return 'rounded-full w-10 h-10 ring-offset-1 ring-2'
        }
        return 'rounded-full w-10 h-10 ring-offset-1 hover:ring-2'
      }
      if (this.$FormRadioGroup.innerValue === this.value) {
        return 'rounded-md py-2 px-3 ring-2 ring-primary-500'
      }
      return 'rounded-md py-2 px-3 hover:ring-primary-500'
    },
  },

  methods: {
    onInput() {
      this.$FormRadioGroup.innerValue = this.value
      this.$emit('input')
    },
  },
})
</script>
