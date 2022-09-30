export default (gql: any, ...args: any) => {
  if (args.length === 1) {
    const fields = args[0]

    gql.fields(fields)
  } else if (args.length === 2) {
    const path = args[0].split('.')
    const fields = args[1]

    for (const part of path) {
      gql = gql._fields[part]
    }

    gql.fields(fields)
  }
}
