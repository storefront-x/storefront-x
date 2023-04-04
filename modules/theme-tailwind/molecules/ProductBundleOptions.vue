<template>
  <Form :value="updateFormValue">
    <div v-for="bundleItem in product.bundleItems" :key="bundleItem.id" class="mb-4">
      <Heading
        :level="3"
        class="relative inline-block"
        :class="
          bundleItem.required
            ? `after:content-['*'] after:text-red-500 after:ml-1 after:absolute after:top-0 after:-right-4 mb-4`
            : ''
        "
      >
        {{ bundleItem.title }}
        <p v-if="bundleItem.required" class="text-xs text-gray-400 mt-0 absolute w-max">Please choose option</p>
      </Heading>

      <div v-if="bundleItem.type === 'checkbox'">
        <FormCheckbox
          v-for="bundleOption in bundleItem.options"
          :key="bundleOption.id"
          :name="`${bundleItem.id}-${bundleOption.id}-${inModal}`"
          :label="bundleOption.label"
          :value="bundleOption.isDefault ? true : null"
          class="mt-2"
          @input="onInput(bundleItem, bundleOption, $event)"
        />
      </div>

      <div v-if="bundleItem.type === 'select' || bundleItem.type === 'multi'">
        <FormSelect
          v-model="selectedLabel[bundleItem.id]"
          :name="`${bundleItem.id}`"
          :multiple="bundleItem.type === 'multi'"
          class="mt-4"
          :value="getDefaultValue(bundleItem)"
          @input="onInputSelect(bundleItem, $event)"
        >
          <option value="">{{ t('Select') }}</option>
          <option v-for="bundleOption in bundleItem.options" :key="bundleOption.id" :value="bundleOption.id">
            {{ bundleOption.label }}
          </option>
        </FormSelect>
      </div>
      <div v-if="bundleItem.type === 'radio'">
        <FormRadioGroup
          :name="`${bundleItem.id}-group`"
          :value="`${getDefaultValue(bundleItem)}`"
          :label="''"
          :classes="`mt-4 space-y-2`"
          @input="onInputSelect(bundleItem, $event)"
        >
          <FormRadio
            v-for="bundleOption in bundleItem.options"
            :key="bundleOption.id"
            :value="`${bundleOption.id}`"
            :label="bundleOption.label"
          />
        </FormRadioGroup>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import Heading from '#ioc/atoms/Heading'
import Form from '#ioc/atoms/Form'
import FormCheckbox from '#ioc/molecules/FormCheckbox'
import FormSelect from '#ioc/molecules/FormSelect'
import FormRadioGroup from '#ioc/molecules/FormRadioGroup'
import injectProduct from '#ioc/composables/injectProduct'
import { ref, computed, onMounted } from 'vue'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import isEmpty from '#ioc/utils/isEmpty'
import FormRadio from '#ioc/molecules/FormRadio'
import isArray from '#ioc/utils/isArray'

const { t } = useI18n()
const product = injectProduct()

defineProps({
  inModal: {
    type: String,
    default: 'outOfModal',
  },
})

const selectedOptions = ref({} as any)
const selectedLabel = ref({} as any)

onMounted(() => {
  for (const bundleItem of product.bundleItems) {
    const defaultOptionId = getDefaultValue(bundleItem)
    if (defaultOptionId) {
      if (bundleItem.type === 'checkbox') {
        onInput(
          bundleItem,
          bundleItem.options.find((option: any) => option.id === defaultOptionId),
          true,
        )
      } else {
        onInputSelect(bundleItem, defaultOptionId)
      }
    }
  }
})
const updateFormValue = computed(() => {
  if (isEmpty(product.bundle)) return

  const newValue = {} as any
  const ids = Object.keys(product.bundle)

  for (const idGroup of ids) {
    for (const idValue of Object.keys(product.bundle[idGroup])) {
      // split into inModal/outOfModal is needed to have unique IDs for radio buttons
      const groupKey = idGroup + '-group'
      const keyInModal = idGroup + '-group' + idValue + '-inModal'
      const keyOutOfModal = idGroup + '-' + idValue + '-outOfModal'
      newValue[groupKey] = idValue
      newValue[keyInModal] = true
      newValue[keyOutOfModal] = true
    }
  }
  return newValue
})

const onInput = (bundleItem: any, bundleOption: any, isChecked: any) => {
  if (!selectedOptions.value[bundleItem.id]) {
    selectedOptions.value[bundleItem.id] = {}
  }

  if (isChecked) {
    selectedOptions.value[bundleItem.id][bundleOption.id] = {
      id: bundleOption.id,
      label: bundleOption.label,
      quantity: 1,
      finalPrice: bundleOption.product.finalPrice,
      value: [String(bundleOption.product.id)],
    }
    updateFinalPrice()
  } else {
    delete selectedOptions.value[bundleItem.id][bundleOption.id]
    if (!isNonEmptyObject(selectedOptions.value[bundleItem.id])) {
      delete selectedOptions.value[bundleItem.id]
    }
    updateFinalPrice()
  }
}

const onInputSelect = (bundleItem: any, id: any) => {
  if (!id) {
    delete selectedOptions.value[bundleItem.id]
    updateFinalPrice()

    return
  }

  if (!selectedOptions.value[bundleItem.id]) {
    selectedOptions.value[bundleItem.id] = {}
  } else {
    delete selectedOptions.value[bundleItem.id]
    selectedOptions.value[bundleItem.id] = {}
    updateFinalPrice()
  }

  const selectedIds = isArray(id) ? id : [id]
  for (const selectedId of selectedIds) {
    const bundleOption = bundleItem.options.find((option: any) => option.id == selectedId)

    selectedOptions.value[bundleItem.id][selectedId] = {
      selectedId,
      label: bundleOption.label,
      quantity: 1,
      finalPrice: bundleOption.product.finalPrice,
      value: [String(bundleOption.product.id)],
    }
  }

  updateFinalPrice()
}

const updateFinalPrice = () => {
  let finalPriceValue = 0
  for (const bundleOption of Object.values(selectedOptions.value) as any) {
    for (const optionValue of Object.values(bundleOption) as any) {
      finalPriceValue += optionValue.finalPrice.value
    }
  }
  product.finalPrice.value = finalPriceValue || product.minimumPrice.value
  product.bundle = selectedOptions.value
}

const getDefaultValue = (bundleItem: any) => {
  const defaultOption = bundleItem.options.find((o: any) => o.isDefault)
  if (defaultOption) {
    return defaultOption.id
  } else {
    return null
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Select: Zvolit
</i18n>
