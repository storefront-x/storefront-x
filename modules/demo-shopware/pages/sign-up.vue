<template>
  <SignUp :country-data="countryData" :salutations-data="salutationsData" />
</template>

<script setup lang="ts">
import SignUp from '#ioc/templates/SignUp'

import useAsyncData from '#ioc/composables/useAsyncData'
import useGetCountries from '#ioc/services/useGetCountries'
import useGetSalutations from '#ioc/services/useGetSalutations'

const getCountries = useGetCountries()
const getSalutations = useGetSalutations()
const { data: countryData } = useAsyncData('countries', () => getCountries())
const { data: salutationsData } = useAsyncData('salutations', () => getSalutations())
</script>
