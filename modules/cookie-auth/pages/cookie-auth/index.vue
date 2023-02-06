<template>
  <h1>Unauthorized</h1>
  <form :action="redirectUrl" method="POST">
    <input type="text" name="username" placeholder="Username" />
    <input type="password" name="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import redirectUrl from '#ioc/config/cookieAuth/redirectUrl'
</script>
