const admin = require('firebase-admin')
const moment = require('moment')

const FIRESTORE_TYPES = [
  'Array',
  'Map',
  'Boolean',
  'Number',
  'DocumentReference',
  'GeoPoint',
  'String',
  'Timestamp',
]

const isAfter = (date, value) =>
  moment(date).diff(value) < 0

const isAny = value =>
  isArray(value)
  || isBoolean(value)
  || isDocumentReference(value)
  || isGeoPoint(value)
  || isMap(value)
  || isNumber(value)
  || isString(value)
  || isTimestamp(value)
  || isNull(value)

const isArray = value =>
  Array.isArray(value)

const isBefore = (date, value) =>
  moment(value).diff(date) < 0

const isBoolean = value =>
  typeof value === 'boolean'

const isDocumentReference = value =>
  value instanceof admin.firestore.DocumentReference

const isGeoPoint = value =>
  value instanceof admin.firestore.GeoPoint

const isInRange = (min, max, value) =>
  min <= value
  && value <= max

const isInteger = value =>
  isNumber(value) && Number.isInteger(value)

const isMap = value =>
  typeof value === 'object'
  && value !== null
  && value.constructor instanceof value.constructor

const isMatching = (regex, value) =>
  regex.test(value)

const isNull = value =>
  value === null

const isNumber = value =>
  typeof value === 'number'
  && !isNaN(value)

const isString = value =>
  typeof value === 'string'

const isTimestamp = value =>
  value instanceof admin.firestore.Timestamp

module.exports = {
  isAfter,
  isAny,
  isArray,
  isBefore,
  isBoolean,
  isDocumentReference,
  isGeoPoint,
  isInRange,
  isInteger,
  isMap,
  isMatching,
  isNull,
  isNumber,
  isString,
  isTimestamp,
  FIRESTORE_TYPES,
}
