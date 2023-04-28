import { eventHandler } from 'h3'

export default eventHandler(async () => {
  //@ts-ignore
  return global.debugToolsData
})
