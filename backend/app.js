const mongoose = require('mongoose')
const express = require('express')
const authRouter = require('./src/modules/auth')
const moviesRouter = require('./src/modules/movies')
const movieRouter = require('./src/modules/movie')
const { deleteExpiredTokens } = require('./src/modules/deleteExpiredTokens')

const app = express()

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(express.json())
app.use('/auth', authRouter)
app.use('/movies', moviesRouter)
app.use('/movie', movieRouter)

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/pixema')
    await deleteExpiredTokens()
    app.listen(3000, () => {
      console.log('Server started on http://localhost:3000')
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on('SIGINT', async () => {
  await mongoose.disconnect()
  console.log('Server closed')
  process.exit()
})
