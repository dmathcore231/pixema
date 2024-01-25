
async function refreshToken(req, res, next) {
  console.log(req.userData)
  next()
}

module.exports = refreshToken
