import IS_SERVER from '#ioc/config/IS_SERVER'
import { onDeactivated, onMounted, ref } from 'vue'

/**
 * Called by observer when element comes into viewport. Override this method in your component
 * to handle the event.
 *
 * The element stops being observed after this method is called.
 */
const defaultOnIntersectionObserved = () => {
  console.warn('UserIntersectionObserver mixin is used but method `onIntersectionObserved` is not implemented.')
}

export default (el: any, onIntersectionObserved = defaultOnIntersectionObserved) => {
  const makeObserver = () => {
    if (IS_SERVER) return

    if (typeof IntersectionObserver === 'undefined') return

    return new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting === false) continue

        onIntersectionObserved()

        observer?.value?.unobserve(entry.target)
      }
    })
  }

  const observer = ref(makeObserver())

  onMounted(() => {
    if (observer.value) {
      observer.value.observe(el)
    }
  })

  onDeactivated(() => {
    if (observer.value) {
      observer.value.unobserve(el)
    }
  })
}
