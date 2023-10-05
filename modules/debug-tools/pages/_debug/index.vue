<template>
  <div class="page">
    <Section title="Server requests" open>
      <Section v-for="(record, i) in records" :key="i" :title="`${record.url} - ${formatTime(record.time)}`">
        <Section v-for="(request, j) in record.requests" :key="j" :title="request.name">
          <Section title="URL" open>
            <Code :content="request.url" />
          </Section>

          <Section v-for="(field, k) in request.fields" :key="k" :title="field.title" :open="field.openByDefault">
            <Code :content="field.value" />
          </Section>

          <Section title="Request headers" open>
            <Code :content="request.requestHeaders" />
          </Section>

          <Section title="Response headers">
            <Code :content="request.responseHeaders" />
          </Section>

          <Section title="Response">
            <Code :content="request.response" />
          </Section>
        </Section>
      </Section>
    </Section>
  </div>
</template>

<script setup lang="ts">
import Section from '#ioc/components/debugTools/Section'
import Code from '#ioc/components/debugTools/Code'
import { onMounted, ref } from 'vue'

const records = ref([])

onMounted(async () => {
  const response = await fetch('_debugData')

  records.value = await response.json()
})

const formatTime = (time: number) => {
  const date = new Date(time)

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}
</script>

<style scoped>
.page {
  margin-bottom: 50rem;
}
</style>
