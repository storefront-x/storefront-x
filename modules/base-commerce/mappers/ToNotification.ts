interface Data {
  id: string
  title: string
  message: string
  level: string
}

export default (data: Data) => ({
  id: data.id,
  title: data.title,
  message: data.message,
  level: data.level,
})
