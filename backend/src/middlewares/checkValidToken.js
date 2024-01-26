const jwt = require('jsonwebtoken')
const secretKey = require('../modules/secretKey')
const RequestUserData = require('../classes/requestUserData')
const User = require('../models/userSchema')

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
      if (error instanceof jwt.JsonWebTokenError) {
        console.log(error)
        req.userData.token.tokenValid = false
        next()
      } else if (error instanceof jwt.TokenExpiredError) {
        const payloadAccessTokenDecoded = jwt.decode(accessToken)
        const user = await User.findById(payloadAccessTokenDecoded.id)
        req.userData.token.tokenExpired = true
        req.userData.token.tokenValid = true
        req.userData.user = user
        next()
      }
    }
  } else {
    next()
  }
}

module.exports = checkValidToken
