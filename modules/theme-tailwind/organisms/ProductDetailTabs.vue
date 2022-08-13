<template>
  <div class="w-full my-5 flex text-md md:text-lg lg:text:xlg">
    <MenuTab
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :classes="{
        'text-primary-500 border-primary-500 bg-slate-50': selected == tab.component,
        'text-inherit': selected != tab.component,
      }"
      @click="selected = tab.component"
      >{{ t(tab.name) }}
    </MenuTab>
    <span class="pb-2 border-b-2 grow" />
  </div>
  <section class="px-0">
    <component :is="selected" class="sm:px-0 links" />
  </section>
</template>

<script>
import MenuTab from '#ioc/atoms/MenuTab'
import { defineComponent } from 'vue'
import ProductDetail from '#ioc/molecules/ProductDetailDescription'
import injectProduct from '#ioc/composables/injectProduct'
import useI18n from '#ioc/composables/useI18n'

export default defineComponent({
  components: {
    ProductDetail,
    MenuTab,
  },

  setup() {
    const product = injectProduct()
    const { t } = useI18n()

    return {
      t,
      product,
    }
  },

  data: () => ({
    selected: 'ProductDetail',
    tabs: [
      {
        name: 'Detail',
        component: 'ProductDetail',
      },
    ],
  }),
})
</script>

<i18n lang="yaml">
cs-CZ:
  Detail: Detaily
  Parameters: Parametry
  Reviews: Hodnocení
  FAQ: FAQ
</i18n>
