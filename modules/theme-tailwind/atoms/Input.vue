<template>
  <input
    :value="value"
    :type="type"
    :inputmode="inputmode"
    class="rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
    :class="classes"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    color: {
      type: String,
      default: 'light',
    },
    inputmode: {
      type: String,
      default: '',
    },
  },

  computed: {
    classes() {
      return {
        'border border-gray-300': this.color === 'light',
        'border border-red-300 text-red-900 placeholder-red-300': this.color === 'red',
      }
    },
  },
}
</script>

<style scoped>
input:placeholder-shown {
  text-overflow: ellipsis;
}
</style>
