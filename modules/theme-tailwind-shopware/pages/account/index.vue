<template>
  <SideAccountMenu>
    <AccountDetail />
  </SideAccountMenu>
</template>

<script lang="ts">
import SideAccountMenu from '#ioc/organisms/SideAccountMenu'
import AccountDetail from '#ioc/templates/AccountDetail'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    AccountDetail,
    SideAccountMenu,
  },
})
</script>
