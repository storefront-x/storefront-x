<template>
  <Dropdown id="sort" to-left data-cy="sort" class="lg:border lg:border-gray-200 lg:px-4 lg:py-2 lg:rounded-md">
    <template #title>
      <svg
        width="21"
        height="17"
        viewBox="0 0 21 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 lg:hidden"
      >
        <path
          d="M11.3438 2.625H13.0312C13.4883 2.625 13.8398 2.27344 13.8398 1.78125C13.8398 1.32422 13.4883 0.9375 13.0312 0.9375H11.3438C10.8516 0.9375 10.5 1.32422 10.5 1.78125C10.5 2.27344 10.8516 2.625 11.3438 2.625ZM11.3438 7.125H15.2461C15.7031 7.125 16.0898 6.77344 16.0898 6.28125C16.0898 5.82422 15.7031 5.4375 15.2461 5.4375H11.3438C10.8516 5.4375 10.5 5.82422 10.5 6.28125C10.5 6.77344 10.8516 7.125 11.3438 7.125ZM19.7461 14.4375H11.3438C10.8516 14.4375 10.5 14.8242 10.5 15.2812C10.5 15.7734 10.8516 16.125 11.3438 16.125H19.7461C20.2031 16.125 20.5898 15.7734 20.5898 15.2812C20.5898 14.8242 20.2383 14.4375 19.7461 14.4375ZM11.3438 11.625H17.4961C17.9531 11.625 18.3398 11.2734 18.3398 10.7812C18.3398 10.3242 17.9531 9.9375 17.4961 9.9375H11.3438C10.8516 9.9375 10.5 10.3242 10.5 10.7812C10.5 11.2734 10.8516 11.625 11.3438 11.625ZM7.61719 11.0625L5.71875 13.1367V1.25391C5.71875 0.761719 5.33203 0.375 4.875 0.375C4.38281 0.375 4.03125 0.761719 4.03125 1.25391V13.1367L2.09766 11.0625C1.92188 10.8867 1.71094 10.8164 1.5 10.8164C1.28906 10.8164 1.07812 10.8867 0.902344 11.0273C0.550781 11.3438 0.550781 11.8711 0.867188 12.2227L4.20703 15.8789C4.52344 16.2305 5.12109 16.2305 5.4375 15.8789L8.77734 12.2227C9.09375 11.8711 9.09375 11.3438 8.74219 11.0273C8.46094 10.7109 7.93359 10.7461 7.61719 11.0625Z"
          fill="#FF6700"
        />
      </svg>

      {{ t('sort_by', [title]) }}
    </template>
    <template #default="{ close }">
      <DropdownItem
        :to="{ query: { ...route.query, sort: undefined, page: undefined }, params: { savePosition: true } }"
        @click="close"
      >
        {{ t('Best match') }}
      </DropdownItem>

      <DropdownItem
        :to="{ query: { ...route.query, sort: 'price,ASC', page: undefined }, params: { savePosition: true } }"
        data-cy="sort-price-ASC"
        @click="close"
      >
        {{ t('Price: Low to High') }}
      </DropdownItem>

      <DropdownItem
        :to="{ query: { ...route.query, sort: 'price,DESC', page: undefined }, params: { savePosition: true } }"
        data-cy="sort-price-DESC"
        @click="close"
      >
        {{ t('Price: High to Low') }}
      </DropdownItem>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from '#ioc/atoms/Dropdown'
import DropdownItem from '#ioc/atoms/DropdownItem'
import useI18n from '#ioc/composables/useI18n'
import useRoute from '#ioc/composables/useRoute'

const { t } = useI18n()
const route = useRoute()

defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Best match: Nejlepší shoda
  'Price: Low to High': Od nejlevnějších
  'Price: High to Low': Od nejdražších
  'sort_by': 'Řadit dle: {0}'
en-US:
  'sort_by': 'Sort by: {0}'
</i18n>
