<template>
  <component :is="component" :style="styles">
    <slot />
  </component>
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbRow from '#ioc/mixins/IsPbRow'
import Container from '#ioc/atoms/Container'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbRow],

  computed: {
    component() {
      return this.appearance === 'contained' ? Container : 'div'
    },

    styles() {
      return {
        ...this.background,
        ...this.advanced,
        minHeight: this.minHeight,
        justifyContent: this.justifyContent,
      }
    },
  },
})
</script>
