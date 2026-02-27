---
alwaysApply: true
---

# Tailwind CSS v3 — Conventions in Storefront X Framework

Tailwind CSS is integrated via the `@storefront-x/theme-tailwind` module (and `theme-tailwind-magento`).

## Core Principles

- **Utility-first** — classes directly in HTML/template, no custom CSS
- **Mobile-first** — start with mobile, scale up via `sm:`, `md:`, `lg:`, `xl:`
- **No custom CSS** if Tailwind covers the use case

## Layout

```vue
<template>
  <!-- Container -->
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Flexbox -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex-1">Content</div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>Item</div>
    </div>
  </div>
</template>
```

## Interactive States

```vue
<template>
  <button
    class="
      bg-primary-500 hover:bg-primary-600 active:bg-primary-700
      text-white font-semibold py-2 px-4 rounded-lg
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    Action
  </button>
</template>
```

## Responsive Design

```vue
<template>
  <!-- Show only at certain breakpoints -->
  <div class="block sm:hidden">Mobile only</div>
  <div class="hidden sm:block">Desktop+</div>

  <!-- Responsive typography -->
  <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">Heading</h1>
</template>
```

## Loading and Skeleton States

```vue
<template>
  <!-- Spinner -->
  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />

  <!-- Skeleton -->
  <div class="animate-pulse space-y-2">
    <div class="h-4 bg-gray-200 rounded w-3/4" />
    <div class="h-4 bg-gray-200 rounded w-1/2" />
  </div>
</template>
```

## Accessibility

```vue
<template>
  <!-- Screen reader only -->
  <span class="sr-only">Description for screen reader</span>

  <!-- Skip link -->
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded"
  >
    Skip to content
  </a>
</template>
```

## Configuration (tailwind.config.js)

Look for the configuration in `modules/theme-tailwind/`. Projects can override it via their own module.

## Anti-patterns

- Writing custom CSS when a Tailwind class exists
- Hardcoding colors (`bg-[#ff0000]`) instead of using theme tokens
- Ignoring the mobile-first approach
- Omitting focus states — critical for accessibility
