const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  _role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'admin'
  },
  moviesData: {
    favorites: {
      type: [String],
      default: null
    },
    moviesRating: {
      type: [{ idMovie: String, rating: Number }],
      default: null
    }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
