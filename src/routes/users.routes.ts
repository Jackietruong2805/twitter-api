import { Router } from 'express'
import {
  emailVerifyValidator,
  loginController,
  logoutController,
  registerController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const usersRouter = Router()

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
/**
 * Description: Logout a user
 * Path: /logout
 * Method: POST
 * Header: {Authorization: Bearer <access_token>}
 * Body: {refresh_token: string}
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
/**
 * Description: Verify email when user client click on the link in email
 * Path: /verify-email
 * Method: POST
 * Body: {refresh_token: string}
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyValidator))

export default usersRouter
