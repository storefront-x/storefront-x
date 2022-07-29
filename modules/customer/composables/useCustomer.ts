import useCustomerStore from '#ioc/stores/useCustomerStore'
import { computed, reactive } from 'vue'

export default () => {
  const customerStore = useCustomerStore()

  const isLoggedIn = computed(() => !!customerStore.customer)

  const firstName = computed(() => customerStore.customer?.firstName)

  const lastName = computed(() => customerStore.customer?.lastName)

  const fullName = computed(() => firstName.value + ' ' + lastName.value)

  return reactive({
    isLoggedIn,
    firstName,
    lastName,
    fullName,
  })
}
