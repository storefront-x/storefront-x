import ToBundleOption from '#ioc/mappers/ToBundleOption'

export default (currency: string) => (data: any) => ({
  id: data.option_id ?? null,
  options: (data.options ?? []).map(ToBundleOption(currency)),
  type: data.type ?? 'checkbox',
  sku: data.sku ?? null,
  title: data.title ?? '',
  required: data.required ?? false,
})
