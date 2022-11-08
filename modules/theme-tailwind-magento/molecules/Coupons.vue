<template>
  <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
    <div v-if="cart.coupons.length" class="pt-6 px-4 sm:px-6">
      <div v-for="coupon in cart.coupons" :key="coupon.code" class="flex items-center mb-6">
        <div class="mr-2 grow" data-cy="coupon-applied">
          {{ coupon.code }}
        </div>
        <Button data-cy="coupon-remove" @click="onRemoveCoupon">
          <OutlineX />
        </Button>
      </div>
    </div>
    <div v-else>
      <a
        v-if="!isAdding"
        href="javascript:void(0)"
        class="flex gap-4 w-full p-6 text-primary-600 hover:text-primary-500 hover:underline"
        data-cy="add-coupon"
        @click="isAdding = true"
      >
        <OutlineCreditCard class="text-black" />
        <span>
          {{ t('Do you have coupon?') }}
        </span>
      </a>

      <SfxForm v-else class="py-6 px-4 sm:px-6" @submit="onSubmit">
        <FormInput validators="required" name="code" :label="t('Coupon code')" data-cy="coupon-code" />
        <Button type="submit" color="primary" class="w-full mt-4" data-cy="coupon-apply">
          {{ t('Apply') }}
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
import useApplyCouponToCart from '#ioc/services/useApplyCouponToCart'
import { ref } from 'vue'

const { t } = useI18n()
const cart = useCart()
const removeCouponFromCart = useRemoveCouponFromCart()
const showErrorNotification = useShowErrorNotification()
const applyCouponToCart = useApplyCouponToCart()

const isAdding = ref(false)

const onRemoveCoupon = async () => {
  await removeCouponFromCart()
}

const onSubmit = async ({ code }: { code: string }) => {
  try {
    await applyCouponToCart(code)
    isAdding.value = false
  } catch (e: any) {
    console.error(e)
    showErrorNotification(e)
  }
}
</script>
