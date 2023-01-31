<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
    <Heading :level="1" class="text-center">
      {{ t('Reset password') }}
    </Heading>

    <div class="mt-8 bg-gray-50 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="py-8 px-4 sm:rounded-lg sm:px-10">
        <SfxForm class="space-y-6" @submit="updatePassword">
          <FormInput name="email" type="email" :label="t('email')" validators="required|email" />
          <FormInput
            name="newPassword"
            type="password"
            :label="t('newPassword')"
            validators="required|min:8|classes:3"
          />
          <FormInput
            name="newPasswordRepeat"
            type="password"
            :label="t('newPasswordRepeat')"
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
              {{ t('changePassword') }}
            </Button>
          </div>
        </SfxForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
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
const showSuccessNotification = useShowSuccessNotification()
const route = useRoute()
const isPasswordLoading = ref(false)

const updatePassword = async (data: any) => {
  try {
    isPasswordLoading.value = true

    await resetCustomerPassword(data.email, data.newPassword, route.query.token as string)

    showSuccessNotification('', t('passwordUpdated'))
  } finally {
    isPasswordLoading.value = false
  }
}
</script>

<i18n lang="yaml">
en-US:
  newPassword: New password
  newPasswordRepeat: Repeat new password
  changePassword: Change password
  email: Your email
  passwordUpdated: Your password was changed
cs-CZ:
  newPassword: Nové heslo
  newPasswordRepeat: Zopakujte nové heslo
  changePassword: Změnit heslo
  email: Váš email
  passwordUpdated: Vaše heslo bylo změněno
</i18n>
