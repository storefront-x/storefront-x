<template>
  <Button
    v-if="loadMore.canLoadMore"
    color="primary"
    tag="a"
    :href="loadMore.loadMoreUrl"
    data-cy="load-more"
    class="w-full md:w-fit md:mx-auto"
    @click.prevent="loadMore.load()"
  >
    {{ t('load_next', [props.perPage]) }}
  </Button>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import useLoadMore from '#ioc/composables/useLoadMore'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'

const props = defineProps({
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  perPage: {
    type: Number,
    required: false,
    default: CATALOG_PAGE_SIZE,
  },
})

const loadMore = useLoadMore(props)

const { t } = useI18n()
</script>

<i18n lang="yaml">
cs-CZ:
  'load_next': Načíst dalších {0}
en-US:
  'load_next': Load next {0}
</i18n>
