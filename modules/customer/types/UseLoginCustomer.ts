interface Options {
  redirect?: string
}

export default interface UseLoginCustomer {
  (): (email: string, password: string, options?: Options) => void
}
