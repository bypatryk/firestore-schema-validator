const { asyncForEach } = require('./helpers')

/**
 * Definition of Document Schema.
 *
 * @class Schema
 */
class Schema {
  /**
   * Creates an instance of Schema.
   *
   * @param {Object<Field>} _fields Object containing Field definitions.
   * @memberof Schema
   */
  constructor (_fields) {
    this._fields = _fields
  }

  /**
   * Validates Document Data agains Fields.
   *
   * @param {Object} [data={}]
   * @param {Object<Field>} [fields=this._fields]
   * @returns Validated Document Data.
   * @memberof Schema
   */
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

  /**
   * Validates Document Data against selected Fields.
   *
   * @param {Object} [data={}] Document Data
   * @param {Set} [changedKeys=new Set()] Set with Paths of changed Fields.
   * @returns Valdiated Document Data.
   * @memberof Schema
   */
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
