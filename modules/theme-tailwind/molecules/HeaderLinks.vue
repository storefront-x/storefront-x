<template>
  <Container class="hidden lg:flex items-center justify-between h-10">
    <div class="flex items-center space-x-6">
      <Link href="mailto:CONTACT_EMAIL" color="gray">{{ CONTACT_EMAIL }}</Link>
    </div>

    <div class="flex items-center space-x-6">
      <Link :to="localePath('brands')" color="gray">{{ t('Brands') }}</Link>
      <Link :to="localePath('blog')" color="gray">{{ t('Blog') }}</Link>

      <SfxCurrencySwitcher v-slot="{ currentCurrency, currencies, loadingCurrency, setCurrency }">
        <Dropdown
          link-like
          :title="currentCurrency?.code"
          :is-disabled="loadingCurrency"
          class="text-gray-600 hover:text-gray-800"
          data-cy="currency-switcher"
        >
          <DropdownItem
            v-for="currency in currencies"
            :key="currency.code"
            href="javascript:void(0)"
            @click="setCurrency(currency)"
          >
            {{ currency.code }}
          </DropdownItem>
        </Dropdown>
      </SfxCurrencySwitcher>

      <SfxStoreSwitcher v-slot="{ stores, currentStore, switchToStore }">
        <Dropdown
          link-like
          :title="currentStore?.fullName"
          :to-left="true"
          class="text-gray-600 hover:text-gray-800"
          data-cy="store-switcher"
        >
          <DropdownItem v-for="store in stores" :key="store.name" @click="switchToStore(store)">
            {{ store.fullName }}
          </DropdownItem>
        </Dropdown>
      </SfxStoreSwitcher>
    </div>
  </Container>
</template>

<script setup lang="ts">
import CONTACT_EMAIL from '#ioc/config/CONTACT_EMAIL'
import SfxCurrencySwitcher from '#ioc/components/SfxCurrencySwitcher'
import Container from '#ioc/atoms/Container'
import Link from '#ioc/atoms/Link'
import Dropdown from '#ioc/atoms/Dropdown'
import DropdownItem from '#ioc/atoms/DropdownItem'
import useI18n from '#ioc/composables/useI18n'
import useLocalePath from '#ioc/composables/useLocalePath'
import SfxStoreSwitcher from '#ioc/components/SfxStoreSwitcher'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
cs-CZ:
  Brands: Značky
  Blog: Blog
</i18n>
