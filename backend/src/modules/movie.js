const express = require('express')
const multer = require('multer')
const Movie = require('../models/moviesSchema')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const ResponseDashboardData = require('../classes/responseDashboardData')
const ResponseUserData = require('../classes/responseUserData')

const router = express.Router()

const upload = multer({ dest: 'public/posters' })
async function createMovie(req, res) {
  upload.single('poster')(req, res, async function () {
    if (req.clientResponseError) {
      return res.status(req.clientResponseError.status).send(req.clientResponseError)
    }

    const posterPath = req.file.path

    const { title, year, releaseDate, boxOffice, country, production, actors, directors, writers, rating, imdbRating, genre, description, duration, isRecommended } = req.body

    try {
      const { accessToken, tokenValid } = req.userData.token

      if (!accessToken) {
        return res.status(401).send(new ResponseWithoutPayload(401, 'Access token is required'))
      }

      if (!tokenValid) {
        return res.status(401).send(new ResponseWithoutPayload(401, 'Invalid access token'))
      }
      const movie = new Movie({
        title,
        year,
        releaseDate,
        boxOffice,
        country,
        production,
        actors,
        directors,
        writers,
        rating,
        imdbRating,
        genre,
        poster: `http://localhost:3000/${posterPath}`,
        duration,
        description,
        isRecommended
      })

      await movie.save()
      res.status(201).send(new ResponseDashboardData(201, 'Movie created successfully', movie))
    } catch (error) {
      res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
    }
  })
}

async function getMovieById(req, res) {
  const id = req.params.id

  if (!id) {
    return res.status(400).send(new ResponseWithoutPayload(400, 'Movie ID is required'))
  }

  try {
    const movie = await Movie.findById(id)
    if (movie) {
      res.status(200).send(new ResponseDashboardData(200, 'Success', movie))
    } else {
      res.status(404).send(new ResponseWithoutPayload(404, 'Movie not found'))
    }
  } catch (error) {
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function deleteMovieById(req, res) {
  const { id } = req.params
  const { accessToken, tokenValid } = req.userData.token

  if (!accessToken) {
    return res.status(401).send(new ResponseUserData(401, 'Access token is required', null))
  }

  if (!tokenValid) {
    return res.status(401).send(new ResponseUserData(401, 'Invalid access token', null))
  }

  if (!id) {
    return res.status(400).send(new ResponseWithoutPayload(400, 'Movie ID is required'))
  }

  try {
    const movie = await Movie.findByIdAndDelete(id)
    if (movie) {
      res.status(200).send(new ResponseWithoutPayload(200, 'Movie deleted successfully'))
    } else {
      res.status(404).send(new ResponseWithoutPayload(404, 'Movie not found'))
    }
  } catch (error) {
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

async function updateMovieById(req, res) {
  upload.single('poster')(req, res, async function (err) {
    const movieId = req.params.id
    const { title, year, releaseDate, boxOffice, country, production, actors, directors, writers, rating, imdbRating, genre, poster, description, duration, isRecommended } = req.body
    const posterPath = req.file


    if (err) {
      return res.status(500).send({ status: 500, message: 'File upload failed' })
    }

    if (!movieId) {
      return res.status(400).send({ status: 400, message: 'Movie ID is required' })
    }

    try {
      const movie = await Movie.findById(movieId)
      if (!movie) {
        return res.status(404).send({ status: 404, message: 'Movie not found' })
      }
      movie.title = title || movie.title
      movie.year = year || movie.year
      movie.releaseDate = releaseDate || movie.releaseDate
      movie.boxOffice = boxOffice || movie.boxOffice
      movie.country = country || movie.country
      movie.production = production || movie.production
      movie.actors = actors || movie.actors
      movie.directors = directors || movie.directors
      movie.writers = writers || movie.writers
      movie.rating = rating || movie.rating
      movie.imdbRating = imdbRating || movie.imdbRating
      movie.genre = genre || movie.genre
      movie.poster = posterPath ? `http://localhost:3000/${req.file.path}` : movie.poster
      movie.description = description || movie.description
      movie.duration = duration || movie.duration
      movie.isRecommended = isRecommended || movie.isRecommended

      await movie.save()

      res.status(200).send({ status: 200, message: 'Movie updated successfully', movie })
    } catch (error) {
      res.status(500).send({ status: 500, message: 'Internal Server Error' })
    }
  })
}

router.post('/', createMovie)
router.get('/:id', getMovieById)
router.delete('/:id', deleteMovieById)
router.put('/:id', updateMovieById)

module.exports = router
