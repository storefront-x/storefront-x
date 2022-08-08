const _once = new Set()

export default async (id: any, callback: any, fallback = () => undefined) => {
  if (_once.has(id)) return fallback()

  _once.add(id)

  await callback(id)
}
