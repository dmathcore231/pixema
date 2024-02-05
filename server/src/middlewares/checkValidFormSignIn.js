const missingFields = require('../helpers/missingFields')
const User = require('../models/userSchema')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const bcrypt = require('bcrypt')

async function checkValidFormSignIn(req, res, next) {
  if (req.body.formSignIn) {
    const { email, password } = req.body.formSignIn

    try {
      missingFields([
        { field: email, fieldName: 'Email' },
        { field: password, fieldName: 'Password' }
      ])
    } catch (error) {
      req.clientResponseError = new ResponseWithoutPayload(400, error.message)
      return next()
    }

    const user = await User.findOne({ email })

    if (!user) {
      req.clientResponseError = new ResponseWithoutPayload(400, 'User not found')
      return next()
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      req.clientResponseError = new ResponseWithoutPayload(400, 'Invalid password')
      return next()
    }

    req.clientResponseError = false
    return next()
  }

  next()
}

module.exports = checkValidFormSignIn
