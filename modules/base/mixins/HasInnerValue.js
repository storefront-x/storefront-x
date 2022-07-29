export default ({ type, default: defaultValue }) => ({
  props: {
    value: {
      type,
      default: defaultValue,
      required: false,
    },
  },

  data: (vm) => ({
    innerValue: vm.value ?? defaultValue,
  }),

  watch: {
    value(value) {
      this.innerValue = value
    },
    innerValue(innerValue) {
      this.$emit('input', innerValue)
    },
  },
})
