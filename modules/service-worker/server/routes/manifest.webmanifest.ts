import { Request, Response } from 'express'
import manifest from '~/.sfx/serviceWorker/manifest'

export default async (req: Request, res: Response) => {
  res.json(manifest)
}
