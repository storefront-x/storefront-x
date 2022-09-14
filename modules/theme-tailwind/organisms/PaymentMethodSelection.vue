<template>
  <div class="mt-10 border-t border-gray-200 pt-10">
    <fieldset>
      <legend class="text-lg font-medium text-gray-900">
        {{ t('Payment method') }}
      </legend>

      <div v-if="isOpen" class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <label
          v-for="paymentMethod in payment.paymentMethods"
          :key="paymentMethod.code"
          class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
          :class="isSelected(paymentMethod) ? 'border-transparent' : 'border-gray-300'"
          :data-payment-method="paymentMethod.code"
          @click.prevent="onSelect(paymentMethod)"
        >
          <div class="flex flex-col flex-1">
            <span class="block text-sm font-medium text-gray-900">
              {{ paymentMethod.title }}
            </span>
          </div>

          <img
            :src="`/icons/payment/${paymentMethod.code}.svg`"
            class="absolute right-0 mr-12 top-3"
            alt="Payment icon"
          />

          <SolidCheckCircle v-if="isSelected(paymentMethod)" class="text-primary-600" />

          <div
            class="absolute -inset-px rounded-lg border-2 pointer-events-none"
            :class="isSelected(paymentMethod) ? 'border-primary-500' : 'border-transparent'"
            aria-hidden="true"
          />
        </label>
      </div>

      <SfxPaymentMethod v-if="isOpen" export="payment" @select="emit('select')" @confirm="emit('confirm')" />
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import SfxPaymentMethod from '#ioc/components/SfxPaymentMethod'
import useI18n from '#ioc/composables/useI18n'
import usePayment from '#ioc/composables/usePayment'
import SolidCheckCircle from '#ioc/icons/SolidCheckCircle'

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['select', 'confirm'])

const { t } = useI18n()
const payment = usePayment()

const isSelected = (paymentMethod: any) => {
  return payment.paymentMethod?.id === paymentMethod.id
}

const onSelect = async (paymentMethod: any) => {
  payment.setPaymentMethod(paymentMethod)
}
</script>
