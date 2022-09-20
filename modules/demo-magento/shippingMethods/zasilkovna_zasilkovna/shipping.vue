<template>
  <div>
    <div class="py-4">{{ t('Select pickup location') }}</div>

    <div class="flex space-x-4">
      <Input
        :value="address"
        type="text"
        class="w-full"
        readonly
        :placeholder="t('Click and select your location')"
        @click="onInput"
      />

      <Button @click="pick">{{ t('Change') }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '#ioc/atoms/Input'
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import ZASILKOVNA_API_KEY from '#ioc/config/ZASILKOVNA_API_KEY'
import loadScript from '#ioc/utils/dom/loadScript'
import once from '#ioc/utils/once'
import { onMounted, ref } from 'vue'
import useShipping from '#ioc/composables/useShipping'
import useConfirmShippingAddress from '#ioc/services/useConfirmShippingAddress'
import useConfirmShippingMethod from '#ioc/services/useConfirmShippingMethod'
import useCheckout from '#ioc/composables/useCheckout'

const emit = defineEmits(['select', 'confirm'])

const { t } = useI18n()
const checkout = useCheckout()
const shipping = useShipping()
const confirmShippingAddress = useConfirmShippingAddress()
const confirmShippingMethod = useConfirmShippingMethod()
const address = ref()
// TODO map adress from state but first set it there trough handler

onMounted(async () => {
  await once('https://widget.packeta.com/www/js/library.js', loadScript)

  pick()
})

const onInput = () => {
  if (!address.value) pick()
}

const pick = () => {
  emit('select')

  // @ts-ignore
  window.Packeta.Widget.pick(
    ZASILKOVNA_API_KEY,
    async (location: any) => {
      if (!location) return
      address.value = location.nameStreet
      shipping.setShippingHandler(async () => {
        await confirmShippingAddress({
          ...checkout.contactInformation!,
          city: location.city,
          street: location.street,
          postcode: location.zip,
          customerNotes: location.id,
          pickupLocationCode: null,
        })

        await confirmShippingMethod(shipping.shippingMethod!)
      })

      emit('confirm')
    },
    {
      country: 'cz',
      language: 'cs',
    },
  )
}
</script>

<i18n lang="yaml">
cs-CZ:
  'Select pickup location': 'Vyberte odběrové místo'
  'Click and select your location': 'Klikněte zde a vyberte si pobočku'
  'Change': 'Změnit'
  'Continue': 'Pokračovat'
</i18n>
