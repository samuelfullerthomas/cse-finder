function classnames (classes) {
  var output = []
  Object.keys(classes).forEach(function (classname) {
    if (classes[classname]) {
      output.push(classname)
    }
  })
  return output.join(' ')
}

module.exports = classnames
