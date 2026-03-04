<template>
  <SideAccountMenu>
    <AccountDetail />
  </SideAccountMenu>
</template>

<script setup lang="ts">
import SideAccountMenu from '#ioc/organisms/SideAccountMenu'
import AccountDetail from '#ioc/templates/AccountDetail'
import { onMounted } from 'vue'
import useEmitPageViewAccountHomepage from '#ioc/bus/emitters/useEmitPageViewAccountHomepage'

const emitPageViewAccountHomepage = useEmitPageViewAccountHomepage()

onMounted(() => {
  emitPageViewAccountHomepage()
})
</script>
