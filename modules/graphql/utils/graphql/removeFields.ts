export default (gql: any, ...args: any) => {
  if (args.length === 1) {
    const fields = args[0]

    for (const field of fields) {
      delete gql._fields[field]
    }
  } else if (args.length === 2) {
    const path = args[0].split('.')
    const fields = args[1]

    for (const part of path) {
      gql = gql._fields[part]
    }

    for (const field of fields) {
      delete gql._fields[field]
    }
  }
}
