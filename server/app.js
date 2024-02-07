const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser');
const authRouter = require('./src/modules/auth')
const moviesRouter = require('./src/modules/movies')
const movieRouter = require('./src/modules/movie')
const dashboardRouter = require('./src/modules/dashboard')
const path = require('path');
const { deleteExpiredTokens } = require('./src/modules/deleteExpiredTokens')

const checkAuth = require('./src/middlewares/checkAuth')
const checkValidToken = require('./src/middlewares/checkValidToken')
const refreshToken = require('./src/middlewares/refreshToken')
const checkValidFormSignUp = require('./src/middlewares/checkValidFormSignUp')
const checkValidFormSignIn = require('./src/middlewares/checkValidFormSignIn')
const checkValidFormUpdateById = require('./src/middlewares/checkValidFormUpdateUserById')
const checkValidFormLoginDashboard = require('./src/middlewares/checkValidFormLoginDashboard')
const checkValidFormUpdateUserDashboard = require('./src/middlewares/checkValidFormUpdateUserDashboard')
const checkSetRatingMovie = require('./src/middlewares/checkSetRatingMovie')

const app = express()

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/public/posters/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, 'public', 'posters', filename);
  res.sendFile(imagePath);
})

app.use(express.json())
app.use(cookieParser())

app.use(checkAuth)
app.use(checkValidToken)
app.use(refreshToken)
app.use(checkValidFormSignUp)
app.use(checkValidFormSignIn)
app.use(checkValidFormUpdateById)
app.use(checkValidFormLoginDashboard)
app.use(checkValidFormUpdateUserDashboard)
app.use(checkSetRatingMovie)

app.use('/auth', authRouter)
app.use('/movies', moviesRouter)
app.use('/movie', movieRouter)
app.use('/dashboard', dashboardRouter)

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
