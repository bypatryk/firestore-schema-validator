const moment = require('moment')
const validators = require('./validators')
const ValidationError = require('./ValidationError')
const StructureError = require('./StructureError')

const after = (
  date,
  errorMessage = `%s must be after ${date}.`,
) => value => {
  if (!validators.isAfter(value))
    throw new ValidationError(errorMessage)

  return value
}

const any = (
  errorMessage = `%s must be of one of the types accepted by Cloud Firestore: ${validators.FIRESTORE_TYPES.join(', ')}.`,
) => value => {
  if (!validators.isAny(value))
    throw new ValidationError(errorMessage)

  return value
}

const array = (
  errorMessage = '%s must be an Array.',
) => value => {
  if (!validators.isArray(value))
    throw new ValidationError(errorMessage)

  return value
}

const before = (
  date,
  errorMessage = `%s must be before ${date}.`,
) => value => {
  if (!validators.isBefore(date, value))
    throw new ValidationError(errorMessage)

  return value
}

const boolean = (
  errorMessage = '%s must be a Boolean.',
) => value => {
  if (!validators.isBoolean(value))
    throw new ValidationError(errorMessage)

  return value
}

const date = (
  format,
  errorMessage = format
    ? `%s must be a valid Date in ${format} format.`
    : '%s must be a valid Date.',
) => value => {
  const date = moment(value, format)

  if (!date.isValid())
    throw new ValidationError(errorMessage)

  if (format && date.format(format) !== value)
    throw new ValidationError(errorMessage)

  return value
}

const email = (
  errorMessage = '%s must be a valid email.',
) => value => {
  const regex = /^[-\w\d.+_]+@[-\w\d.+_]+\.[\w]{2,}$/

  if (!validators.isMatching(regex, value))
    throw new ValidationError(errorMessage)

  return value.toLowerCase()
}

const oneOf = (
  acceptableValues,
  errorMessage = `%s must be one of the accepted values (${acceptableValues.join(', ')}).`,
) => value => {
  if (!Array.isArray(acceptableValues) || acceptableValues.length === 0)
    throw new StructureError('Field.oneOf(): acceptableValues must be an array with at least one item.')

  if (!acceptableValues.every(value =>
    validators.isBoolean(value)
    || validators.isNumber(value)
    || validators.isString(value)
  ))
    throw new StructureError('Field.oneOf(): each of acceptableValues must be of one of the accepted types (Boolean, Number, String).')

  if (!acceptableValues.includes(value))
    throw new ValidationError(errorMessage)

  return value
}

const equal = (
  compare,
  errorMessage = `%s must equal ${compare}.`,
) => value => {
  if (compare !== value)
    throw new ValidationError(errorMessage)

  return value
}

const geopoint = (
  errorMessage = '% must be an instance of GeoPoint.',
) => value => {
  if (!validators.isGeoPoint(value))
    throw new ValidationError(errorMessage)

  return value
}

const integer = (
  errorMessage = '%s must be an Integer Number.',
) => value => {
  if (!validators.isInteger(value))
    throw new ValidationError(errorMessage)

  return value
}

const length = (
  length,
  errorMessage = `%s must have length of ${length}.`,
) => value => {
  if (value.length !== length)
    throw new ValidationError(errorMessage)

  return value
}

const match = (
  regex,
  errorMessage = `%s must match ${regex} pattern.`,
) => value => {
  if (!validators.isMatching(regex, value))
    throw new ValidationError(errorMessage)

  return value
}

const max = (
  max,
  errorMessage = `%s must be a Number less than or equal to ${max}.`,
) => value => {
  if (!validators.isInRange(-Infinity, max, value))
    throw new ValidationError(errorMessage)

  return value
}

const maxLength = (
  maxLength,
  errorMessage = `%s must have length of at most ${maxLength}.`,
) => value => {
  if (!(value.length <= maxLength))
    throw new ValidationError(errorMessage)

  return value
}

const min = (
  min,
  errorMessage = `%s must be a Number greater than or equal to ${min}.`,
) => value => {
  if (!validators.isInRange(min, Infinity, value))
    throw new ValidationError(errorMessage)

  return value
}

const minLength = (
  minLength,
  errorMessage = `%s must have length of at least ${minLength}.`,
) => value => {
  if (!(minLength <= value.length))
    throw new ValidationError(errorMessage)

  return value
}

const number = (
  errorMessage = '%s must be a Number.',
) => value => {
  if (!validators.isNumber(value))
    throw new ValidationError(errorMessage)

  return value
}

const object = (
  errorMessage = '%s must be a Map.',
) => value => {
  if (!validators.isMap(value))
    throw new ValidationError(errorMessage)

  return value
}

const range = (
  min,
  max,
  errorMessage = `%s must be a Number between ${min} and ${max}`,
) => value => {
  if (!validators.isInRange(min, max, value))
    throw new ValidationError(errorMessage)

  return value
}

const reference = (
  errorMessage = '%s must be an instance of DocumentReference.',
) => value => {
  if (!validators.isDocumentReference(value))
    throw new ValidationError(errorMessage)

  return value
}

const string = (
  errorMessage = '%s must be a String.',
) => value => {
  if (!validators.isString(value))
    throw new ValidationError(errorMessage)

  return value
}

const timestamp = (
  errorMessage = '%s must be an instance of Timestamp.',
) => value => {
  if (!validators.isTimestamp(value))
    throw new ValidationError(errorMessage)

  return value
}

const trim = (
  errorMessage = 'Couldn\'t trim %s.',
) => value => {
  try {
    return value.trim()
  } catch (err) {
    throw new ValidationError(errorMessage)
  }
}

const toLowerCase = (
  errorMessage = 'Couldn\'t turn %s to lower case.',
) => value => {
  try {
    return value.toLowerCase()
  } catch (err) {
    throw new ValidationError(errorMessage)
  }
}

const toUpperCase = (
  errorMessage = 'Couldn\'t turn %s to upper case.',
) => value => {
  try {
    return value.toUpperCase()
  } catch (err) {
    throw new ValidationError(errorMessage)
  }
}

module.exports = {
  after,
  any,
  array,
  before,
  boolean,
  date,
  email,
  equal,
  geopoint,
  integer,
  length,
  number,
  match,
  max,
  maxLength,
  min,
  minLength,
  object,
  oneOf,
  range,
  reference,
  string,
  timestamp,
  toLowerCase,
  toUpperCase,
  trim,
}
