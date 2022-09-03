<template>
  <FormCheckbox
    type="checkbox"
    :name="checkoutAgreement.name"
    :label="checkoutAgreement.checkboxText"
    validators="required"
  />
</template>

<script setup lang="ts">
import FormCheckbox from '#ioc/molecules/FormCheckbox'
import ToCheckoutAgreement from '#ioc/mappers/ToCheckoutAgreement'
import { PropType } from 'vue'

defineProps({
  checkoutAgreement: {
    type: Object as PropType<ReturnType<typeof ToCheckoutAgreement>>,
    required: true,
  },
})
</script>
