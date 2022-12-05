<template>
  <Component :is="$page" v-bind="{ pathMatch: router.$pathMatch }" />
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'
import { inject } from 'vue'

const router = useRouter()

const $page = inject('$page')
</script>
