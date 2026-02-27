---
alwaysApply: true
---

# Tailwind CSS v3 User Rules for Storefront X Project

## Framework Overview
This project uses Tailwind CSS v3 - a utility-first CSS framework that provides low-level utility classes for building custom designs.
- **Utility-First**: Build complex components from primitive utilities
- **Zero-Runtime**: Generates static CSS files
- **Responsive**: Built-in responsive design utilities
- **Customizable**: Highly configurable theme system

## Core Principles

### 1. Utility-First Approach
- Use utility classes directly in HTML instead of writing custom CSS
- Combine utilities to create complex layouts and designs
- Avoid writing custom CSS unless absolutely necessary

### 2. Mobile-First Responsive Design
- Start with mobile styles and scale up
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Design for smallest screens first

### 3. Consistent Design System
- Use predefined spacing, colors, and typography scales
- Maintain visual consistency across components
- Leverage design tokens for theming

## Configuration File
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,vue,ts}",
    "./modules/**/*.{vue,ts}",
    "./sfx/**/*.{vue,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

## Layout Guidelines

### Container & Spacing
```vue
<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Content here -->
    </div>
  </div>

  <div class="space-y-4">
    <div class="p-4">Item 1</div>
    <div class="p-4">Item 2</div>
  </div>
</template>
```

### Flexbox & Grid
```vue
<template>
  <div class="flex items-center justify-between">
    <div class="flex-1">Left content</div>
    <div class="flex-shrink-0">Right content</div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="card">Grid item</div>
  </div>
</template>
```

## Component Patterns

### Button Components
```vue
<template>
  <button class="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
    Primary Action
  </button>
</template>
```

### Card Components
```vue
<template>
  <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
    <p class="text-gray-600">Card content</p>
  </div>
</template>
```

### Form Components
```vue
<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Email Address</label>
    <input
      type="email"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      placeholder="Enter your email"
    >
  </div>
</template>
```

## Responsive Design

### Breakpoint Strategy
```vue
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <!-- Grid items -->
  </div>

  <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
    Responsive Heading
  </h1>

  <div class="block sm:hidden">Mobile only content</div>
  <div class="hidden sm:block">Desktop only content</div>
</template>
```

## Interactive States

### Hover & Focus States
```vue
<template>
  <button class="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    Interactive Button
  </button>
</template>
```

### Loading States
```vue
<template>
  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>

  <div class="animate-pulse">
    <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
</template>
```

## Accessibility Guidelines

### Screen Reader Support
```vue
<template>
  <h1 class="sr-only">Page Title</h1>

  <button class="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
    Accessible Button
  </button>

  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded">
    Skip to main content
  </a>
</template>
```

## Storefront X Integration

### Module-Specific Styling
```vue
<template>
  <button
    :class="[
      'font-medium py-2 px-4 rounded-lg transition-colors duration-200',
      variant === 'primary' ? 'bg-primary-500 hover:bg-primary-600 text-white' : '',
      variant === 'secondary' ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : '',
    ]"
  >
    <slot />
  </button>
</template>
```

## Best Practices Summary

1. **Utility-First**: Use utility classes over custom CSS
2. **Mobile-First**: Design for mobile and scale up
3. **Consistent Spacing**: Use Tailwind's spacing scale
4. **Semantic Colors**: Use meaningful color names
5. **Responsive Design**: Use responsive prefixes
6. **Performance**: Purge unused styles
7. **Accessibility**: Ensure proper contrast and focus states
8. **Component Patterns**: Create reusable component classes
9. **Animation**: Use smooth transitions and animations

## Common Anti-Patterns to Avoid

- Writing custom CSS when utilities exist
- Using arbitrary values instead of design tokens
- Not considering mobile-first approach
- Ignoring accessibility requirements
- Creating inconsistent spacing
- Using hardcoded colors instead of theme colors
- Not purging unused styles in production
