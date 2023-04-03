<template>
  <Container class="max-w-xl py-16">
    <h1 class="uppercase tracking-wide text-primary-600" data-cy="thank-you">
      {{ t('Thank you!') }}
    </h1>
    <p class="mt-2 text-base text-gray-500">
      {{ t('your_order', [route.query.orderNumber]) }}
    </p>

    <div class="mt-4 space-y-2">
      <h4 class="text-primary-600">{{ t('Your order number') }}</h4>
      <div class="text-4xl mt-2 text-gray-500">{{ route.query.orderNumber }}</div>
      <img :src="qr" alt="" class="-ml-4 lg:-ml-8" />
    </div>

    <div class="mt-4">
      <Link :to="localePath('/')" color="primary" class="bg-primary-500 text-white hover:text-white p-4 rounded-md">{{
        t('Return to homepage')
      }}</Link>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import Container from '#ioc/atoms/Container'
import useI18n from '#ioc/composables/useI18n'
import useRoute from '#ioc/composables/useRoute'
import qr from '#ioc/assets/checkout/prg_qr'
import useRemoveFromCart from '#ioc/services/useRemoveFromCart'
import { onMounted } from 'vue'
import useCart from '#ioc/composables/useCart'
import useLocalePath from '#ioc/composables/useLocalePath'
const { t } = useI18n()
const route = useRoute()
const removeFromCart = useRemoveFromCart()
const cart = useCart()

const localePath = useLocalePath()

onMounted(async () => {
  if (cart.items.length === 0) return

  for (const cartItem of cart.items) {
    await removeFromCart(cartItem)
  }
})
</script>

<i18n lang="yaml">
cs-CZ:
  Thank you!: Děkujeme!
  It's on the way!: Zásilka je na cestě!
  Tracking number: Sledovací číslo
  'your_order': 'Vaše objednávka číslo #{0} byla odeslána a bude u Vás co nejdříve.'
en-US:
  'your_order': 'Your order has been successfully created.'
</i18n>
