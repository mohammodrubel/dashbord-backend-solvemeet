import mongoose from 'mongoose'
import config from './config'
import app from './app'
import { Server } from 'http'

let mainServer: Server

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Connected to MongoDB')
    mainServer = app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer().catch((err) => console.log(err))

process.on('unhandledRejection', () => {
  if (mainServer) {
    mainServer.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  process.exit(1)
})
