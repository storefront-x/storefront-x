<template>
  <Modal @close="emit('close')">
    <Heading class="mb-4" :level="1">{{ t('Do you really wish to remove product?') }}</Heading>
    <h4 class="text-sm">
      {{ name }}
    </h4>
    <div class="flex flex-1 justify-between mt-10">
      <Button color="primary" data-cy="remove-modal-remove-button" @click.prevent="removeProduct">
        {{ t('Remove') }}
      </Button>
      <Button data-cy="remove-modal-keep-button" @click.prevent="keepProduct">
        {{ t('Keep') }}
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '#ioc/atoms/Modal'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'

defineProps({
  name: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['keep-product', 'remove-product', 'close'])

const { t } = useI18n()

const keepProduct = () => {
  emit('keep-product')
}

const removeProduct = () => {
  emit('remove-product')
}
</script>

<i18n lang="yaml">
cs-CZ:
  Remove: Odstranit
  Keep: Ponechat
  Do you really wish to remove product?: Opravdu si přejete odstranit tento produkt?
</i18n>
