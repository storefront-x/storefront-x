export default interface Extension<Ext = Record<string, never>> {
  <T extends (...arg: any) => any>(self: T): (...arg: any) => ReturnType<T> & Ext
}
