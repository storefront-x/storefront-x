<template>
  <Modal @close="emit('close')">
    <Heading :level="3" class="text-center">{{ t('Nastavit hlídání cen.') }}</Heading>
    <p class="text-left mb-3">{{ t('Chci být informován') }}</p>
    <SfxForm @submit="onSubmit">
      <FormCheckbox
        v-if="!product.available"
        name="isAvailable"
        class="mb-3"
        :label="t('When the product is in stock')"
      />

      <FormCheckbox name="isPriceLower" class="mb-3" :label="t('When the price drops below')" />

      <FormInput
        name="email"
        type="email"
        :label="t('Email')"
        autocomplete="email"
        validators="required|email"
        class="text-left"
      />

      <div class="flex justify-end gap-4 mt-4">
        <Button type="button" outline @click="onClose">{{ t('Close') }}</Button>
        <Button type="submit" color="primary" data-cy="save">{{ t('Save') }}</Button>
      </div>
    </SfxForm>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '#ioc/atoms/Modal'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import useI18n from '#ioc/composables/useI18n'
import FormCheckbox from '#ioc/molecules/FormCheckbox'
import SfxForm from '#ioc/components/SfxForm'
import injectProduct from '#ioc/composables/injectProduct'

const { t } = useI18n()
const product = injectProduct()

const emit = defineEmits(['submit', 'close'])

const onSubmit = (data: any) => {
  emit('submit', { ...data })
}

const onClose = () => {
  emit('close')
}
</script>

<i18n lang="yaml">
cs-CZ:
  When the price drops below: Při snížení ceny pod
  When the product is in stock: Když bude produkt na skladě
  Save: Uložit
  Close: Zavřít
  Email: Email
</i18n>
