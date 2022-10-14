import { useI18n } from 'vue-i18n'

export default () => {
  const i18n = useI18n()

  const d = i18n.d
  //@ts-ignore
  i18n.d = (a, b = 'default', ...args) => d(a, b, ...args)

  return i18n
}
