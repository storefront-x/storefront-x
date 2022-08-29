<template>
  <div>
    <Label v-if="label" class="mb-1" :for="prefixedName" :required="isRequired">{{ label }}</Label>

    <Input
      :id="prefixedName"
      class="w-full"
      :value="innerValue"
      :type="type || 'text'"
      :inputmode="inputmode"
      :name="name"
      :autocomplete="autocomplete"
      :color="color"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="onInput"
      @blur="onBlur"
    />

    <Error v-if="showFeedback && isInvalid" :errors="errors" />
  </div>
</template>

<script lang="ts">
import SfxInput from '#ioc/components/SfxInput'
import Input from '#ioc/atoms/Input'
import Label from '#ioc/atoms/Label'
import Error from '#ioc/atoms/Error'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Input,
    Label,
    Error,
  },

  extends: SfxInput,

  props: {
    label: {
      type: String,
      default: null,
    },
    autocomplete: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    inputmode: {
      type: String,
      default: '',
    },
  },

  computed: {
    color() {
      if (this.showFeedback && this.isInvalid) return 'red'

      return 'light'
    },
  },
})
</script>
