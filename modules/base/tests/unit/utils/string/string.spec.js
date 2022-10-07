import { describe, it, vi, expect } from 'vitest'
import hashCode from '#ioc/utils/string/hashCode'
import uuid from '#ioc/utils/string/uuid'
import truncate from '#ioc/utils/string/truncate'
import multireplace from '#ioc/utils/string/multireplace'
import htmlDecode from '#ioc/utils/string/htmlDecode'
import stripTags from '#ioc/utils/string/stripTags'
import stripHtml from '#ioc/utils/string/stripHtml'
import toBase64 from '#ioc/utils/string/toBase64'
import fromBase64 from '#ioc/utils/string/fromBase64'

describe('utils/string', () => {
  describe('hashCode', () => {
    it('hashes strings', () => {
      expect(hashCode('a')).toBe(hashCode('a'))
      expect(hashCode('a')).not.toBe(hashCode('b'))
    })
  })

  describe('uuid', () => {
    it('generates random uuids', () => {
      expect(uuid()).not.toBe(uuid())
    })
  })

  describe('truncate', () => {
    it('truncates long test', () => {
      expect(truncate('abc def ghk', 12)).toBe('abc def ghk')
      expect(truncate('abc def ghk', 11)).toBe('abc def ghk')
      expect(truncate('abc def ghk', 10)).toBe('abc def...')
      expect(truncate('abc def ghk', 9)).toBe('abc...')
      expect(truncate('abc def ghk', 8)).toBe('abc...')
      expect(truncate('abc def ghk', 7)).toBe('abc...')
      expect(truncate('abc def ghk', 6)).toBe('abc...')
      expect(truncate('abc def ghk', 5)).toBe('...')
      expect(truncate('abc def ghk', 4)).toBe('...')
    })
  })

  describe('multireplace', () => {
    it('replaces based on index object', () => {
      const index = {
        a: 'A',
        bb: 'BBB',
      }

      expect(multireplace('abcaabbcc', index)).toBe('AbcAABBBcc')
      expect(multireplace('a\na', index)).toBe('A\nA')
    })
  })

  describe('htmlDecode', () => {
    it('decodes escaped HTML', () => {
      expect(htmlDecode('&lt;h1&gt;Hello, World&lt;/h1&gt;')).toEqual('<h1>Hello, World</h1>')
    })
  })

  describe('stripTags', () => {
    it('strips html tags', () => {
      expect(
        stripTags(
          '<h1 class="h1">H1</h1><script>Script</script><style scoped>Style</style><div>Div</div><img src="https://url.com" /><hr /><table><td></td></table>',
        ),
      ).toEqual('H1ScriptStyleDiv')
    })
  })

  describe('stripHtml', () => {
    it('strips html tags and remove styles and scripts completely', () => {
      expect(
        stripHtml(
          '<h1 class="h1">H1</h1><script>document.getElementById("someElement").style.color="#eee" </script>' +
            '<style>.someClass { background-color: #eeee }</style><div>Div</div>' +
            '<img src="https://url.com" /><hr /><table><td>Cell</td></table>',
        ),
      ).toEqual('H1DivCell')
    })
  })

  describe('Base64 conversion', () => {
    it('toBase64 client', () => {
      expect(toBase64('inputText')).toEqual('aW5wdXRUZXh0')
    })

    it('toBase64 server', () => {
      vi.mock('#ioc/config/IS_SERVER', () => {
        return {
          default: { myDefaultKey: true },
        }
      })
      expect(toBase64('inputText')).toEqual('aW5wdXRUZXh0')
    })

    it('fromBase64 client', () => {
      expect(fromBase64('aW5wdXRUZXh0')).toEqual('inputText')
    })

    it('fromBase64 server', () => {
      vi.mock('#ioc/config/IS_SERVER', () => {
        return {
          default: { myDefaultKey: true },
        }
      })
      expect(fromBase64('aW5wdXRUZXh0')).toEqual('inputText')
    })
  })
})
