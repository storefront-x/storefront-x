<template>
  <Modal @close="emit('close')">
    <SfxForm name="register" class="space-y-6" @submit="onSubmit">
      <FormInput name="firstName" :label="t('First name')" autocomplete="given-name" validators="required" />

      <FormInput name="lastName" :label="t('Last name')" autocomplete="family-name" validators="required" />

      <FormInput
        name="email"
        type="email"
        :label="t('Email address')"
        autocomplete="email"
        validators="required|email"
        :value="props.email"
      />

      <FormInput name="password" type="password" :label="t('Password')" validators="required|min:8|classes:3" />

      <FormInput
        name="passwordConfirmation"
        type="password"
        :label="t('Password confirmation')"
        validators="required|same:password"
      />

      <Button type="submit" color="primary" :loading="loading" class="w-full" data-cy="sign-up">
        {{ t('Sign up') }}
      </Button>
    </SfxForm>
  </Modal>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import SfxForm from '#ioc/components/SfxForm'
import Modal from '#ioc/atoms/Modal'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import useConfirmContactInformation from '#ioc/services/useConfirmContactInformation'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useRefreshCheckoutAgreements from '#ioc/services/useRefreshCheckoutAgreements'
import useRegisterCustomerInCheckout from '#ioc/services/useRegisterCustomerInCheckout'
import useLoginCustomerInCheckout from '#ioc/services/useLoginCustomerInCheckout'
import { ref } from 'vue'

const showErrorNotification = useShowErrorNotification()
const confirmContactInformation = useConfirmContactInformation()
const refreshCheckoutAgreements = useRefreshCheckoutAgreements()
const useRegisterCustomer = useRegisterCustomerInCheckout()
const loginCustomerInCheckout = useLoginCustomerInCheckout()
const { t } = useI18n()

const loading = ref(false)
const emit = defineEmits(['close', 'submit'])

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})

const onSubmit = async (data: any) => {
  try {
    loading.value = true
    await useRegisterCustomer(data)
    await confirmContactInformation({
      email: 'DUMMYDATA@DUMMYDATA.DUMMYDATA',
      telephone: 'DUMMYDATA',
      firstName: 'DUMMYDATA',
      lastName: 'DUMMYDATA',
      street: 'DUMMYDATA',
      city: 'DUMMYDATA',
      postcode: 'DUMMYDATA',
      countryCode: 'CZ',
    })
    await refreshCheckoutAgreements()
    await loginCustomerInCheckout(data.email, data.password)
    emit('close')
  } catch (e: any) {
    loading.value = false

    showErrorNotification(e)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  First name: Křestní jméno
  Last name: Příjmení
  Email address: Emailová adresa
  Password: Heslo
  Password confirmation: Potvrzení hesla
  Sign up: Registrovat
</i18n>
