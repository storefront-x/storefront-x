<template>
  <iframe :src="src" :autoplay="autoplay" :muted="muted" class="w-full aspect-video" :style="styles" />
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbVideo from '#ioc/mixins/IsPbVideo'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbVideo],

  computed: {
    styles() {
      return {
        ...this.advanced,
      }
    },
  },
})
</script>
