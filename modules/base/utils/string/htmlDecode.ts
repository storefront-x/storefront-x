import multireplace from '#ioc/utils/string/multireplace'

const _htmlDecodeIndex = {
  '&lt;': '<',
  '&gt;': '>',
}

/**
 * @param {string} str
 * @returns {string}
 */
export default (str: string) => {
  return multireplace(str, _htmlDecodeIndex)
}
