interface Data {
  title: string
  link: string
}

export default (data: Data) => ({
  title: data.title,
  link: data.link,
})
