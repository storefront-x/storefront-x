<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
    <Heading :level="2" class="text-center">
      {{ t('Create new account') }}
    </Heading>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <SfxForm class="space-y-6" @submit="onSubmit">
          <FormInput name="firstName" :label="t('First name')" autocomplete="given-name" validators="required" />

          <FormInput name="lastName" :label="t('Last name')" autocomplete="family-name" validators="required" />

          <FormInput
            name="email"
            type="email"
            :label="t('Email address')"
            autocomplete="email"
            validators="required|email"
          />

          <FormInput name="password" type="password" :label="t('Password')" validators="required|min:8|classes:3" />

          <FormInput
            name="passwordConfirmation"
            type="password"
            :label="t('Password confirmation')"
            validators="required|same:password"
          />

          <Button type="submit" color="primary" :loading="isLoading" class="w-full" data-cy="sign-up">
            {{ t('Sign up') }}
          </Button>
        </SfxForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginCustomer from '#ioc/services/useLoginCustomer'
import useLocalePath from '#ioc/composables/useLocalePath'
import useI18n from '#ioc/composables/useI18n'
import SfxForm from '#ioc/components/SfxForm'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useRegisterCustomer from '#ioc/services/useRegisterCustomer'
import { ref } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
const showErrorNotification = useShowErrorNotification()
const registerCustomer = useRegisterCustomer()
const loginCustomer = useLoginCustomer()

const isLoading = ref(false)

const onSubmit = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
  try {
    isLoading.value = true
    await registerCustomer(data, {
      redirect: false,
    })
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
  Create new account: Vytvořte si nový účet
  First name: Křestní jméno
  Last name: Příjmení
  Email address: Emailová adresa
  Password: Heslo
  Password confirmation: Potvrzení hesla
  Sign up: Registrovat
</i18n>
