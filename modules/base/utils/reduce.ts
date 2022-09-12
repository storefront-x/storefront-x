import isString from '#ioc/utils/isString'

export default (array: any, by: any, mapper = (val: any) => val) => {
  return array.reduce((acc: any, val: any) => {
    acc[isString(by) ? by : by(val)] = mapper(val)

    return acc
  }, {})
}
