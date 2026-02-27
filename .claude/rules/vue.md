---
alwaysApply: true
---

# Vue 3 Conventions in Storefront X Framework

## Components — Composition API

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Imports from the IOC container (in framework context, not inside modules themselves)
// import Button from '#ioc/atoms/Button'

const isLoading = ref(false)
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
```

## Preferred Style

- **`<script setup lang="ts">`** — for all new components
- **Options API** — only when editing old components that use it
- **TypeScript** — always, avoid `any`
- **`defineProps` / `defineEmits`** — always with type annotations

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string
  count?: number
}>()

const emit = defineEmits<{
  update: [value: number]
  close: []
}>()
</script>
```

## Composables (use*.ts)

```typescript
// Composable pattern in modules/my-module/composables/useFeature.ts
import { ref, computed } from 'vue'

export default function useFeature() {
  const state = ref<string | null>(null)
  const isReady = computed(() => state.value !== null)

  async function load() {
    // logic
  }

  return { state, isReady, load }
}
```

## Pinia Stores

```typescript
// modules/my-module/stores/useMyStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export default defineStore('myStore', () => {
  const items = ref<Item[]>([])
  const isLoading = ref(false)

  const count = computed(() => items.value.length)

  async function fetchItems() {
    isLoading.value = true
    try {
      // fetch logic
    } finally {
      isLoading.value = false
    }
  }

  function $reset() {
    items.value = []
    isLoading.value = false
  }

  return { items, isLoading, count, fetchItems, $reset }
})
```

## Styling

```vue
<template>
  <div class="bg-white rounded-lg p-4">
    <h2 class="text-lg font-semibold">Heading</h2>
  </div>
</template>

<style scoped>
/* Only when Tailwind is not enough */
.component-class {
  @apply bg-primary-500 text-white;
}
</style>
```

## Security

- **Never use `v-html` with untrusted content** — XSS risk
- **Sanitize user input** before rendering

## Common Anti-patterns

- Direct mutation of props — always emit an event
- `v-if` and `v-for` on the same element — wrap in `<template>`
- Missing `:key` on `v-for`
- Complex logic in template — move to computed or composable
- `v-html` with untrusted content
