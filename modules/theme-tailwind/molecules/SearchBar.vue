<template>
  <form class="relative flex-grow" @submit.prevent="onSubmit">
    <Input
      v-click-outside="close"
      :value="query"
      class="w-3/4 h-12 placeholder-truncate pr-12"
      :placeholder="mobile ? t('Search') : t('Search for the name of produt, category or brand')"
      autocomplete="off"
      @input="onInput"
      @click="search"
      @keydown.esc="close"
    />

    <button
      v-if="query"
      type="button"
      class="absolute inset-y-0 left-2/3 px-4 text-gray-400 hover:text-primary-400"
      @click="clear"
    >
      <SolidX />
    </button>

    <div v-if="results?.length" class="absolute py-2 my-2 bg-white shadow-md rounded-md w-full flex flex-col z-20">
      <div v-if="!results.length" class="p-2">{{ t('No results found') }}</div>

      <ProductProvider v-for="product in results" :key="product.id" :product="product">
        <SearchBarResult />
      </ProductProvider>
    </div>

    <button
      type="submit"
      title="search"
      class="absolute bg-primary-500 flex items-center justify-center rounded-lg h-12 w-12 inset-y-0 left-3/4 ml-2 p-2 align-middle text-gray-400 hover:text-primary-400"
    >
      <SolidSearch class="text-white h-6 w-6" />
    </button>
  </form>
</template>

<script setup lang="ts">
import Input from '#ioc/atoms/Input'
import SolidSearch from '#ioc/icons/SolidSearch'
import SolidX from '#ioc/icons/SolidX'
import ProductProvider from '#ioc/providers/ProductProvider'
import useI18n from '#ioc/composables/useI18n'
import SearchBarResult from '#ioc/molecules/SearchBarResult'
import useRouter from '#ioc/composables/useRouter'
import useGetSearchSuggestions from '#ioc/services/useGetSearchSuggestions'
import ToProduct from '#ioc/mappers/ToProduct'
import vClickOutside from '#ioc/directives/vClickOutside'
import useLocalePath from '#ioc/composables/useLocalePath'
import debounce from '#ioc/utils/debounce'
import { ref, watch } from 'vue'

defineProps({
  mobile: {
    type: Boolean,
  },
})

const router = useRouter()
const { t } = useI18n()
const localePath = useLocalePath()
const getSearchSuggestions = useGetSearchSuggestions()

const query = ref('')
const results = ref<ReturnType<typeof ToProduct>[]>([])

const search = async () => {
  if (!query.value || query.value.length < 2) return
  const { products } = await getSearchSuggestions({ search: query.value })
  results.value = products
}

watch(query, debounce(search, 250))

const clear = () => {
  query.value = ''
  close()
}

const close = () => {
  if (results?.value) {
    results.value.length = 0
  }
}

const onInput = (e: Event) => {
  query.value = e.target.value
}

const onSubmit = () => {
  if (!query.value || query.value.length < 2) return
  router.push(
    localePath({
      name: 'search',
      query: {
        query: query.value,
      },
    }),
  )
}
</script>

<i18n lang="yaml">
cs-CZ:
  Search: Hledej
  Search for the name of produt, category or brand: Zadejte název produktu, kategorii nebo značku
  No results found: Žádné výsledky nenalezeny
</i18n>
