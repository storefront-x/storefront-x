import { onMounted, onUnmounted } from 'vue'

export default () => {
  onMounted(() => {
    document.body.style.overflowY = 'hidden'
  })

  onUnmounted(() => {
    document.body.style.overflowY = ''
  })
}
