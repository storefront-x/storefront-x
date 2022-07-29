<template>
  <Container class="flex max-w-6xl md:justify-between pt-2">
    <div class="hidden md:flex space-x-4">
      <Link :href="telHref">{{ CONTACT_TELEPHONE }}</Link>
      <Link :href="emailHref">{{ CONTACT_EMAIL }}</Link>
    </div>

    <div class="flex space-x-4 flex-grow justify-between md:justify-end">
      <Link :to="localePath('/')">{{ t('Back to shopping') }}</Link>
      <Link :to="customerLink">{{ customerText }}</Link>
    </div>
  </Container>

  <div class="flex justify-center bg-white border-b-2 border-primary-400">
    <RouterLink :to="localePath('/')" class="p-8 lg:p-16">
      <img :src="logo" alt="Logo" class="h-16 w-auto" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import Container from '#ioc/atoms/Container'
import CONTACT_EMAIL from '#ioc/config/CONTACT_EMAIL'
import CONTACT_TELEPHONE from '#ioc/config/CONTACT_TELEPHONE'
import useI18n from '#ioc/composables/useI18n'
import logo from '#ioc/assets/logo'
import useLocalePath from '#ioc/composables/useLocalePath'
import useCustomer from '#ioc/composables/useCustomer'
import { computed } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
const customer = useCustomer()

const emailHref = computed(() => 'mailto:' + CONTACT_EMAIL)
const telHref = computed(() => 'tel:' + CONTACT_TELEPHONE.replace(/ +/, ''))

const customerLink = computed(() => {
  if (customer.isLoggedIn) {
    return localePath('/')
  } else {
    return localePath('sign-in')
  }
})

const customerText = computed(() => {
  if (customer.isLoggedIn) {
    return customer.fullName
  } else {
    return t('Sign in')
  }
})
</script>

<i18n lang="yaml">
cs-CZ:
  'Back to shopping': 'Zpět do obchodu'
  'Sign in': 'Přihlásit se'
</i18n>
