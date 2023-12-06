const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../models/userSchema')
const missingFields = require('../helpers/missingFields')

const secretKey = crypto.randomBytes(32).toString('hex')

const router = express.Router()

async function getAllUser(_, res) {
  try {
    const users = await User.find({})
    res.status(200).send({ status: 200, message: 'Success', users })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

async function getUserById(req, res) {
  const id = req.params.id

  if (!id) {
    return res.status(400).send({ status: 400, message: 'User ID is required' })
  }

  try {
    const user = await User.findById(id)
    if (user) {
      res.status(200).send({ status: 200, message: 'Success', user })
    } else {
      res.status(404).send({ status: 404, message: 'User not found' })
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

async function createUser(req, res) {
  const { userName, email, password } = req.body
  const errMessages = []
  missingFields(userName, 'Username', errMessages)
  missingFields(email, 'Email', errMessages)
  missingFields(password, 'Password', errMessages)
  if (errMessages.length > 0) {
    return res.status(400).send({
      status: 400, message:
        `Missing fields: ${errMessages.join(', ')}`
    })
  }

  try {
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).send({ status: 400, message: 'Email already exists' })
    }

    const existingUserName = await User.findOne({ userName })
    if (existingUserName) {
      return res.status(400).send({ status: 400, message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    })
    await user.save()
    res.send({ status: 201, message: 'User created successfully', user })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })

  }
}

async function authenticateUser(req, res) {
  const { email, password } = req.body
  const errMessages = []
  missingFields(email, 'Email', errMessages)
  missingFields(password, 'Password', errMessages)
  if (errMessages.length > 0) {
    return res.status(400).send({
      status: 400, message:
        `Missing fields: ${errMessages.join(', ')}`
    })
  }

  if (errMessages.length > 0) {
    return res.status(400).send({
      status: 400, message:
        `Missing fields: ${errMessages.join(', ')}`
    })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).send({ status: 401, message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).send({ status: 401, message: 'Invalid password' })
    }

    const accessToken = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: '5m',
    })

    const refreshToken = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: '7d',
    })
    res.send({ status: 200, user, accessToken, refreshToken })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

async function authorizationUser(req, res) {
  const refreshToken = req.body.refreshToken

  if (!refreshToken) {
    return res.status(401).send({ status: 401, message: 'Refresh token is missing' })
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey)
    const users = await User.findById(decoded.id)

    if (!users) {
      throw new Error('Invalid refresh token')
    }
    return res.status(200).send({ status: 200, users })
  } catch (error) {
    return res.status(401).send({ status: 401, message: error.toString() })
  }
}

async function refreshToken(req, res) {
  const refreshToken = req.body.refreshToken

  if (!refreshToken) {
    return res.status(401).send({ status: 401, message: 'Refresh token is missing' })
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey)
    const users = await User.findById(decoded.id)

    if (!users) {
      throw new Error('Invalid refresh token')
    }

    const accessToken = jwt.sign({ id: users._id }, secretKey, {
      expiresIn: '5m',
    })

    return res.send({ status: 200, users, accessToken })
  } catch (error) {
    return res.status(401).send({ status: 401, message: error.toString() })
  }
}

async function deleteUserById(req, res) {
  const id = req.params.id

  if (!id) {
    return res.status(400).send({ status: 400, message: 'User ID is required' })
  }

  try {
    const user = await User.findByIdAndDelete(id)
    if (user) {
      res.status(200).send({ status: 200, message: 'User deleted successfully' })
    } else {
      res.status(404).send({ status: 404, message: 'User not found' })
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

async function updateUserById(req, res) {
  const id = req.params.id
  const { userName, email, password } = req.body
  if (!userName) {
    return res.status(400).send({ status: 400, message: 'User name is required' })
  } else if (!email) {
    return res.status(400).send({ status: 400, message: 'Email is required' })
  } else if (!password) {
    return res.status(400).send({ status: 400, message: 'Password is required' })
  }

  try {
    const user = await User.findByIdAndUpdate(id, { userName, email, password }, { new: true })
    if (user) {
      res.status(200).send({ status: 200, message: 'User updated successfully', user })
    } else {
      res.status(404).send({ status: 404, message: 'User not found' })
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

//user
router.post('/user', createUser)
router.post('/user/authenticate', authenticateUser)
router.post('/user/authorization', authorizationUser)
router.get('/user/:id', getUserById)
router.delete('/user/:id', deleteUserById)
router.put('/user/:id', updateUserById)
//all user
router.get('/users', getAllUser)
//token
router.post('/refreshTokenJwt', refreshToken)

module.exports = router
