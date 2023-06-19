<template>
  <SideAccountMenu>
    <AccountDetail />
  </SideAccountMenu>
</template>

<script setup lang="ts">
import SideAccountMenu from '#ioc/organisms/SideAccountMenu'
import AccountDetail from '#ioc/templates/AccountDetail'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const emitPageViewLabel = useEmitPageViewLabel()

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.ACCOUNT)
})
</script>
