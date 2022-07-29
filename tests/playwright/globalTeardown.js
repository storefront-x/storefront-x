import path from 'node:path'
import fs from 'node:fs/promises'

export default async () => {
  await fs.rm(path.join(process.cwd(), '.test'), { recursive: true, force: true })
}
