<template>
  <div>
    <FormRadioGroup
      :name="configurableOption.attributeCode + '-group'"
      :label="configurableOption.label"
      :classes="`flex space-x-2 space-y-0 align-start`"
    >
      <FormSelect
        v-if="isDropdown(configurableOption.values[0]?.swatchData ?? null)"
        v-model="selectedLabel[configurableOption.id]"
        :name="`${configurableOption.id}`"
        @input="$emit('input', configurableOption, $event)"
      >
        <option selected="true" value="null" disabled>{{ t('Select') }}</option>
        <option
          v-for="value in configurableOption.values"
          :key="value.index"
          :value="value.index"
          :disabled="value.disabled ?? false"
        >
          {{ value.label }}
        </option>
      </FormSelect>
      <FormRadioBox
        v-for="value in configurableOption.values"
        v-else
        :key="value.index"
        :label="value.label"
        :value="`${value.index}`"
        :name="`${value.index}-${inModal}`"
        :is-circle="isVisualSwatch(value)"
        :background="value.swatchData.value"
        :disabled="value.disabled ?? false"
        @input="$emit('input', configurableOption, value.index)"
      />
    </FormRadioGroup>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import FormRadioGroup from '#ioc/molecules/FormRadioGroup'
import FormRadioBox from '#ioc/molecules/FormRadioBox'
import FormSelect from '#ioc/molecules/FormSelect'
import isEmpty from '#ioc/utils/isEmpty'
import { ref } from 'vue'

defineEmits(['input'])

const { t } = useI18n()

const selectedLabel = ref({} as any)

defineProps({
  configurableOption: {
    type: Object,
    required: true,
  },
  inModal: {
    type: String,
    default: 'outOfModal',
  },
})

const isVisualSwatch = (value: any) => {
  if (!value.swatchData.value.startsWith('#')) return false

  return true
}

const isDropdown = (value: any) => {
  return isEmpty(value)
}
</script>

<i18n lang="yaml">
cs-CZ:
  Please select an option: Prosím, zvolte možnost
  This is required field: Toto je povinné pole
  Select: Zvolit
</i18n>
