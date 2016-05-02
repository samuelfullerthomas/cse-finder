function pollFor (condition) {
  function poll (resolve) {
    var result = condition()
    if (result) {
      resolve(result)
    } else {
      window.setTimeout(() => poll(resolve), 100)
    }
  }
  return new Promise(function (r) {
    poll(r)
  })
}

module.exports = pollFor
