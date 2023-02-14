<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbImage from '#ioc/mixins/IsPbImage'
import SfxImage from '#ioc/components/SfxImage'
import { defineComponent, h } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbImage],

  computed: {
    styles() {
      return {
        ...this.advanced,
      }
    },

    opts() {
      return {
        path: this.image,
      }
    },
  },

  methods: {
    imageFragment() {
      const img = h(SfxImage, {
        src: this.src,
        alt: this.alt,
        lazy: true,
        title: this.title,
        class: '',
        style: this.styles,
      })

      if (this.caption) {
        return h('figure', [img, h('figcaption', [this.caption])])
      }

      return img
    },
  },

  render(h) {
    if (!this.src) return null

    if (this.link) {
      return h('RouterLink', { props: { to: this.link, newWindow: this.openInNewTab } }, [this.imageFragment(h)])
    } else {
      return this.imageFragment(h)
    }
  },
})
</script>

<style scoped>
picture:deep(img) {
  object-fit: cover;
}
</style>
