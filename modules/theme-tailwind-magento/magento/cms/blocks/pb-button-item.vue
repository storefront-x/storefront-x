<template>
  <a :href="link" :class="classes">
    <Button :color="color">
      {{ content }}
    </Button>
  </a>
</template>

<script>
import Button from '#ioc/atoms/Button'
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbButtonItem from '#ioc/mixins/IsPbButtonItem'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Button,
  },

  mixins: [IsPbBlock, IsPbButtonItem],

  computed: {
    classes() {
      return {
        'flex-grow-1': this.$parent.sameWidth,
        'flex-grow-0': !this.$parent.sameWidth,
      }
    },

    color() {
      if (this.type === 'primary') return 'primary'
      return 'light'
    },
  },
})
</script>
