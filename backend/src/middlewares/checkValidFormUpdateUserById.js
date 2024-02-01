const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const missingFields = require('../helpers/missingFields')

async function checkValidFormUpdateById(req, res, next) {

  if (req.body.formUpdateUserById) {
    const { userName, email, password } = req.body.formUpdateUserById
    const { _id } = req.userData.user
    const user = await User.findById(_id)

    try {
      missingFields([
        { field: userName, fieldName: 'Username' },
        { field: email, fieldName: 'Email' },
        { field: password, fieldName: 'Password' }
      ])
    } catch (error) {
      req.clientResponseError = new ResponseWithoutPayload(400, error.message)
      return next()
    }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        req.clientResponseError = new ResponseWithoutPayload(401, 'Invalid password')
        return next()
      }
    } else {
      req.clientResponseError = new ResponseWithoutPayload(400, 'User not found')
      return next()
    }

    req.clientResponseError = false
    return next()
  }

  next()
}

module.exports = checkValidFormUpdateById
