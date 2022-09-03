import { computed, reactive } from 'vue'

export default (el: any) => {
  const skus = computed(() => {
    const els = Array.from(el.querySelectorAll('[data-product-sku]'))

    return els.map((form: any) => form.getAttribute('data-product-sku'))
  })

  return reactive({
    skus,
  })
}
