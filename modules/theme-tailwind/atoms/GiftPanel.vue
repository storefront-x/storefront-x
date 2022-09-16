<template>
  <div class="border-t border-b divide-y divide-gray-100 mt-8 mb-2">
    <div class="flex row py-4">
      <img :src="src" alt="Gift" class="h-16 w-auto mr-3" />
      <div class="block">
        <p class="font-medium text-gray-500 text-xl mt-3 mb-2">{{ t('free_gift') }}</p>
        <div>
          <SfxMoney v-slot="{ html }" :money="freeShippingConfig.limit">
            <span v-html="t('purchase_limit', [html])" />
          </SfxMoney>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import useI18n from '#ioc/composables/useI18n'
import useFreeShippingConfig from '#ioc/composables/useFreeShippingConfig'

const src = '/images/gift_image.svg'

const { t } = useI18n()
const freeShippingConfig = useFreeShippingConfig()
</script>

<i18n lang="yaml">
en-US:
  'free_gift': 'Free gift'
  'purchase_limit': 'Get free shipping with purchase over <strong>{0}</strong>.'

cs-CZ:
  'free_gift': 'Dárek k nákupu'
  'purchase_limit': 'K nákupu nad <strong>{0}</strong> získáte doručení zdarma!'
</i18n>
