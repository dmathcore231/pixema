
function checkInvalidFields(fields) {
  const invalidFields = []

  for (const field of fields) {
    if (!field.value) {
      invalidFields.push(field.name)
    }
  }

  return invalidFields
}

module.exports = checkInvalidFields
