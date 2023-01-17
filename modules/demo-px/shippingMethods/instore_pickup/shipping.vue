<template>
  <div class="py-4">{{ t('Select pickup location') }}</div>

  <Modal v-if="showMap" :has-close-btn="false" size="lg" @close="showMap = false">
    <Heading :level="3">{{ t('Select on a map') }}</Heading>
    <SfxMap style="min-height: 500px; position: relative" @current-location="onCurrentLocation" @select="selectMarker">
      <SfxMapMarker
        v-for="pickupLocation in pickupLocations"
        :key="pickupLocation.pickupLocationCode"
        :position="{ lat: pickupLocation.latitude, lng: pickupLocation.longitude }"
        :selected="selected"
      >
        <SfxMapWindow>
          <div class="p-1">
            <strong>{{ pickupLocation.name }}</strong>
            <br />
            <span> {{ pickupLocation.city }}, {{ pickupLocation.street }}, {{ pickupLocation.postcode }} </span>
            <p v-html="pickupLocation.description" />
            <Button color="primary" @click="select(pickupLocation)">{{ t('Select') }}</Button>
          </div>
        </SfxMapWindow>
      </SfxMapMarker>

      <SfxMapMarker
        v-if="currentLocation"
        :position="currentLocation"
        icon="/icons/current-location.png"
        :icon-anchor="[16, 16]"
      />
    </SfxMap>
  </Modal>

  <div v-if="pickupLocations.length" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
    <div
      v-for="pickupLocation in sortedPickupLocations"
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

  <Button class="mt-4" @click.self="showMap = true">
    {{ t('Select on a map') }}
  </Button>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import Modal from '#ioc/atoms/Modal'
import SfxMap from '#ioc/components/map/SfxMap'
import SfxMapMarker from '#ioc/components/map/SfxMapMarker'
import SfxMapWindow from '#ioc/components/map/SfxMapWindow'
import useAsyncData from '#ioc/composables/useAsyncData'
import useCart from '#ioc/composables/useCart'
import useCheckout from '#ioc/composables/useCheckout'
import useI18n from '#ioc/composables/useI18n'
import useShipping from '#ioc/composables/useShipping'
import ToPickupLocation from '#ioc/mappers/ToPickupLocation'
import useGetPickupLocationsRepository from '#ioc/repositories/useGetPickupLocationsRepository'
import useConfirmShippingMethod from '#ioc/services/useConfirmShippingMethod'
import useConfirmShippingAddress from '#ioc/services/useConfirmShippingAddress'
import useLocation from '#ioc/composables/useLocation'
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['select', 'confirm'])

const location = useLocation()

const { t } = useI18n()
const cart = useCart()
const checkout = useCheckout()
const shipping = useShipping()
const getPickupLocations = useGetPickupLocationsRepository()
const confirmShippingAddress = useConfirmShippingAddress()
const confirmShippingMethod = useConfirmShippingMethod()

const { data } = await useAsyncData('pickupLocations', () => getPickupLocations(cart.items))

const showMap = ref(false)
const picked = ref<ReturnType<typeof ToPickupLocation> | null>(null)
const currentLocation = ref(null)
const selected = ref({})

const pickupLocations = computed(() => data.value.pickupLocations)

const sortedPickupLocations = computed(() => {
  if (!location.coordinates) return pickupLocations.value

  const distance = (a: any, b: any) => {
    const latitudeA = Number(a.latitude)
    const latitudeB = b.latitude
    const longitudeA = Number(a.longitude)
    const longitudeB = b.longitude
    return Math.sqrt(Math.pow(latitudeA - latitudeB, 2) + Math.pow(longitudeA - longitudeB, 2))
  }

  return [...pickupLocations.value].sort(
    (a, b) => distance(a, location.coordinates) - distance(b, location.coordinates),
  )
})

onMounted(() => {
  emit('select')
})

const select = async (pickupLocation: ReturnType<typeof ToPickupLocation>) => {
  emit('select')

  picked.value = pickupLocation
  showMap.value = false

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

const onCurrentLocation = (location: any) => {
  currentLocation.value = location
}

const selectMarker = (marker: any) => {
  selected.value = marker
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
