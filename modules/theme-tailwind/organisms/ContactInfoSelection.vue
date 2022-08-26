<template>
  <div class="mt-10 border-t border-gray-200 pt-10">
    <h2 class="text-lg font-medium text-gray-900">{{ t('Contact information') }}</h2>

    <Form ref="form" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4" @input="onInput">
      <FormInput
        :label="t('Email')"
        :inputmode="'email'"
        :value="checkout.contactInformation?.email"
        name="email"
        type="email"
        autocomplete="email"
        class="mt-4"
        validators="required"
      />

      <FormInput
        :label="t('Phone')"
        :value="checkout.contactInformation?.telephone"
        inputmode="tel"
        name="telephone"
        autocomplete="tel"
        class="mt-4"
        validators="required"
      />

      <FormInput
        :label="t('First name')"
        :value="checkout.contactInformation?.firstName"
        name="firstName"
        autocomplete="given-name"
        class="mt-4"
        validators="required"
      />

      <FormInput
        :label="t('Last name')"
        :value="checkout.contactInformation?.lastName"
        name="lastName"
        autocomplete="family-name"
        class="mt-4"
        validators="required"
      />
    </Form>
  </div>
</template>

<script setup lang="ts">
import Form from '#ioc/atoms/Form'
import useCheckout from '#ioc/composables/useCheckout'
import useI18n from '#ioc/composables/useI18n'
import useShipping from '#ioc/composables/useShipping'
import FormInput from '#ioc/molecules/FormInput'
import useSelectShippingMethod from '#ioc/services/useSelectShippingMethod'
import useSetContactInformation from '#ioc/services/useSetContactInformation'
import debounce from '#ioc/utils/debounce'
import { ref } from 'vue'

const { t } = useI18n()
const checkout = useCheckout()
const shipping = useShipping()
const setContactInformation = useSetContactInformation()
const selectShippingMethod = useSelectShippingMethod()

const form = ref<any>(null)

const onInput = debounce(async (data: any) => {
  if (!form.value?.isValid) return

  const oldShippingMethod = shipping.currentShippingMethod

  await setContactInformation({
    city: 'DUMMYDATA',
    street: 'DUMMYDATA',
    postcode: 'DUMMYDATA',
    countryCode: 'CZ',
    ...data,
  })

  await selectShippingMethod(oldShippingMethod!)
}, 500)
</script>

<i18n lang="yaml">
cs-CZ:
  Contact information: Kontaktní informace
  Phone: Telefon
  First name: Křestní jméno
  Last name: Příjmení
  Custom shipping address: Vlastní doručovací adresa
  Login: Přihlásit se
  Register: Registrovat
</i18n>
