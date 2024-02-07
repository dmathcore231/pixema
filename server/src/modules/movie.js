const express = require('express')
const multer = require('multer')
const Movie = require('../models/moviesSchema')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const ResponseDashboardData = require('../classes/responseDashboardData')
const ResponseData = require('../classes/responseData')
const missingFields = require('../helpers/missingFields')
const User = require('../models/userSchema')

const router = express.Router()

const upload = multer({ dest: 'public/posters' })
async function createMovie(req, res) {
  upload.single('poster')(req, res, async function (err) {
    if (err) {
      return req.clientResponseError = new ResponseWithoutPayload(500, 'File upload failed')
    }

    if (req.body.formName === 'createMovie') {
      const posterPath = req.file.path
      const { title, year, releaseDate, boxOffice, country, production, actors, directors, writers, rating, imdbRating, genre, description, duration, isRecommended } = req.body

      try {
        missingFields([
          { field: title, fieldName: 'Title' },
          { field: year, fieldName: 'Year' },
          { field: releaseDate, fieldName: 'Release Date' },
          { field: boxOffice, fieldName: 'Box Office' },
          { field: country, fieldName: 'Country' },
          { field: production, fieldName: 'Production' },
          { field: actors, fieldName: 'Actors' },
          { field: directors, fieldName: 'Directors' },
          { field: writers, fieldName: 'Writers' },
          { field: rating, fieldName: 'Rating' },
          { field: imdbRating, fieldName: 'IMDb Rating' },
          { field: genre, fieldName: 'Genre' },
          { field: description, fieldName: 'Description' },
          { field: duration, fieldName: 'Duration' },
          { field: isRecommended, fieldName: 'Recommended' },
        ])
      } catch (error) {
        return res.status(400).send(new ResponseWithoutPayload(400, error.message))
      }

      try {
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
          rating: {
            ratingMovie: rating,
          },
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
        console.log(error)
        res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
      }
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

  if (req.clientResponseError) {
    return res.status(req.clientResponseError.status).send(req.clientResponseError)
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
    if (req.clientResponseError) {
      return res.status(req.clientResponseError.status).send(req.clientResponseError)
    }

    if (req.body.formName === 'updateMovie') {
      if (err) {
        return req.clientResponseError = new ResponseWithoutPayload(500, 'File upload failed')
      }

      const { id } = req.params

      if (!id) {
        return res.status(400).send(new ResponseWithoutPayload(400, 'Movie ID is required'))
      }

      const movie = await Movie.findById(id)

      if (!movie) {
        return res.status(404).send(new ResponseWithoutPayload(404, 'Movie not found'))
      }

      const { title, year, releaseDate, boxOffice, country, production, actors, directors, writers, rating, imdbRating, genre, description, duration, isRecommended } = req.body

      try {
        missingFields([
          { field: title, fieldName: 'Title' },
          { field: year, fieldName: 'Year' },
          { field: releaseDate, fieldName: 'Release Date' },
          { field: boxOffice, fieldName: 'Box Office' },
          { field: country, fieldName: 'Country' },
          { field: production, fieldName: 'Production' },
          { field: actors, fieldName: 'Actors' },
          { field: directors, fieldName: 'Directors' },
          { field: writers, fieldName: 'Writers' },
          { field: rating, fieldName: 'Rating' },
          { field: imdbRating, fieldName: 'IMDB Rating' },
          { field: genre, fieldName: 'Genre' },
          { field: description, fieldName: 'Description' },
          { field: duration, fieldName: 'Duration' },
          { field: isRecommended, fieldName: 'Is Recommended' }
        ])
      } catch (error) {
        return res.status(400).send(new ResponseWithoutPayload(400, error.message))
      }

      try {
        const poster = req.file

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
        movie.poster = poster ? `http://localhost:3000/${req.file.path}` : movie.poster
        movie.description = description || movie.description
        movie.duration = duration || movie.duration
        movie.isRecommended = isRecommended || movie.isRecommended

        await movie.save()

        res.status(200).send(new ResponseDashboardData(200, 'Movie updated successfully', movie))
      } catch (error) {
        console.log(error)
        res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
      }
    }
  })
}

async function setRatingMovie(req, res) {
  const { id } = req.params

  if (req.clientResponseError) {
    return res.status(req.clientResponseError.status).send(req.clientResponseError)
  }

  try {
    const { userId, rating } = req.body.formSetRatingMovie
    const movie = await Movie.findById(id)
    const user = await User.findById(userId)

    if (!movie) {
      return res.status(404).send(new ResponseWithoutPayload(404, 'Movie not found'))
    }

    if (!user) {
      return res.status(404).send(new ResponseWithoutPayload(404, 'User not found'))
    }

    const existingRating = movie.rating.userRating.find(item => item.userId === userId)

    if (existingRating) {
      existingRating.rating = rating
    } else {
      movie.rating.userRating.push({ userId, rating })
    }

    movie.rating.ratingMovie = movie.rating.userRating.reduce((acc, item) => acc + item.rating, 0) / movie.rating.userRating.length

    await movie.save()

    res.status(200).send(new ResponseDashboardData(200, 'Rating set successfully', movie))
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      return res.status(404).send(new ResponseWithoutPayload(404, 'Bad request'))
    }
    res.status(500).send(new ResponseWithoutPayload(500, 'Internal Server Error'))
  }
}

router.post('/', createMovie)
router.get('/:id', getMovieById)
router.delete('/:id', deleteMovieById)
router.put('/:id', updateMovieById)
router.post('/rating/:id', setRatingMovie)

module.exports = router
