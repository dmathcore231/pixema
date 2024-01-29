
class ResponseData {
  constructor(status, message, data, isAuth) {
    this.status = status
    this.message = message
    this.data = data
    this.isAuth = isAuth || null
  }
}

module.exports = ResponseData
