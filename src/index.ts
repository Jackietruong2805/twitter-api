import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import usersRouter from './routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
import cors from 'cors'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import searchRouter from './routes/search.routes'
import './utils/s3'
import Conversation from './models/schemas/Conversations.schema'
import conversationsRouter from './routes/conversations.routes'
import { ObjectId } from 'mongodb'

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})

const app = express()
const httpServer = createServer(app)
app.use(cors())
const port = process.env.PORT || 4000

// create upload folder
initFolder()

app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likesRouter)
app.use('/search', searchRouter)
app.use('/conversations', conversationsRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

app.use(defaultErrorHandler)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})
const users: {
  [key: string]: {
    socket_id: string
  }
} = {}
io.on('connection', (socket) => {
  console.log(`User ${socket.id} is connected`)
  const user_id = socket.handshake.auth._id
  users[user_id] = {
    socket_id: socket.id
  }
  socket.on('send_message', async (data) => {
    const { receiver_id, sender_id, content } = data.payload
    const receiver_socket_id = users[receiver_id]?.socket_id
    if (!receiver_socket_id) {
      return
    }
    const conversation = new Conversation({
      sender_id: new ObjectId(sender_id),
      receiver_id: new ObjectId(receiver_id),
      content
    })
    const result = await databaseService.conversations.insertOne(conversation)
    conversation._id = result.insertedId
    socket.to(receiver_socket_id).emit('receive_message', {
      payload: conversation
    })
  })
  socket.on('disconnect', () => {
    delete users[user_id]
    console.log(`User ${socket.id} is disconnected`)
  })
})
httpServer.listen(port, () => {
  console.log(`${port}`)
})
