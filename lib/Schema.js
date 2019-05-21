const { asyncForEach } = require('./helpers')

class Schema {
  constructor (_fields) {
    this._fields = _fields
  }

  async validate(data = {}, fields = this._fields) {
    const filteredData = {}

    await asyncForEach(
      Object.entries(fields),
      async ([key, field]) => {
        const filteredFieldData = await field.validate(data[key])

        if (filteredFieldData !== field._OptionalSymbol)
          filteredData[key] = filteredFieldData
      }
    )

    return filteredData
  }

  async validateSelected(data = {}, changedKeys = new Set()) {
    const selectedFields = {}

    for (let key of changedKeys.keys()) {
      key = key.split('.')[0]
      selectedFields[key] = this._fields[key]
    }

    return {
      ...data,
      ...await this.validate(data, selectedFields)
    }
  }
}

module.exports = Schema
