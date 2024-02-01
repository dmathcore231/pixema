const multer = require('multer')
const upload = multer({ dest: 'public/posters' })
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')
const Movie = require('../models/moviesSchema')

async function checkValidFormUpdateMovie(req, res, next) {
  upload.single('poster')(req, res, async function (err) {
    const { id } = req.params
    const movie = await Movie.findById(id)

    if (req.body.formUpdateMovie) {
      if (err) {
        req.clientResponseError = new ResponseWithoutPayload(500, 'File upload failed')
        return next()
      }

      if (!id) {
        req.clientResponseError = new ResponseWithoutPayload(400, 'Movie ID is required')
        return next()
      }

      if (!movie) {
        req.clientResponseError = new ResponseWithoutPayload(404, 'Movie not found')
        return next()
      }

      req.clientResponseError = false
      next()
    }
  })

  next()
}

module.exports = checkValidFormUpdateMovie
