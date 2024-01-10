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
  try {
    console.log(req.query)
    res.send({ status: 200, message: 'Success' })
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Internal Server Error' })
  }
}

router.get('/', getAllMovies)
router.get('/filters', getMovieByFilters)

module.exports = router
