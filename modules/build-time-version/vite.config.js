import { defineConfig } from 'vite'

const version = () => {
  const buildTime = new Date()
  const virtualFileId = 'virtual:build-time-version'

  return {
    name: 'build-time-version-plugin',
    resolveId(id) {
      if (id === virtualFileId) {
        return virtualFileId
      }
    },
    load(id) {
      if (id === virtualFileId) {
        return `export default '${buildTime.toISOString()}'`
      }
    },
  }
}

export default defineConfig({
  plugins: [version()],
})
