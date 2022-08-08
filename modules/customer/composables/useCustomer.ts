import useCustomerStore from '#ioc/stores/useCustomerStore'
import { computed, reactive } from 'vue'

export default () => {
  const customerStore = useCustomerStore()

  const isLoggedIn = computed(() => !!customerStore.customer)

  const firstName = computed(() => customerStore.customer?.firstName)

  const lastName = computed(() => customerStore.customer?.lastName)

  const title = computed(() => customerStore.customer?.title)

  const email = computed(() => customerStore.customer?.email)

  const salutationId = computed(() => customerStore.customer?.salutationId)

  const salutation = computed(() => customerStore.customer?.salutation)

  const fullName = computed(() => firstName.value + ' ' + lastName.value)

  return reactive({
    isLoggedIn,
    firstName,
    lastName,
    fullName,
    title,
    email,
    salutationId,
    salutation,
  })
}
