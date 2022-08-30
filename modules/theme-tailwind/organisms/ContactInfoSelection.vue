<template>
  <div class="mt-10 border-t border-gray-200 pt-10">
    <h2 class="text-lg font-medium text-gray-900">{{ t('Contact information') }}</h2>

    <Form v-if="isOpen" ref="form" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4" @input="onInput">
      <FormInput
        :label="t('Email')"
        :inputmode="'email'"
        name="email"
        type="email"
        autocomplete="email"
        class="mt-4"
        validators="required"
      />

      <FormInput
        :label="t('Phone')"
        inputmode="tel"
        name="telephone"
        autocomplete="tel"
        class="mt-4"
        validators="required"
      />

      <FormInput
        :label="t('First name')"
        name="firstName"
        autocomplete="given-name"
        class="mt-4"
        validators="required"
      />

      <FormInput
        :label="t('Last name')"
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
import FormInput from '#ioc/molecules/FormInput'
import debounce from '#ioc/utils/debounce'
import { ref } from 'vue'

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['select', 'confirm'])

const { t } = useI18n()
const checkout = useCheckout()

const form = ref<any>(null)

const onInput = debounce(async (data: any) => {
  if (!form.value?.isValid) return emit('select')

  checkout.setContactInformation({
    city: 'DUMMYDATA',
    street: 'DUMMYDATA',
    postcode: 'DUMMYDATA',
    countryCode: 'CZ',
    ...data,
  })

  emit('confirm')
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
