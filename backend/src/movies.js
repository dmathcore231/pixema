const express = require('express')
const Movie = require('./models/moviesSchema')
const checkInvalidFields = require('./helpers/index')

const router = express.Router()

async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find({})
    res.send(movies)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

async function getMovieById(req, res) {
  const id = req.params.id

  try {
    const movie = await Movie.findById(id)
    if (movie) {
      res.send(movie)
    } else {
      res.status(404).send('Movie not found')
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

async function createNewMovie(req, res) {
  const { title, year, rating, genre, poster, description } = req.body
  const invalidFields = checkInvalidFields([
    { name: 'title', value: title },
    { name: 'year', value: year },
    { name: 'rating', value: rating },
    { name: 'genre', value: genre },
    { name: 'poster', value: poster },
    { name: 'description', value: description },
  ])

  if (invalidFields.length > 0) {
    const error = `Invalid fields: ${invalidFields.join(', ')}`
    return res.status(400).send(error)
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
    res.status(500).send('Internal Server Error')
  }
}

async function deleteMovieById(req, res) {
  const id = req.params.id

  try {
    const movie = await Movie.findByIdAndDelete(id)
    if (movie) {
      res.send(movie)
    } else {
      res.status(404).send('Movie not found')
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

async function updateMovieById(req, res) {
  const id = req.params.id
  const { title, year, rating, genre, poster, description } = req.body
  const invalidFields = checkInvalidFields([
    { name: 'title', value: title },
    { name: 'year', value: year },
    { name: 'rating', value: rating },
    { name: 'genre', value: genre },
    { name: 'poster', value: poster },
    { name: 'description', value: description },
  ])

  if (invalidFields.length > 0) {
    const errorMessage = `Invalid fields: ${invalidFields.join(', ')}`
    return res.status(400).send(errorMessage)
  }

  try {
    const movie = await Movie.findByIdAndUpdate(id, {
      title,
      year,
      rating,
      genre,
      poster,
      description
    }, { new: true })
    if (movie) {
      res.send(movie)
    } else {
      res.status(404).send('Movie not found')
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

router.get('/', getAllMovies)
router.get('/:id', getMovieById)
router.post('/', createNewMovie)
router.delete('/:id', deleteMovieById)
router.put('/:id', updateMovieById)

module.exports = router
