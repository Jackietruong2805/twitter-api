import { NextFunction, Request, Response } from 'express'
import { handleUploadSingleImage } from '~/utils/file'

export const UploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const data = await handleUploadSingleImage(req)
  return res.json({
    result: data
  })
}
