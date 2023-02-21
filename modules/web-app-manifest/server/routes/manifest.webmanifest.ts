import { Request, Response } from 'express'
import manifest from '~/.sfx/webAppManifest'

export default async (req: Request, res: Response) => {
  res.json(manifest)
}
