const cookieParser = require('cookie-parser')
const RequestUserData = require('../classes/requestUserData')

async function checkAuth(req, res, next) {
  cookieParser()(req, res, () => {
    const authHeader = req.headers.authorization
    const { refreshToken } = req.cookies
    if (authHeader && refreshToken) {
      const accessToken = authHeader.split(' ')[1]
      req.userData = new RequestUserData(accessToken, refreshToken)
      next()
    } else {
      req.userData = new RequestUserData()
      next()
    }
  })

}

module.exports = checkAuth

