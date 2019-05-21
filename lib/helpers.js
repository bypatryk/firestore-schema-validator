const asyncForEach = async (array, callback) => {
  /* eslint no-await-in-loop: 0 */
  for (const index in array) {
    await callback(array[index], index, array)
  }
}

const isObject = (value) =>
  typeof value === 'object' && value !== null

const markAsChanged = (changedKeys, value, path = []) => {
  if (path.join('.'))
    changedKeys.add(path.join('.'))

  if (isObject(value))
    Object.keys(value)
      .forEach(key => markAsChanged(changedKeys, value[key], [ ...path, key ]))
}

module.exports = {
  asyncForEach,
  isObject,
  markAsChanged,
}