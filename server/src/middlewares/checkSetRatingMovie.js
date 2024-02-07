const missingFields = require('../helpers/missingFields')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')

async function checkSetRatingMovie(req, res, next) {
  if (req.body.formSetRatingMovie) {
    const { userId, rating } = req.body.formSetRatingMovie

    try {
      missingFields([
        { field: userId, fieldName: 'User ID' },
        { field: rating, fieldName: 'Rating' }
      ])
      req.clientResponseError = false
      return next()
    } catch (error) {
      req.clientResponseError = new ResponseWithoutPayload(400, error.message)
      return next()
    }
  }

  next()
}

module.exports = checkSetRatingMovie
