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

router.get('/user', getAllUser)
router.get('/user/:id', getUserById)
router.post('/user', createUser)
router.delete('/user/:id', deleteUserById)
router.put('/user/:id', updateUserById)


module.exports = router
