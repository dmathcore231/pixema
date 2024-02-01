const jwt = require('jsonwebtoken')
const secretKey = require('../modules/secretKey')
const User = require('../models/userSchema')
const ResponseData = require('../classes/responseData')

async function checkValidToken(req, res, next) {
  const { accessToken, refreshToken } = req.userData.token
  if (accessToken && refreshToken) {
    try {
      const payloadAccessToken = jwt.verify(accessToken, secretKey)
      const payloadRefreshToken = jwt.verify(refreshToken, secretKey)

      if (payloadAccessToken && payloadRefreshToken) {
        const user = await User.findById(payloadAccessToken.id)
        const currentTimestamp = Math.floor(Date.now() / 1000)

        if (payloadAccessToken.exp - currentTimestamp <= 300) {
          req.userData.token.tokenExpiredSoon = true
        } else {
          req.userData.token.tokenExpiredSoon = false
        }
        req.userData.token.tokenValid = true
        req.userData.user = user
      }
      next()
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError && error.name === 'TokenExpiredError') {
        const payloadAccessTokenDecoded = jwt.decode(accessToken)
        const user = await User.findById(payloadAccessTokenDecoded.id)
        req.userData.token.tokenExpired = true
        req.userData.token.tokenValid = true
        req.userData.user = user
      } else {
        req.userData.token.tokenValid = false
        req.clientResponseError = new ResponseData(401, 'Invalid access token', null, null)
      }
      next()
    }
  } else {
    next()
  }
}

module.exports = checkValidToken
