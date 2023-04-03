<template>
  <footer>
    <div class="bg-primary-565">
      <Container>
        <div class="flex flex-wrap">
          <div class="py-[50px] basis-full lg:basis-1/2">
            <div class="text-center mb-8">
              <h3 class="text-grey-585 m-0 mb-2 text-[19px] leading-[24px] font-semibold">
                {{ t('Do you need some advice?') }}
              </h3>
              <p class="text-grey-585 m-0 leading-[13px]">{{ t('The Prague Airport Team is here for you.') }}</p>
            </div>

            <div class="block lg:flex">
              <div class="flex items-center basis-1/2 mb-4 lg:mb-0">
                <div class="inline-block rounded-full bg-primary-575 p-4 text-primary-555 z-10">
                  <svg viewBox="0 0 256 256" width="26" height="24" fill="currentColor">
                    <path
                      d="M128,13.6c-70.6,0-128,50.7-128,113c0,24.6,9.2,48.7,26,68.3c-3.5,7.7-5.2,19.6-20.5,28.6c-3.5,2.2-5.1,6.3-4.2,10.4 c0.9,4,4.1,6.9,8.2,7.5c4,0.6,10.7,1.9,19.3-0.3c14.8-3.7,24.1-10,33.3-17.6c19.9,10.6,42.7,16.2,66,16.2c70.6,0,128-50.7,128-113 S198.7,13.6,128,13.6z M125,193.2c-7.3,0-12.9-5.8-12.9-13.1V180c0-7.3,5.6-13.2,12.9-13.2c7.3,0,13.2,5.9,13.2,13.2 S132.3,193.2,125,193.2z M147.1,132c-3.2,2.7-9.3,7.7-9.3,9.5c0.1,7.3-5.8,13.1-13.1,13.1c0,0-0.1,0-0.1,0 c-7.2,0-13.1-5.6-13.2-12.9c-0.1-14.3,10.3-22.8,18.7-29.8c6.6-5.5,10.9-9.4,10.9-12.9c0-7.2-5.8-13-13-13c-7.2,0-13,5.8-13,13 c0,7.3-5.9,13.2-13.2,13.2c-7.3,0-13.2-5.9-13.2-13.2c0-21.7,17.7-39.4,39.4-39.4c21.7,0,39.4,17.6,39.4,39.3 C167.4,115.1,155.7,124.9,147.1,132z"
                    ></path>
                  </svg>
                </div>
                <div class="footer-info-block">
                  <Link to="account/orders" color="blue" class="font-bold">FAQ</Link>
                </div>
              </div>

              <div class="flex items-center basis-1/2">
                <div class="inline-block rounded-full bg-primary-575 p-4 text-primary-555 z-10">
                  <svg viewBox="0 0 256 256" width="26" height="24" fill="currentColor">
                    <path
                      d="M128,256c-13.7,0-24.9-11.2-24.9-24.9s11.2-24.9,24.9-24.9h15.8c8.7,0,16.5,4.3,21.1,11.6l2.1,3.4l3.8-1.2 c13.1-4.2,22-14.2,25.6-29l1.6-6.3l-6.5-0.2c-4.8-0.1-8.8-4.2-8.8-9.1v-71.4c0-5,4.1-9.1,9.1-9.1h6.3v-6.9c0-19.5-6.8-37.4-19-50.3 c-12.1-12.9-28.9-20-47.3-20h-7.9c-18.2,0-35,7.1-47.3,20c-12.3,13.1-19,30.9-19,50.3v6.9h6.3c5,0,9.1,4.1,9.1,9.1v71.5 c0,5-4.1,9.1-9.1,9.1H44.7c-20.5,0-37.2-16.7-37.2-37.2v-15.1c0-17.2,11.6-32,28.3-36.2l4-1v-7c0-23.7,8.4-45.8,23.8-62.2 C79.3,9.3,100.8,0,124.3,0h7.9c23.5,0,45,9.3,60.7,26.1c15.3,16.5,23.7,38.6,23.7,62.2v7l4,1c16.4,4.1,28.2,19.2,27.9,36.1l0,15.1 c0,17.2-12.2,32.5-28.9,36.2l-3.5,0.8l-0.5,3.6c-3.3,24.9-16.7,37.6-27.4,43.8c-5.3,3.1-11.4,5.4-18.2,6.9l-2.5,0.6l-1.1,2.3 c-4.1,8.7-12.9,14.3-22.5,14.3H128z"
                    ></path>
                  </svg>
                </div>
                <div class="footer-info-block">
                  <span class="text-white font-bold pr-2 lg:hidden xl:inline">{{ t('Nonstop') }}</span>
                  <Link to="tel:%2B420220111888" color="blue" class="font-bold">+420 220 111 888</Link>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-section">
            <div class="text-center mb-8">
              <div class="text-center mb-8">
                <h3 class="text-grey-585 m-0 mb-2 text-[19px] leading-[24px] font-semibold">
                  {{ t('Don’t miss anything') }}
                </h3>
                <p class="text-grey-585 m-0 leading-[13px]">
                  {{ t('Subscribe to receive the news') }}
                </p>
              </div>

              <div class="flex justify-center mt-10">
                <Link
                  href="https://www.subscribepage.com/news-from-the-prague_airport_en"
                  target="_blank"
                  color="blue"
                  class="font-normal bg-primary-555 text-white flex items-center tracking-2 px-4 py-2 rounded-lg group"
                >
                  {{ t('Subscribe') }}

                  <div class="text-white pl-1 group-hover:text-primary-500 transition-colors ease-in-out delay-100">
                    <svg focusable="false" role="img" viewBox="0 0 80 40" width="10" fill="currentColor" height="10">
                      <path
                        d="M48 26c-1.1 0-2 0.9-2 2v26H10V18h26c1.1 0 2-0.9 2-2s-0.9-2-2-2H8c-1.1 0-2 0.9-2 2v40c0 1.1 0.9 2 2 2h40c1.1 0 2-0.9 2-2V28C50 26.9 49.1 26 48 26z"
                      ></path>
                      <path
                        d="M56 6H44c-1.1 0-2 0.9-2 2s0.9 2 2 2h7.2L30.6 30.6c-0.8 0.8-0.8 2 0 2.8C31 33.8 31.5 34 32 34s1-0.2 1.4-0.6L54 12.8V20c0 1.1 0.9 2 2 2s2-0.9 2-2V8C58 6.9 57.1 6 56 6z"
                      ></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div class="footer-section">
            <div class="text-center mb-8">
              <h3 class="text-grey-585 m-0 mb-2 text-[19px] leading-[24px] font-semibold">
                {{ t('Download the application') }}
              </h3>
              <p class="text-grey-585 m-0 leading-[13px]">
                {{ t('to your smartphone.') }}
              </p>
            </div>

            <div class="flex justify-center space-x-4">
              <Link
                href="https://itunes.apple.com/us/app/prague-airport-letiste-praha/id581517376?l=cs&ls=1&mt=8%20"
                target="_blank"
                color="blue"
                class="rounded-full border border-primary-555 p-4 text-primary-555 hover:!text-primary-555"
              >
                <svg viewBox="0 0 256 256" width="25" height="25" fill="currentColor">
                  <path
                    d="M240.9,177.6c-21.7-5.1-38.7-24.6-38.7-48.8c0-20.3,12.1-38.5,30.9-46.3c4.7-1.9,6.1-7.9,2.9-11.7 c-10.3-12.4-24.4-18.6-41.9-18.6c-35.7,0-40.1,19.6-62.5,19.6c-22.3,0-26.7-19.6-62.5-19.6c-43.6,0-60,38.6-60,82.4 C9.3,207.3,48.9,256,83.5,256c19.7,0,30.7-5.1,38.7-8.7c9.2-4.2,9.7-4.2,18.9,0c8,3.7,19,8.7,38.7,8.7c31.3,0,56.2-35.3,66.6-68.9 C247.7,182.9,245.2,178.6,240.9,177.6z M179.9,6.7c-0.4-3.4-3.1-6.1-6.5-6.5c-0.9-0.1-21.1-2.4-36.1,12.6 c-15,15-12.7,35.2-12.6,36.1c0.4,3.4,3.1,6.1,6.5,6.5c11.2,1.4,26.2-2.7,36.1-12.6C182.3,27.8,180,7.6,179.9,6.7z"
                  ></path>
                </svg>
              </Link>

              <Link
                href="https://play.google.com/store/apps/details?id=cz.sw.upis.upisand&feature=search_result#?t=W251bGwsMSwxLDEsImN6LnN3LnVwaXMudXBpc2FuZCJd"
                target="_blank"
                color="blue"
                class="rounded-full border border-primary-555 p-4 text-primary-555 hover:!text-primary-555"
              >
                <svg viewBox="0 0 256 256" width="25" height="25" fill="currentColor">
                  <path
                    class="st0"
                    d="M34.7,83.5h-0.7c-8.4,0-15.3,6.9-15.3,15.3v66.4c0,8.4,6.9,15.3,15.3,15.3h0.7c8.4,0,15.3-6.9,15.3-15.3V98.7 C50,90.4,43.1,83.5,34.7,83.5z M57.3,190.8c0,7.7,6.3,14,14,14h15v35.9c0,8.4,6.9,15.3,15.3,15.3h0.7c8.4,0,15.3-6.9,15.3-15.3 v-35.9h20.9v35.9c0,8.4,6.9,15.3,15.3,15.3h0.6c8.4,0,15.3-6.9,15.3-15.3v-35.9h15c7.7,0,14-6.3,14-14V85.9H57.3V190.8z M163.2,22.3 l11.9-18.4c0.8-1.2,0.4-2.7-0.7-3.5c-1.2-0.8-2.7-0.4-3.5,0.7l-12.3,19c-9.3-3.8-19.6-5.9-30.5-5.9c-10.9,0-21.3,2.1-30.5,5.9 l-12.3-19c-0.8-1.2-2.4-1.5-3.5-0.7c-1.2,0.8-1.5,2.3-0.7,3.5l11.9,18.4c-21.5,10.5-36,30.4-36,53.1c0,1.4,0.1,2.8,0.2,4.1H199 c0.1-1.4,0.2-2.7,0.2-4.1C199.2,52.7,184.7,32.8,163.2,22.3z M95.1,55.2c-3.8,0-6.8-3-6.8-6.8c0-3.8,3.1-6.8,6.8-6.8 c3.8,0,6.8,3,6.8,6.8C101.9,52.2,98.9,55.2,95.1,55.2z M160.9,55.2c-3.8,0-6.8-3-6.8-6.8c0-3.8,3.1-6.8,6.8-6.8c3.8,0,6.8,3,6.8,6.8 C167.7,52.2,164.7,55.2,160.9,55.2z M221.9,83.5h-0.6c-8.4,0-15.3,6.9-15.3,15.3v66.4c0,8.4,6.9,15.3,15.3,15.3h0.6 c8.4,0,15.3-6.9,15.3-15.3V98.7C237.2,90.4,230.3,83.5,221.9,83.5z"
                  ></path>
                </svg>
              </Link>

              <Link
                href="https://appgallery.huawei.com/#/app/C101985375?appId=C101985375&source=appshare&subsource=C101985375"
                target="_blank"
                color="blue"
                class="rounded-full border border-primary-555 p-4 text-primary-555"
              >
                <img :src="huawei" alt="" width="25" height="25" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>

    <div class="footer-bg">
      <Container>
        <div class="block lg:flex justify-between border-b border-white pb-4">
          <div>
            <p class="text-white text-center lg:text-left">
              {{ t('The Prague Airport team wishes you a pleasant flight.') }}
            </p>
            <h4 class="text-white text-[25px] mt-1 text-center lg:text-left mb-8 lg:mb-0">
              {{ t('For over 85 years, you have discovered the world with us.') }}
            </h4>
          </div>

          <div class="flex space-x-4 justify-center lg:justify-start">
            <div class="bg-white rounded-full w-[80px] h-[80px] flex">
              <img :src="aciImage" alt="" width="60" height="55" class="p-2 m-auto" />
            </div>

            <div class="bg-white rounded-full w-[80px] h-[80px] flex">
              <img :src="asqImage" alt="" width="45" height="60" class="p-2 m-auto" />
            </div>
            <div class="bg-white rounded-full w-[80px] h-[80px] flex">
              <img :src="acaLogo" alt="" width="60" height="53" class="p-2 m-auto" />
            </div>
            <div class="bg-white rounded-full w-[80px] h-[80px] flex">
              <img :src="asqLogo" alt="" width="60" height="60" class="p-2 m-auto" />
            </div>
          </div>
        </div>

        <div class="py-10 md:py-5">
          <div class="grid md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
            <div
              class="mt-10 col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6"
            >
              <div class="grid grid-cols-1 whitespace-nowrap space-y-4 md:hidden">
                <div v-for="(pageLinkCategory, index) in pageLinksByCategory" :key="index">
                  <AccordionFooter
                    :icon-class="['ml-2', 'cursor-pointer']"
                    :heading-class="[
                      'border-white',
                      'justify-center',
                      'font-semibold',
                      'text-white',
                      'hover:cursor-pointer',
                    ]"
                    :content-class="['text-center', 'mb-12']"
                    :open="false"
                  >
                    <template #heading>
                      {{ t(pageLinkCategory.name) }}
                    </template>
                    <template #default>
                      <ul role="list" class="mt-6 pl-0 space-y-6 list-none">
                        <li
                          v-for="(pageLink, indexChild) in pageLinkCategory.children"
                          :key="indexChild"
                          class="text-sm"
                        >
                          <Link :to="pageLink.path" color="gray" class="!text-white">
                            {{ t(pageLink.label) }}
                          </Link>
                        </li>
                      </ul>
                    </template>
                  </AccordionFooter>
                </div>
              </div>
              <div
                class="grid whitespace-nowrap space-y-4 sm:space-y-0 sm:col-span-3 sm:grid-cols-3 sm:gap-x-40 hidden md:grid"
              >
                <div v-for="(pageLinkCategory, index) in pageLinksByCategory" :key="index">
                  <span class="border-gray-50 font-semibold text-white">
                    {{ t(pageLinkCategory.name) }}
                  </span>

                  <ul role="list" class="mt-6 pl-0 space-y-6 list-none">
                    <li v-for="(pageLink, indexChild) in pageLinkCategory.children" :key="indexChild" class="text-sm">
                      <Link :to="pageLink.path" color="white" class="hover:underline text-white">
                        {{ t(pageLink.label) }}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center text-white font-moderate flex-col lg:flex-row justify-between py-10 lg:py-0 lg:mt-10"
        >
          <div>
            <RouterLink :to="localePath('/')">
              <span class="sr-only">Logo</span>
              <img class="w-auto" :src="logo" alt="Logo" />
            </RouterLink>
          </div>

          <div class="text-center text-white text-sm py-5 lg:py-0">
            Copyright &copy; 2013-2022 Magento, Inc. All rights reserved.
          </div>

          <BackToTop />
        </div>
      </Container>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Link from '#ioc/atoms/Link'
import AccordionFooter from '#ioc/atoms/AccordionFooter'
import BackToTop from '#ioc/molecules/BackToTop'
import useI18n from '#ioc/composables/useI18n'
import logo from '#ioc/assets/logo'
import huawei from '#ioc/assets/footer/huawei-logo'
import useLocalePath from '#ioc/composables/useLocalePath'
import aciImage from '#ioc/assets/footer/aci-2021-stamp'
import asqImage from '#ioc/assets/footer/asqlogo2020rgb1800px'
import acaLogo from '#ioc/assets/footer/aca-level3_1'
import asqLogo from '#ioc/assets/footer/aciahaaccreditedh-resolution_1'

const localePath = useLocalePath()
const { t } = useI18n()

const pageLinksByCategory = [
  {
    name: 'Useful information',
    children: [
      { label: 'About us', path: localePath(t('/about-company')) },
      { label: 'Contact', path: localePath(t('/contact')) },
    ],
  },
  {
    name: 'Customer service',
    children: [
      { label: 'Shipping and payment', path: localePath(t('/shipping-and-payment')) },
      { label: 'Return policy', path: localePath(t('/return-policy')) },
      { label: 'Terms of service', path: localePath(t('/terms-of-service')) },
      { label: 'Privacy policy and cookies policy', path: localePath(t('/privacy-policy-cookie-restriction-mode')) },
    ],
  },
  {
    name: 'Account',
    children: [
      { label: 'Sign in', path: localePath('sign-in') },
      { label: 'Sign up', path: localePath('sign-up') },
      { label: 'Settings', path: localePath('account') },
      { label: 'My orders', path: localePath('account/orders') },
    ],
  },
]
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

  /terms-of-service: /obchodni-podminky
  /about-company: /o-spolecnosti
  /return-policy: /vraceni-zbozi
  /contact-us: /kontakt
  /shipping-and-payment: /doprava-a-platba
  /privacy-policy: /ochrana-osobnich-udaju
  /cookies-policy: /zasady-souboru-cookies
</i18n>
<style scoped>
.footer-bg {
  background-color: #004a6d;
  color: #fff;
  padding: 30px 0 15px 0;
  background-position: right bottom;
  background-image: url('https://www.prg.aero/profiles/kraken/themes/kraken_theme/images/bg-footer.jpg');
  background-size: cover;
  text-shadow: 1px 1px 7px #333;
  font-weight: normal;
}

.footer-info-block {
  box-shadow: -1px 5px 12px #00131c inset;
  @apply bg-primary-585 rounded-lg h-[57px] flex flex-1 items-center relative -left-10 pl-20 w-[315px] lg:w-auto;
}

.footer-section {
  @apply py-[50px] basis-full lg:basis-1/4 bg-[left_center] bg-repeat-y lg:bg-[url('https://www.prg.aero/profiles/kraken/themes/kraken_theme/images/footer-shadow.png')];
}
</style>
