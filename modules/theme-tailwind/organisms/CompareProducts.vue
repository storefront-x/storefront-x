<template>
  <div>
    <h1>Compare products</h1>
    <div class="grid grid-flow-col grid-rows-1">
      <div v-for="(item, index) in data" :key="index" class="grid grid-rows-3" name="column">
        <div class="flex" name="row1">
          <div v-if="index === 0" class="w-40" name="header"></div>
          <div name="data">
            <div>X</div>
            <div>Image</div>
            <div>Orion Two-Tone Fitted Jacket</div>
            <div>2 Reviews</div>
            <div>As low as $72.00</div>
            <div>
              <button>Add to Cart</button>
              <div>Heart</div>
            </div>
          </div>
        </div>
        <div class="flex" name="row2">
          <div v-if="index === 0" class="w-40" name="header">SKU</div>
          <div>WJ11</div>
        </div>
        <div class="flex h-100" name="row3">
          <div v-if="index === 0" class="w-40" name="description">Description</div>
          <div name="row3">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'

const data = [
  {
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
  },
]

defineProps({
  brand: {
    type: Object,
    default: () => ({}),
  },
})
</script>
