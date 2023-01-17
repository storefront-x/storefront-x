<template>
  <div class="bg-gray-50 pb-16">
    <Container class="max-w-6xl pt-4">
      <Heading v-if="cart.itemsTotalQuantity === 0" class="text-center">{{ t('Your cart is empty') }}</Heading>
      <div v-else class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <ShippingMethods />

          <div class="border-t border-gray-200 mt-12 pb-10" />

          <PaymentMethods />

          <div class="border-t border-gray-200 mt-12 pb-10" />

          <ContactInformation />
        </div>

        <OrderSummary />
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Container from '#ioc/atoms/Container'
import Heading from '#ioc/atoms/Heading'
import ShippingMethods from '#ioc/organisms/ShippingMethods'
import PaymentMethods from '#ioc/organisms/PaymentMethods'
import ContactInformation from '#ioc/organisms/ContactInformation'
import OrderSummary from '#ioc/organisms/OrderSummary'
import useCart from '#ioc/composables/useCart'
import useI18n from '#ioc/composables/useI18n'
import useEmitBeginCheckout from '#ioc/bus/emitters/useEmitBeginCheckout'

const { t } = useI18n()
const cart = useCart()
const emitBeginCheckout = useEmitBeginCheckout()

onMounted(() => {
  if (cart.items?.length) {
    emitBeginCheckout({ cart })
  }
})
</script>
