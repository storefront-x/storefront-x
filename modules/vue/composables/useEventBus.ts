import { onUnmounted } from 'vue'

interface Listener {
  (payload: any): void
}

const listeners: Record<string, Listener[]> = {}

export default (eventName: string) => {
  const localListeners: Listener[] = []

  const emit = (payload: any) => {
    for (const listener of listeners[eventName]) {
      listener(payload)
    }
  }

  const listen = (listener: Listener) => {
    listeners[eventName] = listeners[eventName] ?? []
    listeners[eventName].push(listener)
    localListeners.push(listener)
  }

  onUnmounted(() => {
    for (const localListener of localListeners) {
      const targetGlobalListenerIndex = listeners[eventName].indexOf(localListener)
      if (targetGlobalListenerIndex != -1) {
        listeners[eventName].splice(targetGlobalListenerIndex, 1)
      }
    }
  })

  return { emit, listen }
}
