const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const Movie = require('../models/moviesSchema')
const Token = require('../models/tokenSchema')
const ResponseUserData = require('../classes/responseUserData')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const missingFields = require('../helpers/missingFields')
const expiresInAccessToken = require('../helpers/tokenExpires').expiresInAccessToken
const expiresInRefreshToken = require('../helpers/tokenExpires').expiresInRefreshToken

const secretKey = require('../modules/secretKey')

const router = express.Router()

async function getAllUser(_, res) {
  try {
    const users = await User.find({})
    const totalUsers = users.length
    res.status(200).send({ status: 200, message: 'Success', users, totalUsers: totalUsers })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
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

    res.status(200).send(new ResponseUserData(accessToken, refreshToken, user, 200, 'User authenticated successfully'))
  } catch (error) {
    console.log(error)
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function refreshToken(req, res) {
  const accessTokenReq = req.body.accessToken

  if (!accessTokenReq) {
    return res.status(400).send({ status: 400, message: 'Access token is required' })
  }

  const decodeAccessToken = jwt.decode(accessTokenReq)

  if (!decodeAccessToken) {
    return res.status(400).send({ status: 400, message: 'Invalid access token', accessToken: null })
  }
  const findRefreshToken = await Token.findOne({ userID: decodeAccessToken.id })

  if (!findRefreshToken) {
    res.status(401).send({ status: 401, message: 'Invalid access token', accessToken: null })
  }

  try {
    const checkAccessTokenReq = jwt.verify(accessTokenReq, secretKey)

    res.status(200).send({ status: 200, message: 'Access token verified', accessToken: accessTokenReq })
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const newAccessToken = jwt.sign({ id: decodeAccessToken.id }, secretKey, {
        expiresIn: expiresInAccessToken
      })
      res.status(200).send({ status: 200, message: 'New access token', accessToken: newAccessToken })
    } else {
      res.status(500).send({ status: 500, message: 'Internal Server Error' })
    }
  }
}

async function getUserByJwt(req, res) {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.status(401).send({ status: 401, message: 'Access token is required', accessToken: null })
  }
  try {
    const decoded = jwt.verify(token, secretKey)

    const user = await User.findById(decoded.id)
    if (user) {
      res.status(200).send({ status: 200, message: 'Success', user, accessToken: token })
    } else {
      res.status(404).send({ status: 404, message: 'User not found' })
    }

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).send({ status: 401, message: '!Invalid access token' })
    } else {
      res.status(500).send({ status: 500, message: 'Internal Server Error' })
    }
  }
}

async function updateUserById(req, res) {
  const { userName, email, password, newPassword } = req.body
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.status(401).send({ status: 401, message: 'Access token is required', accessToken: null })
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    const user = await User.findById(decoded.id)
    const isMatchPassword = await bcrypt.compare(password, user.password)
    if (!user) {
      return res.status(404).send({ status: 404, message: 'User not found', accessToken: null })
    }

    if (!isMatchPassword) {
      return res.status(401).send({ status: 401, message: 'Invalid password' })
    } else {
      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.userName = userName
        user.email = email
        await user.save()
        return res.status(200).send({ status: 200, message: 'User updated successfully', user })
      } else {
        user.userName = userName
        user.email = email
        await user.save()
        return res.status(200).send({ status: 200, message: 'User updated successfully', user })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
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
//token
router.post('/refreshTokenJwt', refreshToken)

module.exports = router
