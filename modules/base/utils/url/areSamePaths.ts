export default (urlPath: string, newPath: string) => {
  if (newPath === urlPath) {
    return null
  }

  if (newPath === '/' + urlPath + '/') {
    return null
  }

  if (newPath === '/' + urlPath) {
    return null
  }

  return newPath
}
