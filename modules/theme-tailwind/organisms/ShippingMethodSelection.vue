<template>
  <div class="border-gray-200">
    <fieldset>
      <legend class="text-lg font-medium text-gray-900">
        {{ t('Shipping method') }}
      </legend>

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <label
          v-for="shippingMethod in shipping.shippingMethods"
          :key="shippingMethod.code"
          class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
          :class="isSelected(shippingMethod) ? 'border-transparent' : 'border-gray-300'"
          :data-shipping-method="shippingMethod.code"
          @click.prevent="onSelect(shippingMethod)"
        >
          <div class="flex flex-col flex-1">
            <span class="block text-sm font-medium text-gray-900">
              {{ shippingMethod.methodTitle }}
            </span>
          </div>

          <img :src="`/icons/shipping/${shippingMethod.code}.svg`" class="absolute right-0 mr-12" alt="Shipping icon" />

          <SolidCheckCircle v-if="isSelected(shippingMethod)" class="text-primary-600" />

          <div
            class="absolute -inset-px rounded-lg border-2 pointer-events-none"
            :class="isSelected(shippingMethod) ? 'border-primary-500' : 'border-transparent'"
            aria-hidden="true"
          />
        </label>
      </div>

      <SfxShippingMethod export="shipping" />
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import useShipping from '#ioc/composables/useShipping'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useSelectShippingMethod from '#ioc/services/useSelectShippingMethod'
import SolidCheckCircle from '#ioc/icons/SolidCheckCircle'
import SfxShippingMethod from '#ioc/components/SfxShippingMethod'

const { t } = useI18n()
const shipping = useShipping()
const selectShippingMethod = useSelectShippingMethod()
const showErrorNotification = useShowErrorNotification()

const isSelected = (shippingMethod: any) => {
  return shipping.currentShippingMethod?.code === shippingMethod.code
}

const onSelect = async (shippingMethod: any) => {
  try {
    await selectShippingMethod(shippingMethod)
  } catch (e) {
    showErrorNotification(e)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Shipping method: Doručovací metoda
  Downloadable items will be delivered by email: Stahovetalné produkty budou doručeny emailem
</i18n>
