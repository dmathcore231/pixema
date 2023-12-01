const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  _role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
