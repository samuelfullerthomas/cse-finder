var config = require('./config')
var credentials = require('./credentials')

module.exports = function request (url, type, cb) {
  return new Promise(function (resolve) {
    var xhr = new window.XMLHttpRequest()
    xhr.onload = function () { cb(xhr.response) }
    xhr.onerror = function (e) { throw e }
    xhr.open(type, config.endpoint + url)
    xhr.setRequestHeader('Authorization', 'Bearer ' + credentials.auth)
    xhr.responseType = 'json'
    xhr.send()
  })
}
