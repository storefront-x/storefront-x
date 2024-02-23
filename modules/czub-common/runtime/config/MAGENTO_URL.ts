export default getUrl(globalThis.process?.env?.MAGENTO_URL)

function getUrl(url: string | undefined) {
  if (!url) {
    return undefined
  }
  const fixedUrl = url.startsWith('http') ? url : `https://${url}`
  return fixedUrl
}
