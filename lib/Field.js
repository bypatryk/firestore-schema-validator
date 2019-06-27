const filters = require('./filters')
const { asyncForEach } = require('./helpers')
const ValidationError = require('./ValidationError')
const StructureError = require('./StructureError')

const OptionalSymbol = Symbol()

/**
 * Definition of Field.
 *
 * @class Field
 */
class Field {
  /**
   * Creates an instance of Field.
   *
   * @param {String} _label Field's Label.
   * @memberof Field
   */
  constructor (_label) {
    if (!_label || typeof _label !== 'string')
      throw new StructureError('Field Label must be defined.')

    this._label = _label
    this._hasChanged = false

    this._stack = []

    this._objectOf
    this._arrayOf
    this._defaultValue

    this._isTypeDefined = false

    this._isNullable = false

    this._isOptional = false
    this._OptionalSymbol = OptionalSymbol
  }

  /**
   * Validates Field Data against Field.
   *
   * @param {*} fieldData Field Data.
   * @returns Validated Field Data.
   * @memberof Field
   */
  async validate(fieldData) {
    if (this._defaultValue !== undefined && fieldData === undefined)
      fieldData = typeof this._defaultValue === 'function'
        ? this._defaultValue()
        : this._defaultValue

    if (this._isOptional && fieldData === undefined)
      return this._OptionalSymbol

    if (this._isNullable && (fieldData === null || fieldData === undefined))
      return null

    if (fieldData === undefined || fieldData === null)
      throw new ValidationError(`${this._label} is required.`)

    fieldData = await this.validateField(fieldData)

    if (this._objectOf)
      fieldData = await this.validateObject(fieldData)

    if (this._arrayOf)
      fieldData = await this.validateArray(fieldData)

    return fieldData
  }

  /**
   * Validated Field Data at high level.
   *
   * @param {*} fieldData Field Data.
   * @returns Validated Field Data.
   * @memberof Field
   */
  async validateField(fieldData) {
    for (const filter of this._stack) {
      /* eslint no-await-in-loop: 0 */
      try {
        fieldData = await filter(fieldData)
      } catch (error) {
        error.message = error.message.replace('%s', this._label)

        throw error
      }
    }

    return fieldData
  }

  /**
   * Validates nested Fields of Object Field.
   *
   * @param {*} fieldData Field Data.
   * @returns Validated Field Data.
   * @memberof Field
   */
  async validateObject(fieldData) {
    const filteredData = {}

    await asyncForEach(
      Object.entries(this._objectOf),
      async ([key, field]) => {
        const filteredValue = await field.validate(fieldData[key])

        if (filteredValue !== field._OptionalSymbol)
          filteredData[key] = filteredValue
      }
    )

    return filteredData
  }

  /**
   * Validates nested Fields of Array Field.
   *
   * @param {*} arrayData Array Data.
   * @returns Validated Array Data.
   * @memberof Field
   */
  async validateArray(arrayData) {
    const filteredData = []

    await asyncForEach(
      arrayData,
      async (itemData) => {
        const filteredValue = await this._arrayOf.validate(itemData)

        if (filteredValue !== this._arrayOf._OptionalSymbol)
          filteredData.push(filteredValue)
      }
    )

    return filteredData
  }

  /**
   * Sets _isTypeDefined to true, so Field can only be of one type.
   *
   * @memberof Field
   */
  _defineType() {
    if (this._isTypeDefined)
      throw new StructureError('Type has already been defined.')

    this._isTypeDefined = true
  }

  /**
   * Adds filter to stack.
   *
   * @param {Function} filter
   * @returns {this}
   * @memberof Field
   */
  _add(filter) {
    this._stack.push(filter)

    return this
  }

  /**
   * Adds custom filter to stack.
   *
   * @param {Function} filter
   * @returns {this}
   * @memberof Field
   */
  custom(filter) {
    return this._add(filter)
  }

  /**
   * Defines default value that will be returned if Field Data is undefined.
   *
   * @param {*} defaultValue
   * @returns {this}
   * @memberof Field
   */
  default(defaultValue) {
    this._defaultValue = defaultValue

    return this
  }

  /**
   * Allows Field Data to be null.
   *
   * @returns {this}
   * @memberof Field
   */
  nullable() {
    this._isNullable = true

    return this
  }

  /**
   * Makes Field optional.
   *
   * @returns {this}
   * @memberof Field
   */
  optional() {
    this._isOptional = true

    return this
  }

  /**
   * Defines Field as an Array with items defined by nested Field.
   *
   * @param {Field} field Field.
   * @param {*} args
   * @returns {this}
   * @memberof Field
   */
  arrayOf(field, ...args) {
    this._defineType()
    this._arrayOf = field

    return this._add(filters.array(...args))
  }

  /**
   * Defines Field as an Object with entries defined by nested Fields.
   *
   * @param {Object<Field>} fields Object of Fields.
   * @param {*} args
   * @returns {this}
   * @memberof Field
   */
  objectOf(fields, ...args) {
    this._defineType()
    this._objectOf = fields

    return this._add(filters.object(...args))
  }
}

const typeFilters = [
  'any',
  'array',
  'date',
  'boolean',
  'integer',
  'number',
  'object',
  'oneOf',
  'reference',
  'string',
  'timestamp',
]

typeFilters.forEach(name => {
  if (!Field.prototype[name])
    Field.prototype[name] = function (...args) {
      this._defineType()

      return this._add(filters[name](...args))
    }
})

Object.keys(filters)
  .forEach(name => {
    if (!Field.prototype[name])
      Field.prototype[name] = function (...args) {
        return this._add(filters[name](...args))
      }
  })

module.exports = Field
