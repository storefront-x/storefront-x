let supportsWebp: boolean | null = null

export default () => {
  if (supportsWebp !== null) return supportsWebp

  const elem = document.createElement('canvas')

  if (elem.getContext && elem.getContext('2d')) {
    // was able or not to get WebP representation
    supportsWebp = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  } else {
    // very old browser like IE 8, canvas not supported
    supportsWebp = false
  }

  return supportsWebp
}
