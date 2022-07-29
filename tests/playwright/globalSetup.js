import path from 'node:path'
import fs from 'node:fs/promises'

export default async () => {
  process.env.NODE_ENV = 'test'

  await fs.mkdir(path.join(process.cwd(), '.test'), { recursive: true })
}
