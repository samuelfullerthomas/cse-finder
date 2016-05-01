function age (time) {
  var now = new Date()
  var diff = now.getTime() - time
  return Math.floor(diff / 60000)
}

module.exports = age
