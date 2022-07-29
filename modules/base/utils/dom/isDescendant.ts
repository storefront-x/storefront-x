export default (parent: Node, child: Node) => {
  let node = child.parentNode

  while (node != null) {
    if (node === parent) {
      return true
    }

    node = node.parentNode
  }

  return false
}
