const model = (_collectionPath, _schema) => {
  const obj = {
    _data: {},
    _methods: {},
  }

  const nestedHandler = {
    get(target, key) {
      if (typeof target[key] === 'object' && target[key] !== null)
        return new Proxy(target[key], nestedHandler)

      return target[key]
    },

    set(target, key, value) {
      target[key] = value
    }
  }

  const protect = (key, action) => {
    if (key[0] === '_')
      throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }

  const methodsHandler = {
    get(target, key) {
      return target._methods[key]
    },

    set(target, key, method) {
      target._methods[key] = method.bind(null, target)
    }
  }


  const handler = {
    get(target, key) {
      protect(key, 'get', target)

      if (key === 'methods')
        return new Proxy(target, methodsHandler)

      if (Object.keys(target._methods).includes(key))
        return target._methods[key]

      if (typeof target._data[key] === 'object' && target._data[key] !== null)
        return new Proxy(target._data[key], nestedHandler)

      return target[key]
    },

    set(target, key, value) {
      protect(key, 'set')

      return target._data[key] = value
    },
  }

  const proxy = new Proxy(obj, handler)

  proxy.methods.toJSON = (target) => target._data

  return proxy
}

module.exports = model
