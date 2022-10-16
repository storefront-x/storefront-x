<template>
  <div class="flex items-center justify-center">
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
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useChangeCustomerPassword from '#ioc/services/useChangeCustomerPassword'
import SfxForm from '#ioc/components/SfxForm'
import FormInput from '#ioc/molecules/FormInput'
import Button from '#ioc/atoms/Button'
import useRoute from '#ioc/composables/useRoute'
import { ref, nextTick, onMounted } from 'vue'

const { t } = useI18n()

const changeCustomerPassword = useChangeCustomerPassword()
const showErrorNotification = useShowErrorNotification()
const showSuccessNotification = useShowSuccessNotification()
const route = useRoute()
const isPasswordLoading = ref(false)

const updatePassword = async (data: any) => {
  try {
    isPasswordLoading.value = true

    await changeCustomerPassword(data.newPassword, data.currentPassword as string)

    showSuccessNotification('', t('Password successfully updated'))
  } catch (e) {
    showErrorNotification(e)
  } finally {
    isPasswordLoading.value = false
  }
}
onMounted(() => {
  console.log('token', route.query.token)
})
</script>

<i18n lang="yaml">
cs-CZ:
  Password: Heslo
  New password: Nové heslo
  Confirm new password: Potvrďte nové heslo
  Change password: Změnit heslo
</i18n>
