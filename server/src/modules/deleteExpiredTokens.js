const cron = require('node-cron')
const jwt = require('jsonwebtoken')
const Token = require('../models/tokenSchema')

// Run every 5 hours
const schedule = '0 */5 * * *'


async function deleteExpiredTokens() {
  try {
    const currentTime = Math.floor(Date.now() / 1000)

    const expiredTokens = await Token.deleteMany({
      expiresAt: { $lt: currentTime }
    })
    console.log(`Deleted ${expiredTokens.deletedCount} expired tokens`)
  } catch (error) {
    console.error('Error deleting expired tokens:', error)
  }
}

cron.schedule(schedule, deleteExpiredTokens)

module.exports = {
  deleteExpiredTokens
}
