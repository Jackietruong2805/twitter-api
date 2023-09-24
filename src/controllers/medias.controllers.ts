import { NextFunction, Request, Response } from 'express'
import mediasService from '~/services/medias.services'

export const UploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediasService.handleUploadSingleImage(req)
  return res.json({
    result: result
  })
}
