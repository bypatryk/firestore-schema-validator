const admin = require('firebase-admin')

const arrays = [
  [],
  [1, '2', true, null],
]

const booleans = [ false, true ]

const documentReferences = [
  new admin.firestore.DocumentReference(),
]

const geoPoints = [
  new admin.firestore.GeoPoint(-50, 100),
]

const integers = [
  1,
  0,
  1.0,
]

const maps = [
  {},
  { 0: 'a' },
  new Object({}),
]

const nulls = [
  null,
]

const numbers = [
  -Infinity,
  Infinity,
  Math.PI,
  1.05,
]

const strings = [
  '',
  'abc',
  '1',
  '0',
  `
    multiline
    string
  `,
]

const timestamps = [
  new admin.firestore.Timestamp(10000, 10000),
]

const acceptable = [
  ...arrays,
  ...booleans,
  ...documentReferences,
  ...geoPoints,
  ...integers,
  ...maps,
  ...nulls,
  ...numbers,
  ...strings,
  ...timestamps,
]

const nonAcceptable = [
  undefined,
  NaN,
  () => {},
  Symbol(),
  new ArrayBuffer(10),
  new Boolean(true),
  new Object(true),
  new Object(10),
  new String('string'),
  new Object('string'),
  new Date(),
  new Error('Error'),
  new Map(),
  new WeakMap(),
  new Set(),
  new WeakSet(),
  new RegExp(),
  new Promise(resolve => resolve),
  new class SomeClass {},
]

const all = [
  ...acceptable,
  ...nonAcceptable,
]

const allExcept = (except) => all.filter(item => !except.includes(item))

module.exports = {
  all,
  allExcept,
  arrays,
  acceptable,
  nonAcceptable,
  booleans,
  documentReferences,
  geoPoints,
  integers,
  maps,
  numbers,
  strings,
  timestamps,
}
