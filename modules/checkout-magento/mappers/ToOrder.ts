export default (data: any) => ({
  orderNumber: data.order_number as string,
  redirectUrl: data.redirect_url as string,
})
