import { computed, reactive } from 'vue'

export default (el: HTMLElement) => {
  const skus = computed(() => {
    const els = Array.from(el.querySelectorAll('[data-product-sku]'))

    return els.map((form: any) => form.getAttribute('data-product-sku'))
  })

  const type = computed(() => el.getAttribute('data-appearance') as 'carousel' | 'grid')

  return reactive({
    skus,
    type,
  })
}
