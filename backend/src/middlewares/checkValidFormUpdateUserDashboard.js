const missingFields = require('../helpers/missingFields')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const User = require('../models/userSchema')

async function checkValidFormUpdateUserDashboard(req, res, next) {
  if (req.body.formUpdateUserDashboard) {
    const { userName, email, userRole, userId } = req.body.formUpdateUserDashboard

    try {
      missingFields([
        { field: userName, fieldName: 'Username' },
        { field: email, fieldName: 'Email' },
        { field: userRole, fieldName: 'User Role' },
        { field: userId, fieldName: 'User ID' }
      ])
    } catch (error) {
      req.clientResponseError = new ResponseWithoutPayload(400, error.message)
      return next()
    }

    const user = await User.findById(userId)

    if (!user) {
      req.clientResponseError = new ResponseWithoutPayload(404, 'User not found')
      return next()
    }

    req.clientResponseError = false
    next()
  }

  next()
}

module.exports = checkValidFormUpdateUserDashboard


