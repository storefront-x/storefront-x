<template>
  <div class="flex gap-1 h-8 mr-4" data-cy="product-quantity-configurator">
    <button
      class="bg-white font-bold px-2 whitespace-nowrap border-transparent shadow-transparent font-bold text-primary-500 hover:bg-gray-50 focus:ring-primary-500"
      :disabled="innerValue === minimum"
      @click.prevent="decrement"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-minus"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        stroke-width="4"
        stroke="#000000"
        fill="none"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
    <label for="quantity" class="sr-only">Quantity</label>
    <Input
      id="quantity"
      :value="innerValue"
      class="w-10 text-center shadow-transparent border-2 py-0 border-primary-500 rounded-none"
      @input="onInput"
      @blur="onBlur"
    />
    <button
      class="bg-white font-bold px-2 whitespace-nowrap border-transparent shadow-transparent font-bold text-primary-500 hover:bg-gray-50 focus:ring-primary-500"
      @click.prevent="increment"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-plus"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        stroke-width="4"
        stroke="#000000"
        fill="none"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Input from '#ioc/atoms/Input'
import HasInnerValue from '#ioc/mixins/HasInnerValue'

export default defineComponent({
  components: {
    Input,
  },

  mixins: [HasInnerValue({ type: Number, default: 1 })],

  props: {
    minimum: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    decrement() {
      if (this.innerValue === this.minimum) return
      this.innerValue--
    },

    increment() {
      this.innerValue++
    },

    onInput(e: any) {
      this.innerValue = e.target.value
    },

    onBlur() {
      const innerValue = Number(this.innerValue)

      if (innerValue > 0) {
        this.innerValue = innerValue
      } else {
        this.innerValue = 1
      }
    },
  },
})
</script>
