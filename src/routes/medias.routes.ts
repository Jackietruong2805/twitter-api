import { Router } from 'express'
import { UploadSingleImageController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '~/utils/handlers'
const mediasRouter = Router()

mediasRouter.post('/upload-image', wrapRequestHandler(UploadSingleImageController))

export default mediasRouter
