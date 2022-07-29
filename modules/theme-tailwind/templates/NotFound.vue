<template>
  <div class="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="max-w-max mx-auto">
      <main>
        <img :src="_404" alt="404" width="100%" height="auto" />
        <p class="text-center text-black mt-8">{{ t("Unfortunately, we couldn't find this page") }}</p>
        <div class="mt-11 flex justify-center">
          <Button color="primary" to="/">
            {{ t('Go back home') }}
          </Button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import _404 from '#ioc/assets/images/404'

const { t } = useI18n()
</script>

<i18n lang="yaml">
cs-CZ:
  Unfortunately, we couldn't find this page: Tuto stránku jsme bohužel nenašli
  Go back home: Zpět na úvod
</i18n>
