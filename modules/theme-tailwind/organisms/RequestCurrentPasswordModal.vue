<template>
  <Modal @close="onClose">
    <Heading :level="3">{{ t('Confirm current password') }}</Heading>
    <SfxForm @submit="onSubmit">
      <FormInput
        ref="input"
        :label="t('Current password')"
        name="password"
        type="password"
        class="mt-4"
        validators="required"
      />

      <div class="flex justify-end gap-4 mt-4">
        <Button type="submit" color="primary" :loading="isLoading" :disabled="isLoading">{{ t('Confirm') }}</Button>
      </div>
    </SfxForm>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '#ioc/atoms/Modal'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import SfxForm from '#ioc/components/SfxForm'
import FormInput from '#ioc/molecules/FormInput'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

let resolver: any
let rejecter: any

const request = async () => {
  return new Promise((resolve, reject) => {
    resolver = resolve
    rejecter = reject
  })
}

const onSubmit = ({ password }: { password: string }) => {
  resolver(password)
}

const onClose = () => {
  rejecter('Cancelled')
}

defineExpose({ request })
</script>

<i18n lang="yaml">
cs-CZ:
  Confirm current password: Zadejte stávající heslo
  Current password: Stávající heslo
  Confirm: Potvrdit
</i18n>
