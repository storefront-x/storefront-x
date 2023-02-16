import { computed, reactive } from 'vue'

export default (el: any) => {
  interface Type {
    type: 'carousel' | 'grid'
  }

  const skus = computed(() => {
    const els = Array.from(el.querySelectorAll('[data-product-sku]'))

    return els.map((form: any) => form.getAttribute('data-product-sku'))
  })

  const type = computed<Type>(() => el.getAttribute('data-appearance'))

  return reactive({
    skus,
    type,
  })
}
