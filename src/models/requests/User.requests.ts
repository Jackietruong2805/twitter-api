import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: truonghao2805@gmail.com
 *         password:
 *           type: string
 *           example: haotruong2805
 *     SuccessAuthentication:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: MongoId
 *           example: '654078dde53786954af33931'
 *         name:
 *           type: string
 *           example: 'Hao'
 *         email:
 *           type: string
 *           format: email
 *           example: 'haotruong.31211027638+5@st.ueh.edu.vn'
 *         date_of_birth:
 *           type: string
 *           format: ISO8601
 *           example: '2023-06-12T14:56:45.841Z'
 *         created_at:
 *           type: string
 *           format: ISO8601
 *           example: '2023-10-31T03:47:41.929Z'
 *         updated_at:
 *           type: string
 *           format: ISO8601
 *           example: '2023-10-31T03:47:41.929Z'
 *         verify:
 *           $ref: '#/components/schemas/UserVerifyStatus'
 *         twitter_circle:
 *           type: array
 *           items:
 *             type: string
 *             format: MongoId
 *           example: ['654078dde53786954af33931', '654078dde53786954af33932']
 *         bio:
 *           type: string
 *           example: ''
 *         location:
 *           type: string
 *           example: 'San Francisco, CA'
 *         website:
 *           type: string
 *           format: uri
 *           example: 'www.example.com'
 *         username:
 *           type: string
 *           example: 'user654078dde53786954af33931'
 *         avatar:
 *           type: string
 *           example: 'http://localhost:4000/images/avatars/jhondoe.jpg'
 *         cover_photo:
 *           type: string
 *           example: 'http://localhost:4000/images/avatars/jhondoe.jpg'
 *     UserVerifyStatus:
 *       type: number
 *       enum: [Unverified, Verified, Banned]
 *       example: 1
 */
export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface GetProfileReqParams extends ParamsDictionary {
  username: string
}

export interface UnfollowReqParams extends ParamsDictionary {
  user_id: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}

export interface ChangePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}
