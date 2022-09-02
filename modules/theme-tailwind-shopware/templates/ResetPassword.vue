<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
    <Heading :level="1" class="text-center">
      {{ $t('Forgot password') }}
    </Heading>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <SfxForm class="space-y-6" @submit="onSubmit">
          <FormInput
            name="email"
            type="email"
            :label="$t('Email address')"
            autocomplete="email"
            validators="required|email"
          />

          <Button type="submit" color="primary" :loading="isLoading" class="w-full" data-cy="sign-in">
            {{ $t('Reset password') }}
          </Button>
        </SfxForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxForm from '#ioc/components/SfxForm'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import useI18n from '#ioc/composables/useI18n'
import useResetPassword from '#ioc/services/useResetPassword'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
const showErrorNotification = useShowErrorNotification()
const showSuccessNotification = useShowSuccessNotification()
const resetPassword = useResetPassword()
const { t } = useI18n()
import { ref } from 'vue'

const isLoading = ref(false)

const onSubmit = async (data: any) => {
  try {
    isLoading.value = true
    await sendPassword(data)
  } catch (e) {
    isLoading.value = false

    showErrorNotification(e)
  }
}

const sendPassword = async (data: any) => {
  const { success } = await resetPassword(data.email)

  if (success) {
    showSuccessNotification('OK', t('Reset email has been sent'))

    isLoading.value = false
  } else showErrorNotification(new Error('Email not sent.'))

  isLoading.value = false
}
</script>

<i18n lang="yaml">
cs-CZ:
  Email address: Emailová adresa
  Reset email has been sent: Odeslali jsme Vám email pro reset hesla
  Reset password: Reset hesla
  Forgot password: Zapomenuté heslo
</i18n>
