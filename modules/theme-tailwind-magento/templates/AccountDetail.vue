<template>
  <div class="max-w-sm">
    <Heading :level="2" class="mb-4">{{ t('Personal information') }}</Heading>
    <SfxForm class="flex flex-col gap-4" @submit="updatePersonalInformation">
      <FormInput
        name="prefix"
        :value="customer.prefix"
        :label="t('Prefix')"
        :placeholder="t('An honorific, such as Dr., Mr., or Mrs.')"
        autocomplete="honorific-prefix"
      />

      <FormInput
        name="firstname"
        :value="customer.firstName"
        :label="t('First name')"
        autocomplete="given-name"
        validators="required"
      />

      <FormInput
        name="middlename"
        :value="customer.middleName"
        :label="t('Middle name')"
        autocomplete="additional-name"
      />

      <FormInput
        name="lastname"
        :value="customer.lastName"
        :label="t('Last name')"
        autocomplete="family-name"
        validators="required"
      />

      <FormInput
        name="suffix"
        :value="customer.suffix"
        :label="t('Suffix')"
        :placeholder="t('A value such as Sr., Jr., or III')"
        autocomplete="honorific-suffix"
      />

      <FormCheckbox name="is_subscribed" :value="customer.isSubscribed" :label="t('Subscribed to the newsletter')" />

      <FormRadioGroup name="gender" :value="customer.gender" :label="t('Gender')" group="gender">
        <FormRadio :value="0" :label="t('Unspecified')" />
        <FormRadio :value="1" :label="t('Male')" />
        <FormRadio :value="2" :label="t('Female')" />
      </FormRadioGroup>

      <div class="flex justify-end">
        <Button type="submit" color="primary" :loading="isInfoLoading" :disabled="isInfoLoading">
          {{ t('Update') }}
        </Button>
      </div>
    </SfxForm>

    <Heading :level="2" class="mt-8 mb-4">{{ t('Email') }}</Heading>
    <SfxForm class="flex flex-col gap-4" @submit="updateEmail">
      <FormInput name="email" :placeholder="customer.email" autocomplete="email" validators="required|email" />

      <div class="flex justify-end">
        <Button type="submit" color="primary" :loading="isEmailLoading" :disabled="isEmailLoading">
          {{ t('Change email') }}
        </Button>
      </div>
    </SfxForm>

    <Heading :level="2" class="mt-8 mb-4">{{ t('Password') }}</Heading>
    <SfxForm class="flex flex-col gap-4" @submit="updatePassword">
      <FormInput name="newPassword" type="password" :label="t('New password')" validators="required|min:8|classes:3" />

      <FormInput
        name="newPassword2"
        type="password"
        :label="t('Confirm new password')"
        validators="required|same:newPassword"
      />

      <div class="flex justify-end">
        <Button type="submit" color="primary" :loading="isPasswordLoading" :disabled="isPasswordLoading">
          {{ t('Change password') }}
        </Button>
      </div>
    </SfxForm>

    <RequestCurrentPasswordModal
      v-if="isRequestCurrentPasswordModalShown"
      ref="passwordModal"
      :is-loading="isEmailLoading || isPasswordLoading"
    />
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import SfxForm from '#ioc/components/SfxForm'
import FormInput from '#ioc/molecules/FormInput'
import FormCheckbox from '#ioc/molecules/FormCheckbox'
import FormRadioGroup from '#ioc/molecules/FormRadioGroup'
import FormRadio from '#ioc/molecules/FormRadio'
import Button from '#ioc/atoms/Button'
import RequestCurrentPasswordModal from '#ioc/organisms/RequestCurrentPasswordModal'
import useI18n from '#ioc/composables/useI18n'
import useCustomer from '#ioc/composables/useCustomer'
import { ref, nextTick } from 'vue'
import useUpdateCustomer from '#ioc/services/useUpdateCustomer'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useUpdateCustomerEmail from '#ioc/services/useUpdateCustomerEmail'
import useChangeCustomerPassword from '#ioc/services/useChangeCustomerPassword'

const { t } = useI18n()
const customer = useCustomer()
const updateCustomer = useUpdateCustomer()
const updateCustomerEmail = useUpdateCustomerEmail()
const changeCustomerPassword = useChangeCustomerPassword()
const showErrorNotification = useShowErrorNotification()
const showSuccessNotification = useShowSuccessNotification()

const isRequestCurrentPasswordModalShown = ref(false)
const isInfoLoading = ref(false)
const isEmailLoading = ref(false)
const isPasswordLoading = ref(false)

const passwordModal = ref<InstanceType<typeof RequestCurrentPasswordModal>>()

const updatePersonalInformation = async (data: any) => {
  try {
    isInfoLoading.value = true
    await updateCustomer(data)
    showSuccessNotification('', t('Profile info successfully updated'))
  } catch (e) {
    showErrorNotification(e)
  } finally {
    isInfoLoading.value = false
  }
}

const updateEmail = async ({ email }: { email: string }) => {
  try {
    isRequestCurrentPasswordModalShown.value = true
    await nextTick()
    const password = await passwordModal.value?.request()

    isEmailLoading.value = true

    await updateCustomerEmail(email, password as string)

    showSuccessNotification('', t('Email address successfully updated'))
  } catch (e) {
    showErrorNotification(e)
  } finally {
    isRequestCurrentPasswordModalShown.value = false
    isEmailLoading.value = false
  }
}

const updatePassword = async ({ newPassword }: { newPassword: string }) => {
  try {
    isRequestCurrentPasswordModalShown.value = true
    await nextTick()
    const currentPassword = await passwordModal.value?.request()

    isPasswordLoading.value = true

    await changeCustomerPassword(newPassword, currentPassword as string)

    showSuccessNotification('', t('Password successfully updated'))
  } catch (e) {
    showErrorNotification(e)
  } finally {
    isRequestCurrentPasswordModalShown.value = false
    isPasswordLoading.value = false
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Personal information: Osobní informace
  Prefix: Titul před jménem
  First name: Křestní jméno
  Middle name: Prostřední jméno
  Last name: Příjmení
  Suffix: Titual za jménem
  Gender: Pohlaví
  Unspecified: Nespecifikováno
  Male: Muž
  Female: Žena
  Subscribed to the newsletter: Přihlášeno k odběru novinek
  Update: Aktualizovat
  Change email: Změnit email
  Password: Heslo
  New password: Nové heslo
  Confirm new password: Potvrďte nové heslo
  Change password: Změnit heslo
  Profile info successfully updated: Osobní informace aktualizovány
  Email address successfully updated: Emailová adresa aktualizována
  Password successfully updated: Heslo aktualizováno
  'An honorific, such as Dr., Mr., or Mrs.': 'Například Ing., Mgr.'
  'A value such as Sr., Jr., or III': 'Například Ph.D., CSc.'
</i18n>
