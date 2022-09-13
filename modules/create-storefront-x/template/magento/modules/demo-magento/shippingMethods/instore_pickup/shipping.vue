<template>
  <div class="py-4">{{ t('Select pickup location') }}</div>

  <div v-if="pickupLocations.length" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
    <div
      v-for="pickupLocation in pickupLocations"
      :key="pickupLocation.pickupLocationCode"
      class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
      :class="pickupLocation === picked ? 'border-transparent' : 'border-gray-300'"
      data-cy="instore-pickup-location"
      @click="select(pickupLocation)"
    >
      <div class="flex-1 flex">
        <div class="flex flex-col">
          <span class="block text-sm font-medium text-gray-900">
            {{ pickupLocation.name }}
          </span>
          <span class="mt-1 flex items-center text-sm text-gray-700">
            {{ pickupLocation.street }}
          </span>
          <span class="mt-1 flex items-center text-sm text-gray-700">
            {{ pickupLocation.city }}, {{ pickupLocation.postcode }}
          </span>

          <div class="mt-1 flex items-center text-sm text-gray-500" v-html="pickupLocation.description" />
        </div>
      </div>

      <div
        class="absolute -inset-px rounded-lg border-2 pointer-events-none"
        :class="pickupLocation === picked ? 'border-primary-500' : 'border-transparent'"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useAsyncData from '#ioc/composables/useAsyncData'
import useCart from '#ioc/composables/useCart'
import useCheckout from '#ioc/composables/useCheckout'
import useI18n from '#ioc/composables/useI18n'
import useShipping from '#ioc/composables/useShipping'
import ToPickupLocation from '#ioc/mappers/ToPickupLocation'
import useGetPickupLocationsRepository from '#ioc/repositories/useGetPickupLocationsRepository'
import useConfirmShippingMethod from '#ioc/services/useConfirmShippingMethod'
import useConfirmShippingAddress from '#ioc/services/useConfirmShippingAddress'
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['select', 'confirm'])

const { t } = useI18n()
const cart = useCart()
const checkout = useCheckout()
const shipping = useShipping()
const getPickupLocations = useGetPickupLocationsRepository()
const confirmShippingAddress = useConfirmShippingAddress()
const confirmShippingMethod = useConfirmShippingMethod()

const { data } = await useAsyncData('pickupLocations', () => getPickupLocations(cart.items))

const pickupLocations = computed(() => data.value.pickupLocations)

const picked = ref<ReturnType<typeof ToPickupLocation> | null>(null)

onMounted(() => {
  emit('select')
})

const select = async (pickupLocation: ReturnType<typeof ToPickupLocation>) => {
  emit('select')

  picked.value = pickupLocation

  shipping.setShippingHandler(async () => {
    await confirmShippingAddress({
      ...checkout.contactInformation!,
      street: pickupLocation.street,
      city: pickupLocation.city,
      postcode: pickupLocation.postcode,
      countryCode: pickupLocation.countryCode,
      pickupLocationCode: pickupLocation.pickupLocationCode,
      customerNotes: null,
    })

    await confirmShippingMethod(shipping.shippingMethod!)
  })

  emit('confirm')
}
</script>

<i18n lang="yaml">
cs-CZ:
  'Select pickup location': 'Vyberte místo odběru'
  'Continue': 'Pokračovat'
  'Select': 'Vybrat'
  'Show on a map': 'Zobrazit na mapě'
  'Select on a map': 'Vybrat na mapě'
</i18n>
