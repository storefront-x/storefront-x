<template>
  <div>
    <fieldset>
      <div class="text-black font-bold text-sm sm:text-lg px-4 md:px-0 pt-4 text-center sm:text-left">
        {{ addressLabel }}
      </div>
      <div class="bg-white rounded-small border border-primary-500">
        <label class="p-4 flex w-full flex-col text-center sm:text-left">
          <span class="text-black">
            <strong>{{ address.firstName }}</strong></span
          >
          <span class="text-black block">
            {{ address.street }}
          </span>

          <span class="text-black block">{{ address.city }}, {{ address.zipcode }}</span>

          <span class="text-black block">
            {{ address.countryCode }}
          </span>

          <span v-if="customerCompanyId" class="text-black block"> IČO {{ customerCompanyId }} </span>
        </label>
      </div>
    </fieldset>
  </div>
</template>
<script setup lang="ts">
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'
import { PropType } from 'vue'

defineProps({
  addressLabel: {
    type: String,
    default: '',
    required: true,
  },
  address: {
    type: Object as PropType<ReturnType<typeof ToCustomerAddress>>,
    required: true,
  },
  customerCompanyId: {
    type: String,
    default: '',
  },
})
</script>
