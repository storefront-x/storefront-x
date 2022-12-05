export default class Redirect extends Error {
  public url: string
  public status: number
  constructor(opts: { url: string; status: number }) {
    super(`redirect to ${opts.url} with status ${opts.status}`)
    this.url = opts.url
    this.status = opts.status
  }
}
