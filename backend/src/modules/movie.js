const express = require('express')
const Movie = require('../models/moviesSchema')
const missingFields = require('../helpers/missingFields')

const router = express.Router()

async function createMovie(req, res) {
  const { title, year, rating, imdbId, genre, poster, description } = req.body
  const errMessages = []
  missingFields(title, 'Title', errMessages)
  missingFields(year, 'Year', errMessages)
  missingFields(rating, 'Rating', errMessages)
  missingFields(imdbId, 'IMDb ID', errMessages)
  missingFields(genre, 'Genre', errMessages)
  missingFields(poster, 'Poster', errMessages)
  missingFields(description, 'Description', errMessages)

  if (errMessages.length > 0) {
    return res.status(400).send({
      status: 400, message:
        `Missing fields: ${errMessages.join(', ')}`
    })
  }

  try {
    const existingTitle = await Movie.findOne({ title })
    if (existingTitle) {
      return res.status(400).send({ status: 400, message: 'Title already exists' })
    }

    const movie = new Movie({
      title,
      year,
      rating,
      imdbId,
      genre,
      poster,
      description
    })
    await movie.save()
    res.status(201).send({ status: 201, message: 'Movie created successfully', movie })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

async function getMovieById(req, res) {
  const id = req.params.id

  if (!id) {
    return res.status(400).send({ status: 400, message: 'Movie ID is required' })
  }

  try {
    const movie = await Movie.findById(id)
    if (movie) {
      res.status(200).send({ status: 200, message: 'Success', movie })
    } else {
      res.status(404).send({ status: 404, message: 'Movie not found' })
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

async function deleteMovieById(req, res) {
  const id = req.params.id

  if (!id) {
    return res.status(400).send({ status: 400, message: 'Movie ID is required' })
  }

  try {
    const movie = await Movie.findByIdAndDelete(id)
    if (movie) {
      res.status(200).send({ status: 200, message: 'Movie deleted successfully' })
    } else {
      res.status(404).send({ status: 404, message: 'Movie not found' })
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

async function updateMovieByid(req, res) {
  const id = req.params.id
  const { title, year, rating, imdbId, genre, poster, description } = req.body
  const errMessages = []
  missingFields(title, 'Title', errMessages)
  missingFields(year, 'Year', errMessages)
  missingFields(rating, 'Rating', errMessages)
  missingFields(imdbId, 'IMDb ID', errMessages)
  missingFields(genre, 'Genre', errMessages)
  missingFields(poster, 'Poster', errMessages)
  missingFields(description, 'Description', errMessages)

  if (!id) {
    return res.status(400).send({ status: 400, message: 'Movie ID is required' })
  }

  if (errMessages.length > 0) {
    return res.status(400).send({
      status: 400, message:
        `Missing fields: ${errMessages.join(', ')}`
    })
  }

  try {
    const movie = await Movie.findByIdAndUpdate(id, {
      title,
      year,
      rating,
      imdbId,
      genre,
      poster,
      description
    })

    if (movie) {
      res.status(200).send({ status: 200, message: 'Movie updated successfully', movie })
    } else {
      res.status(404).send({ status: 404, message: 'Movie not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

router.post('/', createMovie)
router.get('/:id', getMovieById)
router.delete('/:id', deleteMovieById)
router.put('/:id', updateMovieByid)

module.exports = router
