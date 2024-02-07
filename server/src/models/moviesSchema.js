const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  releaseDate: String,
  boxOffice: String,
  country: String,
  production: String,
  actors: String,
  directors: String,
  writers: String,
  rating: {
    ratingMovie: { type: Number, default: 0 },
    userRating: {
      type: [{
        _id: false,
        userId: String,
        rating: Number
      }],
    }
  },
  imdbRating: Number,
  genre: Array,
  poster: String,
  duration: Number,
  description: String,
  isRecommended: Boolean
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
