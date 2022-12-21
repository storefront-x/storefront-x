<template>
  <Form :value="updateFormValue" class="flex flex-col gap-y-6 mb-4">
    <ProductConfigurableOption
      v-for="configurableOption in product.configurableOptions"
      :key="configurableOption.attributeCode"
      :configurable-option="configurableOption"
      :in-modal="inModal"
      @input="onInput"
    />
  </Form>
</template>

<script setup lang="ts">
import Form from '#ioc/atoms/Form'
import ProductConfigurableOption from '#ioc/molecules//ProductConfigurableOption'
import injectProduct from '#ioc/composables/injectProduct'
import isEmpty from '#ioc/utils/isEmpty'
import { computed } from 'vue'

const product = injectProduct()

defineProps({
  inModal: {
    type: String,
    default: 'outOfModal',
  },
})

const updateFormValue = computed(() => {
  if (isEmpty(product.configuration)) return

  const newValue = {} as any
  const ids = Object.keys(product.configuration)

  for (const id of ids) {
    const idGroup = id + '-group'
    newValue[idGroup] = String(product.configuration[id])
  }

  return newValue
})

const onInput = (configurableOption: any, id: any) => {
  product.configuration[configurableOption.attributeCode] = id
}
</script>
