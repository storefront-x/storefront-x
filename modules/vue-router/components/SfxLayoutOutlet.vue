<template>
  <RouterView v-slot="{ Component: resolved, route }">
    <Suspense>
      <Component :is="resolved" :key="route.fullPath" />
    </Suspense>
  </RouterView>
</template>
