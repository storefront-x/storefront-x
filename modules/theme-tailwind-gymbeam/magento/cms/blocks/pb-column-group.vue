<template>
  <div class="grid grid-cols-12">
    <slot />
  </div>
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbColumnGroup from '#ioc/mixins/IsPbColumnGroup'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbColumnGroup],
})
</script>
