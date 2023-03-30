<template>
  <div class="bg-primary-565">
    <Container>
      <div class="flex">
        <div class="py-[50px] basis-1/2">
          <div class="text-center mb-8">
            <h3 class="text-grey-585 m-0 mb-2 text-[19px] leading-[24px] font-semibold">
              {{ t('Do you need some advice?') }}
            </h3>
            <p class="text-grey-585 m-0 leading-[13px]">{{ t('The Prague Airport Team is here for you.') }}</p>
          </div>

          <div class="flex">
            <div class="flex items-center basis-1/2">
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
                <span class="text-white font-bold pr-2">{{ t('Nonstop') }}</span>
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

            <div class="flex justify-center mt-8">
              <Link
                href="https://www.subscribepage.com/news-from-the-prague_airport_en"
                target="_blank"
                color="blue"
                class="font-normal bg-primary-555 text-white flex items-center tracking-2 px-4 py-2 rounded-lg"
              >
                {{ t('Subscribe') }}

                <div class="text-white">
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

          <div class="flex justify-center">
            <Link
              href="https://itunes.apple.com/us/app/prague-airport-letiste-praha/id581517376?l=cs&ls=1&mt=8%20"
              target="_blank"
              color="blue"
              class="rounded-full border border-primary-555 p-4 text-primary-555"
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
              class="rounded-full border border-primary-555 p-4 text-primary-555"
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

            </Link>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Link from '#ioc/atoms/Link'
import useLocalePath from "#ioc/composables/useLocalePath";
import useI18n from "#ioc/composables/useI18n";

const localePath = useLocalePath()
const { t } = useI18n()
</script>
