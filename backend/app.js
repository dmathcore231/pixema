const mongoose = require('mongoose')
const express = require('express')
const Schema = mongoose.Schema
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
app.use(express.json())

//scheme movies
const movieSchema = new Schema({
  id: String,
  title: String,
  year: Number,
  rating: Number,
  imdbId: String,
  genre: Array,
  poster: String,
  description: String
})

const Movie = mongoose.model('Movie', movieSchema)

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/movies')
    app.listen(3000, () => {
      console.log('Server started on http://localhost:3000')
    })
  } catch (error) {
    console.log(error)
  }
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// get all movies
app.get('/movies', async (_, res) => {
  const movies = await Movie.find({})
  console.log(movies)
  res.send(movies)
})

function findMovieById(id) {
  return movies.find(movie => movie.id === id)
}

// get one movie

app.get('/movie/:id', async (req, res) => {
  const id = req.params.id
  const movie = await Movie.findById(id)
  if (movie) {
    res.send(movie)
  } else {
    res.sendStatus(404) // not found
  }
})

// post new movie
app.post('/movie-add', jsonParser, async (req, res) => {
  const { title, year, rating, genre, poster, description } = req.body

  if (!title || !year || !rating || !genre || !poster || !description) {
    return res.status(400).send('Bad request');
  }

  try {
    const existingMovie = await Movie.findOne({ title })

    if (existingMovie) {
      return res.status(400).send('Movie already exists')
    }

    const movie = new Movie({
      title,
      year,
      rating,
      imdbId: req.body.imdbId,
      genre,
      poster,
      description,
    })

    await movie.save()
    res.send(movie)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

// delete movie

app.delete('/movie/:id', async (req, res) => {
  const id = req.params.id
  const movie = await Movie.findByIdAndDelete(id)
  if (movie) {
    res.send(movie)
  } else {
    res.sendStatus(404) // not found
  }
})

// update movie
app.put('/movie', jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const id = req.body.id
  const title = req.body.title
  const year = req.body.year
  const rating = req.body.rating
  const imdbId = req.body.imdbId
  const genre = req.body.genre
  const poster = req.body.poster
  const description = req.body.description
  const updatedMovie = {
    id: id,
    title: title,
    year: year,
    rating: rating,
    imdbId: imdbId,
    genre: genre,
    poster: poster,
    description: description
  }
  const movie = await Movie.findByIdAndUpdate(id, updatedMovie, { new: true })
  if (movie) {
    res.send(movie)
  } else {
    res.sendStatus(404) // not found
  }
})

main()

process.on('SIGINT', async () => {
  await mongoose.disconnect()
  console.log('Server closed')
  process.exit()
})
