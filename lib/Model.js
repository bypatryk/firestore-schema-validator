const admin = require('firebase-admin')

const ModelProxy = require('./ModelProxy')
const Schema = require('./Schema')

const { asyncForEach, markAsChanged } = require('./helpers')

const EventEmitter = require('events')

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

  static get _events() {
    if (!this._emitter)
      this._emitter = new EventEmitter()

    return this._emitter
  }

  static on(event, cb) {
    this._events.on(event, cb)
  }

  static emit(event, thisArg) {
    this._events.emit(event, thisArg)
  }

  emit(event) {
    this.constructor.emit(event, this)
  }

  static hook(path, cb) {
    if (!this._hooks)
      this._hooks = {}

    if (!Array.isArray(this._hooks[path]))
      this._hooks[path] = []

    this._hooks[path].push(cb)
  }

  static async getById(id) {
    const snapshot = await this._collectionRef
      .doc(id)
      .get()

    if (!snapshot.exists)
      return null

    return new this(id, snapshot.data())
  }

  static async create(data = {}) {
    const changedKeys = new Set()
    markAsChanged(changedKeys, data)

    data = await this.parseData(data, changedKeys)

    const docRef = await this._collectionRef
      .add(data)

    const instance = new this(docRef.id, data)

    this.emit('created', instance)

    return instance
  }

  async delete() {
    await this._docRef
      .delete()

    this.emit('deleted', this)
  }

  async save(options) {
    const data = await this.parseData()

    await this._docRef
      .set(data, options)

    this._data = data

    this.emit('updated', this)

    return this
  }

  static async validate(data = {}, changedKeys = new Set()) {
    return await this._schema.validateSelected(data, changedKeys)
  }

  static async runHooks(data = {}, changedKeys = new Set()) {
    /* eslint no-await-in-loop: 0 */
    /* eslint no-loop-func: 0 */
    if (!this._hooks)
      return data

    for (const changedKey of changedKeys.keys())
      if (Array.isArray(this._hooks[changedKey]))
        await asyncForEach(
          this._hooks[changedKey],
          async (cb) => data = await cb(data),
        )

    return data
  }

  static async parseData(data, changedKeys) {
    data = await this.validate(data, changedKeys)
    data = await this.runHooks(data, changedKeys)

    return data
  }

  async parseData(data = this._data, changedKeys = this._changedKeys) {
    return await this.constructor.parseData(data, changedKeys)
  }

  toJSON() {
    return this._data
  }
}
module.exports = Model
