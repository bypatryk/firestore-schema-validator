const validators = require('../lib/validators')
const utils = require('./utils')

const expectEachToBe = (array, cb, value) =>
  array.forEach(item => {
    expect(cb(item)).toBe(value)
  })

describe('validators.js', () => {
  describe('isAfter', () => {

  })

  describe('isAny', () => {
    const { isAny } = validators

    it('should return `true` for acceptable types', () => {
      expectEachToBe(
        utils.acceptable,
        isAny,
        true,
      )
    })

    it('should return `false` for non-acceptable types', () => {
      expectEachToBe(
        utils.nonAcceptable,
        isAny,
        false,
      )
    })
  })

  describe('isArray', () => {
    const { isArray } = validators

    it('should return `true` for arrays', () => {
      expectEachToBe(
        utils.arrays,
        isArray,
        true,
      )
    })

    it('should return `false` for non-arrays', () => {
      expectEachToBe(
        utils.allExcept(utils.arrays),
        isArray,
        false,
      )
    })
  })

  describe('isBefore', () => {

  })

  describe('isBoolean', () => {
    const { isBoolean } = validators

    it('should return `true` for litteral booleans', () => {
      expectEachToBe(
        utils.booleans,
        isBoolean,
        true,
      )
    })

    it('should return `false` for non-booleans', () => {
      expectEachToBe(
        utils.allExcept(utils.booleans),
        isBoolean,
        false,
      )
    })
  })

  describe('isDocumentReference', () => {
    const { isDocumentReference } = validators

    it('should return `true` for DocumentReferences', () => {
      expectEachToBe(
        utils.documentReferences,
        isDocumentReference,
        true,
      )
    })

    it('should return `false` for non-DocumentReferences', () => {
      expectEachToBe(
        utils.allExcept(utils.documentReferences),
        isDocumentReference,
        false,
      )
    })
  })

  describe('isGeoPoint', () => {
    const { isGeoPoint } = validators

    it('should return `true` for GeoPoints', () => {
      expectEachToBe(
        utils.geoPoints,
        isGeoPoint,
        true,
      )
    })

    it('should return `false` for non-GeoPoints', () => {
      expectEachToBe(
        utils.allExcept(utils.geoPoints),
        isGeoPoint,
        false,
      )
    })
  })

  describe('isInRange', () => {

  })

  describe('isInteger', () => {
    const { isInteger } = validators

    it('should return `true` for integers', () => {
      expectEachToBe(
        utils.integers,
        isInteger,
        true,
      )
    })

    it('should return `false` for non-integers', () => {
      expectEachToBe(
        utils.allExcept(utils.integers),
        isInteger,
        false,
      )
    })
  })

  describe('isMap', () => {
    const { isMap } = validators

    it('should return `true` for objects', () => {
      expectEachToBe(
        utils.maps,
        isMap,
        true,
      )
    })

    it('should return `false` for non-objects', () => {
      expectEachToBe(
        utils.allExcept(utils.maps),
        isMap,
        false,
      )
    })
  })

  describe('isMatching', () => {

  })

  describe('isNumber', () => {
    const { isNumber } = validators

    it('should return `true` for numbers', () => {
      expectEachToBe(
        [
          ...utils.numbers,
          ...utils.integers,
        ],
        isNumber,
        true,
      )
    })

    it('should return `false` for non-numbers', () => {
      expectEachToBe(
        utils.allExcept([
          ...utils.numbers,
          ...utils.integers,
        ]),
        isNumber,
        false,
      )
    })
  })

  describe('isString', () => {
    const { isString } = validators

    it('should return `true` for strings', () => {
      expectEachToBe(
        utils.strings,
        isString,
        true,
      )
    })

    it('should return `false` for non-strings', () => {
      expectEachToBe(
        utils.allExcept(utils.strings),
        isString,
        false,
      )
    })
  })

  describe('isTimestamp', () => {
    const { isTimestamp } = validators

    it('should return `true` for Timestamps', () => {
      expectEachToBe(
        utils.timestamps,
        isTimestamp,
        true,
      )
    })

    it('should return `false` for non-Timestamps', () => {
      expectEachToBe(
        utils.allExcept(utils.timestamps),
        isTimestamp,
        false,
      )
    })
  })
})
