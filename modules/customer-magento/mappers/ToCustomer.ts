import toDate from '#ioc/utils/date/toDate'

export default (data: any) => ({
  email: data.email ?? '',
  firstName: data.firstname ?? '',
  lastName: data.lastname ?? '',
  middleName: data.middlename,
  prefix: data.prefix,
  suffix: data.suffix,
  dateOfBirth: toDate(data.date_of_birth),
  gender: Number(data.gender),
  isSubscribed: data.is_subscribed,
})
