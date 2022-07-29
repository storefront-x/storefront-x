export default () => ({
  mounted() {
    document.body.style.overflowY = 'hidden'
  },

  destroyed() {
    document.body.style.overflowY = null
  },
})
