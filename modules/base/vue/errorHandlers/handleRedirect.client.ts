export default () => {
  return (error: any) => {
    if (error.__typename === 'Redirect') {
      window.location.href = error.url
    } else {
      throw error
    }
  }
}
