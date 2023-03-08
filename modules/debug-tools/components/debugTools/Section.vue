<template>
  <div class="section">
    <div @click="open = !open">
      <strong>
        {{ open ? '▼' : '▶' }}
        {{ title }}
      </strong>
    </div>
    <div v-if="open">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
})

const open = ref(props.open)
</script>

<style scoped>
strong {
  cursor: pointer;
}

.section {
  padding-top: 0.5rem;
  padding-left: 0.5rem;
}
</style>
