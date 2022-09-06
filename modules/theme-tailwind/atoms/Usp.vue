<template>
  <div class="text-center sm:flex sm:text-left lg:block lg:text-center">
    <div class="sm:flex-shrink-0">
      <div class="flow-root">
        <component :is="determineIconComponent" class="w-16 h-16 mx-auto"></component>
      </div>
    </div>
    <div class="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
      <h3 class="text-md font-medium text-gray-900">
        {{ usp.title }}
      </h3>
      <p class="mt-2 text-sm text-gray-500">
        {{ usp.description }}
      </p>
    </div>
  </div>
</template>

<script>
import RocketIcon from '#ioc/icons/custom/RocketIcon'
import GearsIcon from '#ioc/icons/custom/GearsIcon'
import GlassIcon from '#ioc/icons/custom/GlassIcon'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { RocketIcon, GearsIcon, GlassIcon },
  props: {
    usp: {
      required: true,
      type: Object,
    },
  },
  computed: {
    determineIconComponent() {
      return this.usp.icon + 'Icon'
    },
  },
})
</script>
