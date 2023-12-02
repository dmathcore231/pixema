const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('./models/userSchema')
const checkInvalidFields = require('./helpers/index')

const secretKey = crypto.randomBytes(32).toString('hex')

const router = express.Router()

async function getAllUser(_, res) {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

async function getUserById(req, res) {
  const id = req.params.id

  try {
    const user = await User.findById(id)
    if (user) {
      res.send(user)
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

async function createUser(req, res) {
  const { userName, email, password } = req.body
  const invalidFields = checkInvalidFields([
    { name: 'userName', value: userName },
    { name: 'email', value: email },
    { name: 'password', value: password },
  ])

  if (invalidFields.length > 0) {
    const error = `Invalid fields: ${invalidFields.join(', ')}`
    return res.status(400).send(error)
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send('User already exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ userName, email, password: hashedPassword })
    await user.save()
    res.send(user)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

async function authenticateUser(req, res) {
  const { email, password } = req.body

  try {
    if (!email) {
      return res.status(400).send({ status: 400, message: 'Email is required' })
    }

    const users = await User.findOne({ email })

    if (!users) {
      return res.status(401).send({ status: 401, message: 'Invalid email' })
    }

    const isMatch = await bcrypt.compare(password, users.password)

    if (!isMatch) {
      return res.status(401).send({ status: 401, message: 'Invalid password' })
    }

    const accessToken = jwt.sign({ id: users._id }, secretKey, {
      expiresIn: '10m',
    })

    const refreshToken = jwt.sign({ id: users._id }, secretKey, {
      expiresIn: '7d',
    })
    res.send({ status: 200, users, accessToken, refreshToken })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
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
      expiresIn: '7d',
    })

    return res.send({ status: 200, users, accessToken })
  } catch (error) {
    return res.status(401).send({ status: 401, message: error.toString() })
  }
}

async function deleteUserById(req, res) {
  const id = req.params.id

  try {
    const user = await User.findByIdAndDelete(id)
    if (user) {
      res.send(user)
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

async function updateUserById(req, res) {
  const id = req.params.id
  const { userName, email, password } = req.body

  const invalidFields = checkInvalidFields([
    { name: 'userName', value: userName },
    { name: 'email', value: email },
    { name: 'password', value: password },
  ])

  if (invalidFields.length > 0) {
    const error = `Invalid fields: ${invalidFields.join(', ')}`
    return res.status(400).send(error)
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { userName, email, password },
      { new: true }
    )
    if (user) {
      res.send(user)
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

router.get('/users', getAllUser)
router.get('/user/:id', getUserById)
router.post('/user', authenticateUser)
router.post('/refreshTokenJwt', refreshToken)
router.post('/user', createUser)
router.delete('/user/:id', deleteUserById)
router.put('/user/:id', updateUserById)

module.exports = router
