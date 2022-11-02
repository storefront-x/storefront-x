<template>
  <div class="p-8">
    <h1>Unauthorized</h1>
    <form :action="BASIC_AUTH_REDIRECT_URL" method="POST">
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import BASIC_AUTH_REDIRECT_URL from '#ioc/config/BASIC_AUTH_REDIRECT_URL'
</script>
