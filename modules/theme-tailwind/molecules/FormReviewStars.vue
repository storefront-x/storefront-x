<template>
  <div>
    <div class="star-rating">
      <Label v-if="label" :class="{ required: isRequired }">
        {{ label }}
      </Label>

      <div class="flex flex-row hover:cursor-pointer" @mouseleave="onMouseLeave">
        <svg
          v-for="index in 5"
          :key="'1' + index"
          :data-key="index"
          class="h-8 w-8 flex-shrink-0"
          :class="{
            'text-primary-500': dataValue >= index,
            'text-gray-300': dataValue < index,
          }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          @click="set(index)"
          @mouseenter="hover(index)"
          @mouseout="blur"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      </div>

      <div v-if="showFeedback && isInvalid" class="mt-2 text-sm text-red-600">
        <div v-for="error in errors" :key="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SfxInput from '#ioc/components/SfxInput'
import Label from '#ioc/atoms/Label'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Label,
  },

  extends: SfxInput,

  props: {
    label: {
      type: String,
      default: () => '',
    },
    metaValues: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      dataValue: 0,
      tempValue: 0,
      wasSelected: false,
    }
  },

  methods: {
    hover(index: any) {
      if (!this.wasSelected) {
        this.tempValue = index
        return (this.dataValue = index)
      }
    },
    blur() {
      if (!this.wasSelected) {
        return (this.dataValue = this.tempValue)
      }
    },
    set(index: number) {
      this.tempValue = index || 0
      this.innerValue = this.metaValues[index].valueId
      this.wasSelected = true
      return (this.dataValue = index)
    },
    onMouseLeave() {
      if (!this.wasSelected) {
        this.tempValue = 0
        return (this.dataValue = 0)
      }
    },
  },
})
</script>
