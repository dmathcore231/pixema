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
  rating: Number,
  imdbRating: Number,
  genre: Array,
  poster: String,
  duration: Number,
  description: String
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
