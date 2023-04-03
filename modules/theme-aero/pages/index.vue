<template>
  <SfxMagentoCmsBlock identifier="aero_hp_banner" />

  <Container>
    <div class="mt-8">
      <div class="my-4">
        <h3 class="text-3xl">{{ t('Top Liquor') }}</h3>
      </div>
      <SfxMagentoCmsBlock identifier="best_seller_hp" />
    </div>

    <div class="mb-8">
      <div class="my-4">
        <h3 class="text-3xl">{{ t('Parking') }}</h3>
      </div>
      <SfxMagentoCmsBlock identifier="featured_seller_hp" />
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'
import { provide } from 'vue'
import useI18n from '#ioc/composables/useI18n'

provide('containerContent', true)

const { t } = useI18n()

const SfxMagentoCmsBlock = hydrateWhenIdle(() => import('#ioc/components/SfxMagentoCmsBlock'))
</script>
