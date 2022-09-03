import toDate from '#ioc/utils/date/toDate'

export default (data: any) => ({
  date: toDate(data.date) ?? '',
  downloadUrl: data.download_url ?? '',
  orderIncrementId: data.order_increment_id ?? '',
  remainingDownloads: data.remaining_downloads ?? '',
  status: data.status ?? '',
})
