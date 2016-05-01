function capitalise (str, allWords) {
  if (allWords) {
    return str
      .split(' ')
      .map(function (w) {
        return capitalise(w, false)
      })
      .join(' ')
  }
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

module.exports = capitalise
