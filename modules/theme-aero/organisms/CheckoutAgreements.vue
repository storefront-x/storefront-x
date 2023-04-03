<template>
  <div class="mt-10 border-t border-gray-200 pt-10" data-cy="checkout-agreements">
    <Form v-if="isOpen" @submit="onPlaceOrder">
      <Button type="submit" color="primary" :disabled="isLoading" :loading="isLoading" data-cy="place-order">
        {{ isLoading ? t('Confirming order...') : t('Confirm order') }}

        <SfxMoney :money="cart.grandTotal" class="text-xl text-white font-bold pl-1" />
      </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import Form from '#ioc/atoms/Form'
import Button from '#ioc/atoms/Button'
import useCart from '#ioc/composables/useCart'
import SfxMoney from '#ioc/components/SfxMoney'

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['place-order'])

const { t } = useI18n()

const isLoading = ref(false)

const cart = useCart()

const onPlaceOrder = () => {
  isLoading.value = true

  emit('place-order', { resolve: () => (isLoading.value = false) })
}
</script>

<i18n lang="yaml">
cs-CZ:
  Agreements: Smluvní podmínky
  Confirming order...: Potvrzuji objednávku
  Confirm order: Potvrdit objednávku
</i18n>
