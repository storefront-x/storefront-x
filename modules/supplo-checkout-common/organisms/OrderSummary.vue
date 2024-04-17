<template>
  <div>
    <div class="sticky top-0">
      <Heading :level="2" :class="bottom ? 'hidden lg:block' : ''">
        {{ t('Order summary') }}
      </Heading>

      <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 :class="bottom ? 'hidden lg:block' : ''" class="sr-only">Items in your cart</h3>
        <ul :class="bottom ? 'hidden lg:block' : ''" role="list" class="divide-y divide-gray-200 p-0">
          <OrderSummaryItem v-for="cartItem in cart.items" :key="cartItem.id" :cart-item="cartItem" />
        </ul>
        <dl :class="bottom ? 'lg:border-t' : 'border-t'" class="border-gray-200 py-6 px-4 space-y-6 sm:px-6">
          <div class="flex items-center justify-between">
            <dt>{{ t('Shipping') }}</dt>
            <p v-if="isFree" class="text-green-600">{{ t('FREE') }}</p>
            <SfxMoney v-else :money="cart.shippingPrice" el="dd" class="text-gray-900" />
          </div>
          <div v-for="discount in cart.discounts" :key="discount.label" class="flex items-center justify-between">
            <dt>{{ discount.label }}</dt>
            <SfxMoney :money="discount.amount" el="dd" class="text-red-600" negate />
          </div>
          <div
            v-for="tax in cart.taxes"
            :key="tax.label"
            class="hidden items-center justify-between border-t border-gray-200 pt-6"
          >
            <dt class="text-sm">{{ tax.label }}</dt>
            <SfxMoney :money="tax.amount" el="dd" class="text-sm text-gray-900" />
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt class="text-xs font-bold">{{ t('Price for products') }}</dt>
            <SfxMoney :money="cart.subtotalExcludingTax" el="dd" class="text-xs font-bold text-gray-900" />
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-lg font-bold">
              <i18n-t tag="span" keypath="total-without-tax">
                <template #tax>
                  <span class="font-normal">{{ t('without-tax') }}</span>
                </template>
              </i18n-t>
            </dt>
            <SfxMoney :money="cart.grandTotalWithReturnable" el="dd" class="text-lg font-bold text-gray-900" />
          </div>
          <div class="flex items-center justify-between !mt-1">
            <dt class="text-base">
              <i18n-t tag="span" keypath="total-with-tax">
                <template #tax>
                  <span class="font-normal"> {{ t('with-tax') }}</span>
                </template>
              </i18n-t>
            </dt>
            <SfxMoney :money="cart.grandTotalWithReturnableWithVat" el="dd" class="text-basetext-gray-900" />
          </div>
        </dl>
      </div>
      <p class="text-sm ml-2 mb-0 italic mt-4">
        {{ t('order-summary-claim') }}
      </p>

      <div class="mt-4">
        <PlaceOrderButton v-if="checkout.customerPricesValid" :full-width="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import Heading from '#ioc/atoms/Heading'
import useCart from '#ioc/composables/useCart'
import useI18n from '#ioc/composables/useI18n'
import OrderSummaryItem from '#ioc/molecules/OrderSummaryItem'
import { computed } from 'vue'
import useCheckout from '#ioc/composables/useCheckout'
import PlaceOrderButton from '#ioc/molecules/PlaceOrderButton'

defineProps({
  bottom: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()
const cart = useCart()
const checkout = useCheckout()

const isFree = computed(() => cart.shippingPrice?.value === 0 && cart.shippingPrice.currency !== undefined)
</script>

<i18n lang="yaml">
cs-CZ:
  total-without-tax: Celkem {tax}
  total-with-tax: Celkem {tax}
  Order summary: Vaše produkty v objednávce
  Subtotal: Mezisoučet
  Shipping: Doprava
  Total: Celkem
  FREE: ZDARMA
  Price for products: 'Celková cena produktů:'
  without-tax: '(bez daně)'
  with-tax: '(s daní)'
  min-order-value: Minimální hodnota objednávky {0} je {1} balíků.
  order-summary-claim: '* Uvedená cena je pouze informativní a z důvodu zaokrouhlování může dojít k rozdílu mezi cenou v internetovém obchodě a cenou platnou podle vaší smlouvy.'
sl-SI:
  total-with-tax: Skupaj {tax}
  total-without-tax: Skupaj {tax}
  Order summary: Povzetek naročila
  Subtotal: Vmesna vsota
  Shipping: Dostava
  Total: Skupaj
  FREE: BREZPLAČNO
  Price for products: Skupna cena izdelkov
  without-tax: '(brez davka)'
  with-tax: '(z davkom)'
  min-order-value: Minimalna vrednost naročila {0} je {1} paketov.
  order-summary-claim: '* Prikazana cena je informativne narave in lahko zaradi zaokroževanja pride do odstopanja med ceno v spletni trgovini in ceno, ki velja po pogodbi s podjetjem Radenska d.o.o..'
hr-HR:
  total-with-tax: Zajedno {tax}
  total-without-tax: Zajedno {tax}
  Order summary: Sažetak narudžbe
  Subtotal: Međuzbroj
  Shipping: Dostava
  Total: Zajedno
  FREE: BESPLATNO
  Price for products: Ukupna cijena proizvoda
  without-tax: '(bez poreza)'
  with-tax: '(s porezom)'
  order-summary-claim: '* Navedena cijena je informativnog karaktera te je zbog zaokruživanja moguća razlika između cijene u web trgovini i cijene važeće prema Vašem ugovoru.'
sk-SK:
  total-without-tax: Celková suma {tax}
  total-with-tax: Spolu {tax}
  Order summary: Vaše produkty v objednávke
  Subtotal: Medzisúčet
  Shipping: Doprava
  Total: Celková suma
  FREE: ZDARMA
  Price for products: 'Celková cena produktov:'
  without-tax: '(bez dane)'
  with-tax: '(s daňou)'
  min-order-value: Minimálna hodnota objednávky {0} je {1} balíkov.
  order-summary-claim: '* Uvedená cena má len informatívny charakter a z dôvodu zaokrúhľovania môže byť rozdiel medzi cenou v internetovom obchode a cenou platnou podľa vašej zmluvy.'
</i18n>
