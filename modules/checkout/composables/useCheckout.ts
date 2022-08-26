import { computed, reactive } from 'vue'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()

  const contactInformation = computed(() => checkoutStore.contactInformation)

  const agreements = computed(() => checkoutStore.agreements)

  return reactive({
    contactInformation,
    agreements,
  })
}
