<template>
  <Form>
    <div v-for="optionItem in product.productOptions" :key="optionItem.id" class="mb-4">
      <Heading :level="2">
        {{ optionItem.title }}
      </Heading>

      <div
        v-if="
          optionItem.__typename === 'CustomizableCheckboxOption' || optionItem.type === 'CustomizableMultipleOption'
        "
      >
        <FormCheckbox
          v-for="option in optionItem.value"
          :key="option.id"
          :name="`${optionItem.id}-${option.id}`"
          :label="option.title"
          class="mt-2"
          @input="onInput(optionItem, option, $event, 'checkbox')"
        />
      </div>
      <div v-else>
        <div v-if="optionItem.value.length > 5">
          <FormSelect
            v-model="selectedLabel[optionItem.id]"
            :name="`${optionItem.id}`"
            class="mt-4"
            @input="onInputSelect(optionItem, $event)"
          >
            <option value="">{{ t('Select') }}</option>
            <option v-for="option in optionItem.value" :key="option.id" :value="option.optionId">
              {{ option.title }}
            </option>
          </FormSelect>
        </div>
        <div v-else>
          <FormRadioGroup
            :name="`${optionItem.id}`"
            :label="''"
            :classes="`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 space-y-0 align-start`"
          >
            <FormRadioBox
              v-for="option in optionItem.value"
              :key="option.id"
              :name="`${optionItem.id}-${option.id}`"
              :value="`${option.id}`"
              :label="option.title"
              @input="onInput(optionItem, option, true, 'radio')"
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

const selectedOptions = ref({} as any)
const selectedLabel = ref({} as any)

const onInput = (optionItem: any, option: any, isChecked: any, type: string) => {
  if (!selectedOptions.value[optionItem.id]) {
    selectedOptions.value[optionItem.id] = {}
  }

  if (type === 'radio') {
    delete selectedOptions.value[optionItem.id]
    selectedOptions.value[optionItem.id] = {}
    updateFinalPrice()
  }

  if (isChecked) {
    selectedOptions.value[optionItem.id][option.optionId] = {
      id: option.id,
      quantity: 1,
      finalPrice: option.finalPrice,
      value: [String(option.optionId)],
    }
    updateFinalPrice()
  } else {
    delete selectedOptions.value[optionItem.id][option.optionId]
    if (!isNonEmptyObject(selectedOptions.value[optionItem.id])) {
      delete selectedOptions.value[optionItem.id]
    }
    updateFinalPrice()
  }
}

const onInputSelect = (optionItem: any, id: any) => {
  if (!id) {
    delete selectedOptions.value[optionItem.id]
    updateFinalPrice()

    return
  }

  if (!selectedOptions.value[optionItem.id]) {
    selectedOptions.value[optionItem.id] = {}
  } else {
    delete selectedOptions.value[optionItem.id]
    selectedOptions.value[optionItem.id] = {}
    updateFinalPrice()
  }

  const option = optionItem.value.find((option: any) => option.optionId === id)

  selectedOptions.value[optionItem.id][id] = {
    id: option.id,
    quantity: 1,
    finalPrice: option.finalPrice,
    value: [String(option.optionId)],
  }

  updateFinalPrice()
}

const updateFinalPrice = () => {
  let finalPriceValue = 0
  product.options = []
  for (const option of Object.values(selectedOptions.value) as any) {
    for (const optionValue of Object.values(option) as any) {
      finalPriceValue += optionValue.finalPrice.value
      product.options.push(optionValue.id)
    }
  }
  product.finalPrice.value = finalPriceValue + product.minimumPrice.value || product.minimumPrice.value
}
</script>

<i18n lang="yaml">
cs-CZ:
  Select: Zvolit
</i18n>
