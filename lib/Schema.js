const { isMap } = require('./validators')
const { asyncForEach } = require('./helpers')
const StructureError = require('./StructureError')

class Schema {
  constructor (_fields) {
    this._fields = _fields
  }

  async validate(modelData = {}) {
    if (!isMap(modelData))
      throw new StructureError('Model Data must be a Map.')

    const filteredData = {}

    await asyncForEach(
      Object.entries(this._fields),
      async ([key, field]) => {
        const filteredFieldData = await field.validate(modelData[key])

        if (filteredFieldData !== field._OptionalSymbol)
          filteredData[key] = filteredFieldData
      }
    )

    return filteredData
  }
}

module.exports = Schema
