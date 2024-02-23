export default (error: any): boolean =>
  error?.message ===
  'It is not possible to complete the order. Check Minimum Order Amount/Maximum Order Amount or Minimum Order Qty settings'
