<template>
  <div class="mt-10 border-t border-gray-200 pt-10">
    <h2 class="text-lg font-medium text-gray-900">{{ t('Contact information') }}</h2>

    <Form v-show="isOpen" ref="form" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4" @input="onInput">
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

      <SfxShippingMethod export="contact" />
      <div class="mt-4 flex items-end">
        <Button v-if="offerLogin" color="primary" @click="showLogin = true">{{ t('Login') }}</Button>
        <Button v-if="offerRegistration" color="primary" @click="showRegistration = true">{{ t('Register') }}</Button>
      </div>
    </Form>

    <CheckoutLoginModal
      v-if="showLogin"
      :email="contactEmail"
      @close="
        () => {
          showLogin = false
          offerLogin = false
        }
      "
    />
    <CheckoutRegisterModal
      v-if="showRegistration"
      :email="contactEmail"
      @close="
        () => {
          showRegistration = false
          offerRegistration = false
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import SfxShippingMethod from '#ioc/components/SfxShippingMethod'
import Form from '#ioc/atoms/Form'
import useCheckout from '#ioc/composables/useCheckout'
import useCustomer from '#ioc/composables/useCustomer'
import useI18n from '#ioc/composables/useI18n'
import useEmailAvailable from '#ioc/services/useEmailAvailable'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import CheckoutLoginModal from '#ioc/organisms/CheckoutLoginModal'
import CheckoutRegisterModal from '#ioc/organisms/CheckoutRegisterModal'
import debounce from '#ioc/utils/debounce'
import { ref, watch, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['select', 'confirm'])
const customer = useCustomer()
const { t } = useI18n()
const checkout = useCheckout()
const isEmailAvailable = useEmailAvailable()

const offerLogin = ref(false)
const offerRegistration = ref(false)
const showLogin = ref(false)
const showRegistration = ref(false)
const contactEmail = ref()

const checkEmail = async (email: string) => {
  if (customer.isLoggedIn || !email) {
    offerLogin.value = false
    offerRegistration.value = false
    return
  }
  const { emailAvailable } = await isEmailAvailable(email)
  if (emailAvailable) {
    offerLogin.value = false
    offerRegistration.value = true
  } else {
    offerLogin.value = true
    offerRegistration.value = false
  }
}

const form = ref<any>(null)

const onInput = debounce(async (data: any) => {
  if (!form.value?.isValid) return emit('select')
  contactEmail.value = form.value?.getData()?.email ?? {}
  await checkEmail(contactEmail.value)

  checkout.setContactInformation({
    city: 'DUMMYDATA',
    street: 'DUMMYDATA',
    postcode: 'DUMMYDATA',
    countryCode: 'CZ',
    ...data,
  })

  emit('confirm')
}, 500)

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      onInput(form.value?.getData())
    }
  },
)
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
