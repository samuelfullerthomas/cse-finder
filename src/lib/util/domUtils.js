export function classnames (classes) {
  const output = []
  Object.keys(classes).forEach(classname => {
    classes[classname] && output.push(classname)
  })
  return output.join(' ')
}

export function pollFor (condition) {
  function poll (resolve) {
    const result = condition()
    if (result) {
      resolve(result)
    } else {
      window.setTimeout(() => poll(resolve), 100)
    }
  }
  return new Promise(poll)
}

export function createElement (html) {
  const el = document.createElement('div')
  el.innerHTML = html
  return el.firstChild
}
