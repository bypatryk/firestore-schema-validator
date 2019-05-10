const isProtected = (key) => {
  return key[0] === '_'
}

const isData = (key) => {
  return key[0] !== '$'
}

const nestedHandler = {
  get(target, key) {
    if (typeof target[key] === 'object' && target[key] !== null)
      return new Proxy(target[key], nestedHandler)

    return target[key]
  },

  set(target, key, value) {
    return target[key] = value
  }
}

const protectedHandler = (protectedKey) => ({
  get(target, key) {
    if (typeof target[key] === 'object' && target[key] !== null)
      return new Proxy(target[key], protectedHandler(protectedKey))

    return target[key]
  },

  set(target, key, value) {
    throw new Error(`Can't set protected property ${protectedKey}.`)
  },
})

const ModelProxy = function (model) {
  return new Proxy(model, {
    get(target, key) {
      if (isProtected(key))
        return new Proxy(target[key], protectedHandler(key))

      if (isData(key) && typeof target._data[key] === 'object' && target._data[key] !== null)
        return new Proxy(target._data[key], nestedHandler)

      return target[key]
    },

    set(target, key, value) {
      if (isProtected(key))
        throw new Error(`Can't set protected property ${key}.`)

      if (isData(key))
        return target._data[key] = value

      return target[key] = value
    },
  })
}

module.exports = ModelProxy