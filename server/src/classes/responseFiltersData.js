const ResponseData = require('./responseData')

class ResponseFiltersData extends ResponseData {
  constructor(status, message, data, isAuth, filters) {
    super(status, message, data, isAuth)
    this.filters = filters || null
  }
}

module.exports = ResponseFiltersData
