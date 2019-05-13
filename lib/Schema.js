const { isMap } = require('./validators')
const { asyncForEach } = require('./helpers')
const StructureError = require('./StructureError')

class Schema {
  constructor (_fields) {
    this._fields = _fields
  }

  async validate(data = {}) {
    if (!isMap(data))
      throw new StructureError('Data must be a Map.')

    const filteredData = {}

    await asyncForEach(
      Object.entries(this._fields),
      async ([key, field]) => {
        const filteredFieldData = await field.validate(data[key])

        if (filteredFieldData !== field._OptionalSymbol)
          filteredData[key] = filteredFieldData
      }
    )

    return filteredData
  }
}

module.exports = Schema
