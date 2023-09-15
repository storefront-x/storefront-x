export default () => {
  return async (currentVersion: string): Promise<boolean> => {
    const body = JSON.stringify({
      version: currentVersion,
    })
    const request = new Request('/_version', {
      method: 'POST',
      body,
    })

    const response = await fetch(request)
    const { reload } = await response.json()
    return reload
  }
}
