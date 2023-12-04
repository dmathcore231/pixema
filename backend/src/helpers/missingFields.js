
function missingFields(field, fieldName, arr) {
  if (!field) {
    arr.push(fieldName)
  }
}

module.exports = missingFields
