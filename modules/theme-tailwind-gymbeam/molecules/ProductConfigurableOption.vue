<template>
  <FormRadioGroup
    :name="configurableOption.attributeCode + '-group'"
    :label="configurableOption.label"
    :classes="`grid grid-cols-2 gap-2 space-y-0`"
  >
    <FormRadioBox
      v-for="value in configurableOption.values"
      :key="value.index"
      :label="value.label"
      :value="`${value.index}`"
      :name="`${value.index}-${inModal}`"
      :is-circle="isColor"
      :background="value.swatchData.value"
      @input="$emit('input', configurableOption, value.index)"
    />
  </FormRadioGroup>
</template>

<script setup lang="ts">
import FormRadioGroup from '#ioc/molecules/FormRadioGroup'
import FormRadioBox from '#ioc/molecules/FormRadioBox'
import { computed, onMounted } from 'vue'

const emit = defineEmits(['input'])

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

onMounted(() => {
  emit('input', props.configurableOption, props.configurableOption.values[0].index)
})
const isColor = computed(() => {
  return props.configurableOption.attributeCode === 'color'
})
</script>

<i18n lang="yaml">
cs-CZ:
  Please select an option: Prosím, zvolte možnost
</i18n>
