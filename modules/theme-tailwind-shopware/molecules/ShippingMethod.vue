<template>
  <label
    class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none active:ring-2 active:ring-primary-500"
    :class="{
      'border-transparent': isSelected,
      'border-gray-300': !isSelected,
    }"
    @click="onSelect"
  >
    <span class="flex-1 flex">
      <span class="flex flex-col">
        <span class="block text-sm font-medium text-gray-900">
          {{ shippingMethod.name }}
        </span>
        <span class="mt-1 flex items-center text-sm text-gray-500">
          {{ shippingMethod.deliveryLabel }}
        </span>
      </span>
    </span>

    <SolidCheckCircle v-if="isSelected" class="text-primary-600" />

    <span
      class="absolute -inset-px rounded-lg border-2 active:border pointer-events-none"
      :class="{
        'border-primary-500': isSelected,
        'border-transparent': !isSelected,
      }"
      aria-hidden="true"
    />
  </label>
</template>

<script setup lang="ts">
import SolidCheckCircle from '#ioc/icons/SolidCheckCircle'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'

const props = defineProps<{
  shippingMethod: ReturnType<ReturnType<typeof useToShippingMethod>>
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'select', shippingMethod: ReturnType<ReturnType<typeof useToShippingMethod>>): void
}>()

const onSelect = () => {
  emit('select', props.shippingMethod)
}
</script>
