<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <Container>
      <div class="py-10 md:py-20">
        <div class="grid md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
          <!-- Image section -->

          <!-- Sitemap sections -->
          <div
            class="mt-10 col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6"
          >
            <div
              class="grid grid-cols-1 whitespace-nowrap space-y-4 sm:space-y-0 sm:col-span-3 sm:grid-cols-3 sm:gap-x-40"
            >
              <div>
                <span class="border-gray-50 font-semibold text-gray-500 hidden sm:block">
                  {{ t('Useful information') }}
                </span>
                <Accordion
                  :icon-class="{ 'sm:hidden': true, 'display-block': true, 'ml-2': true, 'cursor-pointer': true }"
                  :heading-class="[
                    'border-gray-50',
                    'sm:justify-start',
                    'justify-center',
                    'sm:hidden',
                    'block',
                    'font-semibold',
                    'text-gray-500',
                  ]"
                  :content-class="['text-center', 'sm:text-left', 'mb-12', 'sm:mb-4']"
                  :open="true"
                >
                  <template #heading>
                    {{ t('Useful information') }}
                  </template>
                  <template #default>
                    <ul role="list" class="mt-6 pl-0 space-y-6 list-none">
                      <li class="text-sm">
                        <Link to="brands" color="gray">
                          {{ t('Brands') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link to="blog" color="gray">
                          {{ t('Blog') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('about-company')" color="gray">
                          {{ t('About us') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('contact-us')" color="gray">
                          {{ t('Contact') }}
                        </Link>
                      </li>
                    </ul>
                  </template>
                </Accordion>
              </div>

              <div>
                <span class="border-gray-50 font-semibold text-gray-500 hidden sm:block">
                  {{ t('Customer service') }}
                </span>
                <Accordion
                  :icon-class="{
                    'sm:hidden': true,
                    'display-block': true,
                    'ml-2': true,
                    'cursor-pointer': true,
                  }"
                  :heading-class="[
                    'border-gray-50',
                    'sm:justify-start',
                    'justify-center',
                    'sm:hidden',
                    'block',
                    'font-semibold',
                    'text-gray-500',
                  ]"
                  :content-class="['text-center', 'sm:text-left', 'mb-12', 'sm:mb-4']"
                  :open="true"
                >
                  <template #heading>
                    {{ t('Customer service') }}
                  </template>
                  <template #default>
                    <ul role="list" class="mt-6 pl-0 space-y-6 list-none">
                      <li class="text-sm">
                        <Link :to="t('shipping-and-payment')" color="gray">
                          {{ t('Shipping and payment') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('return-policy')" color="gray">
                          {{ t('Return policy') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('terms-of-service')" color="gray">
                          {{ t('Terms of service') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('privacy-policy')" color="gray">
                          {{ t('Privacy policy') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('cookies-policy')" color="gray">
                          {{ t('Cookies policy') }}
                        </Link>
                      </li>
                    </ul>
                  </template>
                </Accordion>
              </div>

              <div>
                <span class="border-gray-50 font-semibold text-gray-500 hidden sm:block">
                  {{ t('Account') }}
                </span>
                <Accordion
                  :icon-class="{ 'sm:hidden': true, 'display-block': true, 'ml-2': true, 'cursor-pointer': true }"
                  :heading-class="[
                    'border-gray-50',
                    'sm:justify-start',
                    'justify-center',
                    'sm:hidden',
                    'block',
                    'font-semibold',
                    'text-gray-500',
                  ]"
                  :content-class="['text-center', 'sm:text-left', 'mb-12', 'sm:mb-4']"
                  :open="true"
                >
                  <template #heading>
                    {{ t('Account') }}
                  </template>

                  <template #default>
                    <ul role="list" class="mt-6 pl-0 space-y-6 list-none">
                      <li class="text-sm">
                        <Link :to="t('sign-in')" color="gray">
                          {{ t('Sign in') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('sign-up')" color="gray">
                          {{ t('Sign up') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('account')" color="gray">
                          {{ t('Settings') }}
                        </Link>
                      </li>

                      <li class="text-sm">
                        <Link :to="t('account/orders')" color="gray">
                          {{ t('My orders') }}
                        </Link>
                      </li>
                    </ul>
                  </template>
                </Accordion>
              </div>
            </div>
          </div>

          <Newsletter />
        </div>
      </div>
      <div
        class="flex items-center lg:items-baseline text-gray-500 font-moderate flex-col lg:flex-row space-y-12 justify-between border-t-2 py-10 lg:py-20"
      >
        <div>
          <RouterLink to="/">
            <span class="sr-only">Logo</span>
            <img class="h-6 w-auto" :src="logo" alt="Logo" loading="lazy" />
          </RouterLink>
        </div>

        <div class="text-center">Copyright &copy; 2013-2022 Magento, Inc. All rights reserved.</div>

        <BackToTop />
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Link from '#ioc/atoms/Link'
import Accordion from '#ioc/atoms/Accordion'
import BackToTop from '#ioc/molecules/BackToTop'
import Newsletter from '#ioc/molecules/Newsletter'
import useI18n from '#ioc/composables/useI18n'
import logo from '#ioc/assets/logo'

const { t } = useI18n()
</script>

<i18n lang="yaml">
cs-CZ:
  Useful information: Užitečné informace
  Brands: Značky
  Blog: Blog
  About us: O nás
  Contact: Kontakt
  Customer service: Zákaznický servis
  Shipping and payment: Doprava a platba
  Return policy: Vrácení zboží
  Terms of service: Obchodní podmínky
  Privacy policy: Ochrana osobních údajů
  Cookies policy: Zásady souborů cookie
  Sign up: Registrovat
  Sign in: Přihlásit se
  Settings: Nastavení
  My orders: Moje objednávky
  Account: Účet

  terms-of-service: obchodni-podminky
  about-company: o-spolecnosti
  return-policy: vraceni-zbozi
  contact-us: kontakt
  shipping-and-payment: doprava-a-platba
  privacy-policy: ochrana-osobnich-udaju
  cookies-policy: zasady-souboru-cookies
  sign-up: registrovat
  sign-in: prihlasit
  account: account
  account/orders: ucet/objednavky
</i18n>
