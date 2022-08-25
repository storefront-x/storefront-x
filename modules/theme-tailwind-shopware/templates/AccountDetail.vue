<template>
  <div>
    <div class="max-w-sm">
      <Heading :level="2" class="mb-4">{{ t('Personal information') }}</Heading>
      <SfxForm :value="customer" class="flex flex-col gap-4" @submit="updatePersonalInformation">
        <FormSelect
          :label="t('Salutation')"
          name="salutationId"
          autocomplete="address-level2"
          class="mt-4"
          validators="required"
        >
          <option v-for="salutation in salutationsData?.salutations" :key="salutation.id" :value="salutation.id">
            {{ salutation.displayName }}
          </option>
        </FormSelect>

        <FormInput name="title" :value="customer.title" :label="t('Title')" />

        <FormInput
          name="firstName"
          :value="customer.firstName"
          :label="t('First name')"
          autocomplete="given-name"
          validators="required"
        />

        <FormInput
          name="lastName"
          :value="customer.lastName"
          :label="t('Last name')"
          autocomplete="family-name"
          validators="required"
        />

        <div class="flex justify-end">
          <Button type="submit" color="primary">
            {{ t('Update') }}
          </Button>
        </div>
      </SfxForm>

      <Heading :level="2" class="mt-8 mb-4">{{ t('Email') }}</Heading>
      <SfxForm class="flex flex-col gap-4" @submit="updateEmail">
        <FormInput
          :label="t('Email')"
          name="email"
          :placeholder="customer.email"
          autocomplete="email"
          validators="required|email"
        />
        <FormInput
          :label="t('Confirm Email')"
          name="confirmEmail"
          :placeholder="customer.email"
          autocomplete="email"
          validators="required|email|same:email"
        />

        <div class="flex justify-end">
          <Button type="submit" color="primary">
            {{ t('Change email') }}
          </Button>
        </div>
      </SfxForm>

      <Heading :level="2" class="mt-8 mb-4">{{ t('Password') }}</Heading>
      <SfxForm class="flex flex-col gap-4" @submit="updatePassword">
        <FormInput
          name="newPassword"
          type="password"
          :label="t('New password')"
          validators="required|min:8|classes:3"
        />

        <FormInput
          name="newPasswordConfirm"
          type="password"
          :label="t('Confirm new password')"
          validators="required|same:newPassword"
        />

        <div class="flex justify-end">
          <Button type="submit" color="primary">
            {{ t('Change password') }}
          </Button>
        </div>
      </SfxForm>
    </div>
    <RequestCurrentPasswordModal
      v-if="isRequestCurrentPasswordModalShown"
      ref="passwordModal"
      :is-loading="isEmailLoading || isPasswordLoading"
    />
  </div>
</template>

<script lang="ts">
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import SfxForm from '#ioc/components/SfxForm'
import FormInput from '#ioc/molecules/FormInput'
import useLocalePath from '#ioc/composables/useLocalePath'
import useI18n from '#ioc/composables/useI18n'
import useUpdateCustomer from '#ioc/services/useUpdateCustomer'
import useChangeCustomerPassword from '#ioc/services/useChangeCustomerPassword'
import useUpdateCustomerEmail from '#ioc/services/useUpdateCustomerEmail'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useCustomer from '#ioc/composables/useCustomer'
import RequestCurrentPasswordModal from '#ioc/organisms/RequestCurrentPasswordModal'
import { ref, defineComponent, nextTick } from 'vue'
import useAsyncData from '#ioc/composables/useAsyncData'
import useGetSalutations from '#ioc/services/useGetSalutations'
import FormSelect from '#ioc/molecules/FormSelect'

export default defineComponent({
  components: {
    Heading,
    Button,
    SfxForm,
    FormInput,
    RequestCurrentPasswordModal,
    FormSelect,
  },
  setup() {
    const localePath = useLocalePath()
    const { t } = useI18n()
    const changeProfile = useUpdateCustomer()
    const getSalutations = useGetSalutations()
    const showErrorNotification = useShowErrorNotification()
    const showSuccessNotification = useShowSuccessNotification()
    const changeCustomerPassword = useChangeCustomerPassword()
    const updateCustomerEmail = useUpdateCustomerEmail()

    const customer = useCustomer()
    const isInfoLoading = ref(false)
    const isEmailLoading = ref(false)
    const isPasswordLoading = ref(false)
    const isRequestCurrentPasswordModalShown = ref(false)
    const passwordModal = ref<InstanceType<typeof RequestCurrentPasswordModal>>()
    const test = ref(null)
    const { data: salutationsData } = useAsyncData('salutations', () => getSalutations())

    const updatePersonalInformation = async (data: {
      firstName: string
      lastName: string
      title: string
      salutationId: string
    }) => {
      try {
        isInfoLoading.value = true
        await changeProfile(data)
        showSuccessNotification(t('Profile'), t('Profile info successfully updated'))
      } catch (error) {
        showErrorNotification(error)
      } finally {
        isInfoLoading.value = false
      }
    }

    const updateEmail = async ({ email, confirmEmail }: { email: string; confirmEmail: string }) => {
      try {
        isRequestCurrentPasswordModalShown.value = true
        await nextTick()
        const password = await passwordModal.value?.request()
        isEmailLoading.value = true
        await updateCustomerEmail(email, confirmEmail, password)
        showSuccessNotification(t('Email'), t('Email address successfully updated'))
      } catch (error) {
        // Do nothing...
      } finally {
        isRequestCurrentPasswordModalShown.value = false
        isEmailLoading.value = false
      }
    }

    const updatePassword = async (data: { newPassword: string; newPasswordConfirm: string }) => {
      try {
        isRequestCurrentPasswordModalShown.value = true
        await nextTick()
        const password = await passwordModal.value?.request()
        isPasswordLoading.value = true
        await changeCustomerPassword({ password, ...data })
        showSuccessNotification(t('Password'), t('Password successfully updated'))
      } catch (error) {
        // Do nothing...
      } finally {
        isRequestCurrentPasswordModalShown.value = false
        isPasswordLoading.value = false
      }
    }
    return {
      t,
      updateCustomerEmail,
      showSuccessNotification,
      updatePassword,
      isRequestCurrentPasswordModalShown,
      updateEmail,
      updatePersonalInformation,
      customer,
      isEmailLoading,
      isPasswordLoading,
      localePath,
      passwordModal,
      test,
      salutationsData,
    }
  },
})
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
  Confirm email: Potvrďte email
  Change password: Změnit heslo
  Title: Titul
  Profile: Profil

  Profile info successfully updated: Osobní informace aktualizovány
  Email address successfully updated: Emailová adresa aktualizována
  Password successfully updated: Heslo aktualizováno
</i18n>
