<template>
  <div class="p-8">
    <h1>Unauthorized</h1>
    <form :action="url" method="POST">
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import BASIC_AUTH_REDIRECT_URL from '#ioc/config/BASIC_AUTH_REDIRECT_URL'

import { computed } from 'vue'

const url = computed(() => BASIC_AUTH_REDIRECT_URL)
</script>
