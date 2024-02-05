const Dashboard = require('../models/dashboardSchema')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const bcrypt = require('bcrypt')

async function checkValidFormLoginDashboard(req, res, next) {

  if (req.body.formLoginDashboard) {
    const { name, password } = req.body.formLoginDashboard

    if (!name || !password) {
      req.clientResponseError = new ResponseWithoutPayload(400, 'Bad Request')
    }

    const dashboard = await Dashboard.findOne({ name })

    if (!dashboard) {
      req.clientResponseError = new ResponseWithoutPayload(401, 'Invalid credentials')
    }

    const isMatch = await bcrypt.compare(password, dashboard.password)

    if (!isMatch) {
      req.clientResponseError = new ResponseWithoutPayload(401, 'Invalid password')
    }

    if (!req.clientResponseError) {
      req.clientResponseError = false
    }

    next()
  } else {
    next()
  }

}

module.exports = checkValidFormLoginDashboard
