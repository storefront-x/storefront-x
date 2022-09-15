<template>
  <SfxForm ref="form" class="flex flex-col md:flex-row gap-16 mb-4">
    <ProductConfigurableOption
      v-for="configurableOption in product.configurableOptions"
      :key="configurableOption.attributeCode"
      :configurable-option="configurableOption"
      :in-modal="inModal"
      @input="onInput"
    />
  </SfxForm>
</template>

<script setup lang="ts">
import SfxForm from '#ioc/components/SfxForm'
import ProductConfigurableOption from '#ioc/molecules//ProductConfigurableOption'
import injectProduct from '#ioc/composables/injectProduct'

const product = injectProduct()

defineProps({
  inModal: {
    type: String,
    default: 'outOfModal',
  },
})

const onInput = (configurableOption: any, id: any) => {
  product.configuration[configurableOption.attributeCode] = id
}
</script>
