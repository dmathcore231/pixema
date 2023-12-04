const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  imdbId: String,
  genre: Array,
  poster: String,
  description: String
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
