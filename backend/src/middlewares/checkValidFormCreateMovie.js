const multer = require('multer')
const upload = multer({ dest: 'public/posters' })
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const missingFields = require('../helpers/missingFields')

async function checkValidFormCreateMovie(req, res, next) {
  if (req.body.formCreateMovie) {
    upload.single('poster')(req, res, async function (err) {
      if (err) {
        req.clientResponseError = new ResponseWithoutPayload(500, 'File upload failed')
      }

      const { title, year, releaseDate, boxOffice, country, production, actors, directors, writers, rating, imdbRating, genre, description, duration, isRecommended } = req.body.formCreateMovie
      const errMessages = []
      missingFields(title, 'Title', errMessages)
      missingFields(year, 'Year', errMessages)
      missingFields(releaseDate, 'Release Date', errMessages)
      missingFields(boxOffice, 'Box Office', errMessages)
      missingFields(country, 'Country', errMessages)
      missingFields(production, 'Production', errMessages)
      missingFields(actors, 'Actors', errMessages)
      missingFields(directors, 'Directors', errMessages)
      missingFields(writers, 'Writers', errMessages)
      missingFields(rating, 'Rating', errMessages)
      missingFields(imdbRating, 'IMDb Rating', errMessages)
      missingFields(genre, 'Genre', errMessages)
      missingFields(description, 'Description', errMessages)
      missingFields(duration, 'Duration', errMessages)
      missingFields(isRecommended, 'Recommended', errMessages)

      if (errMessages.length > 0) {
        req.clientResponseError = new ResponseWithoutPayload(400, `Missing fields: ${errMessages.join(', ')}`)
      }

      if (!clientResponseError) {
        req.clientResponseError = false
      }
    })

    next()
  } else {
    next()
  }
}

module.exports = checkValidFormCreateMovie
