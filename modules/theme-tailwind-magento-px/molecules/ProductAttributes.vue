<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md sm:rounded-lg">
          <table class="min-w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  {{ t('Name') }}
                </th>
                <th
                  scope="col"
                  class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="attribute in product.attributes"
                :key="attribute.code"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ attribute.label }}
                </td>
                <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                  {{ attribute.valueLabel }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import injectProduct from '#ioc/composables/injectProduct'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()

const product = injectProduct()
</script>

<i18n lang="yaml">
cs-CZ:
  Name: Název
</i18n>
