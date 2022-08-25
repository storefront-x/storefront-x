<template>
  <div>
    <div class="relative flex items-start">
      <div class="flex items-center h-5">
        <input
          :id="prefixedName"
          v-model="innerValue"
          class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
          :name="name"
          :value="innerValue"
          type="checkbox"
          :autocomplete="autocomplete"
          :color="color"
          @blur="onBlur"
        />
      </div>
      <div class="ml-3 text-sm">
        <Label :for="prefixedName" :required="isRequired">{{ label }}</Label>
      </div>
    </div>

    <Error v-if="showFeedback && isInvalid" :errors="errors" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormInput from '#ioc/molecules/FormInput'

export default defineComponent({
  extends: FormInput,
})
</script>
