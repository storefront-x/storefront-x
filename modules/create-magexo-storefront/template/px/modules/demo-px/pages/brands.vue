<template>
  <Container class="py-8">
    <Heading :level="1">{{ t('Brands') }}</Heading>

    <div v-for="{ group, label } in groups" :key="label" class="bg-white p-4 sm:border shadow sm:rounded-lg mt-4">
      <Heading :level="2" class="mb-4">
        {{ label }}
      </Heading>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link v-for="brand in group" :key="brand.id" :to="localePath(brand.urlPath)">
          {{ brand.name }}
        </Link>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import useGetBrands from '#ioc/services/useGetBrands'
import useAsyncData from '#ioc/composables/useAsyncData'
import Container from '#ioc/atoms/Container'
import Heading from '#ioc/atoms/Heading'
import Link from '#ioc/atoms/Link'
import useBrand from '#ioc/composables/useBrand'
import { computed } from 'vue'
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()
const { t } = useI18n()
const getBrands = useGetBrands()

const { data } = await useAsyncData('brands', () => getBrands())

const groups = computed(() => {
  const groups: any = {}
  for (const item of Object.values(data.value.brands)) {
    const brand = useBrand(computed(() => item))
    const label = brand.name[0].toUpperCase()

    if (!groups[label]) {
      groups[label] = []
    }

    groups[label].push(brand)
  }
  return Object.entries(groups).map(toLabelGroupTuple).sort(alphabeticallyByLabel)
})

const toLabelGroupTuple = ([label, group]: any) => {
  return { label, group }
}

const alphabeticallyByLabel = (a: any, b: any) => {
  return a.label.localeCompare(b.label)
}
</script>

<i18n lang="yaml">
cs-CZ:
  Brands: Značky
</i18n>
