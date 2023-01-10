<template>
  <Container class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
    <aside class="py-6 lg:col-span-3">
      <nav class="space-y-1">
        <RouterLink
          v-slot="{ isExactActive }"
          :to="localePath('account')"
          class="group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          exact-active-class="bg-primary-50 border-primary-500 text-primary-700 hover:bg-primary-50 hover:text-primary-700"
          exact-inactive-class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900"
        >
          <OutlineUser
            class="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            :class="
              isExactActive
                ? 'text-primary-500 group-hover:text-primary-500'
                : 'text-gray-400 group-hover:text-gray-500'
            "
            aria-hidden="true"
          />

          <span class="truncate">
            {{ t('Account') }}
          </span>
        </RouterLink>

        <RouterLink
          v-slot="{ isExactActive }"
          :to="localePath('account/orders')"
          class="group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          exact-active-class="bg-primary-50 border-primary-500 text-primary-700 hover:bg-primary-50 hover:text-primary-700"
          exact-inactive-class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900"
        >
          <OutlineShoppingBag
            aria-hidden="true"
            class="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            :class="
              isExactActive
                ? 'text-primary-500 group-hover:text-primary-500'
                : 'text-gray-400 group-hover:text-gray-500'
            "
          />

          <span class="truncate">
            {{ t('Previous orders') }}
          </span>
        </RouterLink>

        <RouterLink
          v-slot="{ isExactActive }"
          :to="localePath('account/addresses')"
          class="group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          exact-active-class="bg-primary-50 border-primary-500 text-primary-700 hover:bg-primary-50 hover:text-primary-700"
          exact-inactive-class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900"
        >
          <OutlineHomeIcon
            class="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            :class="
              isExactActive
                ? 'text-primary-500 group-hover:text-primary-500'
                : 'text-gray-400 group-hover:text-gray-500'
            "
            aria-hidden="true"
          />

          <span class="truncate">
            {{ t('Addresses') }}
          </span>
        </RouterLink>

        <RouterLink
          v-slot="{ isExactActive }"
          :to="localePath('account/downloadable')"
          class="group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          exact-active-class="bg-primary-50 border-primary-500 text-primary-700 hover:bg-primary-50 hover:text-primary-700"
          exact-inactive-class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900"
        >
          <OutlineDocumentDownloadIcon
            class="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            :class="
              isExactActive
                ? 'text-primary-500 group-hover:text-primary-500'
                : 'text-gray-400 group-hover:text-gray-500'
            "
            aria-hidden="true"
          />

          <span class="truncate">
            {{ t('Downloadable products') }}
          </span>
        </RouterLink>

        <Link
          class="group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          exact-inactive-class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900"
          href="javascript:void(0)"
          color="gray"
          @click="onLogout"
        >
          <OutlineLogoutIcon
            aria-hidden="true"
            class="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
          />

          <span class="truncate">
            {{ t('Logout') }}
          </span>
        </Link>
      </nav>
    </aside>

    <div class="py-6 lg:p-6 lg:pb-8 lg:col-span-9">
      <slot></slot>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import OutlineLogoutIcon from '#ioc/icons/OutlineLogoutIcon'
import OutlineHomeIcon from '#ioc/icons/OutlineHomeIcon'
import OutlineDocumentDownloadIcon from '#ioc/icons/OutlineDocumentDownloadIcon'
import OutlineShoppingBag from '#ioc/icons/OutlineShoppingBag'
import OutlineUser from '#ioc/icons/OutlineUser'
import useLocalePath from '#ioc/composables/useLocalePath'
import Link from '#ioc/atoms/Link'
import useI18n from '#ioc/composables/useI18n'
import useLogoutCustomer from '#ioc/services/useLogoutCustomer'

const localePath = useLocalePath()
const { t } = useI18n()
const logout = useLogoutCustomer()

const onLogout = async () => {
  await logout()
}
</script>

<i18n lang="yaml">
cs-CZ:
  Account: Účet
  Previous orders: Předchozí objednávky
  Addresses: Adresy
  Downloadable products: Stahovatelné produkty
  Logout: Odhlásit se
</i18n>
