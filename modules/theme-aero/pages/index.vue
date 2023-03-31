<template>
  <SfxMagentoCmsBlock identifier="aero_hp_banner" />
  <Container>
    <div v-if="!customer.isLoggedIn">
      <div class="py-10 lg:py-20">
        <h2 class="text-center">Enter your flight number</h2>

        <FlightNumber />
      </div>
    </div>
    <div v-else>
      <SfxMagentoCmsBlock identifier="segment_block" />
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'

import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'
import useCustomer from '#ioc/composables/useCustomer'
import { provide } from 'vue'

provide('containerContent', true)

const FlightNumber = hydrateWhenVisible(() => import('#ioc/molecules/FlightNumber'))
const SfxMagentoCmsBlock = hydrateWhenIdle(() => import('#ioc/components/SfxMagentoCmsBlock'))

const customer = useCustomer()
</script>
