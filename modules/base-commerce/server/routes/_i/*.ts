import { eventHandler, setResponseStatus } from 'h3'
import sharp from 'sharp'
import { H3Event, getQuery, setHeaders } from 'h3'
import plugins from '~/.sfx/baseCommerce/imageResizer'

const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 3000

export default eventHandler(async (event) => {
  try {
    return await resizeImage(event)
  } catch (error: any) {
    setResponseStatus(event, 500)
    return error.message
  }
})

const resizeImage = async (event: H3Event) => {
  const path = getPath(event)
  const format = getFormat(event)
  const { width, height } = getSize(event)
  const fit = getFit(event)
  const background = getBackground(event) as any

  const image = await fetchImage(path)

  if (format !== 'png') {
    image.flatten({
      background,
    })
  }

  if (width > 0 && height > 0) {
    // @ts-ignore
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

  return sendBuffer(event, buffer)
}

const sendBuffer = (event: H3Event, buffer: Buffer) => {
  const format = getFormat(event)

  const ONE_YEAR = '31536000'

  setHeaders(event, {
    'Cache-Control': `public, max-age=${ONE_YEAR}, immutable`,
    'Content-Type': `image/${format}`,
  })

  return buffer
}

const fetchImage = async (path: string) => {
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

const getPath = (event: H3Event) => {
  const query = getQuery(event)

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

const getFormat = (event: H3Event) => {
  const query = getQuery(event)

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

const getSize = (event: H3Event) => {
  const query = getQuery(event)

  const width = parseInt(query.w as string) || 0
  const height = parseInt(query.h as string) || 0

  return { width, height }
}

const getFit = (event: H3Event) => {
  const query = getQuery(event)

  return query.fit || 'cover'
}

const getBackground = (event: H3Event) => {
  const query = getQuery(event)

  return query.bg || '#FFFFFF'
}
