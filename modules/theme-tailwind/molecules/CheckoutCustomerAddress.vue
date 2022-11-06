<template>
  <div
    class="relative bg-white border rounded-lg shadow-sm p-4 flex flex-col cursor-pointer focus:outline-none"
    :class="isActive ? 'border-primary-500' : 'border-gray-300'"
    data-cy="customer-address"
    @click="onClick"
  >
    <strong class="text-gray-800">
      {{ customerAddress.firstName }}
      {{ customerAddress.lastName }}
    </strong>
    <p class="text-gray-600">
      {{ customerAddress.street }}
    </p>
    <p class="text-gray-600">{{ customerAddress.city }}, {{ customerAddress.zipcode }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  customerAddress: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    defaul: false,
  },
})
const emit = defineEmits(['select'])
const onClick = () => {
  emit('select', props.customerAddress)
}
</script>
