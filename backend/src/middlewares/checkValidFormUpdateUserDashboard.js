const missingFields = require('../helpers/missingFields')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const User = require('../models/userSchema')

async function checkValidFormUpdateUserDashboard(req, res, next) {
  if (req.body.formUpdateUserDashboard) {
    const { userName, email, userRole, userId } = req.body.formUpdateUserDashboard

    const errMessages = []
    missingFields(userName, 'Username', errMessages)
    missingFields(email, 'Email', errMessages)
    missingFields(userRole, 'User Role', errMessages)
    missingFields(userId, 'User ID', errMessages)

    if (errMessages.length > 0) {
      req.clientResponseError = new ResponseWithoutPayload(400, `Missing fields: ${errMessages.join(', ')}`)
    }

    const user = await User.findById(userId)

    if (!user) {
      req.clientResponseError = new ResponseWithoutPayload(404, 'User not found')
    }

    if (!req.clientResponseError) {
      req.clientResponseError = false
    }

    next()
  } else {
    next()
  }
}

module.exports = checkValidFormUpdateUserDashboard


