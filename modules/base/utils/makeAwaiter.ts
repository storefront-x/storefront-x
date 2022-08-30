export default <T>() => {
  const resolvers: any[] = []

  return {
    wait: () => {
      return new Promise<T>((resolve, reject) => {
        resolvers.push({ resolve, reject })
      })
    },
    resolve: (value?: T) => {
      for (const resolver of resolvers) {
        resolver.resolve(value)
      }
    },
    reject: (err: any) => {
      for (const resolver of resolvers) {
        resolver.reject(err)
      }
    },
  }
}
