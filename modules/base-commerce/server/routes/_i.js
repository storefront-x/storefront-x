import { eventHandler, setResponseStatus } from 'h3'
import sharp from 'sharp'
import LRU from 'lru-cache'
import IS_PRODUCTION from '#ioc/config/IS_PRODUCTION'
import plugins from '~/.sfx/baseCommerce/imageResizer'

const IMAGE_RESIZER_CACHE_ENABLED = !IS_PRODUCTION

const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 3000

const cache = new LRU({
  max: 100,
})

export default eventHandler(async (event) => {
  try {
    await resizeImage(event.node.req, event.node.res)
  } catch (error) {
    setResponseStatus(event, 500)
    return error.message
  }
})

const resizeImage = async (req, res) => {
  if (IMAGE_RESIZER_CACHE_ENABLED) {
    const cachedBuffer = getBufferFromCache(req.url)

    if (cachedBuffer) {
      return sendBuffer(req, res, cachedBuffer)
    }
  }

  const path = getPath(req)
  const format = getFormat(req)
  const { width, height } = getSize(req)
  const fit = getFit(req)
  const background = getBackground(req)

  const image = await fetchImage(path)

  if (format !== 'png') {
    image.flatten({
      background,
    })
  }

  if (width > 0 && height > 0) {
    image.resize({
      width,
      height,
      fit,
      background: format !== 'png' ? background : { r: 1, g: 1, b: 1, alpha: 0 },
    })
  }

  image.toFormat(format, {
    quality: 80,
  })

  const buffer = await image.toBuffer()

  if (IMAGE_RESIZER_CACHE_ENABLED) {
    addBufferToCache(req.url, buffer)
  }

  return sendBuffer(req, res, buffer)
}

const sendBuffer = (req, res, buffer) => {
  const format = getFormat(req)

  const ONE_YEAR = '31536000'

  const headers = {
    'Cache-Control': `public, max-age=${ONE_YEAR}, immutable`,
    'Content-Type': `image/${format}`,
  }

  return res.set(headers).send(buffer)
}

const fetchImage = async (path) => {
  const options = {
    responseType: 'arraybuffer',
    headers: {},
  }

  const response = await fetch(path, options)

  if (response.status === 404) {
    throw new Error('Source image not found')
  }

  const data = await response.arrayBuffer()

  return sharp(Buffer.from(data))
}

const getPath = (req) => {
  if (req.query.sfx) {
    return `http://${SERVER_HOST}:${SERVER_PORT}` + req.query.sfx
  } else if (req.query.path) {
    let path = req.query.path

    for (const plugin of Object.values(plugins)) {
      if (plugin.processPath) {
        path = plugin.processPath(path)
      }
    }

    return path
  } else {
    throw new Error('Missing image location parameter')
  }
}

const getFormat = (req) => {
  switch (req.query.format) {
    case 'jpeg':
      return 'jpeg'
    case 'webp':
      return 'webp'
    case 'png':
      return 'png'
    default:
      return 'jpeg'
  }
}

const getSize = (req) => {
  const width = parseInt(req.query.w) || 0
  const height = parseInt(req.query.h) || 0

  return { width, height }
}

const getFit = (req) => {
  return req.query.fit || 'cover'
}

const getBackground = (req) => {
  return req.query.bg || '#FFFFFF'
}

const addBufferToCache = (url, buffer) => cache.set(url, buffer)

const getBufferFromCache = (url) => cache.get(url)
