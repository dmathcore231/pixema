const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const missingFields = require('../helpers/missingFields')

async function checkValidFormUpdateById(req, res, next) {

  if (req.body.formUpdateUserById) {
    const { userName, email, password, newPassword } = req.body.formUpdateUserById
    const { _id } = req.userData.user
    const errMessages = []
    const user = await User.findById(_id)

    missingFields(userName, 'Username', errMessages)
    missingFields(email, 'Email', errMessages)
    missingFields(password, 'Password', errMessages)

    if (errMessages.length > 0) {
      req.clientResponseError = new ResponseWithoutPayload(400,
        `Missing fields: ${errMessages.join(', ')}`)
    }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        req.clientResponseError = new ResponseWithoutPayload(401, 'Invalid password')
      }
    } else {
      req.clientResponseError = new ResponseWithoutPayload(400, 'User not found')
    }

    if (!req.clientResponseError) {
      req.clientResponseError = false
    }

    next()
  } else {
    next()
  }
}

module.exports = checkValidFormUpdateById
