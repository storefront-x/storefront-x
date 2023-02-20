import { Request, Response } from 'express'
import manifest from '#ioc/manifest/manifest'

export default async (req: Request, res: Response) => {
  res.json(manifest)
}
