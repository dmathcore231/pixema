const missingFields = require('../helpers/missingFields')
const User = require('../models/userSchema')
const responseWithoutPayload = require('../classes/responseWithoutPayload')

async function checkValidFormSignUp(req, res, next) {

  if (req.body.formSignUp) {
    const { userName, email, password } = req.body.formSignUp
    const existingEmail = await User.findOne({ email })
    const existingUserName = await User.findOne({ userName })

    try {
      missingFields([
        { field: userName, fieldName: 'Username' },
        { field: email, fieldName: 'Email' },
        { field: password, fieldName: 'Password' }
      ])
    } catch (error) {
      req.clientResponseError = new responseWithoutPayload(400, error.message)
      return next()
    }

    if (existingEmail) {
      req.clientResponseError = new responseWithoutPayload(400, 'Email already exists')
      return next()
    }

    if (existingUserName) {
      req.clientResponseError = new responseWithoutPayload(400, 'User already exists')
      return next()
    }

    req.clientResponseError = false
    return next()
  }

  next()
}

module.exports = checkValidFormSignUp
