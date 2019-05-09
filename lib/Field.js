const filters = require('./filters')
const { asyncForEach } = require('./helpers')
const ValidationError = require('./ValidationError')
const StructureError = require('./StructureError')

const OptionalSymbol = Symbol()

class Field {
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

  add(filter) {
    this._stack.push(filter)

    return this
  }

  async validate(fieldData) {
    if (this._defaultValue !== undefined && fieldData === undefined)
      fieldData = this._defaultValue

    if (this._isOptional && fieldData === undefined)
      return this._OptionalSymbol

    if (this._isNullable && fieldData === null)
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

  _defineType() {
    if (this._isTypeDefined)
      throw new StructureError('Type has already been defined.')

    this._isTypeDefined = true
  }

  default(defaultValue) {
    this._defaultValue = defaultValue

    return this
  }

  custom(filter) {
    this.add(filter)

    return this
  }

  nullable() {
    this._isNullable = true

    return this
  }

  optional() {
    this._isOptional = true

    return this
  }

  arrayOf(field, ...args) {
    this._defineType()
    this._arrayOf = field

    return this.add(filters.array(...args))
  }

  objectOf(fields, ...args) {
    this._defineType()
    this._objectOf = fields

    return this.add(filters.object(...args))
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

      return this.add(filters[name](...args))
    }
})

Object.keys(filters)
  .forEach(name => {
    if (!Field.prototype[name])
      Field.prototype[name] = function (...args) {
        return this.add(filters[name](...args))
      }
  })

module.exports = Field
