<template>
  <Heading :level="2">{{ t('Select shipping method') }}</Heading>
  <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
    <ShippingMethod
      v-for="shippingMethod in shipping.shippingMethods"
      :key="shippingMethod.id"
      :shipping-method="shippingMethod"
      :is-selected="shipping.shippingMethod?.id === shippingMethod.id"
      @select="confirmShippingMethod"
    />
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import ShippingMethod from '#ioc/molecules/ShippingMethod'
import useShipping from '#ioc/composables/useShipping'
import useConfirmShippingMethod from '#ioc/services/useConfirmShippingMethod'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()
const shipping = useShipping()
const confirmShippingMethod = useConfirmShippingMethod()
</script>

<i18n lang="yaml">
cs-CZ:
  Select shipping method: Vyberte doručovací metodu
</i18n>
