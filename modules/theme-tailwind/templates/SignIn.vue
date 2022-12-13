<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
    <Heading :level="2" class="text-center">
      {{ t('Sign in to your account') }}
    </Heading>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <SfxForm class="space-y-6" @submit="onSubmit">
          <FormInput
            name="email"
            type="email"
            :label="t('Email address')"
            autocomplete="email"
            validators="required|email"
          />

          <FormInput name="password" type="password" :label="t('Password')" validators="required" />

          <Button type="submit" color="primary" :loading="isLoading" class="w-full" data-cy="sign-in">
            {{ t('Sign in') }}
          </Button>
        </SfxForm>

        <p class="mt-4">
          {{ t("Don't have an account?") }}
          <Link :to="localePath('sign-up')" color="primary">{{ t('Register here') }}</Link>
        </p>

        <p class="mt-4">
          {{ t('Forgot password?') }}
          <Link :to="localePath('reset-password')" color="primary">{{ t('Reset password') }}</Link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginCustomer from '#ioc/services/useLoginCustomer'
import useI18n from '#ioc/composables/useI18n'
import useLocalePath from '#ioc/composables/useLocalePath'
import SfxForm from '#ioc/components/SfxForm'
import Link from '#ioc/atoms/Link'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import { ref } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
const loginCustomer = useLoginCustomer()
const showErrorNotification = useShowErrorNotification()

const isLoading = ref(false)

const onSubmit = async (data: { email: string; password: string }) => {
  try {
    isLoading.value = true

    await loginCustomer(data.email, data.password, {
      redirect: localePath('account'),
    })
  } catch (e: any) {
    isLoading.value = false

    showErrorNotification(e)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Sign in to your account: Přihlašte se do účtu
  Email address: Emailová adresa
  Password: Heslo
  Sign in: Přihlásit se
  Don't have an account?: Nemáte účet?
  Register here: Registrujte se zde
  Forgot password?: Zapomenuté heslo?
  Reset password: Resetovat heslo
</i18n>
