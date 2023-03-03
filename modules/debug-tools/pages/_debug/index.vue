<template>
  <h1>server requests</h1>
  <div>
    <div v-for="record in records" :key="record.time" class="sectiom">
      <a href="javascript:void(0)" @click="openRecords[record.time] = !openRecords[record.time]">
        {{ record.url }}
      </a>
      <div v-if="openRecords[record.time]">
        <div v-for="(request, i) in record.requests" :key="i" class="section">
          <a href="javascript:void(0)" @click="openRequests[i] = !openRequests[i]">
            {{ request.url }}
          </a>
          <div v-if="openRequests[i]">
            <pre>{{ request.json }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const records = Object.values(import.meta.glob('~/.sfx/debug/*.json', { eager: true })).map((module) => module.default)

const openRecords = reactive({})
const openRequests = reactive({})
</script>

<style scoped>
a {
  white-space: nowrap;
}

.section {
  padding-top: 0.5rem;
  padding-left: 0.5rem;
}
</style>
