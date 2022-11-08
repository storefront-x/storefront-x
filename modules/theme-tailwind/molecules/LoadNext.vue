<template>
  <Button
    v-if="canLoadMore"
    color="primary"
    tag="a"
    :href="loadMoreUrl"
    data-cy="load-more"
    class="w-full md:w-fit md:mx-auto"
    @click.prevent="loadMore"
  >
    {{ t('load_next', [perPage]) }}
  </Button>
</template>

<script lang="ts">
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import IsLoadNext from '#ioc/mixins/IsLoadNext'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Button,
  },

  mixins: [IsLoadNext],

  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  'load_next': Načíst dalších {0}
en-US:
  'load_next': Load next {0}
</i18n>
