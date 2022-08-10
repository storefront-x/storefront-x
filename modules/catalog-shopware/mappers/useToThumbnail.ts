export default () => (data: any) => ({
  id: data.id as string,
  url: data.url as string,
  mediaId: data.mediaId as string,
  createdAt: data.createdAt as string,
  width: data.width as number,
  height: data.height as number,
})
