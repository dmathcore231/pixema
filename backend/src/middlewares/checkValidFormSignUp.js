const missingFields = require('../helpers/missingFields')
const User = require('../models/userSchema')
const responseWithoutPayload = require('../classes/responseWithoutPayload')

async function checkValidFormSignUp(req, res, next) {

  if (req.body.formSignUp) {
    const { userName, email, password } = req.body.formSignUp
    const errMessages = []
    const existingEmail = await User.findOne({ email })
    const existingUserName = await User.findOne({ userName })
    missingFields(userName, 'Username', errMessages)
    missingFields(email, 'Email', errMessages)
    missingFields(password, 'Password', errMessages)
    if (errMessages.length > 0) {
      req.clientResponseError = new responseWithoutPayload(400,
        `Missing fields: ${errMessages.join(', ')}`)
    } else if (existingEmail) {
      req.clientResponseError = new responseWithoutPayload(400, 'Email already exists')
    } else if (existingUserName) {
      req.clientResponseError = new responseWithoutPayload(400, 'User already exists')
    } else {
      req.clientResponseError = false
    }

    next()
  } else {
    req.clientResponseError = new responseWithoutPayload(400, 'Bad request')
    next()
  }

}

module.exports = checkValidFormSignUp
