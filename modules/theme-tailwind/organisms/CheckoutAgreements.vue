<template>
  <div class="mt-10 border-t border-gray-200 pt-10" data-cy="checkout-agreements">
    <h2 class="text-lg font-medium text-gray-900">{{ t('Agreements') }}</h2>

    <Form v-if="isOpen" @submit="onPlaceOrder">
      <CheckoutAgreement
        v-for="checkoutAgreement in checkout.agreements"
        :key="checkoutAgreement.id"
        :checkout-agreement="checkoutAgreement"
        class="mt-2"
      />

      <Button
        type="submit"
        color="primary"
        class="mt-4"
        :disabled="isLoading"
        :loading="isLoading"
        data-cy="place-order"
      >
        {{ isLoading ? t('Confirming order...') : t('Confirm order') }}
      </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import Form from '#ioc/atoms/Form'
import Button from '#ioc/atoms/Button'
import useCheckout from '#ioc/composables/useCheckout'
import CheckoutAgreement from '#ioc/molecules/CheckoutAgreement'

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['place-order'])

const { t } = useI18n()
const checkout = useCheckout()

const isLoading = ref(false)

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
