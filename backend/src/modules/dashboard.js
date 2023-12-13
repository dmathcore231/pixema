const express = require('express')
const bcrypt = require('bcrypt')
const Dashboard = require('../models/dashboardSchema')

const router = express.Router()

async function loginDashboardMain(req, res) {
  const { name, password } = req.body

  if (!name || !password) {
    return res.status(400).send({ status: 400, message: 'All fields are required' })
  }

  try {
    const dashboard = await Dashboard.findOne({ name })

    if (!dashboard) {
      return res.status(401).send({ status: 401, message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, dashboard.password)

    if (!isMatch) {
      return res.status(401).send({ status: 401, message: 'Invalid password' })
    }
    res.send({ status: 200, message: 'Login successful' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}


router.post('/', loginDashboardMain)

module.exports = router
