import useHead from '#ioc/composables/useHead'

export default (data: any) => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(data),
      },
    ],
  })
}
