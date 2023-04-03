<template>
  <div class="bg-grey-555 border-b border-grey-565 mb-4 hidden lg:block">
    <Container class="flex items-center justify-between h-[35px]">
      <div class="flex items-center space-x-6">
        <div v-for="(pageLink, indexChild) in pageLinkHeader" :key="indexChild" class="text-sm">
          <Link :to="pageLink.path" color="blue" class="font-semibold">
            {{ t(pageLink.label) }}
          </Link>
        </div>
      </div>

      <div class="flex items-center space-x-6">
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

        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" width="24" height="24">
            <clipPath id="t">
              <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
            </clipPath>
            <path d="M0,0v30h50v-30z" fill="#012169" />
            <path d="M0,0 50,30M50,0 0,30" stroke="#fff" stroke-width="6" />
            <path d="M0,0 50,30M50,0 0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4" />
            <path d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z" fill="#C8102E" stroke="#FFF" stroke-width="2" />
          </svg>

          <SfxStoreSwitcher v-slot="{ currentStore }">
            <div class="pl-2">{{ currentStore?.fullName }}</div>
          </SfxStoreSwitcher>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import SfxCurrencySwitcher from '#ioc/components/SfxCurrencySwitcher'
import Container from '#ioc/atoms/Container'
import Link from '#ioc/atoms/Link'
import Dropdown from '#ioc/atoms/Dropdown'
import DropdownItem from '#ioc/atoms/DropdownItem'
import SfxStoreSwitcher from '#ioc/components/SfxStoreSwitcher'
import useLocalePath from '#ioc/composables/useLocalePath'
import useI18n from '#ioc/composables/useI18n'

const localePath = useLocalePath()
const { t } = useI18n()

const pageLinkHeader = [
  { label: 'Home', path: localePath(t('/contact')) },
  { label: 'Contact', path: localePath(t('/contact')) },
  { label: 'Map', path: localePath(t('/contact')) },
  { label: 'Career', path: localePath(t('/contact')) },
  { label: 'Assistance', path: localePath(t('/contact')) },
]
</script>
