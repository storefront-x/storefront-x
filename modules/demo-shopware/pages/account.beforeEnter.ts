// import useCookies from '#ioc/composables/useCookies'
// import SHOPWARE_TOKEN_COOKIE_NAME from '#ioc/config/SHOPWARE_TOKEN_COOKIE_NAME'

export default (to: any, from: any, next: any) => {
  // const cookies = useCookies()
  // const token = cookies.get(SHOPWARE_TOKEN_COOKIE_NAME)
  if (
    // make sure the user is authenticated
    // !token &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
}
