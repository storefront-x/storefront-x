<template>
  <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
    <div v-if="cart.coupons.length" class="pt-6 px-4 sm:px-6">
      <div v-for="coupon in cart.coupons" :key="coupon.code" class="flex items-center mb-6">
        <div class="mr-2 grow" data-cy="applied-coupons">
          {{ coupon.code }}
        </div>
        <Button data-cy="button-remove-coupon" @click="onRemoveCoupon">
          <OutlineX />
        </Button>
      </div>
    </div>
    <div v-else>
      <a
        v-if="!isAdding"
        href="javascript:void(0)"
        class="flex gap-4 w-full p-6 text-primary-600 hover:text-primary-500 hover:underline"
        data-cy="button-add-coupon"
        @click="isAdding = true"
      >
        <OutlineCreditCard class="text-black" />
        <span>
          {{ t('haveCoupon') }}
        </span>
      </a>

      <SfxForm v-else class="py-6 px-4 sm:px-6" @submit="onSubmit">
        <FormInput validators="required" name="code" :label="t('couponCode')" data-cy="input-coupon-code" />
        <Button type="submit" color="primary" class="w-full mt-4" data-cy="button-apply-coupon">
          {{ t('applyCoupon') }}
        </Button>
      </SfxForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxForm from '#ioc/components/SfxForm'
import Button from '#ioc/atoms/Button'
import OutlineX from '#ioc/icons/OutlineX'
import OutlineCreditCard from '#ioc/icons/OutlineCreditCard'
import useI18n from '#ioc/composables/useI18n'
import useCart from '#ioc/composables/useCart'
import FormInput from '#ioc/molecules/FormInput'
import useRemoveCouponFromCart from '#ioc/services/useRemoveCouponFromCart'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useApplyCouponToCart from '#ioc/services/useApplyCouponToCart'
import { ref } from 'vue'

const { t } = useI18n()
const cart = useCart()
const removeCouponFromCart = useRemoveCouponFromCart()
const showErrorNotification = useShowErrorNotification()
const showSuccessNotification = useShowSuccessNotification()
const applyCouponToCart = useApplyCouponToCart()

const isAdding = ref(false)

const onRemoveCoupon = async () => {
  try {
    await removeCouponFromCart()
    showSuccessNotification('', t('couponRemoved'))
  } catch (e: any) {
    showErrorNotification(e)
  }
}

const onSubmit = async ({ code }: { code: string }) => {
  try {
    await applyCouponToCart(code)
    isAdding.value = false
    showSuccessNotification('', t('couponApplied'))
  } catch (e: any) {
    console.error(e)
    showErrorNotification(e)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  couponApplied: Váš kupón byl úspěšně uplatněn
  couponRemoved: Váš kupón byl úspěšně odstraněn
  applyCoupon: Přidat kupón
  haveCoupon: Máte kupón?
  couponCode: Kód vašeho kupónu
en-US:
  couponApplied: Your coupon was successfully applied
  couponRemoved: Your coupon was successfully removed
  applyCoupon: Apply coupon
  haveCoupon: Do you have coupon?
  couponCode: Your coupon code
</i18n>
