import IS_SERVER from '#ioc/config/IS_SERVER'

export default {
  data() {
    return {
      observer: this.makeObserver(),
    }
  },

  mounted() {
    if (this.observer) {
      this.observer.observe(this.$el)
    }
  },

  destroyed() {
    if (this.observer) {
      this.observer.unobserve(this.$el)
    }
  },

  methods: {
    makeObserver() {
      if (IS_SERVER) return

      if (typeof IntersectionObserver === 'undefined') return

      return new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting === false) continue

          this.onIntersectionObserved(entry)

          this.observer.unobserve(entry.target)
        }
      })
    },

    /**
     * Called by observer when element comes into viewport. Override this method in your component
     * to handle the event.
     *
     * The element stops being observed after this method is called.
     */
    onIntersectionObserved() {
      console.warn('UserIntersectionObserver mixin is used but method `onIntersectionObserved` is not implemented.')
    },
  },
}
