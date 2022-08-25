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

  const middleName = computed(() => customerStore.customer?.middleName)

  const suffix = computed(() => customerStore.customer?.suffix)

  const prefix = computed(() => customerStore.customer?.prefix)

  const isSubscribed = computed(() => customerStore.customer?.isSubscribed)

  const gender = computed(() => customerStore.customer?.gender)

  return reactive({
    isLoggedIn,
    firstName,
    lastName,
    fullName,
    title,
    email,
    salutationId,
    salutation,
    middleName,
    suffix,
    prefix,
    isSubscribed,
    gender,
  })
}
