interface Partytown {
  debug: boolean
  forward: string[]
  add: any
}

export default (): Partytown => {
  return {
    debug: true,
    forward: [],
    add(...args: string[]) {
      this.forward.push(...args)
    },
  }
}
