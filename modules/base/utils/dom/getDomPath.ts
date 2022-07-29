/**
 * Returns DOM path to the element.
 * Can be used in document.querySelector to retrieve the same element if its position hasn't changed.
 */
export default (el: HTMLElement): string => {
  const stack = []

  while (el.parentNode != null) {
    let sibCount = 0
    let sibIndex = 0

    for (let i = 0; i < el.parentNode.childNodes.length; i++) {
      const sib = el.parentNode.childNodes[i]

      if (sib.nodeName === el.nodeName) {
        sibCount++

        if (sib === el) {
          sibIndex = sibCount

          break
        }
      }
    }

    if (el.hasAttribute('id') && el.id !== '') {
      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id)
    } else if (sibCount > 1) {
      stack.unshift(el.nodeName.toLowerCase() + ':nth-of-type(' + sibIndex + ')')
    } else {
      stack.unshift(el.nodeName.toLowerCase())
    }

    el = el.parentNode as HTMLElement
  }

  return stack.slice(1).join(' > ')
}
