<template>
  <Modal wrapper-classes="p-5">
    <Heading class="mb-4" :level="1">{{ t('Do you really wish to remove product?') }}</Heading>
    <h4 class="text-sm">
      {{ product.name }}
    </h4>
    <div class="flex flex-1 justify-center space-x-8 mt-10">
      <Button color="primary" data-cy="confirm-removal-remove" @click.prevent="removeProduct">
        {{ t('Remove') }}
      </Button>
      <Button data-cy="confirm-removal-keep" @click.prevent="keepProduct">
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
import useBlockBodyFromScrolling from '#ioc/composables/useBlockBodyFromScrolling'
import usePushGtmRemoveFromCart from '#ioc/services/usePushGtmRemoveFromCart'

const { t } = useI18n()
const emit = defineEmits(['keep-product', 'remove-product'])

useBlockBodyFromScrolling()

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
  quantity: {
    type: Number,
    default: 1,
  },
})

const pushGtmRemoveFromCart = usePushGtmRemoveFromCart()

const keepProduct = () => {
  emit('keep-product')
}

const removeProduct = () => {
  pushGtmRemoveFromCart(props.product, props.quantity)
  emit('remove-product')
}
</script>

<i18n lang="yaml">
cs-CZ:
  Remove: Odstranit
  Keep: Ponechat
  Do you really wish to remove product?: Opravdu si přejete odstranit tento produkt?
sl-SI:
  Do you really wish to remove product?: Ali res želite odstraniti izdelek?
  Remove: Odstrani
  Keep: Obdrži
hr-HR:
  Do you really wish to remove product?: Jeste li sigurni da želite ukloniti proizvod?
  Remove: Ukloniti
  Keep: Zadrži
sk-SK:
  Remove: Odstrániť
  Keep: Ponechať
  Do you really wish to remove product?: Naozaj chcete odstrániť tento produkt?
</i18n>
