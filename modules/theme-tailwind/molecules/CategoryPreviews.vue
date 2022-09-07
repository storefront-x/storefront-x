<template>
  <div class="mx-auto">
    <div class="sm:flex sm:items-baseline sm:justify-between">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">{{ t('shopby') }}</h2>
      <RouterLink
        :to="localePath('brands')"
        class="hidden text-sm font-semibold text-primary-600 hover:text-primary-700 sm:block"
      >
        {{ t('browse') }}
        <span aria-hidden="true"> &rarr;</span>
      </RouterLink>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
      <div
        v-if="categories.length > 0"
        class="group aspect-[2/1] rounded-lg overflow-hidden relative sm:aspect-auto sm:row-span-2"
      >
        <SfxImage
          :src="categories[0].imageUrl"
          class-img="object-center object-cover group-hover:opacity-75 w-full h-full"
          :width="736"
          :height="736"
          :alt="categories[0].name"
        />

        <div
          aria-hidden="true"
          class="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0 absolute inset-0"
        />

        <div class="p-6 flex items-end absolute inset-0">
          <div>
            <h3 class="font-semibold text-white">
              <a :href="categories[0].urlPath" class="text-white">
                <span class="absolute inset-0"></span>
                {{ categories[0].name }}
              </a>
            </h3>
            <p aria-hidden="true" class="mt-1 text-sm text-white">
              {{ t('shop') }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="categories.length > 1"
        class="group aspect-[2/1] rounded-lg overflow-hidden relative sm:aspect-none sm:h-full"
      >
        <SfxImage
          :src="categories[1].imageUrl"
          class-img="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
          :width="736"
          :height="352"
          :alt="categories[1].name"
        />

        <div aria-hidden="true" class="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0" />

        <div class="p-6 flex items-end absolute inset-0">
          <div>
            <h3 class="font-semibold text-white">
              <a :href="categories[1].urlPath" class="text-white">
                <span class="absolute inset-0"></span>
                {{ categories[1].name }}
              </a>
            </h3>
            <p aria-hidden="true" class="mt-1 text-sm text-white">
              {{ t('shop') }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="categories.length > 2"
        class="group aspect-[2/1] rounded-lg overflow-hidden relative sm:aspect-none sm:h-full"
      >
        <SfxImage
          :src="categories[2].imageUrl"
          class-img="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
          :width="736"
          :height="352"
          :alt="categories[2].name"
        />

        <div aria-hidden="true" class="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0" />

        <div class="p-6 flex items-end absolute inset-0">
          <div>
            <h3 class="font-semibold text-white">
              <a :href="categories[2].urlPath" class="text-white">
                <span class="absolute inset-0"></span>
                {{ categories[2].name }}
              </a>
            </h3>
            <p aria-hidden="true" class="mt-1 text-sm text-white">
              {{ t('shop') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 sm:hidden">
      <RouterLink
        :to="localePath('brands')"
        class="block text-sm font-semibold text-primary-600 hover:text-primary-500"
      >
        {{ t('browse') }}
        <span aria-hidden="true"> &rarr;</span></RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import useGetNavigationMenu from '#ioc/services/useGetNavigationMenu'
import SfxImage from '#ioc/components/SfxImage'
import useAsyncData from '#ioc/composables/useAsyncData'
import useLocalePath from '#ioc/composables/useLocalePath'
import { computed } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
const getNavigationMenu = useGetNavigationMenu()
const { data } = await useAsyncData('previews', () => getNavigationMenu())

const categories = computed(() => {
  return data.value.categories.slice(0, 3)
})
</script>

<i18n lang="yaml">
cs-CZ:
  browse: 'Prohlížet značky'
  shop: 'Nakupovat nyní'
  shopby: 'Nejoblíbenější kategorie'
en-US:
  browse: All brands
  shop: Show now
  shopby: Top categories
</i18n>
