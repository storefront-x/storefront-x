<template>
  <FormRadioGroup
    :name="configurableOption.attributeCode"
    :label="configurableOption.label"
    :classes="`flex space-x-2 space-y-0 align-start`"
  >
    <FormRadioBox
      v-for="value in configurableOption.values"
      :key="value.index"
      :label="value.label"
      :value="`${value.index}-${inModal}`"
      :name="`${value.index}`"
      :is-circle="isColor"
      :background="value.swatchData.value"
      @input="$emit('input', configurableOption, value.index)"
    />
  </FormRadioGroup>
</template>

<script setup lang="ts">
import FormRadioGroup from '#ioc/molecules/FormRadioGroup'
import FormRadioBox from '#ioc/molecules/FormRadioBox'
import { computed } from 'vue'

defineEmits(['input'])

const props = defineProps({
  configurableOption: {
    type: Object,
    required: true,
  },
  inModal: {
    type: String,
    default: 'outOfModal',
  },
})

const isColor = computed(() => {
  return props.configurableOption.attributeCode === 'color'
})
</script>

<i18n lang="yaml">
cs-CZ:
  Please select an option: Prosím, zvolte možnost
</i18n>
