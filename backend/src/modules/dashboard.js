const express = require('express')
const bcrypt = require('bcrypt')
const Dashboard = require('../models/dashboardSchema')
const User = require('../models/userSchema')
const { default: mongoose } = require('mongoose')
const missingFields = require('../helpers/missingFields')

const router = express.Router()

async function loginDashboardMain(req, res) {
  const { name, password } = req.body

  if (!name || !password) {
    return res.status(400).send({ status: 400, message: 'All fields are required' })
  }

  try {
    const dashboard = await Dashboard.findOne({ name })

    if (!dashboard) {
      return res.status(401).send({ status: 401, message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, dashboard.password)

    if (!isMatch) {
      return res.status(401).send({ status: 401, message: 'Invalid password' })
    }
    res.send({ status: 200, message: 'Login successful' })
  } catch (error) {
    console.log(error)
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
      return res.status(200).send({ status: 200, message: 'Success', user })
    }
    res.status(404).send({ status: 404, message: 'User not found' })
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).send({ status: 400, message: 'Invalid user ID' })
    }
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

async function updatedUser(req, res) {
  const { userName, email, userRole, userId } = req.body
  const errMessages = []
  missingFields(userName, 'Username', errMessages)
  missingFields(email, 'Email', errMessages)
  missingFields(userRole, 'User Role', errMessages)
  missingFields(userId, 'User ID', errMessages)

  if (errMessages.length > 0) {
    return res.status(400).send({
      status: 400, message:
        `Missing fields: ${errMessages.join(', ')}`
    })
  }

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send({ status: 404, message: 'User not found' })
    }
    user.userName = userName
    user.email = email
    user._role = userRole
    await user.save()
    res.send({ status: 200, message: 'User updated successfully', user })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}



router.post('/', loginDashboardMain)
router.get('/users/:id', getUserById)
router.put('/users/:id', updatedUser)

module.exports = router
