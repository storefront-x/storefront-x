<template>
  <Modal @close="emit('close')">
    <SfxForm class="space-y-6" @submit="onSubmit">
      <FormInput name="password" type="password" :label="t('Password')" validators="required" />

      <Button type="submit" color="primary" :loading="isLoading" class="w-full" data-cy="sign-in">
        {{ t('Sign in') }}
      </Button>
    </SfxForm>
  </Modal>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import SfxForm from '#ioc/components/SfxForm'
import Modal from '#ioc/atoms/Modal'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import useLoginCustomerInCheckout from '#ioc/services/useLoginCustomerInCheckout'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import { ref } from 'vue'

const showErrorNotification = useShowErrorNotification()
const loginCustomerInCheckout = useLoginCustomerInCheckout()
const { t } = useI18n()
const isLoading = ref(false)
const emit = defineEmits(['close', 'submit'])

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})

const onSubmit = async ({ password }: { password: string }) => {
  try {
    isLoading.value = true
    await loginCustomerInCheckout(props.email, password)
    emit('submit')
  } catch (e: any) {
    isLoading.value = false

    showErrorNotification(e)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Email address: Emailová adresa
  Password: Heslo
  Sign in: Přihlásit se
</i18n>
