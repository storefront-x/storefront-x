<template>
  <ProductCarousel v-if="products.length" :products="products" />
</template>

<script>
import { defineComponent } from 'vue'
import useGetProductsByIds from '#ioc/services/useGetProductsByIds'
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbProducts from '#ioc/mixins/IsPbProducts'
import ProductCarousel from '#ioc/organisms/ProductCarousel'

export default defineComponent({
  components: {
    ProductCarousel,
  },

  mixins: [IsPbBlock, IsPbProducts],

  data: () => ({
    products: [],
  }),

  async mounted() {
    const getProductsByIds = useGetProductsByIds()
    const { products } = await getProductsByIds(this.skus)
    this.products = products
  },
})
</script>
