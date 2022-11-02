import useCustomerStore from '#ioc/stores/useCustomerStore'

export default (to, ctx) => {
  const store = useCustomerStore()
  const isRestricted = to.path.includes('account')
  if (isRestricted && to.name !== 'sign-in' && !store.customer) {
    ctx.redirect = '/sign-in'
    return { name: 'sign-in', force: true }
  } else {
    return true
  }
}
