import { Router } from 'express'
import { UploadSingleImageController } from '~/controllers/medias.controllers'
const mediasRouter = Router()

mediasRouter.post('/upload-image', UploadSingleImageController)

export default mediasRouter
