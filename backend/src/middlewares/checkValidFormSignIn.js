const missingFields = require('../helpers/missingFields')
const User = require('../models/userSchema')
const responseWithoutPayload = require('../classes/responseWithoutPayload')

async function checkValidFormSignIn(req, res, next) {

  if (req.body.formSignIn) {
    const { email, password } = req.body.formSignIn
    const errMessages = []
    const existingEmail = await User.findOne({ email })
    missingFields(email, 'Email', errMessages)
    missingFields(password, 'Password', errMessages)

    if (errMessages.length > 0) {
      req.clientResponseError = new responseWithoutPayload(400,
        `Missing fields: ${errMessages.join(', ')}`)
    } else if (!existingEmail) {
      req.clientResponseError = new responseWithoutPayload(400, 'Email not found')
    } else {
      req.clientResponseError = false
    }

    next()
  } else {
    next()
  }
}
