import sharp from 'sharp'
import consola from 'consola'
import { eventHandler, setResponseStatus, H3Event, getQuery, setHeaders } from 'h3'
import plugins from '~/.sfx/baseCommerce/imageResizer'
import isString from '#ioc/utils/isString'

const logger = consola.withTag('image-resizer')

const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 3000

const ONE_YEAR = '31536000'

type QueryObject = ReturnType<typeof getQuery>

export default eventHandler(async (event) => {
  try {
    return await resizeImage(event)
  } catch (error: any) {
    logger.error(error)

    setResponseStatus(event, 500)

    return error.message
  }
})

const resizeImage = async (event: H3Event) => {
  const query = getQuery(event)

  const path = getPath(query)
  const format = getFormat(query)
  const { width, height } = getSize(query)
  const fit = getFit(query)
  const position = getPosition(query)
  const background = getBackground(query)

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
      position,
      background: format !== 'png' ? background : { r: 1, g: 1, b: 1, alpha: 0 },
    })
  }

  image.toFormat(format, {
    quality: 80,
  })

  setHeaders(event, {
    'Cache-Control': `public, max-age=${ONE_YEAR}, immutable`,
    'Content-Type': `image/${format}`,
  })

  return await image.toBuffer()
}

const fetchImage = async (path: string) => {
  const response = await fetch(path)

  if (response.status === 404) {
    throw new Error(`Source image not found: ${path}`)
  }

  const data = await response.arrayBuffer()

  return sharp(Buffer.from(data))
}

const getPath = (query: QueryObject): string => {
  if (query.sfx) {
    return `http://${SERVER_HOST}:${SERVER_PORT}` + query.sfx
  } else if (query.path) {
    let path = query.path as string

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

const getFormat = (query: QueryObject) => {
  switch (query.format) {
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

const getSize = (query: QueryObject) => {
  const width = parseInt(query.w as string) || 0
  const height = parseInt(query.h as string) || 0

  return { width, height }
}

const getFit = (query: QueryObject) => {
  if (query.fit === 'contain' || query.fit === 'fill' || query.fit === 'inside' || query.fit === 'outside') {
    return query.fit
  } else {
    return 'cover'
  }
}

const getPosition = (query: QueryObject) => {
  if (
    query.position === 'top' ||
    query.position === 'right top' ||
    query.position === 'right' ||
    query.position === 'right bottom' ||
    query.position === 'bottom' ||
    query.position === 'left bottom' ||
    query.position === 'left' ||
    query.position === 'left top'
  ) {
    return query.position
  } else {
    return 'center'
  }
}

const getBackground = (query: QueryObject): string => {
  return isString(query.bg) ? query.bg : '#FFFFFF'
}
