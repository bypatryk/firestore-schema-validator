const Field = require('./Field')
const Schema = require('./Schema')
const model = require('./Model')

module.exports = {
  field(...args) {
    return new Field(...args)
  },
  schema(...args) {
    return new Schema(...args)
  },
  model(path, schema) {
    return model(path, schema)
  },
}
