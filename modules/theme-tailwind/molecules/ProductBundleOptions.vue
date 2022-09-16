<template>
  <Form>
    <div v-for="bundleItem in product.bundleItems" :key="bundleItem.id" class="mb-4">
      <Heading
        :level="2"
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

      <div v-if="bundleItem.type === 'checkbox' || bundleItem.type === 'multi'">
        <FormCheckbox
          v-for="bundleOption in bundleItem.options"
          :key="bundleOption.id"
          :name="`${bundleItem.id}-${bundleOption.id}`"
          :label="bundleOption.label"
          class="mt-2"
          @input="onInput(bundleItem, bundleOption, $event, 'checkbox')"
        />
      </div>
      <div v-else>
        <div v-if="bundleItem.options.length > 5">
          <FormSelect
            v-model="selectedLabel[bundleItem.id]"
            :name="`${bundleItem.id}`"
            class="mt-4"
            @input="onInputSelect(bundleItem, $event)"
          >
            <option value="">{{ t('Select') }}</option>
            <option v-for="bundleOption in bundleItem.options" :key="bundleOption.id" :value="bundleOption.id">
              {{ bundleOption.label }}
            </option>
          </FormSelect>
        </div>
        <div v-else>
          <FormRadioGroup
            :name="`${bundleItem.id}-${inModal}-group`"
            :label="''"
            :classes="`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 space-y-0 align-start`"
          >
            <FormRadioBox
              v-for="bundleOption in bundleItem.options"
              :key="bundleOption.id"
              :name="`${bundleItem.id}-${bundleOption.id}`"
              :value="`${bundleOption.id}-${inModal}`"
              :label="bundleOption.label"
              @input="onInput(bundleItem, bundleOption, true, 'radio')"
            />
          </FormRadioGroup>
        </div>
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
import FormRadioBox from '#ioc/molecules/FormRadioBox'
import FormRadioGroup from '#ioc/molecules/FormRadioGroup'
import injectProduct from '#ioc/composables/injectProduct'
import { ref } from 'vue'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'

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

const onInput = (bundleItem: any, bundleOption: any, isChecked: any, type: string) => {
  if (!selectedOptions.value[bundleItem.id]) {
    selectedOptions.value[bundleItem.id] = {}
  }

  if (type === 'radio') {
    delete selectedOptions.value[bundleItem.id]
    selectedOptions.value[bundleItem.id] = {}
    updateFinalPrice()
  }

  if (isChecked) {
    selectedOptions.value[bundleItem.id][bundleOption.id] = {
      id: bundleOption.id,
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

  const bundleOption = bundleItem.options.find((option: any) => option.id === id)

  selectedOptions.value[bundleItem.id][id] = {
    id,
    quantity: 1,
    finalPrice: bundleOption.product.finalPrice,
    value: [String(bundleOption.product.id)],
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
</script>

<i18n lang="yaml">
cs-CZ:
  Select: Zvolit
</i18n>
