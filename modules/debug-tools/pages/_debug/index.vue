<template>
  <div class="page">
    <Section title="Server requests" open>
      <Section v-for="(record, i) in records" :key="i" :title="`${record.url} - ${formatTime(record.time)}`">
        <Section v-for="(request, j) in record.requests" :key="j" :title="request.name">
          <Section title="URL" open>
            <Code :content="request.url" />
          </Section>

          <Section title="Query" open>
            <Code :content="request.query" />
          </Section>

          <Section title="Variables" open>
            <Code :content="request.variables" />
          </Section>

          <Section title="Request headers" open>
            <Code :content="request.requestHeaders" />
          </Section>

          <Section title="Response headers">
            <Code :content="request.responseHeaders" />
          </Section>

          <Section title="Response" open>
            <Code :content="request.json" />
          </Section>
        </Section>
      </Section>
    </Section>
  </div>
</template>

<script setup lang="ts">
import Section from '#ioc/components/debugTools/Section'
import Code from '#ioc/components/debugTools/Code'

const records = Object.values(import.meta.glob('~/.sfx/debug/*.json', { eager: true })).map(
  (module: any) => module.default,
)

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
