<template>
  <div class="flex items-start h-full">
    <p class="sr-only">{{ label }}</p>
    <Label
      :for="`${id}-input`"
      class="cursor-pointer rounded-full w-10 h-10 ring-offset-1"
      :style="styles"
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
    swatchData: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
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
    isSelected() {
      return this.$FormRadioGroup.innerValue === this.value
    },
    classes() {
      return {
        'pointer-events-none opacity-50': this.disabled,
        'ring-2': this.isSelected,
        'hover:ring-2': !this.isSelected,
      }
    },
    styles() {
      if (this.swatchData.thumbnail) {
        return {
          'background-image': `url(${this.swatchData.thumbnail})`,
          '--tw-ring-color': 'grey',
        }
      } else {
        return {
          'background-color': this.swatchData.value,
          '--tw-ring-color': this.swatchData.value,
        }
      }
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
