<template>
  <FormInput
    :label="t('Address')"
    name="street"
    autocomplete="street-address"
    class="mt-4 sm:col-span-2"
    validators="required"
  />

  <FormInput :label="t('City')" name="city" autocomplete="address-level2" class="mt-4" validators="required" />

  <FormInput
    :label="t('Postal code')"
    name="postcode"
    :inputmode="'decimal'"
    autocomplete="postal-code"
    class="mt-4"
    validators="required"
  />
</template>

<script setup lang="ts">
import FormInput from '#ioc/molecules/FormInput'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()
</script>

<i18n lang="yaml">
cs-CZ:
  Address: Adresa
  City: Město
  Postal code: PSČ
</i18n>
