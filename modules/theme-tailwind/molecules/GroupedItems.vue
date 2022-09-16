<template>
  <div class="mt-4">
    <Heading :level="3" class="mb-4"> Product includes: </Heading>
    <ul class="space-y-4 list-none pl-0">
      <GroupedItem v-for="item in product.groupedItems" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import injectProduct from '#ioc/composables/injectProduct'
import GroupedItem from '#ioc/molecules/GroupedItem'
import Heading from '#ioc/atoms/Heading'

const product = injectProduct()
</script>

<i18n lang="yaml">
cs-CZ:
  'Price': 'Cena'
</i18n>
