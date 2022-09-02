<template>
  <ProductCarousel v-if="products.length" :products="products" />
</template>

<script>
import { defineComponent } from 'vue'
import useGetProductsByIds from '#ioc/services/useGetProductsByIds'
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbProducts from '#ioc/mixins/IsPbProducts'
import ProductCarousel from '#ioc/organisms/ProductCarousel'
import usePbProducts from '#ioc/composables/usePbProducts'
import useAsyncData from '#ioc/composables/useAsyncData'

export default defineComponent({
  components: {
    ProductCarousel,
  },

  mixins: [IsPbBlock, IsPbProducts],

  async setup(props) {
    const pbProducts = usePbProducts(props.el)
    const getProductsByIds = useGetProductsByIds()
    const { data } = await useAsyncData('carouselProduct', () => getProductsByIds(pbProducts.skus))

    return {
      products: data.value.products,
    }
  },
})
</script>
