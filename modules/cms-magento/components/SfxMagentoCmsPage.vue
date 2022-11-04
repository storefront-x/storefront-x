<script>
import IS_SERVER from '#ioc/config/IS_SERVER'
import { defineComponent, h } from 'vue'
import magentoCmsBlocks from '~/.sfx/magento/cms/blocks'
import isNullish from '#ioc/utils/isNullish'
import once from '#ioc/utils/once'

export default defineComponent({
  inheritAttrs: false,
  props: {
    cmsPage: {
      type: Object,
      default: () => ({}),
    },
  },

  async setup(props, { attrs }) {
    const parsed = await parse(props.cmsPage.content)

    const walked = await walk(parsed, attrs)

    return () => walked
  },
})

// Node.ELEMENT_NODE
const ELEMENT_NODE = 1

// NodeFilter.SHOW_ELEMENT
const SHOW_ELEMENT = 1

// NodeFilter.SHOW_TEXT
const SHOW_TEXT = 4

const PB_STYLE_ATTRIBUTE = 'data-pb-style'

const BODY_ID = 'html-body'

const parse = async (source) => {
  let container

  if (IS_SERVER) {
    const { Window } = await import('happy-dom')
    const window = new Window()
    const domParser = new window.DOMParser()
    container = domParser.parseFromString(source, 'text/html')
  } else {
    const domParser = new DOMParser()
    container = domParser.parseFromString(source, 'text/html')
  }

  container.body.id = BODY_ID
  convertToInlineStyles(container)

  return container
}

const createTreeWalker = async (root, whatToShow) => {
  if (IS_SERVER) {
    const { Window } = await import('happy-dom')
    const window = new Window()
    return window.document.createTreeWalker(root, whatToShow)
  } else {
    return document.createTreeWalker(root, whatToShow)
  }
}

const walk = async (el, attrs) => {
  const resolved = []

  const tree = await createTreeWalker(el, SHOW_ELEMENT | SHOW_TEXT)

  let currentNode = tree.nextNode()
  while (currentNode) {
    if (currentNode.nodeType !== ELEMENT_NODE) {
      currentNode = tree.nextNode()
      continue
    }

    if (currentNode.style?.display === 'none') {
      currentNode = tree.nextSibling()
      continue
    }

    const contentType = currentNode.getAttribute('data-content-type')

    if (!contentType) {
      currentNode = tree.nextNode()
      continue
    }

    const ident = `pb-${contentType}`

    if (isNullish(magentoCmsBlocks[ident])) {
      once(`PageBuilder block "${ident}" not registered. Nothing will be rendered.`, console.error)
      currentNode = tree.nextSibling()
      continue
    }

    const children = await walk(currentNode)
    resolved.push(h(magentoCmsBlocks[ident], { ...attrs, el: currentNode }, () => children))

    currentNode = tree.nextSibling()
  }

  return resolved
}

const convertToInlineStyles = (document) => {
  const styleBlocks = document.getElementsByTagName('style')
  const styles = {}

  if (styleBlocks.length === 0) return

  for (const styleBlock of Array.from(styleBlocks)) {
    const cssRules = styleBlock.sheet?.cssRules ?? []

    for (const rule of Array.from(cssRules)) {
      if (!rule.selectorText) continue

      const selectors = rule.selectorText.split(',').map((selector) => selector.trim())

      for (const selector of selectors) {
        if (!styles[selector]) styles[selector] = []

        styles[selector].push(rule.style)
      }
    }
  }

  for (const selector of Object.keys(styles)) {
    const element = document.querySelector(selector)

    if (!element) continue

    for (const style of styles[selector]) {
      element.setAttribute('style', element.style.cssText + style.cssText)
    }

    element.removeAttribute(PB_STYLE_ATTRIBUTE)
  }
}
</script>
