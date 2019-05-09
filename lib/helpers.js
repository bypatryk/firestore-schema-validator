const asyncForEach = async (array, callback) => {
  /* eslint callback-return: 0 */
  const callbacks = []

  for (let index = 0; index < array.length; index++) {
    callbacks.push(callback(array[index], index, array))
  }

  await Promise.all(callbacks)
}

module.exports = {
  asyncForEach,
}
