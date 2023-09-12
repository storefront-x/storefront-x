const buildTime = new Date()

export default () => {
  const virtualFileId = 'virtual:build-time-version'
  const resolvedVirtualFileId = '\0' + virtualFileId

  return {
    name: 'build-time-version-plugin',
    resolveId(id: string) {
      if (id === virtualFileId) {
        return virtualFileId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualFileId) {
        return `export default ${JSON.stringify(buildTime)}`
      }
    },
  }
}
