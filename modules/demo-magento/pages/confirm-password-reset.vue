<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
    <Heading :level="1" class="text-center">
      {{ t('Reset password') }}
    </Heading>

    <div class="mt-8 bg-gray-50 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="py-8 px-4 sm:rounded-lg sm:px-10">
        <SfxForm class="space-y-6" @submit="updatePassword">
          <FormInput name="email" type="email" :label="t('Email')" validators="required|email" />

          <FormInput
            name="newPassword"
            type="password"
            :label="t('Confirm new password')"
            validators="required|same:newPassword"
          />

          <div class="flex justify-end">
            <Button
              type="submit"
              color="primary"
              class="w-full"
              :loading="isPasswordLoading"
              :disabled="isPasswordLoading"
            >
              {{ t('Change password') }}
            </Button>
          </div>
        </SfxForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useResetCustomerPassword from '#ioc/services/useResetCustomerPassword'
import SfxForm from '#ioc/components/SfxForm'
import FormInput from '#ioc/molecules/FormInput'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import useRoute from '#ioc/composables/useRoute'
import { ref } from 'vue'

const { t } = useI18n()

const resetCustomerPassword = useResetCustomerPassword()
const showErrorNotification = useShowErrorNotification()
const showSuccessNotification = useShowSuccessNotification()
const route = useRoute()
const isPasswordLoading = ref(false)

const updatePassword = async (data: any) => {
  try {
    isPasswordLoading.value = true

    await resetCustomerPassword(data.email, data.newPassword, route.query.token as string)

    showSuccessNotification('', t('Password successfully updated'))
  } catch (e) {
    showErrorNotification(e)
  } finally {
    isPasswordLoading.value = false
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Password: Heslo
  Email: Email
  Confirm new password: Potvrďte nové heslo
  Reset password: Změnit heslo
</i18n>
