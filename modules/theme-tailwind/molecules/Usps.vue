<template>
  <div class="bg-white">
    <div class="mx-auto">
      <div class="bg-gray-50 rounded-lg px-6 py-16 sm:p-10">
        <div class="max-w-xl mx-auto lg:max-w-none">
          <div class="text-center">
            <Heading :level="2" class="mb-2">
              {{ t('title') }}
            </Heading>
            <p>{{ t('subtitle') }}</p>
          </div>
          <div class="mt-12 max-w-sm mx-auto grid grid-cols-1 gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
            <Usp v-for="usp in usps" :key="usp.id" :usp="usp"></Usp>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import useI18n from '#ioc/composables/useI18n'
import Usp from '#ioc/atoms//Usp'
import { defineProps } from 'vue'

const { t } = useI18n()

defineProps({
  usps: {
    required: true,
    type: Array,
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  title: 'Rychlost znamená váš růst'
  subtitle: 'StoreFront X předčí podobné produkty ve všech metrikách Lighthouse Performance Score.'
en-US:
  title: 'Speed is the key for your growth'
  subtitle: 'StoreFront X framework outperforms similar products in all Lighthouse Performance Score metrics.'
</i18n>
