const admin = require('firebase-admin')

const ModelProxy = require('./ModelProxy')
const Schema = require('./Schema')

class Model {
  constructor (_id, _data = {}) {
    if (this.constructor === Model)
      throw new Error('Model can\'t be used directly and must be extended instead.')

    const name = this.constructor.name
    const _collectionPath = this.constructor._collectionPath
    const _schema = this.constructor._schema

    if (!_collectionPath)
      throw new Error(`${name} must have a static getter _collectionPath.`)

    if (typeof _collectionPath !== 'string')
      throw new Error(`${name}'s static getter _collectionPath must return a string.`)

    if (!_schema)
      throw new Error(`${name} must have a static getter _schema.`)

    if (!(_schema instanceof Schema))
      throw new Error(`${name}'s static getter _schema must return an instance of Schema.`)

    this._id = _id
    this._data = _data
    this._changedKeys = new Set()

    this._proxy = new ModelProxy(this)

    return this._proxy
  }

  get _collectionPath() {
    return this.constructor._collectionPath
  }

  static get _collectionRef() {
    return admin
      .firestore()
      .collection(this._collectionPath)
  }

  get _collectionRef() {
    return this.constructor._collectionRef
  }

  get _schema() {
    return this.constructor._schema
  }

  get _docRef() {
    return this._collectionRef
      .doc(this._id)
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
    const validatedData = await this._schema.validate(this._data)

    Object.entries(validatedData)
      .forEach(([key, value]) => {
        this[key] = value
      })

    return this._data
  }

  toJSON() {
    return this._data
  }
}
module.exports = Model
