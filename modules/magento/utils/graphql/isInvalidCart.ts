export default (error: any): boolean =>
  ['Could not find a cart with ID', `The cart isn't active`].some((m) => error.message?.includes(m))
