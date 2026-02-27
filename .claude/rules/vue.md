---
alwaysApply: true
---

## Styling Guidelines

### Tailwind CSS (Preferred)
```vue
<template>
  <div class="bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">
      {{ title }}
    </h2>
  </div>
</template>
```

### Scoped Styles
```vue
<style scoped>
.component-class {
  @apply bg-primary-500 text-white;
}

/* Use CSS custom properties for theming */
:root {
  --primary-color: theme('colors.primary.500');
}
</style>
```

## Testing Guidelines

### Component Testing
```vue
<template>
  <button
    data-cy="submit-button"
    @click="handleSubmit"
    :disabled="isLoading"
  >
    {{ t('button.submit') }}
  </button>
</template>
```

### Test Selectors
- Use `data-cy` attributes for Cypress testing
- Avoid testing implementation details
- Test user interactions and outcomes

## Security Best Practices

### XSS Prevention
- Never use `v-html` with untrusted content
- Sanitize user input before rendering
- Use Vue's built-in XSS protection

### Input Validation
```typescript
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

## Code Quality

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type usage
- Use type guards for runtime type checking

### ESLint/Prettier
- Follow project's ESLint configuration
- Use Prettier for consistent formatting
- Run linting before commits

## Storefront X Specific

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

### GraphQL Integration
```typescript
// Repository pattern for API calls
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

## Best Practices Summary

1. **Component Design**: Keep components small, focused, and reusable
2. **State Management**: Use appropriate state management for scope (local vs global)
3. **Performance**: Lazy load components, use computed properties, optimize renders
4. **Type Safety**: Use TypeScript for better development experience
5. **Testing**: Write tests for critical user paths
6. **Accessibility**: Follow WCAG guidelines
7. **SEO**: Ensure proper SSR implementation
8. **Security**: Validate inputs, prevent XSS attacks
9. **Internationalization**: Support multiple languages
10. **Code Quality**: Follow linting rules, use consistent formatting

## Common Anti-Patterns to Avoid

- Mutating props directly
- Using `v-if` and `v-for` on the same element
- Not providing keys for `v-for` lists
- Complex logic in templates
- Using `v-html` with untrusted content
- Not handling async errors
- Over-engineering simple components
- Not using TypeScript for type safety
