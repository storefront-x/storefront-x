export default (error: any): boolean =>
  error?.message === 'Delivery date is not up-to-date. Pleas update your delivery date'
