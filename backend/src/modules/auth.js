const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const Movie = require('../models/moviesSchema')
const ResponseUserData = require('../classes/responseUserData')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const expiresInAccessToken = require('../helpers/tokenExpires').expiresInAccessToken
const expiresInRefreshToken = require('../helpers/tokenExpires').expiresInRefreshToken

const secretKey = require('../modules/secretKey')
const ResponseData = require('../classes/responseData')

const router = express.Router()

async function getAllUser(_, res) {
  try {
    const users = await User.find({})
    const totalUsers = users.length
    res.status(200).send({ status: 200, message: 'Success', users, totalUsers: totalUsers })
  } catch (error) {
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function createUser(req, res) {
  try {
    if (!req.body.formSignUp) {
      return res.status(400).send(new ResponseWithoutPayload(400, 'Bad request'))
    }

    if (req.clientResponseError) {
      return res.status(req.clientResponseError.status).send(req.clientResponseError)
    }

    const { userName, email, password } = req.body.formSignUp
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    })

    await user.save()
    res.status(201).send(new ResponseUserData(null, null, user, 201, 'User created successfully'))
  } catch (error) {
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function authenticateUser(req, res) {
  try {
    if (!req.body.formSignIn) {
      return res.status(400).send(new ResponseWithoutPayload(400, 'Bad request'))
    }

    if (req.clientResponseError) {
      return res.status(req.clientResponseError.status).send(req.clientResponseError)
    }

    const { email } = req.body.formSignIn
    const user = await User.findOne({ email })

    const accessToken = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: expiresInAccessToken,
    })
    const refreshToken = jwt.sign({ id: user._id, userName: user.userName }, secretKey, {
      expiresIn: expiresInRefreshToken,
    })
    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'strict', httpOnly: true, secure: true })
    res.status(200).send(new ResponseUserData(accessToken, refreshToken, user, 200, 'User authenticated successfully'))

  } catch (error) {
    console.log(error)
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function getUserByJwt(req, res) {
  const { accessToken, tokenValid } = req.userData.token

  if (!accessToken) {
    return res.status(401).send(new ResponseData(401, 'Access token is required', null))
  }

  if (!tokenValid) {
    return res.status(401).send(new ResponseData(401, 'Invalid access token', null))
  }
  try {
    const decoded = jwt.verify(accessToken, secretKey)

    const user = await User.findById(decoded.id)
    if (user) {
      res.status(200).send(new ResponseData(200, 'Success', user, accessToken))
    } else {
      res.status(404).send(new ResponseData(404, 'User not found', null))
    }

  } catch (error) {
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function updateUserById(req, res) {
  const { accessToken, tokenValid } = req.userData.token
  const { userName, email, newPassword } = req.body.formUpdateUserById

  if (req.clientResponseError) {
    return res.status(req.clientResponseError.status).send(req.clientResponseError)
  }

  const decoded = jwt.verify(accessToken, secretKey)
  const user = await User.findById(decoded.id)

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    user.userName = userName
    user.email = email

    await user.save()
    return res.status(200).send(new ResponseData(200, 'User updated successfully', user, accessToken))
  } else {
    user.userName = userName
    user.email = email

    await user.save()
    return res.status(200).send(new ResponseData(200, 'User updated successfully', user, accessToken))
  }
}

async function updateFavoritesMovies(req, res) {
  const { movieId } = req.body
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.status(401).send({ status: 401, message: 'Access token is required', accessToken: null })
  }

  if (!movieId) {
    return res.status(400).send({ status: 400, message: 'Favorites movies is required' })
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).send({ status: 404, message: 'User not found', accessToken: null })
    }
    if (!user.favoritesMovies.includes(movieId)) {
      user.favoritesMovies.push(movieId)
    } else {
      const index = user.favoritesMovies.indexOf(movieId)
      user.favoritesMovies.splice(index, 1)
    }
    await user.save()
    return res.status(200).send({ status: 200, message: 'Favorites movies updated successfully', user })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

async function getFavoritesMovies(req, res) {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.status(401).send({ status: 401, message: 'Access token is required', accessToken: null })
  }
  const decoded = jwt.verify(token, secretKey)
  const user = await User.findById(decoded.id)
  if (!user) {
    return res.status(404).send({ status: 404, message: 'User not found', accessToken: null })
  }

  try {
    const movies = await Movie.find({ _id: { $in: user.favoritesMovies } })
    res.status(200).send({ status: 200, message: 'Success', movies })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

//user
router.post('/user', createUser)
router.get('/user', getUserByJwt)
router.put('/user', updateUserById)
router.post('/user/authenticate', authenticateUser)
router.post('/user/favorites', updateFavoritesMovies)
router.get('/user/favorites', getFavoritesMovies)
//all user
router.get('/users', getAllUser)

module.exports = router
