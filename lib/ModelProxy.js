const Field = require('./Field')
const { isObject, markAsChanged } = require('./helpers')

const isPrivate = (key) => {
  return key[0] === '_'
}

const isData = (target, key) => {
  const fields = target.constructor._schema._fields

  return fields.hasOwnProperty(key)
    && fields[key] instanceof Field
}

const nestedHandler = (model, path = []) => {
  return {
    get(target, key) {
      if (isObject(target[key]))
        return new Proxy(
          target[key],
          nestedHandler(model, [
            ...path,
            key,
          ])
        )

      return target[key]
    },

    set(target, key, value) {
      markAsChanged(model._changedKeys, value, [ ...path, key ])
      return Reflect.set(target, key, value)
    }
  }
}

const ModelProxy = function (model) {
  return new Proxy(model, {
    get(target, key) {
      if (isPrivate(key))
        return target[key]

      if (isData(target, key) && isObject(target._data[key]))
        return new Proxy(target._data[key], nestedHandler(target, [key]))

      if (isData(target, key))
        return target._data[key]

      return target[key]
    },

    set(target, key, value) {
      if (isPrivate(key))
        return Reflect.set(target, key, value)

      if (isData(target, key)) {
        markAsChanged(target._changedKeys, value, [ key ])
        target._data[key] = value

        return Reflect.set(target._data, key, value)
      }

      return Reflect.set(target, key, value)
    },
  })
}

module.exports = ModelProxy
