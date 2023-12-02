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

    const token = jwt.sign({ id: users._id }, secretKey)
    res.send({ status: 200, users, token })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
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
router.post('/user', createUser)
router.delete('/user/:id', deleteUserById)
router.put('/user/:id', updateUserById)



module.exports = router
