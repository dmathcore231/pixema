const express = require('express')

const Movie = require('./models/moviesSchema')
const router = express.Router()

router.get('/', async (req, res) => {
  const movies = await Movie.find({})
  res.send(movies)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const movie = await Movie.findById(id)
  if (movie) {
    res.send(movie)
  } else {
    res.sendStatus(404) // not found
  }
})

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const movie = await Movie.findByIdAndDelete(id)
  if (movie) {
    res.send(movie)
  } else {
    res.sendStatus(404) // not found
  }
})

module.exports = router
