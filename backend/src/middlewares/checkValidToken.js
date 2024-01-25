const jwt = require('jsonwebtoken')
const secretKey = require('../modules/secretKey')
const RequestUserData = require('../classes/requestUserData')
const User = require('../models/userSchema')

async function checkValidToken(req, res, next) {
  const { accessToken, refreshToken } = req.userData

  if (accessToken && refreshToken) {
    try {
      const payloadAccessToken = jwt.verify(accessToken, secretKey)
      const payloadRefreshToken = jwt.verify(refreshToken, secretKey)

      if (payloadAccessToken && payloadRefreshToken) {
        const user = await User.findById(payloadAccessToken.id)
        const currentTimestamp = Math.floor(Date.now() / 1000)

        if (payloadAccessToken.exp - currentTimestamp <= 300) {
          req.userData.tokenExpired = true
        } else {
          req.userData.tokenExpired = false
        }
        req.userData.tokenValid = true
        req.userData.user = user
      }
      next()
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        req.userData.tokenValid = false
        next()
      } else if (error instanceof jwt.TokenExpiredError) {
        const payloadAccessTokenDecoded = jwt.decode(accessToken)
        const user = await User.findById(payloadAccessTokenDecoded.id)
        req.userData.tokenExpired = new RequestUserData(accessToken, refreshToken, true, true, user)
        next()
      }
    }
  } else {
    req.userData = new RequestUserData()
    next()
  }
}

module.exports = checkValidToken
