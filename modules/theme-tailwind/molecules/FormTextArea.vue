<template>
  <div class="py-2 lg:col-span-2">
    <Label v-if="label" :for="prefixedName" :required="isRequired" :class="{ required: isRequired }">{{ label }}</Label>

    <TextArea :id="prefixedName" class="mt-1" :value="innerValue" :name="name" @input="onInput" @blur="onBlur" />

    <Hint v-if="hint">{{ hint }}</Hint>

    <Error v-if="showFeedback && isInvalid" :errors="errors" />
  </div>
</template>

<script lang="ts">
import SfxInput from '#ioc/components/SfxInput'
import TextArea from '#ioc/atoms/TextArea'
import Label from '#ioc/atoms/Label'
import Hint from '#ioc/atoms/Hint'
import Error from '#ioc/atoms/Error'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TextArea,
    Label,
    Hint,
    Error,
  },

  extends: SfxInput,

  props: {
    label: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
  },
})
</script>
