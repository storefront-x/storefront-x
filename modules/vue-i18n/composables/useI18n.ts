import { useI18n } from 'vue-i18n'

export default () => {
  const i18n = useI18n()

  const d = i18n.d

  i18n.d = (a: any, b = 'default', ...args: []) => {
    if (a === null) {
      return ''
    }

    return d(a, b, ...args)
  }

  return i18n
}
