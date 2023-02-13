<template>
  <div
    aria-live="assertive"
    class="fixed top-12 md:top-36 right-0 left-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <Notification
        v-for="notification in notifications.notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Notification from '#ioc/molecules/Notification'
import useNotifications from '#ioc/composables/useNotifications'

const notifications = useNotifications()
</script>
