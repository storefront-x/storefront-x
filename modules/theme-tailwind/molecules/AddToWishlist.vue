<template>
  <button
    type="button"
    class="rounded-md flex items-center justify-center"
    :class="classes"
    data-cy="add-to-wishlist"
    @click="wishlistAddOrRemove"
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
import { defineComponent } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import useWishlist from '#ioc/composables/useWishlist'
import useAddToWishlist from '#ioc/services/useAddToWishlist'
import useRemoveFromWishlist from '#ioc/services/useRemoveFromWishlist'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'

export default defineComponent({
  components: {
    OutlineHeartIcon,
  },

  inject: ['$Product'],
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
    const wishlist = useWishlist()
    const addToWishlist = useAddToWishlist()
    const removeFromWishlist = useRemoveFromWishlist()
    const showErrorNotification = useShowErrorNotification()

    return {
      t,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      showErrorNotification,
    }
  },

  computed: {
    wishlisted() {
      if (!this.wishlist.items) return false

      return this.wishlist.items.some((item) => item.product.id === this.$Product.id)
    },

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
    async wishlistAddOrRemove() {
      try {
        if (this.wishlisted) {
          await this.removeFromWishlist(this.$Product)
        } else {
          const { userErrors } = await this.addToWishlist(this.$Product)
          if (userErrors?.length) {
            this.showErrorNotification(new Error(userErrors[0].message))
          }
        }
      } catch (e) {
        this.showErrorNotification(e)
      }
    },
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Add to favorites: Přidat do oblíbených
</i18n>
