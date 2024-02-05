const express = require('express')
const Movie = require('../models/moviesSchema')
const ResponseData = require('../classes/responseData')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const ResponseFiltersData = require('../classes/responseFiltersData')

const router = express.Router()

async function getAllMovies(req, res) {
  const { accessToken, tokenValid } = req.userData.token
  const movies = await Movie.find({})

  try {
    res.status(200).send(new ResponseData(200, 'Success', movies,
      accessToken && tokenValid ? accessToken : null))
  } catch (error) {
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function getMovieByFilters(req, res) {
  const { sort, title, genre, years, rating, country } = req.query
  const { accessToken, tokenValid } = req.userData.token

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
    res.status(200).send(new ResponseFiltersData(200, 'Success', movies,
      accessToken && tokenValid ? accessToken : null, req.query))
  } catch (error) {
    console.log(error)
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function getMovieBySearch(req, res) {
  const { value } = req.query
  const { accessToken, tokenValid } = req.userData.token

  if (!value) {
    return res.status(400).send(new ResponseWithoutPayload(400, 'Missing fields: value'))
  }

  try {
    const movies = await Movie.find({ title: { $regex: value, $options: 'i' } })
    res.status(200).send(new ResponseData(200, 'Success', movies,
      accessToken && tokenValid ? accessToken : null))
  } catch (error) {
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function getRecommendedMovies(req, res) {
  if (req.clientResponseError) {
    return res.status(req.clientResponseError.status).send(req.clientResponseError)
  }

  try {
    const { movieId } = req.params

    if (!movieId) {
      return res.status(400).send(new ResponseWithoutPayload(400, 'Missing fields: movieId'))
    }

    const movie = await Movie.findOne({ _id: movieId })
    const genresRecommended = movie.genre
    const recommendedMovies = await Movie.find({
      _id: { $ne: movieId },
      genre: { $in: genresRecommended },
      isRecommended: true
    })
    res.status(200).send(new ResponseData(200, 'Success', recommendedMovies))
  } catch (error) {
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

router.get('/', getAllMovies)
router.get('/filters', getMovieByFilters)
router.get('/search', getMovieBySearch)
router.get('/recommended/:movieId', getRecommendedMovies)

module.exports = router
