const admin = require('firebase-admin')
const moment = require('moment')
const EventEmitter = require('events')

const ModelProxy = require('./ModelProxy')
const Schema = require('./Schema')

const { asyncForEach, markAsChanged } = require('./helpers')

class Model {
  constructor (_snapshot, _data) {
    if (this.constructor === Model)
      throw new Error('Model can\'t be used directly and must be extended instead.')

    const name = this.constructor.name

    if (!(_snapshot instanceof admin.firestore.DocumentSnapshot))
      throw new Error(`${name} constructor must be called with instance of DocumentSnapshot.`)

    if (!this.constructor._collectionPath)
      throw new Error(`${name} must have a static getter _collectionPath.`)

    if (typeof this.constructor._collectionPath !== 'string')
      throw new Error(`${name}'s static getter _collectionPath must return a string.`)

    if (!this.constructor._schema)
      throw new Error(`${name} must have a static getter _schema.`)

    if (!(this.constructor._schema instanceof Schema))
      throw new Error(`${name}'s static getter _schema must return an instance of Schema.`)

    this._snapshot = _snapshot
    this._data = _data || this._snapshot.data() || {}
    this._changedKeys = new Set()

    this._proxy = new ModelProxy(this)

    return this._proxy
  }

  get id() {
    return this._snapshot.id
  }

  get _createdAt() {
    const createTime = this._snapshot.createTime

    if (!createTime)
      return moment()
        .toISOString()

    return moment
      .unix(createTime.seconds)
      .toISOString()
  }

  get _updatedAt() {
    const updateTime = this._snapshot.updateTime

    if (!updateTime)
      return null

    return moment
      .unix(updateTime.seconds)
      .toISOString()
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

  get _docRef() {
    return this._collectionRef
      .doc(this.id)
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

  static prehook(path, cb) {
    if (!this._prehooks)
      this._prehooks = {}

    if (!Array.isArray(this._prehooks[path]))
      this._prehooks[path] = []

    this._prehooks[path].push(cb)
  }

  static posthook(path, cb) {
    if (!this._posthooks)
      this._posthooks = {}

    if (!Array.isArray(this._posthooks[path]))
      this._posthooks[path] = []

    this._posthooks[path].push(cb)
  }

  static async getById(id) {
    const snapshot = await this._collectionRef
      .doc(id)
      .get()

    if (!snapshot.exists)
      return null

    return new this(snapshot)
  }

  static async getBy(key, value) {
    const querySnapshot = await this._collectionRef
      .where(key, '==', value)
      .limit(1)
      .get()

    if (!querySnapshot.docs.length)
      return null

    const snapshot = querySnapshot.docs[0]

    return new this(snapshot)
  }

  static async getAllBy(key, value) {
    const querySnapshot = await this._collectionRef
      .where(key, '==', value)
      .get()

    return querySnapshot.docs
      .map(snapshot => new this(snapshot))
  }

  static async create(data = {}) {
    const snapshot = await this._collectionRef.doc()
      .get()

    const instance = new this(snapshot, data)
    markAsChanged(instance._changedKeys, data)

    instance._data = await instance.parseData(data, true)

    await instance._docRef
      .set(instance._data)

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

  async validate(data = {}, all = false) {
    if (all)
      return await this.constructor._schema.validate(data)

    return await this.constructor._schema.validateSelected(data, this._changedKeys)
  }

  async runHooks(hooks, data = {}) {
    /* eslint no-await-in-loop: 0 */
    /* eslint no-loop-func: 0 */
    if (!hooks)
      return data

    for (const changedKey of this._changedKeys.keys())
      if (Array.isArray(hooks[changedKey]))
        await asyncForEach(
          hooks[changedKey],
          async (cb) => await cb(data, this),
        )

    return data
  }

  async parseData(data = this._data, all = false) {
    data = await this.runHooks(this.constructor._prehooks, data)
    data = await this.validate(data, all)
    data = await this.runHooks(this.constructor._posthooks, data)

    this._changedKeys = new Set()

    return data
  }

  toJSON() {
    return this._data
  }
}

module.exports = Model
