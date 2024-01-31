const express = require('express')
const User = require('../models/userSchema')
const { default: mongoose } = require('mongoose')
const missingFields = require('../helpers/missingFields')
const ResponseData = require('../classes/responseData')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const ResponseDashboardData = require('../classes/responseDashboardData')

const router = express.Router()

async function loginDashboardMain(req, res) {
  const { accessToken, tokenValid } = req.userData.token
  const { user } = req.userData

  try {
    if (!accessToken) {
      return res.status(401).send(new ResponseData(401, 'Access token is required', null))
    }

    if (!tokenValid) {
      return res.status(401).send(new ResponseData(401, 'Invalid access token', null))
    }

    if (req.clientResponseError) {
      return res.status(req.clientResponseError.status).send(req.clientResponseError)
    }
    res.status(200).send(new ResponseData(200, 'Login successful', user, accessToken))
  } catch (error) {
    res.status(500).send(new ResponseData(500, 'Internal Server Error', null))
  }
}

async function getUserById(req, res) {
  const id = req.params.id

  if (!id) {
    return res.status(400).send(new ResponseWithoutPayload(400, 'User ID is required'))
  }

  try {
    const user = await User.findById(id)
    if (user) {
      return res.status(200).send(new ResponseDashboardData(200, 'Success', user))
    }
    res.status(404).send(new ResponseWithoutPayload(404, 'User not found'))
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).send(new ResponseWithoutPayload(400, 'Invalid user ID'))
    }
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function updatedUser(req, res) {
  if (req.clientResponseError) {
    return res.status(req.clientResponseError.status).send(req.clientResponseError)
  }

  try {
    const { userName, email, userRole, userId } = req.body.formUpdateUserDashboard
    const user = await User.findById(userId)
    user.userName = userName
    user.email = email
    user._role = userRole

    await user.save()
    res.send(new ResponseDashboardData(200, 'User updated successfully', user))
  } catch (error) {
    console.log(error)
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function deleteUserById(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).send(new ResponseWithoutPayload(400, 'User ID is required'))
  }

  try {
    const user = await User.findByIdAndDelete(id)
    if (user) {
      return res.status(200).send(new ResponseWithoutPayload(200, 'User deleted successfully'))
    } else {
      return res.status(404).send(new ResponseWithoutPayload(404, 'User not found'))
    }
  } catch (error) {
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}


router.post('/', loginDashboardMain)
router.get('/users/:id', getUserById)
router.put('/users/:id', updatedUser)
router.delete('/users/:id', deleteUserById)

module.exports = router
