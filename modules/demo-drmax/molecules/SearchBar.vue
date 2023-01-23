<template>
  <form class="relative flex-grow" @submit.prevent="onSubmit">
    <div class="w-full relative">
      <img :src="searchLogo" alt="search icon" class="w-[14px] h-[14px] absolute left-0 top-0 m-[18px_0_12px_12px]" />

      <Input
        v-click-outside="close"
        :value="query"
        class="search"
        :placeholder="mobile ? t('Search') : t('Search for the name of product, category or brand')"
        autocomplete="off"
        @input="onInput"
        @click="search"
        @keydown.esc="close"
      />
      <button
        v-if="query"
        type="button"
        class="absolute right-0 inset-y-0 pr-4 text-gray-400 hover:text-primary-400"
        @click="clear"
      >
        <SolidX />
      </button>
    </div>

    <div v-if="results?.length" class="absolute py-2 my-2 bg-white shadow-md rounded-md w-full flex flex-col z-20">
      <div v-if="!results.length" class="p-2">{{ t('No results found') }}</div>

      <ProductProvider v-for="product in results" :key="product.id" :product="product">
        <SearchBarResult @click="close" />
      </ProductProvider>
    </div>

    <button
      type="submit"
      title="search"
      class="hidden md:block h-[50px] font-bold no-underline uppercase absolute top-0 right-0 border-none py-[6px] px-[12px] text-blue-560"
    >
      {{ 'Hledej' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import Input from '#ioc/atoms/Input'
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
import searchLogo from '#ioc/assets/images/search'

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
  Search for the name of product, category or brand: Zadejte název produktu, značku nebo zdravotní problém
  No results found: Žádné výsledky nenalezeny
</i18n>

<style scoped>
.search {
  box-shadow: inset 0 5px 5px 0 hsl(0deg 0% 86% / 86%);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  @apply bg-white text-grey-555 block w-full font-normal h-[50px] pr-[70px] pl-[36px] rounded-[7px] bg-clip-padding leading-[18px] border-grey-560 py-[6px] px-[10px] text-base;
}

.search:focus {
  box-shadow: inset 0 5px 5px 0 rgb(0 120 190 / 16%);
  @apply outline-0 bg-white border-blue-560;
}
</style>
