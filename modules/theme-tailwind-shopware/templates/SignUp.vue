<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
    <Heading :level="2" class="text-center">
      {{ t('Create new account') }}
    </Heading>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <SfxForm class="space-y-6" @submit="onSubmit">
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

          <FormInput
            :label="t('Street')"
            name="street"
            autocomplete="street-address"
            class="mt-4"
            validators="required"
          />

          <FormInput :label="t('City')" name="city" autocomplete="address-level2" class="mt-4" validators="required" />

          <FormInput
            :label="t('Postcode')"
            name="zipcode"
            autocomplete="postal-code"
            class="mt-4"
            validators="required"
          />

          <FormSelect
            :label="t('Country')"
            name="countryId"
            autocomplete="address-level2"
            class="mt-4"
            validators="required"
          >
            <option value="">{{ t('Select a country') }}</option>
            <option v-for="country in countryData?.countries" :key="country.id" :value="country.id">
              {{ country.name }}
            </option>
          </FormSelect>

          <Button type="submit" color="primary" :loading="isLoading" class="w-full" data-cy="sign-up">
            {{ t('Sign up') }}
          </Button>
        </SfxForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import SfxForm from '#ioc/components/SfxForm'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import FormSelect from '#ioc/molecules/FormSelect'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useRegisterCustomer from '#ioc/services/useRegisterCustomer'
import { ref } from 'vue'

const { t } = useI18n()
const showErrorNotification = useShowErrorNotification()
const registerCustomer = useRegisterCustomer()

const isLoading = ref(false)
defineProps({
  countryData: {
    type: Object,
    required: true,
  },
  salutationsData: {
    type: Object,
    required: true,
  },
})
const onSubmit = async (data: {
  firstName: string
  lastName: string
  email: string
  password: string
  street: string
  city: string
  zipcode: string
  countryId: string
  salutationId: string
}) => {
  try {
    isLoading.value = true
    await registerCustomer(data, {
      redirect: true,
    })
  } catch (e: any) {
    isLoading.value = false

    showErrorNotification(e)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Salutation: Oslovení
  Create new account: Vytvořte si nový účet
  First name: Křestní jméno
  Last name: Příjmení
  Email address: Emailová adresa
  Password: Heslo
  Password confirmation: Potvrzení hesla
  Sign up: Registrovat
  Street: Ulice
  City: Město
  Postcode: PSČ
</i18n>
