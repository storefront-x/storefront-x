export default interface Locale {
  name: string
  locale: string
  prefix: string
  domain?: string
  [x: string]: any
}
