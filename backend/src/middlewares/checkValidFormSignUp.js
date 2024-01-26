const missingFields = require('../helpers/missingFields')
const User = require('../models/userSchema')
const responseWithoutPayload = require('../classes/responseWithoutPayload')

async function checkValidFormSignUp(req, res, next) {
  const { formSignUp } = req.body

  if (formSignUp) {
    const { userName, email, password } = formSignUp
    const errMessages = []
    missingFields(userName, 'Username', errMessages)
    missingFields(email, 'Email', errMessages)
    missingFields(password, 'Password', errMessages)
    if (errMessages.length > 0) {
      req.clientResponseError = new responseWithoutPayload(400,
        `Missing fields: ${errMessages.join(', ')}`)
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      req.clientResponseError = new responseWithoutPayload(400, 'Email already exists')
    }

    const existingUserName = await User.findOne({ userName })
    if (existingUserName) {
      req.clientResponseError = new responseWithoutPayload(400, 'User already exists')
    }
    next()
  } else {
    req.clientResponseError = false
    next()
  }

}

module.exports = checkValidFormSignUp
