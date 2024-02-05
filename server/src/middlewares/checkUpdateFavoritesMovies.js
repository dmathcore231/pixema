const missingFields = require('../helpers/missingFields')
const ResponseWithoutPayload = require('../classes/responseWithoutPayload')

async function checkUpdateFavoritesMovies(req, res, next) {
  if (req.body.formUpdateFavoritesMovies) {
    const { movieId } = req.body.formUpdateFavoritesMovies

    if (!movieId) {
      req.clientResponseError = new ResponseWithoutPayload(400, 'Favorites movies is required')
      return next()
    }

    try {
      missingFields([{ field: movieId, fieldName: 'Movie ID' }])
    } catch (error) {
      req.clientResponseError = new ResponseWithoutPayload(400, error.message)
      return next()
    }

    req.clientResponseError = false
    return next()
  }

  next()
}

module.exports = checkUpdateFavoritesMovies

