const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  tokenData: String,
  userID: mongoose.Schema.Types.ObjectId,
  expiresAt: Number
})

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token
