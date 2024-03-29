export default () => {
  return (error: any) => {
    if (error.__typename === 'Redirect') {
      // we do reload because sfx will get clean data
      window.location.href = error.url
    } else {
      throw error
    }
  }
}
