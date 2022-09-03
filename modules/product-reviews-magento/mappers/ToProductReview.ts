import toDate from '#ioc/utils/date/toDate'

export default (data: any) => ({
  averageRating: data.average_rating ?? 0,
  createdAt: toDate(data.created_at),
  nickname: data.nickname ?? '',
  summary: data.summary ?? '',
  text: data.text ?? '',
})
