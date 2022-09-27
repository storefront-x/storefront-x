export default (on: any, config: any) => {
  for (const [key, value] of Object.entries(process.env)) {
    config.env[key] = value
  }

  return config
}
