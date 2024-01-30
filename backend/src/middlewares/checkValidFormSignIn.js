const missingFields = require('../helpers/missingFields')
const User = require('../models/userSchema')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const bcrypt = require('bcrypt')

async function checkValidFormSignIn(req, res, next) {

  if (req.body.formSignIn) {
    const { email, password } = req.body.formSignIn
    const errMessages = []
    const user = await User.findOne({ email })

    missingFields(email, 'Email', errMessages)
    missingFields(password, 'Password', errMessages)

    if (errMessages.length > 0) {
      req.clientResponseError = new ResponseWithoutPayload(400,
        `Missing fields: ${errMessages.join(', ')}`)
    }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        req.clientResponseError = new ResponseWithoutPayload(400, 'Invalid password')
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

module.exports = checkValidFormSignIn
