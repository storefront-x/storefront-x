<script lang="ts">
import IS_SERVER from '#ioc/config/IS_SERVER'
import useToCmsPage from '#ioc/mappers/useToCmsPage'
import { defineComponent, h, PropType, VNode } from 'vue'
import magentoCmsBlocks from '~/.sfx/magento/cms/blocks'
import isNullish from '#ioc/utils/isNullish'
import once from '#ioc/utils/once'

export default defineComponent({
  props: {
    cmsPage: {
      type: Object as PropType<ReturnType<ReturnType<typeof useToCmsPage>>>,
      default: () => ({}),
    },
  },

  async setup(props) {
    const parsed = await parse(props.cmsPage.content)

    const walked = await walk(parsed)

    return () => walked
  },
})

// Node.ELEMENT_NODE
const ELEMENT_NODE = 1

// NodeFilter.SHOW_ELEMENT
const SHOW_ELEMENT = 1

// NodeFilter.SHOW_TEXT
const SHOW_TEXT = 4

const parse = async (source: string): Promise<Document> => {
  let container: Document

  if (IS_SERVER) {
    const { Window } = await import('happy-dom')
    const window = new Window()
    const domParser = new window.DOMParser()
    container = domParser.parseFromString(source, 'text/html') as any
  } else {
    const domParser = new DOMParser()
    container = domParser.parseFromString(source, 'text/html')
  }

  return container
}

const createTreeWalker = async (root: Node, whatToShow?: number): Promise<TreeWalker> => {
  if (IS_SERVER) {
    const { Window } = await import('happy-dom')
    const window = new Window() as unknown as Window
    return window.document.createTreeWalker(root, whatToShow)
  } else {
    return document.createTreeWalker(root, whatToShow)
  }
}

const walk = async (el: Node): Promise<VNode[]> => {
  const resolved: VNode[] = []

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
    resolved.push(h(magentoCmsBlocks[ident], { el: currentNode }, () => children))

    currentNode = tree.nextSibling()
  }

  return resolved
}
</script>
