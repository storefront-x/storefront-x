<template>
  <div class="flex border-grey-400 border-2 rounded-md" data-cy="product-quantity-configurator">
    <button
      class="bg-white font-bold py-2 px-4 whitespace-nowrap border-transparent shadow-transparent font-bold text-orange-600 hover:bg-gray-50 focus:ring-primary-500"
      :disabled="innerValue === minimum"
      @click.prevent="decrement"
    >
      -
    </button>
    <label for="quantity" class="sr-only">Quantity</label>
    <Input
      id="quantity"
      :value="innerValue"
      class="w-10 text-center shadow-transparent border-0"
      @input="onInput"
      @blur="onBlur"
    />
    <button
      class="bg-white font-bold py-2 px-4 whitespace-nowrap border-transparent shadow-transparent font-bold text-orange-600 hover:bg-gray-50 focus:ring-primary-500"
      @click.prevent="increment"
    >
      +
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
