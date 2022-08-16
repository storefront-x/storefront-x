export default {
  computed: {
    slides() {
      return [...this.el.childNodes]
    },

    autoplay() {
      return this.el.getAttribute('data-autoplay') === 'true'
    },

    autoplaySpeed() {
      return parseInt(this.el.getAttribute('data-autoplay-speed'))
    },

    fade() {
      return this.el.getAttribute('data-fade') === 'true'
    },

    infiniteLoop() {
      return this.el.getAttribute('data-infinite-loop') === 'true'
    },

    showArrows() {
      return this.el.getAttribute('data-show-arrows') === 'true'
    },

    showDots() {
      return this.el.getAttribute('data-show-dots') === 'true'
    },
  },
}
