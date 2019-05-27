/**
 * Runs async code for each item in array.
 *
 * @param {Array} array Array of items.
 * @param {Function} callback Callback for each item.
 */
const asyncForEach = async (array, callback) => {
  /* eslint no-await-in-loop: 0 */
  for (const index in array) {
    await callback(array[index], index, array)
  }
}

/**
 * Checks if value is an Object.
 *
 * @param {*} value
 * @returns {Boolean} Boolean flag.
 * @memberof helpers
 */
const isObject = (value) =>
  typeof value === 'object' && value !== null

/**
 * Marks (part of) Document Data as changed.
 *
 * @param {Set} changedKeys Set with paths of changed keys.
 * @param {*} value (Part of) Document Data
 * @param {Array} path Path for recurring calls.
 * @returns {Boolean} Boolean flag.
 * @memberof helpers
 */
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