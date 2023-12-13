const mongoose = require('mongoose')

const dashboardSchema = new mongoose.Schema({
  name: String,
  password: String
})

const Dashboard = mongoose.model('Dashboard', dashboardSchema)

module.exports = Dashboard
