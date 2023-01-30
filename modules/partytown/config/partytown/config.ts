export default {
  debug: false,
  forward: [] as string[],
  add(...args: string[]) {
    this.forward.push(...args)
  },
}
