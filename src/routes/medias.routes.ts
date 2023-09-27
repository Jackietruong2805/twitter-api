import { Router } from 'express'
import { UploadImageController, UploadVideoController } from '~/controllers/medias.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const mediasRouter = Router()

mediasRouter.post(
  '/upload-image',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(UploadImageController)
)

mediasRouter.post(
  '/upload-video',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(UploadVideoController)
)

export default mediasRouter
