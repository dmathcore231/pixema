/**
 * @typedef {Object} FieldObject
 * @property {any} field
 * @property {string} fieldName
 */

/**
 * @param {FieldObject[]} value
 * @returns {string[]}
 * @throws {Error}
 */
function missingFields(value) {
  if (!Array.isArray(value)) {
    throw new Error('Value must be an array')
  }

  const invalidObjects = value.filter(obj => typeof obj.fieldName !== 'string' || !('field' in obj) || !('fieldName' in obj) || Object.keys(obj).length !== 2);
  if (invalidObjects.length > 0) {
    throw new Error('Each object in the array must have exactly two properties: field and fieldName')
  }

  const fieldsMissing = value.filter(item => !item.field).map(item => item.fieldName)

  if (fieldsMissing.length > 0) {
    throw new Error('Some fields are missing: ' + fieldsMissing.join(', '))
  }

  return fieldsMissing
}

module.exports = missingFields
