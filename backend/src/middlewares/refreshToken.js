const jwt = require('jsonwebtoken')
const secretKey = require('../modules/secretKey')
const expiresInAccessToken = require('../helpers/tokenExpires').expiresInAccessToken

async function refreshToken(req, res, next) {
  const { tokenExpired, tokenExpiredSoon, tokenValid } = req.userData.token
  const { user } = req.userData

  if (tokenValid && tokenExpired || tokenValid && tokenExpiredSoon) {
    const newAccessToken = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: expiresInAccessToken
    })
    req.userData.token.accessToken = newAccessToken
    req.userData.token.tokenExpired = false
    req.userData.token.tokenExpiredSoon = false
    req.userData.token.tokenValid = true
    next()
  } else {
    next()
  }
}

module.exports = refreshToken
