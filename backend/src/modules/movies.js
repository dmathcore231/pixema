const express = require('express')
const Movie = require('../models/moviesSchema')

const router = express.Router()

async function getAllMovies(_, res) {
  try {
    const movies = await Movie.find({})
    res.status(200).send({ status: 200, message: 'Success', movies })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

async function getMovieByFilters(req, res) {
  const { sort, title, genre, years, rating, country } = req.query
  const filters = {}
  const sortOptions = {}

  if (sort) {
    if (sort === 'rating') {
      sortOptions.rating = -1
    } else if (sort === 'year') {
      sortOptions.year = -1
    }
  }

  if (years) {
    if (years.from && years.to) {
      filters.year = { $gte: years.from, $lte: years.to }
    } else if (years.from) {
      filters.year = { $gte: years.from, $lte: new Date().getFullYear() }
    } else if (years.to) {
      filters.year = { $gte: 0, $lte: years.to }
    }
  }

  if (rating) {
    if (rating.from && rating.to) {
      filters.rating = { $gte: rating.from, $lte: rating.to }
    } else if (rating.from) {
      filters.rating = { $gte: rating.from, $lte: 10 }
    } else if (rating.to) {
      filters.rating = { $gte: 0, $lte: rating.to }
    }
  }

  if (title) {
    filters.title = { $regex: title, $options: 'i' }
  }

  if (genre) {
    filters.genre = { $in: genre }
  }

  try {
    const movies = await Movie.find(filters).sort(sortOptions)
    res.status(200).send({ status: 200, message: 'Success', movies, filters: req.query })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

router.get('/', getAllMovies)
router.get('/filters', getMovieByFilters)

module.exports = router
