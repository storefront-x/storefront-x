<template>
  <div class="mt-10 border-t border-gray-200 pt-10">
    <h2 class="text-lg font-medium text-gray-900">{{ t('Contact information') }}</h2>
    <div v-if="isOpen">
      <div v-if="customerAddresses" class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <CheckoutCustomerAddress
          v-for="customerAddress in customerAddresses?.addresses"
          :key="customerAddress.id"
          :customer-address="customerAddress"
          :is-active="!!selectedAddress && customerAddress.id === selectedAddress.id"
          @select="onSelectCustomerAddress"
        />
      </div>
      <Button v-if="selectedAddress" color="light" class="mt-4" @click="onCustomAddress">
        {{ t('Custom shipping address') }}
      </Button>
    </div>

    <Form
      v-show="isOpen && !selectedAddress"
      ref="form"
      class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
      @input="onInput"
    >
      <FormInput
        :value="customer.email"
        :label="t('Email')"
        :inputmode="'email'"
        name="email"
        type="email"
        autocomplete="email"
        class="mt-4"
        validators="required|email"
      />

      <FormInput
        :label="t('Phone')"
        inputmode="tel"
        name="telephone"
        autocomplete="tel"
        class="mt-4"
        validators="required|phone"
      />

      <FormInput
        :value="customer.firstName"
        :label="t('First name')"
        name="firstName"
        autocomplete="given-name"
        class="mt-4"
        validators="required"
      />

      <FormInput
        :value="customer.lastName"
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

    <CheckoutLoginModal v-if="showLogin" :email="contactEmail" @submit="afterLoginSubmit" @close="closeLoginModal" />
    <CheckoutRegisterModal
      v-if="showRegistration"
      :email="contactEmail"
      @submit="afterRegisterSubmit"
      @close="closeCheckinModal"
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
import CheckoutCustomerAddress from '#ioc/molecules/CheckoutCustomerAddress'
import useGetCustomerAddresses from '#ioc/services/useGetCustomerAddresses'
import useAsyncData from '#ioc/composables/useAsyncData'
import debounce from '#ioc/utils/debounce'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['select', 'confirm'])
const customer = useCustomer()
const { t } = useI18n()
const checkout = useCheckout()
const isEmailAvailable = useEmailAvailable()

const getCustomerAddresses = useGetCustomerAddresses()

const offerLogin = ref(false)
const offerRegistration = ref(false)
const showLogin = ref(false)
const showRegistration = ref(false)
const contactEmail = ref()
const selectedAddress = ref<ReturnType<typeof ToCustomerAddress> | null>(null)

const { data: customerAddresses } = useAsyncData('customerAddress', async () =>
  customer.isLoggedIn ? await getCustomerAddresses() : { addresses: [] },
)

const onSelectCustomerAddress = (customerAddress: any) => {
  const shippingAddress = {
    ...customerAddress,
    telephone: customerAddress?.phoneNumber,
  }
  selectedAddress.value = shippingAddress
  onInput(shippingAddress)
}

const onCustomAddress = () => {
  selectedAddress.value = null
}

const afterLoginSubmit = () => {
  offerLogin.value = false
  showLogin.value = false
}

const afterRegisterSubmit = () => {
  offerRegistration.value = false
  showRegistration.value = false
}

const closeLoginModal = () => {
  showLogin.value = false
}

const closeCheckinModal = () => {
  showRegistration.value = false
}

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
  try {
    contactEmail.value = data?.email ?? {}

    await checkEmail(contactEmail.value)

    if (!form.value?.isValid && !selectedAddress.value) return emit('select')
    const address = selectedAddress.value ? selectedAddress.value : data

    checkout.setContactInformation({
      city: 'DUMMYDATA',
      street: 'DUMMYDATA',
      postcode: 'DUMMYDATA',
      countryCode: 'CZ',
      ...address,
    })

    emit('confirm')
  } catch (error) {
    console.warn(error)
  }
}, 500)

watch(customerAddresses, () => {
  for (const customerAddress of customerAddresses.value.addresses) {
    if (customerAddress.defaultShipping) onSelectCustomerAddress(customerAddress)
  }
})

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
