export default class Redirect extends Error {
  public __typename = 'Redirect'
  public url: string
  public status: number
  public redirectNotification: { level: string; message: string } | null

  constructor(opts: { url: string; status: number; redirectNotification?: { level: string; message: string } | null }) {
    super(`redirect to ${opts.url} with status ${opts.status}`)
    this.redirectNotification = opts.redirectNotification || null
    this.url = this.redirectNotification
      ? opts.url + '?' + new URLSearchParams({ ...this.redirectNotification, redirectNotification: 'true' }).toString()
      : opts.url
    this.status = opts.status
  }
}
