export default class Redirect extends Error {
  public __typename = 'Redirect'
  public url: string
  private urlWithoutNotification: string
  public status: number
  public redirectNotification: { level: string; message: string } | null

  constructor(opts: { url: string; status: number; redirectNotification?: { level: string; message: string } | null }) {
    super(`redirect to ${opts.url} with status ${opts.status}`)
    this.redirectNotification = opts.redirectNotification || null
    this.urlWithoutNotification = opts.url
    this.url = this.redirectUrl
    this.status = opts.status
  }

  get redirectUrl() {
    if (!this.redirectNotification) {
      return this.urlWithoutNotification
    }
    if (this.urlWithoutNotification.includes('?')) {
      return (
        this.urlWithoutNotification +
        '&' +
        new URLSearchParams({ ...this.redirectNotification, redirectNotification: 'true' }).toString()
      )
    } else {
      return (
        this.urlWithoutNotification +
        '?' +
        new URLSearchParams({ ...this.redirectNotification, redirectNotification: 'true' }).toString()
      )
    }
  }
}
