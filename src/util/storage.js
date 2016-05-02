function get (obj) {
  return new Promise(function (r) {
    window.chrome.storage.local.get(obj, r)
  })
}

function set (obj) {
  return new Promise(function (r) {
    window.chrome.storage.local.set(obj, r)
  })
}

module.exports = {
  get,
  set
}
