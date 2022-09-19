<template>
  <Container class="max-w-xl py-16">
    <h1 class="text-sm font-semibold uppercase tracking-wide text-primary-600" data-cy="thank-you">
      {{ t('Thank you!') }}
    </h1>
    <p class="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{{ t("It's on the way!") }}</p>
    <p class="mt-2 text-base text-gray-500">
      {{ t('Your order #{0} has shipped and will be with you soon.', [route.query.orderNumber]) }}
    </p>

    <dl class="mt-12 text-sm font-medium">
      <dt class="text-gray-900">{{ t('Tracking number') }}</dt>
      <dd class="text-4xl text-primary-600 mt-2">{{ route.query.orderNumber }}</dd>
    </dl>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import useI18n from '#ioc/composables/useI18n'
import useRoute from '#ioc/composables/useRoute'
const { t } = useI18n()
const route = useRoute()
</script>

<i18n lang="yaml">
cs-CZ:
  Thank you!: Děkujeme!
  It's on the way!: Zásilka je na cestě!
  'Your order #{0} has shipped and will be with you soon.': 'Vaše objednávka číslo #{0} byla odeslána a bude u Vás co nejdříve.'
  Tracking number: Sledovací číslo
</i18n>
