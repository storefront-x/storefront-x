<template>
  <div class="bg-gray-50 h-full">
    <div class="max-w-2xl mx-auto pt-6 md:pt-8 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="mb-8 md:mb-16 text-3xl md:text-4xl text-center font-bold">{{ t('Checkout') }}</h1>

      <div v-if="cart.items.length" class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <OrderSummary class="lg:hidden mb-10" />

        <div>
          <div class="lg:sticky lg:top-5">
            <div class="mt-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CheckoutAddreses
                  v-if="cart.shippingAddress"
                  :address-label="`${t('shippingAddressLabel')}`"
                  :address="cart.shippingAddress"
                />
                <CheckoutAddreses
                  v-if="cart.billingAddress"
                  :address-label="`${t('billingAddressLabel')}`"
                  :address="cart.billingAddress"
                  :customer-company-id="customer.customerCompanyId"
                />
              </div>
            </div>
          </div>
        </div>

        <OrderSummary bottom class="mt-10 lg:mt-0" />
      </div>

      <Heading v-else-if="cart.isLoaded" :level="3" class="text-center" data-cy="empty-cart-notification">
        {{ t('emptyCart') }}
      </Heading>

      <Heading v-else :level="3" class="text-center">
        {{ t('cartLoading') }}
      </Heading>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import useCart from '#ioc/composables/useCart'
import useI18n from '#ioc/composables/useI18n'
import OrderSummary from '#ioc/organisms/OrderSummary'
import { computed, onMounted, provide } from 'vue'
import useHead from '#ioc/composables/useHead'
import useEmitPageViewCheckout from '#ioc/bus/emitters/useEmitPageViewCheckout'
import CheckoutAddreses from '#ioc/molecules/CheckoutAddreses'
import usePrepareCheckout from '#ioc/services/usePrepareCheckout'
import useCheckout from '#ioc/composables/useCheckout'
import useCustomer from '#ioc/composables/useCustomer'

const { t } = useI18n()
const cart = useCart()
const checkout = useCheckout()
const customer = useCustomer()
const prepareCheckout = usePrepareCheckout()

const emitPageViewCheckout = useEmitPageViewCheckout()

const isDisabled = computed(
  () =>
    cart.isShippingMethodSelected &&
    cart.isPaymentMethodSelected &&
    cart.isShippingAddressSelected &&
    cart.isBillingAddressSelected &&
    checkout.isDeliveryDateSelected,
)

const checkoutMsg = computed(() => {
  let checkoutMsg = ''

  if (!cart.isShippingMethodSelected) {
    checkoutMsg = t('Please select shipping method')
  } else if (!cart.isPaymentMethodSelected) {
    checkoutMsg = t('Please select payment method')
  } else if (!cart.isShippingAddressSelected) {
    checkoutMsg = t('Please select shipping address')
  } else if (!cart.isBillingAddressSelected) {
    checkoutMsg = t('Please select billing address')
  }

  return checkoutMsg
})

const isVisible = computed(() => {
  return isDisabled.value ? 'group-hover:none' : 'group-hover:flex'
})

provide('Checkout.message', checkoutMsg)
provide('Checkout.isDisabled', isDisabled)
provide('Checkout.isVisible', isVisible)
provide('checkoutGrid', true)

onMounted(async () => {
  emitPageViewCheckout()

  await prepareCheckout()
})

useHead({
  title: t('Checkout'),
})
</script>

<i18n lang="yaml">
cs-CZ:
  Checkout: Přehled objednávky
  Complete order for: Dokončit objednávku
  Customer note: Poznámka zákazníka
  Your message...: Vaše zpráva...
  Please select shipping method: Vyberte způsob dopravy
  Please select payment method: Vyberte prosím způsob platby
  Please select shipping address: Vyberte doručovací adresu
  Please select billing address: Vyberte fakturační adresu
  emptyCart: Váš košík je prázdný
  cartLoading: Váš košík se načítá
  min-order-value: Minimální hodnota objednávky {0} je {1} balíků.
  Choose cross-sell products: Nezapomněli jste na něco?
  Please select delivery date: Prosím vyberte datum doručení
  max-order-value: Maximální hodnota objednávky je {0}
  min-order-amount: Minimální hodnota objednávky je {0}
  neededQtyStep: '{0}: {1} ks'
  billingAddressLabel: Fakturační údaje
  shippingAddressLabel: Dodací adresa
sk-SK:
  Checkout: Prehľad objednávok
  Complete order for: Dokončite objednávku
  Customer note: Poznámka zákazníka
  Your message...: Vaša správa...
  Please select shipping method: Vyberte zpôsob dopravy
  Please select payment method: Vyberte prosím zpôsob platby
  Please select shipping address: Vyberte doručovaciu adresu
  Please select billing address: Vyberte fakturačnú adresu
  emptyCart: Váš košík je prázdny
  cartLoading: Váš košík sa načítava
  min-order-value: Minimálna hodnota objednávky {0} je {1} balíkov.
  Please select delivery date: Prosím vyberte dátum dodania
  Choose cross-sell products: Zabudli ste na niečo?
  max-order-value: Maximálna hodnota objednávky je {0}
  min-order-amount: Minimálna hodnota objednávky je {0}
  neededQtyStep: '{0}: {1} ks'
  billingAddressLabel: Fakturační údaje
  shippingAddressLabel: Dodací adresa
sl-SI:
  Checkout: Na blagajno
  Complete order for: Zaključi naročilo
  Customer note: Opomba stranke
  Your message...: Vaše sporočilo...
  Please select shipping method: Izberite način pošiljanja
  Please select payment method: Prosimo izberite način plačila
  Please select shipping address: Izberite naslov za dostavo
  Please select billing address: Izberite naslov za izstavitev računa
  emptyCart: Vaša košarica je prazna
  cartLoading: Vaš voziček se nalaga
  min-order-value: Minimalna vrednost naročila {0} je {1} paketov.
  Choose cross-sell products: Ne pozabi spakirati dodatnega
  neededQtyStep: '{0}: {1} kos.'
  billingAddressLabel: Naslov za pošiljanje računa
  shippingAddressLabel: Naslov za dostavo
hr-HR:
  Checkout: Završi narudžbo
  Complete order for: Završite narudžbo
  Customer note: Napomena stranke
  Your message...: Vaša poruka ...
  Please select shipping method: Odaberite način dostave
  Please select payment method: Odaberite način plaćanja
  Please select shipping address: Odaberite adresu za dostavu
  Please select billing address: Odaberite adresu za naplatu
  emptyCart: Vaša košarica je prazna
  cartLoading: Vaša se košarica učitava
  min-order-value: Minimalna vrednost naročila {0} je {1} paketov.
  Choose cross-sell products: Ne zaboravite spakirati dodatno
  neededQtyStep: '{0}: {1} kos.'
  billingAddressLabel: Adresa za slanje računa
  shippingAddressLabel: Adresa za dostavu
</i18n>
