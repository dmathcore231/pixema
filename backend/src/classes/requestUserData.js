
class RequestUserData {
  constructor(accessToken, refreshToken, user, tokenExpired, tokenValid) {
    this.accessToken = accessToken || null
    this.refreshToken = refreshToken || null
    this.tokenExpired = tokenExpired || false
    this.tokenValid = tokenValid || null
    this.user = user || null
  }
}

module.exports = RequestUserData
