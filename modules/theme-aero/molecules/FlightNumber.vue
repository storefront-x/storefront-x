<template>
  <SfxForm class="space-y-4 lg:space-y-0 p-4 lg:flex lg:items-end" @submit="onSubmit">
    <FormInputFlight name="flight" type="text" :label="t('Flight number')" validators="required" class="lg:mr-2" />

    <Button type="submit" color="primary" :loading="isLoading" class="w-full lg:w-auto" data-cy="sign-in">
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
import FormInputFlight from '#ioc/molecules/FormInputFlight'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import { ref } from 'vue'
import useRoute from '#ioc/composables/useRoute'

const { t } = useI18n()
const localePath = useLocalePath()
const loginCustomer = useLoginCustomer()
const showErrorNotification = useShowErrorNotification()

const isLoading = ref(false)
const route = useRoute()

const users = [
  { flightNumber: 'LH2233', email: 'fajmanm@magexo.cz', password: 'Pass12345' },
  { flightNumber: 'LY2521', email: 'francb+test@magexo.cz', password: 'Heslo123' },
  { flightNumber: 'FR3528', email: 'francb+test1@magexo.cz', password: 'Heslo123' },
]

const onSubmit = async (data: { flight: string }) => {
  const user = users.find((user) => user.flightNumber === data.flight)

  if (user) {
    try {
      isLoading.value = true

      await loginCustomer(user.email, user.password, {
        redirect: localePath(route.path),
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
