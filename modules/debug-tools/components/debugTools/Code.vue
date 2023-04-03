<template>
  <button @click="copy">{{ copied ? 'done' : 'copy' }}</button>
  <pre>{{ content }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const copied = ref(false)

const copy = () => {
  navigator.clipboard.writeText(props.content)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1000)
}
</script>

<style scoped>
pre {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}

button {
  margin-left: 0.5rem;
  border: gray 1px solid;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
</style>
