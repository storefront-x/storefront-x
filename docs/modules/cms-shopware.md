# CMS Shopware

> `@storefront-x/cms-shopware`

## `useShopwareCmsBlock` composable

Used to return styling for parent element in dynamic block.

Every CMS block has its own composable.

### Example

```vue
<!-- shopware/cms/blocks/text-two-column.vue -->

<template>
  <div class="relative bg-center" :style="shopwareCmsBlock.styles">
    <div class="grid grid-cols-2 gap-x-10">
      <slot name="left" />
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useShopwareCmsBlock from '#ioc/composables/useShopwareCmsBlock'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const shopwareCmsBlock = useShopwareCmsBlock(props)
</script>
```

## `SfxShopwareCmsPage` component

Component for rendering CMS blocks and its slots from data fetched from Shopware.

### Example

```vue
<!-- shopware/dynamicPages/frontend.landing.page.vue -->

<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <SfxShopwareCmsPage :data="data" />
  </Container>
</template>

<script setup lang="ts">
import useGetCmsPageById from '#ioc/services/useGetCmsPageById'
import SfxShopwareCmsPage from '#ioc/components/SfxShopwareCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'
import Container from '#ioc/atoms/Container'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const getCmsPageById = useGetCmsPageById()

const { data } = await useAsyncData('landingPage', () => getCmsPageById(props.id))
</script>
```

## `ShopwareCmsBlocks` concept

Concept generates all Shopware dynamic blocks.

CMS blocks must have same name as property 'type' in response from Shopware API.
