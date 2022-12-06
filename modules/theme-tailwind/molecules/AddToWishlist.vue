<template>
  <button
    type="button"
    class="rounded-md flex items-center justify-center"
    :class="classes"
    data-cy="add-to-wishlist"
    @click="resolveAddToWishlist"
  >
    <span class="sr-only">
      {{ t('Add to favorites') }}
    </span>
    <OutlineHeartIcon :class="outlineClasses" :fill="wishlisted ? 'currentColor' : 'none'" />
    <span class="ml-1">
      {{ title }}
    </span>
  </button>
</template>

<script>
import OutlineHeartIcon from '#ioc/icons/OutlineHeart'
import { defineComponent, ref, inject } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import useAddToWishlist from '#ioc/services/useAddToWishlist'
import useRemoveFromWishlist from '#ioc/services/useRemoveFromWishlist'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'

export default defineComponent({
  components: {
    OutlineHeartIcon,
  },

  props: {
    fillOnHover: {
      default: false,
      type: Boolean,
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { t } = useI18n()
    const wishlistStore = useWishlistStore()
    const addToWishlist = useAddToWishlist()
    const removeFromWishlist = useRemoveFromWishlist()
    const showErrorNotification = useShowErrorNotification()
    const Product = inject('$Product')
    const wishlisted = ref(wishlistStore.items.some((item) => item === Product.sku))

    return {
      t,
      wishlisted,
      addToWishlist,
      removeFromWishlist,
      showErrorNotification,
      Product,
    }
  },

  computed: {
    outlineClasses() {
      return this.fillOnHover
        ? [
            'lg:hover:stroke-pink-500',
            '!w-4',
            '!h-4',
            'md:!w-6',
            'md:!h-6',
            'transition',
            'duration-150',
            'ease-in-out',
            'lg:hover:scale-125',
          ]
        : []
    },
    classes() {
      return {
        'fill-on-hover': this.fillOnHover,
        'text-gray-400 hover:text-gray-500': !this.wishlisted,
        'text-pink-400 hover:text-pink-500': this.wishlisted,
        'hover:bg-gray-100': !this.fillOnHover,
      }
    },
  },

  methods: {
    async add() {
      try {
        this.wishlisted = true

        await this.addToWishlist(this.Product)
      } catch (error) {
        this.wishlisted = false

        this.showErrorNotification(error)
      }
    },
    async remove() {
      try {
        this.wishlisted = false

        await this.removeFromWishlist(this.Product)
      } catch (error) {
        this.wishlisted = true

        this.showErrorNotification(error)
      }
    },
    async resolveAddToWishlist() {
      if (this.wishlisted) {
        this.remove()
      } else {
        this.add()
      }
    },
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Add to favorites: Přidat do oblíbených
</i18n>
