
class RequestUserData {
  constructor(accessToken, refreshToken, user, tokenExpired, tokenValid, tokenExpiredSoon) {
    this.token = {
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
      tokenExpired: tokenExpired || false,
      tokenExpiredSoon: tokenExpiredSoon || false,
      tokenValid: tokenValid || null
    }
    this.user = user || null
  }
}

module.exports = RequestUserData
