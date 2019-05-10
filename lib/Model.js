const ModelProxy = require('./ModelProxy')
const Schema = require('./Schema')

class Model {
  constructor(_data = {}) {
    if (this.constructor === Model)
      throw new Error('Model can\'t be used directly and must be extended instead.')

    const name = this.constructor.name
    const schema = this.constructor.schema
    const collectionPath = this.constructor.collectionPath

    if (!collectionPath)
      throw new Error(`${name} must have a static property collectionPath().`)

    if (typeof collectionPath() !== 'string')
      throw new Error(`${name}.constructor.collectionPath() must return a string.`)

    if (!schema)
      throw new Error(`${name} must have a static property schema().`)

    if (!(schema() instanceof Schema))
      throw new Error(`${name}.constructor.schema() must return an instance of Schema.`)

    this._data = _data
    this._collectionPath = collectionPath()
    this._schema = schema()

    // TODO: track changed properties
    this._changed = {}

    return new ModelProxy(this)
  }

  doc(document) {
    this.$doc = document
  }

  static async get() {

  }

  async create() {

  }

  async delete() {

  }

  async update() {

  }

  async set() {

  }

  async validate() {
    return await this._schema.validate(this._data)
  }

  toJSON() {
    return this._data
  }
}
module.exports = Model
