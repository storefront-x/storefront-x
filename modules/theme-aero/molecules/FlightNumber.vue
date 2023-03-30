<template>
  <SfxForm class="space-y-6 sm:mx-auto sm:w-full sm:max-w-md" @submit="onSubmit">
    <FormInput name="flight" type="text" :label="t('Flight number')" validators="required" />

    <Button type="submit" color="primary" :loading="isLoading" class="w-full" data-cy="sign-in">
      {{ t('Get flight data') }}
    </Button>
  </SfxForm>
</template>

<script setup lang="ts">
import useLoginCustomer from '#ioc/services/useLoginCustomer'
import useI18n from '#ioc/composables/useI18n'
import useLocalePath from '#ioc/composables/useLocalePath'
import SfxForm from '#ioc/components/SfxForm'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import { ref } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
const loginCustomer = useLoginCustomer()
const showErrorNotification = useShowErrorNotification()

const isLoading = ref(false)

const users = [{ flightNumber: 'LH2233', email: 'fajmanm@magexo.cz', password: 'Pass12345' }]

const onSubmit = async (data: { flight: string }) => {
  const user = users.find((user) => user.flightNumber === data.flight)

  if (user) {
    try {
      isLoading.value = true

      await loginCustomer(user.email, user.password, {
        redirect: localePath('/'),
      })
    } catch (e: any) {
      isLoading.value = false

      showErrorNotification(e)
    }
  } else {
    showErrorNotification('Please enter valid flight number')
  }
}
</script>
