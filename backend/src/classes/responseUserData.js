
class ResponseUserData {
  constructor(accessToken, refreshToken, user, status, message) {
    this.accessToken = accessToken || null
    this.refreshToken = refreshToken || null
    this.user = user || null
    this.status = status || 0
    this.message = message || ''
  }
}

module.exports = ResponseUserData
