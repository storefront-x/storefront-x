export default (src: string, { async = true } = {}) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    script.async = async

    script.onload = resolve
    script.onerror = reject

    document.head.appendChild(script)
  })
}
