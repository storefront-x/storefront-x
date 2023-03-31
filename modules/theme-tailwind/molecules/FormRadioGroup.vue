<template>
  <div>
    <Label>{{ label }}</Label>

    <div :class="classes">
      <slot />
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

  provide() {
    return {
      $FormRadioGroup: this,
    }
  },

  props: {
    label: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      default: '',
      required: false,
    },
    group: {
      type: String,
      default: '',
    },
  },
})
</script>
