---
alwaysApply: true
---

# Storefront X Project Rules

## Framework Overview
This project uses Storefront X - a modern e-commerce platform built with Vue 3, Vite 3, and Tailwind 3.
- Website: https://docs.storefrontx.io/
- Architecture: Modular PWA with SSR support
- IOC (Inversion of Control) pattern for dependency injection

## Project Structure
- `modules/` - Business logic modules (supplo-common, supplo-cart, etc.)
- `sfx/` - Storefront X framework modules and themes
- `.sfx/` - Compiled IOC container and build artifacts
- `types/` - TypeScript type definitions
- `schemas/` - GraphQL schemas

## Import Patterns

### IOC Imports (Preferred)
```typescript
// Use IOC aliases for framework components
import useI18n from '#ioc/composables/useI18n'
import Button from '#ioc/atoms/Button'
import ProductTile from '#ioc/molecules/ProductTile'
import Header from '#ioc/organisms/Header'
import useCartStore from '#ioc/stores/useCartStore'
```

### Module Imports
```typescript
// Direct module imports when IOC not available
import Component from '~/modules/supplo-common/molecules/Component'
import { service } from '~/modules/supplo-cart/services/cartService'
```

### Local Theme Imports
```typescript
// Local theme components
import LocalComponent from './LocalComponent.vue'
import '../styles/component.css'
```

## Component Architecture

### Atomic Design Structure
- `atoms/` - Basic UI elements (Button, Input, Icon)
- `molecules/` - Simple component combinations (SearchBar, ProductCard)
- `organisms/` - Complex components (Header, ProductListing, Footer)
- `templates/` - Page layouts
- `pages/` - Route components

### Vue 3 Composition API
```vue
<script setup lang="ts">
// Preferred approach for new components
import { ref, computed } from 'vue'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()
const isLoading = ref(false)

const computedValue = computed(() => {
  // logic here
})
</script>
```

### Legacy Options API (when extending existing)
```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // Use when modifying existing components
})
</script>
```

## State Management

### Pinia Stores
```typescript
// Store pattern
import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({
    items: []
  }),
  actions: {
    async fetchItems() {
      // async logic
    }
  }
})
```

### Composables
```typescript
// Composable pattern for reusable logic
export default function useMyFeature() {
  const state = ref()

  const method = () => {
    // logic
  }

  return {
    state,
    method
  }
}
```

## GraphQL Integration

### Repository Pattern
```typescript
// Use repository pattern for API calls
import myQuery from '#ioc/graphql/queries/myQuery'
import useMagentoStore from '#ioc/stores/useMagentoStore'

export default () => {
  const magentoStore = useMagentoStore()

  return async (variables: Variables) => {
    const [data] = await magentoStore.graphql(
      myQuery().with(variables)
    )
    return data
  }
}
```

### Type Safety
```typescript
// Always use generated types
import { MyQuery, MyQueryVariables } from '~/types/magentoGraphql'
```

## Styling Guidelines

### Tailwind CSS
- Use Tailwind utility classes
- Follow responsive-first approach
- Use design system tokens when available

### CSS Modules/Scoped Styles
```vue
<style scoped>
/* Component-specific styles */
.component-class {
  @apply bg-primary-500 text-white;
}
</style>
```

## Internationalization

### i18n Usage
```vue
<template>
  <h1>{{ t('page.title') }}</h1>
</template>

<script setup>
const { t } = useI18n()
</script>

<i18n lang="yaml">
cs-CZ:
  page:
    title: Nadpis stránky
en-US:
  page:
    title: Page Title
</i18n>
```

## Build & Development

### Development Mode
```bash
# Czech Republic
yarn dev --config storefront-x.config-cz.js

# Slovakia
yarn dev --config storefront-x.config-sk.js

# Slovenia
yarn dev --config storefront-x.config-si.js
```

### Build Commands
```bash
# Czech Republic
yarn build --config storefront-x.config-cz.js

# Slovakia
yarn build --config storefront-x.config-sk.js

# Slovenia
yarn build --config storefront-x.config-si.js
```

### Module Registration
- Components must be properly exported to appear in IOC
- Run `yarn build` to compile IOC container
- Development server includes HMR (Hot Module Replacement)

## Country-Specific Considerations
- CZ: Czech Republic specific features
- SK: Slovakia specific features
- SI: Slovenia specific features

Each country may have different:
- Payment methods
- Shipping options
- Legal requirements
- Language localizations

## Best Practices

1. **Modularity**: Keep components focused and reusable
2. **Performance**: Lazy load non-critical components
3. **Accessibility**: Follow WCAG guidelines
4. **SEO**: Ensure proper SSR implementation
5. **PWA**: Implement service workers and offline support
6. **Testing**: Write comprehensive tests for critical paths
7. **Documentation**: Document complex business logic
8. **Version Control**: Use conventional commits

## Debugging

### Common Issues
- IOC compilation: Run build to update IOC container
- Import errors: Check if components are registered in IOC
- Type errors: Ensure proper TypeScript configuration
