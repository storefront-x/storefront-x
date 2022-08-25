<template>
  <div class="flex items-center">
    <Input
      :id="id"
      type="radio"
      :name="$FormRadioGroup.name"
      :checked="$FormRadioGroup.value === value"
      class="text-primary-600"
      @input="onInput"
    />
    <Label :for="id" class="ml-3">
      {{ label }}
    </Label>
  </div>
</template>

<script>
import Input from '#ioc/atoms/Input'
import Label from '#ioc/atoms/Label'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Input,
    Label,
  },

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
  },

  computed: {
    id() {
      return `${this.$FormRadioGroup.group}-${this.value}`
    },
  },

  methods: {
    onInput() {
      this.$FormRadioGroup.innerValue = this.value
    },
  },
})
</script>
