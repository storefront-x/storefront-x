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

<script setup lang="ts">
import OutlineHeartIcon from '#ioc/icons/OutlineHeart'
import { ref, computed } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import useWishlistStore from '#ioc/stores/useWishlistStore'
import useAddToWishlist from '#ioc/services/useAddToWishlist'
import useRemoveFromWishlist from '#ioc/services/useRemoveFromWishlist'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import injectProduct from '#ioc/composables/injectProduct'

const props = defineProps({
  fillOnHover: {
    default: false,
    type: Boolean,
  },
  title: {
    type: String,
    default: '',
  },
})

const { t } = useI18n()
const wishlistStore = useWishlistStore()
const addToWishlist = useAddToWishlist()
const removeFromWishlist = useRemoveFromWishlist()
const showErrorNotification = useShowErrorNotification()
const product = injectProduct()
const wishlisted = ref(wishlistStore.items.some((item) => item === product.sku))

const outlineClasses = computed(() => {
  return props.fillOnHover
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
})
const classes = computed(() => {
  return {
    'fill-on-hover': props.fillOnHover,
    'text-gray-400 hover:text-gray-500': !wishlisted.value,
    'text-pink-400 hover:text-pink-500': wishlisted.value,
    'hover:bg-gray-100': !props.fillOnHover,
  }
})

const add = async () => {
  try {
    wishlisted.value = true

    await addToWishlist(product)
  } catch (error) {
    wishlisted.value = false

    showErrorNotification(error)
  }
}
const remove = async () => {
  try {
    wishlisted.value = false

    await removeFromWishlist(product)
  } catch (error) {
    wishlisted.value = true

    showErrorNotification(error)
  }
}
const resolveAddToWishlist = () => {
  if (wishlisted.value) {
    remove()
  } else {
    add()
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Add to favorites: Přidat do oblíbených
</i18n>
