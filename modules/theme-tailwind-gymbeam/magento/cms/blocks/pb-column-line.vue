<template>
  <div class="col-span-12">
    <div class="grid grid-cols-12">
      <slot />
    </div>
  </div>
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbColumn from '#ioc/mixins/IsPbColumn'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbColumn],
})
</script>
