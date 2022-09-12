import sharp from 'sharp'
import LRU from 'lru-cache'
import IS_PRODUCTION from '#ioc/config/IS_PRODUCTION'

const IMAGE_RESIZER_CACHE_ENABLED = !IS_PRODUCTION

const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 3000

const ONE_YEAR = 31557600000

const cache = new LRU({
  max: 100,
})

export default async (req, res) => {
  try {
    await resizeImage(req, res)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

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
  const headers = {
    'Cache-Control': `max-age=${ONE_YEAR}`,
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
    return req.query.path
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
