const express = require('express')
const bcrypt = require('bcrypt')

const User = require('./models/userSchema')

const router = express.Router()

router.post('/user', async (req, res) => {
  const { userName, email, password } = req.body

  if (!userName) {
    return res.status(400).send('userName is required')
  } else if (!email) {
    return res.status(400).send('Email is required')
  } else if (!password) {
    return res.status(400).send('Password is required')
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] })

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).send('Email already exists')
      } else if (existingUser.userName === userName) {
        return res.status(400).send('userName already exists')
      } else {
        return res.status(400).send('User already exists')
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const hashedEmail = await bcrypt.hash(email, 10)

    const user = new User({
      userName,
      email: hashedEmail,
      password: hashedPassword
    })

    await user.save()
    res.send(user)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
