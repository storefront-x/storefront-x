<template>
  <div class="pb-8 text-primary-500 font-semibold">
    <SfxCarousel :slides="[ms1, ms2, ms3, ms4]" :loop="true">
      <template #default="{ slide, index }">
        <img :src="slide" :index="index" class="w-full" />
      </template>
      <template #pagination="{ pageIds, currentPage, showPage }">
        <div class="absolute w-full flex justify-center gap-4 bottom-0 p-6">
          <button
            v-for="pageId in pageIds"
            :key="pageId"
            class="w-5 h-5 rounded-full cursor-pointer"
            :class="currentPage === pageId ? 'bg-secondary-500' : 'bg-white'"
            @click="showPage(pageId)"
          />
        </div>
      </template>
    </SfxCarousel>
    <Container>
      <img :src="iconsMainPage" class="w-full" />
    </Container>
    <Container :class="containersSpacingClass">
      <h6 class="font-bold pb-2">Objavte overené produkty podľa vášho cieľa. Chcete:</h6>
      <div class="grid grid-cols-4 gap-4 text-slate-600">
        <div
          v-for="(item, index) in [
            { img: mn1, label: 'SCHUDNÚŤ', url: '/na-chudnutie' },
            { img: mn2, label: 'BUDOVAŤ SVALOVÚ HMOTU', url: '/' },
            { img: mn3, label: 'PODPORIŤ REGENERÁCIU', url: '/' },
            { img: mn4, label: 'ZLEPŠIT VÝKON', url: '/' },
            { img: mn5, label: 'ZDRAVŠIE MAŠKRTIŤ', url: '/' },
            { img: mn6, label: 'ZAČAT CVIČIT DOMA', url: '/' },
            { img: mn7, label: 'PODPORIŤ IMUNITU', url: '/' },
            { img: mn8, label: 'ŠPORTOVÉ OBLEČENIE', url: '/' },
          ]"
          :key="index"
        >
          <RouterLink :to="item.url">
            <div
              class="bg-gray-200 px-2 py-1 flex font-bold items-center hover:underline line normal-case text-xs h-full"
            >
              <img :src.="item.img" :index="index" class="w-1/3" />
              <span class="leading-2">{{ item.label }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import SfxCarousel from '#ioc/components/SfxCarousel'
import ms1 from '#ioc/assets/ms1'
import ms2 from '#ioc/assets/ms2'
import ms3 from '#ioc/assets/ms3'
import ms4 from '#ioc/assets/ms4'
import iconsMainPage from '#ioc/assets/iconsMainPage'
import mn1 from '#ioc/assets/mn1'
import mn2 from '#ioc/assets/mn2'
import mn3 from '#ioc/assets/mn3'
import mn4 from '#ioc/assets/mn4'
import mn5 from '#ioc/assets/mn5'
import mn6 from '#ioc/assets/mn6'
import mn7 from '#ioc/assets/mn7'
import mn8 from '#ioc/assets/mn8'

const containersSpacingClass = { 'mb-12': true }
</script>

<style scoped>
.main-slider :deep(h2) {
  text-shadow: 0 0 35px rgba(0, 0, 0, 0.5);
  @apply text-5xl md:text-9xl leading-none text-white mb-5;
}

.main-slider :deep(p) {
  text-shadow: 0 0 35px rgba(0, 0, 0, 0.9);
  @apply mb-1.5 text-white text-xl md:text-2xl leading-normal;
}
</style>
