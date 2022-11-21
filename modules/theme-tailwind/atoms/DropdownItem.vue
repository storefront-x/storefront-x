<template>
  <Component
    :is="$attrs.to ? 'RouterLink' : 'a'"
    class="font-medium text-gray-900 hover:bg-gray-100 block px-4 py-2 cursor-pointer"
    role="menuitem"
    tabindex="-1"
  >
    <slot />
  </Component>
</template>
