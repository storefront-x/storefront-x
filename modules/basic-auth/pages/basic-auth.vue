<template>
  <div>
    <h1>Unathorized</h1>
    <form :action="url" method="POST">
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { BASIC_AUTH_REDIRECT_URL } from '@ioc/config'

export default {
  layout: 'basic-auth',

  computed: {
    url() {
      return BASIC_AUTH_REDIRECT_URL
    },
  },
}
</script>

<style scoped>
div {
  padding: 2rem;
}
</style>
