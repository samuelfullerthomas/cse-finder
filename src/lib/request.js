var config = require('../config')

module.exports = function request (url, auth, type, cb) {
  return new Promise(function (resolve) {
    var xhr = new window.XMLHttpRequest()
    xhr.onload = function () { cb(xhr.response) }
    xhr.onerror = function (e) { throw e }
    xhr.open(type, config.endpoint + url)
    xhr.setRequestHeader('Authorization', 'Bearer ' + auth)
    xhr.responseType = 'json'
    xhr.send()
  })
}
