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
          {{ paymentMethod.name }}
        </span>
        <span class="mt-1 flex items-center text-sm text-gray-500">
          {{ paymentMethod.description }}
        </span>
      </span>
    </span>

    <SolidCheckCircle v-if="isSelected" class="absolute top-4 right-4 text-primary-600" />

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
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'

const props = defineProps<{
  paymentMethod: ReturnType<ReturnType<typeof useToPaymentMethod>>
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'select', paymentMethod: ReturnType<ReturnType<typeof useToPaymentMethod>>): void
}>()

const onSelect = () => {
  emit('select', props.paymentMethod)
}
</script>
