export default {
  computed: {
    skus() {
      const els = Array.from(this.el.querySelectorAll('[data-product-sku]'))

      return els.map((form) => form.getAttribute('data-product-sku'))
    },
  },
}
