<template>
  <div v-if="!customer.isLoggedIn">
    <Link to="/" class="flex items-center px-2 py-0.5 mr-3 text-gray-400 hover:text-gray-500" data-cy="micro-account">
      <span class="sr-only">{{ t('My account') }}</span>
      <div class="rounded-lg border-2 p-2 border-none border-gray-100 lg:border-solid hover:bg-gray-100">
        <OutlineUser class="text-primary-500" />
      </div>
    </Link>

    <div v-if="submenu" class="flex flex-col font-semibold text-gray-800" data-cy="micro-account">
      <span>{{ t('Welcome') }}</span>
      <span class="flex items-center whitespace-nowrap lg:justify-end gap-4">
        <Link class="text-primary-500" :to="localePath('sign-in')">{{ t('Sign in') }}</Link>
        <span class="w-px border h-5 border-l-1 border-gray-300 text-bottom" />
        <Link class="text-primary-500" :to="localePath('sign-up')">{{ t('Sign up') }}</Link>
      </span>
    </div>
  </div>

  <div v-else class="flex flex-col font-semibold text-gray-800" data-cy="micro-account">
    <span class="whitespace-nowrap font-bold">{{ t('Welcome {0}', [customer.fullName]) }}</span>
    <span class="flex items-center whitespace-nowrap gap-4">
      <Link class="text-primary-500" :to="localePath('index')">{{ t('My account') }}</Link>
      <span class="w-px border h-5 border-l-1 border-gray-300 text-bottom" />
      <Link class="text-primary-500" data-cy="logout" href="javascript:void(0)" @click="onLogout">{{
        t('Logout')
      }}</Link>
    </span>
  </div>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import OutlineUser from '#ioc/icons/OutlineUser'
import useI18n from '#ioc/composables/useI18n'
import useLocalePath from '#ioc/composables/useLocalePath'
import useCustomer from '#ioc/composables/useCustomer'
import useRevokeCustomerToken from '#ioc/services/useRevokeCustomerToken'

defineProps({
  submenu: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()
const localePath = useLocalePath()
const customer = useCustomer()
const logout = useRevokeCustomerToken()

const onLogout = async () => {
  await logout()
}
</script>

<i18n lang="yaml">
cs-CZ:
  My account: Můj účet
  Logout: Odhlásit se
  Welcome: Vítejte
  Welcome {0}: Vítejte, {0}
  Sign in: Přihlásit
  Sign up: Registrovat
</i18n>
