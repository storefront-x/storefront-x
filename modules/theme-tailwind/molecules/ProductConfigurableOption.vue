<template>
  <div>
    <FormRadioGroup
      :name="configurableOption.attributeCode + '-group'"
      :label="configurableOption.label"
      :classes="`flex space-x-2 space-y-0 align-start mt-4`"
    >
      <FormSelect
        v-if="configurableOption.isDropdown"
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
      <template v-for="value in configurableOption.values" v-else>
        <FormSwatch
          v-if="configurableOption.isSwatch"
          :key="`${value.index}-swatch`"
          :label="value.label"
          :value="`${value.index}`"
          :name="`${value.index}-${inModal}-swatch`"
          :swatch-data="value.swatchData"
          :disabled="value.disabled ?? false"
          @input="$emit('input', configurableOption, value.index)"
        />
        <FormRadioBox
          v-else
          :key="`${value.index}-radio`"
          :label="value.label"
          :value="`${value.index}`"
          :name="`${value.index}-${inModal}-radio`"
          :disabled="value.disabled ?? false"
          @input="$emit('input', configurableOption, value.index)"
        />
      </template>
    </FormRadioGroup>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import FormRadioGroup from '#ioc/molecules/FormRadioGroup'
import FormRadioBox from '#ioc/molecules/FormRadioBox'
import FormSwatch from '#ioc/molecules/FormSwatch'
import FormSelect from '#ioc/molecules/FormSelect'
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
</script>

<i18n lang="yaml">
cs-CZ:
  Please select an option: Prosím, zvolte možnost
  This is required field: Toto je povinné pole
  Select: Zvolit
</i18n>
