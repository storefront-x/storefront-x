<template>
  <div
    class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
  >
    <div class="p-4">
      <div class="flex justify-between items-center">
        <div class="flex-shrink-0">
          <OutlineCheckCircle v-if="notification.level === 'SUCCESS'" class="text-green-400" />
          <OutlineX v-if="notification.level === 'ERROR'" class="text-red-400" />
        </div>
        <div class="ml-3 w-0 flex-1">
          <p v-if="notification.title" class="font-medium text-gray-900 mb-1">
            {{ notification.title }}
          </p>
          <p v-if="notification.message" class="text-gray-700" data-cy="notification-body">
            {{ notification.message }}
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            @click="hide"
          >
            <span class="sr-only">{{ t('Close') }}</span>
            <SolidX />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OutlineCheckCircle from '#ioc/icons/OutlineCheckCircle'
import OutlineX from '#ioc/icons/OutlineX'
import SolidX from '#ioc/icons/SolidX'
import useI18n from '#ioc/composables/useI18n'
import useHideNotification from '#ioc/composables/useHideNotification'
import ToNotification from '#ioc/mappers/ToNotification'
import { PropType } from 'vue'

const { t } = useI18n()
const hideNotification = useHideNotification()

const props = defineProps({
  notification: {
    type: Object as PropType<ReturnType<typeof ToNotification>>,
    required: true,
  },
})

const hide = () => hideNotification(props.notification)
</script>

<i18n lang="yaml">
cs-CZ:
  Close: Zavřít
</i18n>
