const Field = require('./Field')
const Schema = require('./Schema')
const Model = require('./Model')

module.exports = {
  field(...args) {
    return new Field(...args)
  },
  schema(...args) {
    return new Schema(...args)
  },
  Field,
  Schema,
  Model,
}
