export function age (time) {
  var diff = now() - time
  return Math.floor(diff / 60000)
}

export function now () {
  return (new Date()).getTime()
}

export function capitalise (str, allWords) {
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

export function ordinalise (i) {
  var j = i % 10
  var k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

export function classnames (classes) {
  var output = []
  Object.keys(classes).forEach(function (classname) {
    if (classes[classname]) {
      output.push(classname)
    }
  })
  return output.join(' ')
}

export function pollFor (condition) {
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

export function retrieve (obj) {
  return new Promise(function (r) {
    window.chrome.storage.local.get(obj, r)
  })
}

export function save (obj) {
  return new Promise(function (r) {
    window.chrome.storage.local.set(obj, r)
  })
}
