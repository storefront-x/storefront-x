<template>
  <header class="bg-white fixed top-0 md:static z-20 left-0 right-0">
    <div class="bg-secondary-500 text-white text-center p-3 text-sm mb-4 md:mb-0">
      {{ t('Odštartujte nový rok s fantastickým výpredajom plným zliav od 20 až do 80%. Prezrite si ich všetky') }}
      <a class="underline" href="#">{{ t('tu.') }}</a>
    </div>
    <HeaderMain class="md:pt-5" />
    <HeaderMenu class="mt-4" />
  </header>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import HeaderMain from '#ioc/molecules/HeaderMain'
import HeaderMenu from '#ioc/molecules/HeaderMenu'

const { t } = useI18n()
</script>
